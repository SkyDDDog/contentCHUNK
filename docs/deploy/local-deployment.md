# 内容CHUNK 本地部署文档

## 准备工作

### 环境声明

在运行本地示例之前，需要保证本机具备以下的基础环境，如果您的本地没有当前的环境，下面会一步步进行搭建，演示搭建过程。
当然您也可以通过docker-compose文件快速启动相应组件。

- Nacos 服务端
- Seata 服务端
- RocketMQ 服务端
- MySQL 服务端

### 组件服务版本

本项目的各个组件版本请移步至各个社区的 release 页面进行下载并解压运行。

- [Nacos: 2.1.0 版本](https://github.com/alibaba/nacos/releases)
- [Seata: 1.5.1 版本](https://github.com/seata/seata/releases)
- [RocketMQ: 4.9.4 版本](https://github.com/apache/rocketmq/releases)
- MySQL: 5.7 版本

### Hosts配置

为了保证代码可以正常启动，请先配置好本机的 host 映射，在配置文件中新增如下的映射。
```shell
# for springcloud-template-example
127.0.0.1 mysql
127.0.0.1 redis
127.0.0.1 nacos-server
127.0.0.1 seata-server
127.0.0.1 rocketmq
127.0.0.1 gateway-service
```

### 数据库配置

下面开始本地环境搭建准备，在数据库配置开始之前，请确保 MySQL 的服务端开启。

#### 初始化业务表

运行 `/data/config-init/sql/init.sql` 的 sql 脚本一键创建业务所需的环境以及 Seata 相关的表。

### Nacos配置

至此，数据库的服务配置完毕，下面需要配置 Nacos 的配置中心有关所有的微服务配置文件。

#### Nacos启动

这里采用 Nacos 的 `standalone` 模式启动，进入到 Nacos 解压后的目录下，执行如下命令。

```shell
#Linux/Mac环境
sh bin/startup.sh -m standalone
#如果您是Ubuntu环境，执行上述命令启动报错提示[[符号找不到，可以执行如下的命令
bash bin/startup.sh -m standalone
#Win环境
.\bin\startup.cmd -m standalone
```

#### 新增配置文件

在批量导入配置之前，请先修改 `/data/config-init/config-init/config/datasource-config.yaml` 中的数据源配置**（用户名和密码）**。

之后运行 `/data/config-init/config-init/scripts/nacos-config-quick.sh` 来完成所有微服务配置的一键导入。

```shell
# linux
sh nacos-config-quick.sh
# windows 可以使用git bash来完成配置的导入 执行命令同上
```

### Seata 配置

Nacos 服务注册中心以及配置中心部署完毕之后，下面是 Seata 服务端的配置。

Seata 的 db 模式需要额外配置数据库信息以及修改 Seata 服务端的配置文件，且在新版本中配置文件相较于旧版本进行了合并，因此这里为了便于演示方便，采用 Seata 单机的`file`模式启动 Seata Server。

#### 启动 Seata Server

进入到 release 解压后的 seata 目录中，执行如下命令。

```shell
#Linux/Mac环境
sh ./bin/seata-server.sh
#Win环境
bin\seata-server.bat
```

### RocketMQ 配置

Seata 服务启动后可以启动 RocketMQ 的 NameServer 以及 Broker 服务。

进入到 release 解压后的 rocketmq 目录中，执行如下命令。

#### 启动 NameServer

```shell
#Linux/Mac环境
sh bin/mqnamesrv
#Win环境
.\bin\mqnamesrv.cmd
```

#### 启动 Broker

```shell
#Linux/Mac环境
sh bin/mqbroker
#Win环境
.\bin\mqbroker.cmd -n localhost:9876
```
### 分布式事务能力
