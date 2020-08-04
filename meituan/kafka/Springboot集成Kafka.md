# Springboot集成Kafka

## 1.依赖pom.xml

```java 
  <dependencies>

        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
```

## 2.配置application.properties

```java 
#==================== kafka =======================
spring.kafka.consumer.bootstrap-servers=localhost:9092
spring.kafka.consumer.enable-auto-commit=true
#自动提交的间隔
spring.kafka.consumer.auto-commit-interval=100
#自动提交的位置
spring.kafka.consumer.auto-offset-reset=latest
spring.kafka.consumer.group-id=first

spring.kafka.producer.bootstrap-servers=localhost:9092
spring.kafka.producer.retries=0
spring.kafka.producer.batch-size=4096
spring.kafka.producer.buffer-memory=40960

spring.kafka.template.default-topic=first-kafka
```

## 3.生产者

```java 
package com.sankuai.kafka.controller;

import com.google.gson.Gson;
import com.sankuai.kafka.common.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * @author dengquanliang
 * @date 2020/6/5
 */
@Slf4j
@RequestMapping("/kafka")
@RestController
public class KafkaProducerController {

    private final Gson gson = new Gson();

    @Autowired
    private KafkaTemplate kafkaTemplate;     //自动注入KafkaTemplate

    @GetMapping("/send")
    public String send(@RequestParam String msg){
        Message message = new Message();
        message.setMsg(msg);
        message.setSendTime(new Date());
        log.info("+++++++++++++ message = {}", gson.toJson(message));
        kafkaTemplate.send("dql", gson.toJson(message));                   //调用KafkaTemplate的send()发送消息
        return "success";
    }

}

```

## 4.消费者

```java 
package com.sankuai.kafka.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * 自动监听
 * 
 * @author dengquanliang
 * @date 2020/6/5
 */
@Component
@Slf4j
public class KafkaConsumer {

    @KafkaListener(topics = {"dql"})                //使用@KafkaListener注解自动监听
    public void listen(ConsumerRecord<?, ?> record){
        Optional<?> optional = Optional.ofNullable(record.value());
        if(optional.isPresent()){
            Object message = optional.get();
            log.info("----------- record = {}", record);
            log.info("----------- message = {}", message);
        }
    }

}

```

