# 内容CHUNK Docker部署文档

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

执行 `mvn package` 命令编译项目生成 jar 包，为后续 Docker 构建服务镜像做准备。

## 快速启动

### 组件启动

在终端中执行以下命令 `docker-compose -f ./docker-compose/docker-compose-env.yml up -d` 来快速部署运行 example 所需组件。

### 添加配置

docker-compose-env.yml 文件运行成功之后，添加 Nacos 配置：

在终端中执行 `config-init/scripts/nacos-config-quick.sh` 脚本文件。

完成所有微服务配置的一键导入。

> 注意：windows 操作系统可以通过 `git bash` 执行 shell 脚本文件完成配置导入。

### 服务启动

进入 `docker-compose` 目录下，在终端中执行以下命令 `docker-compose -f ./docker-compose/docker-compose-service.yml up -d` 来快速部署运行 example 所需服务。

## 停止所有容器

### 停止服务容器

进入 `docker-compose` 目录下，在终端中执行以下命令 `docker-compose -f ./docker-compose/docker-compose-service.yml down` 来停止正在运行的 example 服务容器。


### 停止组件容器

进入 `docker-compose` 目录下，在终端中执行以下命令 `docker-compose -f ./docker-compose/docker-compose-env.yml down` 来停止正在运行的 example 组件容器。

> 在容器启动时，可以通过 `docker-compose -f docker-compose-*.yml up` 观察容器的启动过程！


## 其他

本示例**仅是针对各个组件选取出了较为典型的功能特性来服务应用场景**

当然各个组件的功能特性不仅仅只包含最佳实践中演示的这些，如果您感兴趣或是想要深入了解，欢迎学习各个组件的独立 example 相关文档。


