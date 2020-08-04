# Kafka第四篇 Kafka高可用架构设计

## 1.高可用概述

​    **高可用性**(High Availability)，指系统无间断地执行其功能的能力，代表系统的可用性程度。Kafka从0.8版本开始提供了高可用机制，可保障一个或多个Broker宕机后，其他Broker及所有Partition都能继续提供服务，且存储的消息不丢失。

​    对分布式系统来说，当集群规模上升到一定程度后，一台或者多台机器宕机的可能性大大增加；Kafka采用多机备份和消息应答确认方式解决了数据丢失问题，并通过一套失败恢复机制解决服务不可用问题。

## 2.消息备份机制

### 2.1 消息备份

​     Kafka允许同一个Partition存在多个消息副本(Replica)，每个Partition的副本通常由1个Leader及0个以上的Follower组成，生产者将消息直接发往对应Partition的Leader，Follower会周期地向Leader发送同步请求，Kafka的Leader机制在保障数据一致性地同时降低了消息备份的复杂度。

​    同一Partition的Replica不应存储在同一个Broker上，因为一旦该Broker宕机，对应Partition的所有Replica都无法工作，这就达不到高可用的效果。为了做好负载均衡并提高容错能力，Kafka会尽量将所有的Partition以及各Partition的副本均匀地分配到整个集群上。举个例子，当集群中部署了3台Broker，TopicA共有4个Partition，每个Partition均有3个Replica时下图就是一种合理的分布方式。

   <img src="/Users/dengquanliang/typora/meituan/kafka/Kafka第四篇 Kafka高可用架构设计.assets/image-20200804154005969.png" alt="image-20200804154005969" style="zoom:50%;" />  

### 2.2 ISR

​    ISR(In-Sync Replicas)指的是一个Partition中与Leader“保持同步”的Replica列表(实际存储的是副本所在Broker的BrokerId)，这里的保持同步不是指与Leader数据保持完全一致，只需在*replica.lag.time.max.ms*时间内与Leader保持有效连接，官方解释如下

> If a follower hasn't sent any fetch requests or hasn't consumed up to the leaders log end offset for at least this time, the leader will remove the follower from isr,( default value =10000 )

​    Follower周期性地向Leader发送FetchRequest请求(数据结构见下)，发送时间间隔配置在*replica.fetch.wait.max.ms*中，默认值为500。

FetchRequest

```java 
public class FetchRequest {
    private final short versionId;
    private final int correlationId;
    private final String clientId;
    private final int replicaId;
    private final int maxWait;    // Follower容忍的最大等待时间: 到点Leader立即返回结果，默认值500
    private final int minBytes;   // Follower容忍的最小返回数据大小：当Leader有足够数据时立即返回，兜底等待maxWait返回，默认值1
    private final Map<TopicAndPartition, PartitionFetchInfo> requestInfo;  // Follower中各Partititon对应的LEO及获取数量
}
```

​    各Partition的Leader负责维护ISR列表并将ISR的变更同步至ZooKeeper，被移出ISR的Follower会继续向Leader发FetchRequest请求，试图再次跟上Leader重新进入ISR。

​    ISR中所有副本都跟上了Leader，通常只有ISR里的成员才可能被选为Leader。当Kafka中*unclean.leader.election.enable*配置为true(默认值为false)且ISR中所有副本均宕机的情况下，才允许ISR外的副本被选为Leader，此时会丢失部分已应答的数据。

### **2.3 Acks**

​    为了讲清楚ISR的作用，下面介绍一下生产者可以选择的消息应答方式，生产者发送消息中包含acks字段，该字段代表Leader应答生产者前Leader收到的应答数

- **acks=0**

​    生产者无需等待服务端的任何确认，消息被添加到生产者套接字缓冲区后就视为已发送，因此acks=0不能保证服务端已收到消息，使用场景较少，本文不做任何讨论

- **acks=1**

​     Leader将消息写入本地日志后无需等待Follower的消息确认就做出应答。如果Leader在应答消息后立即宕机且其他Follower均未完成消息的复制，则该条消息将丢失

  ![image-20200804154236975](/Users/dengquanliang/typora/meituan/kafka/Kafka第四篇 Kafka高可用架构设计.assets/image-20200804154236975.png)

上图左侧的稳态场景下，Partition1的数据冗余备份在Broker0和Broker2上；Broker0中的副本与Leader副本因网络开销等因素存在1秒钟同步时间差，Broker0中的副本落后124条消息；Broker2中的副本存在8秒钟同步时间差，Broker2中的副本落后7224条消息。若图中的Broker1突然宕机且Broker0被选为Partition1的Leader，则在Leader宕机前写入的124条消息未同步至Broker0中的副本，这次宕机会造成少量消息丢失。

- **acks=all**

