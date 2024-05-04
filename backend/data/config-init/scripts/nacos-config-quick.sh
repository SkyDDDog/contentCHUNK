#!/bin/sh
echo "Nacos auto config started"
authConfig=${cat ../config/auth-jwt.yaml}
datasourceConfig=$(cat ../config/mysql-druid.yaml)
redisConfig=$(cat ../config/redis.yaml)
seataConfig=$(cat ../config/seata.yaml)
springdocConfig=$(cat ../config/springdoc.yaml)
consumerConfig=$(cat ../config/mq-consumer.yaml)
providerConfig=$(cat ../config/mq-provider.yaml)
groupId="template-example"
curl -X POST "nacos-server:8848/nacos/v1/cs/configs" -d "dataId=auth-jwt.yaml&group=${groupId}&content=${authConfig}"
curl -X POST "nacos-server:8848/nacos/v1/cs/configs" -d "dataId=mysql-druid.yaml&group=${groupId}&content=${datasourceConfig}"
curl -X POST "nacos-server:8848/nacos/v1/cs/configs" -d "dataId=redis.yaml&group=${groupId}&content=${redisConfig}"
curl -X POST "nacos-server:8848/nacos/v1/cs/configs" -d "dataId=seata.yaml&group=${groupId}&content=${seataConfig}"
curl -X POST "nacos-server:8848/nacos/v1/cs/configs" -d "dataId=springdoc.yaml&group=${groupId}&content=${springdocConfig}"
curl -X POST "nacos-server:8848/nacos/v1/cs/configs" -d "dataId=mq-provider.yaml&group=${groupId}&content=${providerConfig}"
curl -X POST "nacos-server:8848/nacos/v1/cs/configs" -d "dataId=mq-consumer.yaml&group=${groupId}&content=${consumerConfig}"
echo "Nacos config pushed successfully finished"