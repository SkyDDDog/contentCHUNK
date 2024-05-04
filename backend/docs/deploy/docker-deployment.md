# Spring Cloud Alibaba 容器化部署最佳实践 | Docker-Compose 版本

## 准备工作

> Note: 使用 Docker-Compose 方式体验 Demo 时，请确保本地机器内存资源 >= 24G！

如果您还没有安装 Docker 和 Docker-Compose，请按照官方文档来构建运行环境：

- Docker：https://docs.docker.com/desktop/install/linux-install/
- Docker-Compose：https://docs.docker.com/compose/install/

### Hosts 配置

为确保代码能够正常启动，请先配置本地主机映射，将以下映射添加到配置文件中。

```shell
# for springcloud-template-example
127.0.0.1 mysql
127.0.0.1 redis
127.0.0.1 nacos-server
127.0.0.1 seata-server
127.0.0.1 rocketmq
127.0.0.1 gateway-service
```

### 准备 jar 包

进入 `springcloud-template` 目录下，执行 `mvn package` 命令编译项目生成 jar 包，为后续 Docker 构建服务镜像做准备。

## 快速启动

### 组件启动

进入 `springcloud-template` 目录下，在终端中执行以下命令 `docker-compose -f ./docker-compose/docker-compose-env.yml up -d` 来快速部署运行 example 所需组件。

### 添加配置

docker-compose-env.yml 文件运行成功之后，添加 Nacos 配置：

1. 进入 `spring-cloud-template` 目录下；
2. 在终端中执行 `config-init/scripts/nacos-config-quick.sh` 脚本文件。

完成所有微服务配置的一键导入。

> 注意：windows 操作系统可以通过 `git bash` 执行 shell 脚本文件完成配置导入。

### 服务启动

进入 `springcloud-template-template` 目录下，在终端中执行以下命令 `docker-compose -f ./docker-compose/docker-compose-service.yml up -d` 来快速部署运行 example 所需服务。

## 停止所有容器

### 停止服务容器

进入 `springcloud-template-template` 目录下，在终端中执行以下命令 `docker-compose -f ./docker-compose/docker-compose-service.yml down` 来停止正在运行的 example 服务容器。


### 停止组件容器

进入 `springcloud-template-template` 目录下，在终端中执行以下命令 `docker-compose -f ./docker-compose/docker-compose-env.yml down` 来停止正在运行的 example 组件容器。

> 在容器启动时，可以通过 `docker-compose -f docker-compose-*.yml up` 观察容器的启动过程！

## 运行 Demo 示例

准备工作完成后可以运行 demo 示例，主要根据不同的使用场景，可以分别体验用户下单（分布式事务能力）以及模拟高流量点赞（熔断限流以及削峰填谷的能力）。

首先需要启动`springcloud-template-gateway` 微服务应用。

- `springcloud-template-gateway` 模块是整个示例的网关。

### 分布式事务能力

#### 场景说明

针对分布式事务能力，SCA社区提供了**用户下单购买货物的场景**，下单后：

- 先请求库存模块，扣减库存
- 扣减账户余额
- 生成订单信息返回响应

##### 启动测试

分别启动 `springcloud-template-storage`，`springcloud-template-account`，`springcloud-template-order` 三个微服务应用。

访问 `http://gateway-service:10001/swagger-ui/index.html` 来查看生成的在线api文档，体验对应场景。

在本 demo 示例中，为了便于演示，每件商品的单价都为2。

### 熔断限流，削峰填谷能力

#### 场景说明

针对大流量背景下的服务熔断限流，削峰填谷，SCA社区提供了**用户为商品进行点赞的场景**。在此场景下，SCA社区提供了两种应对大流量的处理方式。

- Sentinel 在网关侧绑定指定网关路由进行服务的熔断降级。
- RocketMQ 进行流量削峰填谷，在大流量请求下，生产者向 RocketMQ 发送消息，而消费者则通过可配置的消费速率进行拉取消费，减少大流量直接请求数据库增加点赞请求的压力。

#### 启动测试

分别启动 `springcloud-template-provider` 以及 `springcloud-template-praise-consumer` 模块。

- Sentinel 服务熔断降级

访问 `http://gateway-service:10001/webjars/swagger-ui/index.html?urls.primaryName=module-praise-provider` 体验对应场景。

网关路由点赞服务的限流规则为 5.
因此可以看到 Sentinel 在 Gateway 侧针对多出的流量进行了服务熔断返回 fallback 给客户端，同时数据库的点赞数进行了更新（+5）。


- RocketMQ 进行流量削峰填谷

访问 `http://gateway-service:10001/webjars/swagger-ui/index.html?urls.primaryName=module-praise-provider` 体验对应场景。

由于之前在 Nacos 中配置了 `springcloud-template-praise-consumer` 消费者模块的消费速率以及间隔，在点击按钮时应用模拟 1000 个点赞请求，针对 1000 个点赞请求，`integrated-praise-provider`
会将 1000 次请求都向 Broker 投递消息，而在消费者模块中会根据配置的消费速率进行消费，向数据库更新点赞的商品数据，模拟大流量下 RocketMQ 削峰填谷的特性。

可以看到数据库中点赞的个数正在动态更新。

## 其他

本示例**仅是针对各个组件选取出了较为典型的功能特性来服务应用场景**

当然各个组件的功能特性不仅仅只包含最佳实践中演示的这些，如果您感兴趣或是想要深入了解，欢迎学习各个组件的独立 example 相关文档。

- Nacos examples
    - [Nacos config example](../../../nacos-example/readme-zh.md)
    - [Nacos discovery example](../../../nacos-example/readme-zh.md)
- [Sentinel core example](../../../sentinel-example/sentinel-core-example/readme-zh.md)
- [Seata example](../../../seata-example/readme-zh.md)
- [RocketMQ example](../../../rocketmq-example/readme-zh.md)

