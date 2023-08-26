## springboot连接redis时连接失败

1. 首先查看redis.conf的配置文件中的这几个参数	`requirepass` `bind` `protected-mode` ,分别表示redis密码，和指定绑定ip，保护模式；

   1. 可以将`requirepass`参数的值改为自己的密码，如果不需要密码的话就直接注释掉

   2. `bind`在配置文件中为了安全，默认配置的127.0.0.1的回环ip，只允许本机电脑访问，由于我们是访问远程服务器的redis，所以需要打开ip访问限制。在这里可以通过注释使redis服务器接收网络中的所有ip的请求

   3. 放行端口

      1. 在云服务器的安全组配置中设置放行端口6379

      2. 在命令行中通过

         ```shell
         firewall-cmd --zone=public --add-port=6379/tcp --permanent
         ```

         放行6379端口。

         > 注：在csdn博客的方法中，大部分让你直接关闭防火墙，但这会有安全隐患。之前我关闭防火墙后导致了挖矿脚本的注入，把服务器内存挤爆无法登录，只能重装系统解决。所以可以单独在防火墙中设置指定服务的端口进行放行操作，不要偷懒关闭防火墙服务，会有安全隐患。

   参考文章:

   [(56条消息) Redis学习笔记——（二）Redis访问/关闭防火墙_假灬假的博客-CSDN博客_redis关闭防火墙](https://blog.csdn.net/j253507692/article/details/78704542)

[(56条消息) springboot连接redis出现org.springframework.data.redis。RedisConnectionFailureException异常_小胡鸭鸭鸭的博客-CSDN博客](https://blog.csdn.net/m0_48682074/article/details/108121561)