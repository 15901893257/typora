# kafka第一篇 kafka入门

## 1.kafka入门

kafka默认端口号：9092

zookeeper：2181

### 1.1 安装

brew install kafka

### 1.2 安装目录

```java 
# kafka安装目录
/usr/local/Cellar/kafka/2.1.0

# 配置文件目录
/usr/local/etc/kafka/
```

### 1.3 zookeeper启动

```java 
/usr/local/Cellar/kafka/2.5.0/bin/zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties &
```

### 1.4 kafka启动

```java
/usr/local/Cellar/kafka/2.5.0/bin/kafka-server-start /usr/local/etc/kafka/server.properties &
```

### 1.5 创建集群

```java 
cd /usr/local/etc/kafka/
cp erver.properties config/server-1.properties
cp server.properties config/server-2.properties
#修改配置文件
server-1.properties:
    broker.id=1
    listeners=PLAINTEXT://:9093
    log.dirs=/usr/local/var/logs/kafka/1
      
server-2.properties:
    broker.id=2
    listeners=PLAINTEXT://:9094
```

### 1.6 服务关闭

关闭顺序，先关闭kafka,后关闭zookeeper

```java 
# 关闭kafka
/usr/local/Cellar/kafka/2.5.0/bin/kafka-server-stop
#关闭zookeeper
/usr/local/Cellar/kafka/2.5.0/bin/zookeeper-server-stop
```



## 2.kafka命令行操作

### 2.1 创建topic

```java 
# 一个副本，一个partition
kafka-topics --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test
```

### 2.2 查看topic列表

```java 
kafka-topics --list --bootstrap-server localhost:9092
# 输出：
test
```

### 2.3 创建一个生产者

```java 
kafka-console-producer --bootstrap-server localhost:9092 --topic test
```

### 2.4 创建消费者

```java 
kafka-console-consumer --bootstrap-server localhost:9092 --topic test --from-beginning    //from-beginning会从头开始消费
#或者
//kafka-console-consumer --zookeeper localhost:9092 --topic test --from-beginning
```

### 2.5 删除topic

```java 
#需要在server.properties中设置delete.topic.enable=true,否则只是标记删除或者直接重启
kafka-topics --bootstrap-server localhost:9092 --delete --topic first
```

### 2.6 查看topic信息

```java 
kafka-topics --describe --bootstrap-server localhost:9092 --topic first
Topic: first  PartitionCount: 2 ReplicationFactor: 2  Configs: segment.bytes=1073741824
  Topic: first  Partition: 0  Leader: 1 Replicas: 1,2 Isr: 1,2
  Topic: first  Partition: 1  Leader: 0 Replicas: 2,0 Isr: 0,2
// leader负责给定的partition的所有读和写
//replicas是副本，包括leader和follower,副本数量 <= 节点数量
//isr是副本的同步集合，当leder挂掉后，按isr的顺序来选举leader
```