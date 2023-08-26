## Redis 入门

### Redis简介

Redis是基于key-value键值对的内存型数据库，也被称为结构化的NoSql数据库。

它的特点是：

* 在内存中进行读写数据，速度快
* 适合存储一些热点数据信息(秒杀商品、热搜资讯等)

它可以用作：

* 数据库
* 缓存
* 消息中间件(任务队列、消息队列)
* 分布式锁

### Redis安装和连接

本偏笔记讲的是在linux下安装的方法。

### 方法一：使用宝塔linux面板

简单安装法:使用宝塔linux面板傻瓜式安装到云服务器中。然后使用xshell远程连接。

连接步骤：参考[Linux环境下宝塔面板安装Redis以及测试安装是否成功_慢跑的猫不吃鱼的博客-CSDN博客_怎么看宝塔安装是否成功](https://blog.csdn.net/weixin_44695700/article/details/117458317)

连接过程中可能出现的问题如：`address is already be used`，解决方法参考[(56条消息) 启动Redis报错：Could not create Server TCP listening socket *:6379: bind: Address already in use--解决办法_辰兮要努力的博客-CSDN博客](https://blog.csdn.net/weixin_45393094/article/details/104446648)

### 方法二：上传redis打包文件并编译安装

安装redis

1. 将本地的redis安装包redis-4.0.0.tar.gz通过xftp远程传输到云服务器中
2. 使用解压命令 `tar -zxvf redis-4.0.0.tar.gz -C/user/local`解压安装包到user/local的文件夹中
3. 安装编译redis源码所需要的环境gcc   `yum install gcc-c++`
4. 进入redis-4.0.0文件夹，进行编译。使用命令 `make`
5. 进入redis的src目录，进行安装。使用命令 `make install`

启动redis服务

找到redis.conf配置文件，使用vim编辑器打开 `vim redis.conf`，修改以下参数配置：

* 将daemonize 参数的值共no改为yes，是redis服务后台自动启动
* requirepass 13921350895lc 设置登录客户端的密码
* bind 127.0.0.1 将该参数注释掉，是该redis服务器可以远程进行访问
* 打开云服务器控制台，在防火墙中放行6379端口
* 重新启动redis服务
  * `ps-ef | grep redis` 查看redis的进行id
  * kill -9 redis进程id   关闭redis服务器进程
  * `./src/redis-server ./redis.conf` 重新启动redis服务

远程连接redis客户端:

命令：`redis-cli.exe -h 远程ip地址 -a 密码 -p 端口号`

本地连接:

命令: redis-cli -a 密码

### 在Windows上安装

