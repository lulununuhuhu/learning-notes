## Navicat连接Oracle数据库并创建表

Oracle创建表和MySQL有点不同，流程比MySQL多。

基本流程就是：

1. 创建表空间，表空间的含义就是数据表。指定该表空间存放的位置,和表空间的大小，创建完成后会生成一个DBF文件。
2. 创建用户，设置用户的默认表空间为新创建的表空间，设置用户名和密码，并设置成员属于和服务器权限的属性
3. 然后重新连接Oracle数据库，可以看到自己的用户在名单中，打开用户就可以和MySQL一样创建数据表了。

> Oracle中的用户相当于MySQL中的数据库；Oracle中的表空间相当于MySQL中的数据表数据的物理存放位置。

参考文章：

[(56条消息) 使用navicat创建Oracle数据库_自足孤独者的博客-CSDN博客_navicat创建oracle数据库](https://blog.csdn.net/weixin_45548509/article/details/103892743)

[用Navicat 创建Oracle数据库 - 哈尼万年咛 - 博客园 (cnblogs.com)](https://www.cnblogs.com/zhupblogs/p/zhup.html)