​     Leader将等待ISR中的所有副本确认后再做出应答，因此只要ISR中任何一个副本还存活着，这条应答过的消息就不会丢失。acks=all是可用性最高的选择，但等待Follower应答引入了额外的响应时间。Leader需要等待ISR中所有副本做出应答，此时响应时间取决于ISR中最慢的那台机器，下图中因复制产生的额外延迟为3秒。

<img src="/Users/dengquanliang/typora/meituan/kafka/Kafka第四篇 Kafka高可用架构设计.assets/image-20200804154336759.png" alt="image-20200804154336759" style="zoom:50%;" />

 Broker的配置项*min.insync.replicas*(默认值为1)代表了正常写入生产者数据所需要的最少ISR个数，当ISR中的副本数量小于*min.insync.replicas*时，Leader停止写入生产者生产的消息，并向生产者抛出NotEnoughReplicas异常，阻塞等待更多的Follower赶上并重新进入ISR。被Leader应答的消息都至少有*min.insync.replicas*个副本，因此能够容忍*min.insync.replicas-1*个副本同时宕机。

**小结：**发送的acks=1消息会出现丢失情况，为不丢失消息可配置生产者acks=all & min.insync.replicas >= 2

## 2.4 LEO & HW

​    每个Kafka副本对象都有下面两个重要属性：

- LEO(log end offset) ，即日志末端偏移，指向了副本日志中下一条消息的位移值(即下一条消息的写入位置)

- HW(high watermark)，即已同步消息标识，因其类似于木桶效应中短板决定水位高度，故取名高水位线

  所有高水位线以下消息都是已备份过的，消费者仅可消费各分区Leader高水位线以下的消息，对于任何一个副本对象而言其HW值不会大于LEO值

  Leader的HW值由ISR中的所有备份的LEO最小值决定(Follower在发送FetchRequest时会在PartitionFetchInfo中会携带Follower的LEO)

<img src="/Users/dengquanliang/typora/meituan/kafka/Kafka第四篇 Kafka高可用架构设计.assets/image-20200804154419473.png" alt="image-20200804154419473" style="zoom:50%;" />

