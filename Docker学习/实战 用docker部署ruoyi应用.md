# 实战 用docker部署ruoyi应用

## 部署后端

### 设置自定义的网络

让自定义的网络绑定所有创建的容器，方便容器之间互相通信

```dockerfile
docker network create ruoyi-net
```

### 创建数据库容器

创建数据库容器的时候需要做三件事：

* 创建数据库ry
* 设置字符集utf-8
* 执行数据库初始化脚本(sql执行脚本)  采用挂载的方式将带有sql初始化脚本的路径映射到指定文件路径（docker入口初始化文件目录）下

```dockerfile
docker run --name ruoyi-db \
-v ruoyi-data:/var/lib/mysql \
-v /usr/local/vue/ruoyiBackEnd/sql:/docker-entrypoint-initdb.d \
-e MYSQL_DATABASE=ry \
-e MYSQL_ROOT_PASSWORD=13921350895LC \
-d mysql:5.7 \
--charcter-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

上述命令就是使用MySQL5.7的镜像创建一个名为ruoyi-db的容器，其中使用挂载的方式将/usr/local/vue/ruoyiBackEnd/sql的文件映射到/docker-entrypoint-initdb.d文件夹下，采用卷的形式将ruoyi-data映射到/var/lib/mysql下，设置环境变量MYSQL_DATABASE为ry，表示创建数据库ry；设置环境变量MYSQL_ROOT_PASSWORD为13921350895LC；设置字符集为utf-8

### 创建jdk容器

拉取jdk镜像

```dockerfile
docker pull openjdk:8u342-gre
```

### 创建redis容器

ruoyi的后台项目中还依赖了redis，所以还需要拉取redis的容器并配置。

```dockerfile
docker run --name ruoyi-redis --network ruoyi-net -p 6379:6379 -e REDIS_PASSWORD=13921350895lc -d redis:6.2.6
```

## 部署前端

### 打包前端项目

```shell
npm install # 安装依赖
npm run build #  打包
```

生成一个dist文件夹，将该文件夹丢到云服务的文件目录`/usr/local/vue/ruoyiFrontEnd`中

### 创建nginx容器