Kafka原本使用HW来记录副本的备份进度，HW值的更新通常需要额外一轮FetchRequest才能完成，存在一些边缘案例导致备份数据丢失或导致多个备份间的数据不一致。本文主要介绍可用性，数据一致性及截断规则不详述。Kafka新引入了Leader epoch解决HW截断产生的问题，有兴趣的同学可参考[Apache : Fix log divergence after fast leader fail over](https://cwiki.apache.org/confluence/display/KAFKA/KIP-279%3A+Fix+log+divergence+between+leader+and+follower+after+fast+leader+fail+over)

## 3. 故障恢复

​    Kafka从0.8版本开始引入了一套Leader选举及失败恢复机制：首先需要在集群所有Broker中选出一个Controller，负责各Partition的Leader选举以及Replica的重新分配。当出现Leader故障后，Controller会将Leader/Follower的变动通知到需为此作出响应的Broker。

​    Kafka使用ZooKeeper存储Broker、Topic等状态数据，Kafka集群中的Controller和Broker会在ZooKeeper指定节点上注册Watcher(事件监听器)，以便在特定事件触发时，由ZooKeeper将事件通知到对应Broker。

### 3.1 Broker故障恢复

#### 3.1.1 Broker故障场景分析

**场景1 Broker与其他Broker断开连接**

<img src="/Users/dengquanliang/typora/meituan/kafka/Kafka第四篇 Kafka高可用架构设计.assets/image-20200804154605525.png" alt="image-20200804154605525" style="zoom:50%;" /> 

上图中Broker0和其余Broker都断开了连接，由于ZooKeeper还能接收到Broker0的心跳，因此ZooKeeper认为Broker0依然存活，则对于

- **Partition0**

Broker0中的副本为Partition0的Leader，当Broker0超过*replica.lag.time.max.ms*没接收到Broker1、Broker2的FetchRequest请求后，Broker0选择将Partition0的ISR收缩到仅剩Broker0本身，并将ISR的变更同步到ZooKeeper；Broker0需要根据*min.insync.replicas*的配置值决定是否继续接收生产者数据

- **Partition1**

超过*replica.lag.time.max.ms*后，Broker1会将Broker0中的副本从Partition1的ISR中移除。若后续Broker0恢复连接并赶上了Broker1，则Broker1还会再将Broker0重新加入Partition1的ISR

**场景2 Broker与ZooKeeper断开连接**

![image-20200804154757544](/Users/dengquanliang/typora/meituan/kafka/Kafka第四篇 Kafka高可用架构设计.assets/image-20200804154757544.png)

Broker0与ZooKeeper断开连接后，ZooKeeper会自动删除该Broker对应节点，并且认为Broker0已经宕机，则对于

- **Partition0**

​      ZooKeeper删除节点后，该节点上注册的Watcher会通知Controller，Controller会发现Broker0为Partition0的Leader，于是从当前存活的ISR中选择了Broker2作为Partition0的新Leader。Controller通过LeaderAndIsrRequest将Leader变更通知到Broker1、Broker2，于是Broker1改向Broker2发送Partition0数据的FetchRequest请求。

​      生产者每隔60秒会从*bootstrap.servers*中的Broker获取最新的metadata，当发现Partition0的Leader发生变更后，会改向新Leader-Broker2发送Partition0数据。另一边，Broker0收不到ZooKeeper通知，依然认为自己是Partition0的Leader；由于Broker1、Broker2不再向Broker0发送FetchRequest请求，缺失了ISR应答的Broker0停止写入acks=all的消息，但可以继续写入acks=1的消息。在*replica.lag.time.max.ms*时间后，Broker0尝试向ZooKeeper发送ISR变更请求但失败了，于是不再接收生产者的消息。

​      当Broker0与ZooKeeper恢复连接后，发现自己不再是Partition0的Leader，于是将本地日志截断(为了保证和Leader数据一致性)，并开始向Broker2发送FetchRequest请求。在Broker0与ZooKeeper失联期间写入Broker0的所有消息由于未在新Leader中备份，这些消息都丢失了。

- **Partition1**

​    Broker0中的副本只是作为Partition1的Follower节点，而Broker0与Broker1依然保持连接，因此Broker0依然会向Broker1发送FetchRequest。只要Broker0能继续保持同步，Broker1也不会向ZooKeeper变更ISR。

#### 3.1.2 Broker故障恢复过程

​    Broker发生故障后，由Controller负责选举受影响Partition的新Leader并通知到相关Broker，具体过程可参考下图。

<img src="/Users/dengquanliang/typora/meituan/kafka/Kafka第四篇 Kafka高可用架构设计.assets/image-20200804154900465.png" alt="image-20200804154900465" style="zoom:50%;" />

当Broker出现故障与ZooKeeper断开连接后，该Broker在ZooKeeper对应的znode会自动被删除，ZooKeeper会触发Controller注册在该节点的Watcher；Controller从ZooKeeper的/brokers/ids节点上获取宕机Broker上的所有Partition(简称set_p)；Controller再从ZooKeeper的/brokers/topics获取set_p中所有Partition当前的ISR；对于宕机Broker是Leader的Partition，Controller从ISR中选择幸存的Broker作为新Leader；最后Controller通过LeaderAndIsrRequest请求向set_p中的Broker发送LeaderAndISRRequest请求。

​    受到影响的Broker会收到Controller发送的LeaderAndIsrRequest请求后，Broker通过ReplicaManager的becomeLeaderOrFollower方法响应LeaderAndIsrRequest：新Leader会将HW更新为它的LEO值，而Follower则通过一系列策略截断log以保证数据一致性。

### 3.2 Controller故障恢复

#### 3.2.1 Controller故障场景分析

<img src="/Users/dengquanliang/typora/meituan/kafka/Kafka第四篇 Kafka高可用架构设计.assets/image-20200804154945828.png" alt="image-20200804154945828" style="zoom:50%;" />

**场景1 Controller与ZooKeeper断开连接**

​     此时ZooKeeper会将Controller临时节点删除，并按照下节的故障恢复过程重新竞选出新Controller。而原本的Controller由于无法连上ZooKeeper，它什么也执行不了；当它与ZooKeeper恢复连接后发现自己不再是Controller，会在Kafka集群中充当一个普通的Broker。

**场景2 Controller与某个Broker断开连接**

​    因为Controller无法通知到Broker0，所以Broker0不晓得Partition0的Leader已经更换了，所以也会出现3.1.1节场景2描述的出现短暂服务不可用并可能发生数据丢失。

#### 3.2.2 Controller故障恢复过程

​    最后，集群中的Controller也会出现故障，因此Kafka让所有Broker都在ZooKeeper的Controller节点上注册一个Watcher。Controller发生故障时对应的Controller临时节点会自动删除，此时注册在其上的Watcher会被触发，所有活着的Broker都会去竞选成为新的Controller(即创建新的Controller节点，由ZooKeeper保证只会有一个创建成功)。竞选成功者即为新的Controller，会在ZooKeeper的下述节点上注册Watcher，以监控各Broker运行状态、负责Leader宕机的失败恢复，并对管理脚本做出响应。

- 在/admin节点上注册Watcher，以应对管理员脚本对Topic及Partition的影响；
- 在/brokers/ids节点上注册Watcher，以获取各Brokers的状态变化；
- 在/brokers/topics节点上注册Watcher，以监控每个Partition的ISR副本状态；