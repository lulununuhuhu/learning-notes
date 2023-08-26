## 打开startup.bat和shutdown.bat闪退

安装完tomcat，跟着教程在第一步打开startup.bat上就出现了问题。教程中该脚本文件可以进行一系列的运行并保持开启状态，然后就可以使用localhost:8080登录apcahe网页了。然而我的startup.bat点开就退出，所以无法开启tomcat服务，也就无法按照教程走下去。

上网查询startup闪退的原因，总结除了闪退的三种原因：

1. 8080端口被占用
2. startup和shutdowm脚本文件没有记录jdk和tomcat的环境变量，由于我是用的tomcat是免安装版本的，所以当缺少了这些信息就无法启动
3. server.xml配置错误

我首先使用命令netstat -ano|findstr "8080"在cmd查看使用8080端口的进程，没有查到。排除第一种原因。

第二种情况：对startup.bat和shutdown.bat进行修改，在开头加上

```bash
SET JAVA_HOME=E:\Java\jdk-16
SET TOMCAT_HOME=E:\apache-tomcat-8.5.73
```

分别是jdk的路径和tomcat的路径名。因为tomcat本省是由Java程序编写的，所以在启动时需要有jdk的安装目录。这样相当于起到了环境变量的作用。

但不知什么情况（目前没搞清楚），刚开始在使用了这种方法后，仍然闪退。所以我就跳到了第三种情况：按照csdn那篇文章[(42条消息) Tomcat无法成功启动——双击startup.bat闪退的解决办法_华农老林的博客-CSDN博客](https://blog.csdn.net/scau_lth/article/details/83218335)d的第三种方法，在server.xml中加上了一个标签。这时打开后能显示一部分配置情况了，但不能维持，很快就闪退。这一步后来证明是错误的

接下来，开始折腾环境变量，添加了JAVA_HOME、CATALINA_HOME等变量，依次都配置成功了。但是startup还是只能运行一部分就闪退。这是看到了这篇文章[(42条消息) 运行startup.bat后窗口自动关闭，tomcat启动不起来_w926498的博客-CSDN博客](https://blog.csdn.net/w926498/article/details/80136434)，了解到在log目录里会记录comcat的启动服务信息，给了我一个排错的新思路。

我把之前的log记录文件删除，重新打开一个startup.bat，从而在log目录中会出现最新的日志信息。更具最新的日志信息中，找到了之前那段在server.xml文件添加的那个标签的位置出现了错误。

把添加的内容注释掉，tomcat成功开启，输入localhost:8080，成功打开apache初始页面。

****

**总结**：这个调试很折腾人，花了快2小时。主要学习到的就是在程序启动出现问题时，可以尝试去找下是否有对应的log日志，在日志中也许能定位到错误原因。

参考：

[(42条消息) 运行startup.bat后窗口自动关闭，tomcat启动不起来_w926498的博客-CSDN博客](https://blog.csdn.net/w926498/article/details/80136434)

[(42条消息) Tomcat无法成功启动——双击startup.bat闪退的解决办法_华农老林的博客-CSDN博客](https://blog.csdn.net/scau_lth/article/details/83218335)

[Tomcat服务无法开启，点击start不一会就变成stopped - 舞动的心 - 博客园 (cnblogs.com)](https://www.cnblogs.com/liuzhen1995/p/5608581.html)

[(42条消息) Tomcat启动闪退的原因和解决方法_Wu_Application的博客-CSDN博客_tomcat闪退解决方法](https://blog.csdn.net/Wu_Application/article/details/91361792)

[Tomcat双击startup.bat闪退的解决方法，你get到了吗？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/353404326#:~:text=对于免安装版的 Tomcat 来说，在启动 Tomcat 时，需要读取环境变量和配置信息，缺少了这些信息，就不能登记环境变量，导致闪退。,1：在已解压的 tomcat 的bin文件夹下找到 startup.bat ，右击->编辑。)

## 配置一个MavenWeb项目和集成Tomcat到本地IDEA中出现的问题

1. 配置MavenWeb项目

 	按如下项目结构进行创建，要注意项目层次：WEB-INF是webapp的一个子目录

![image-20211124103812727](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211124103812727.png)

然后在pom.xml中添加<package>war<package>语句表示项目打包生成的格式。然后在WEB-INF文件夹中自己加上web.xml文件。

在webapp目录下添加了一个简单的demo后，进行打包，项目报错:Error injecting constructor, java.lang.ExceptionInInitializerError: Cannot access defaults field of Properties  at org.apache.maven.plugin.war，经过参考[解决maven项目打包时报错:Error injecting constructor - 诤 - 博客园 (cnblogs.com)](https://www.cnblogs.com/zxiake/p/15187723.html)和(https://stackoverflow.com/questions/5351948/webxml-attribute-is-required-error-in-maven)，是要在pom.xml中添加maven-war-plugin插件。在pom添加如下：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>3.2.2</version>
</plugin>
```

继续使用maven package打包时又报了个新错：webxml attribute is required (or pre-existing WEB-INF/web.xml if executing in update mode)。参考[(42条消息) Maven打包web项目报错Error assembling WAR: webxml attribute is required (or pre-existing WEB-INF/web.xml if_潘建南的博客-CSDN博客](https://blog.csdn.net/pange1991/article/details/48596869)和[war - "webxml attribute is required" error in Maven - Stack Overflow](https://stackoverflow.com/questions/5351948/webxml-attribute-is-required-error-in-maven)，发现webapp文件目录与main目录同一级别，于是修改文件夹路径并且在plugin中补充添加web.xml的路径信息。

```xml
<configuration>
    <webXml>src\main\webapp\WEB-INF\web.xml</webXml>
</configuration>
```

2. 在idae中集成tomcat，直接在idea中就可打开tomcat服务并部署运行

一开始使用smart tomcat插件进行集成，然后运行时一致显示no jdk for specfied module，一直没找到答案，遂改称使用maven的tomcat插件进行集成。插件信息如下：

```xml
<!--            tomcat插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
<!--                <configuration>-->
<!--&lt;!&ndash;                    默认端口号&ndash;&gt;-->
<!--                    <port>8080</port>-->
<!--&lt;!&ndash;                    默认项目访问路径&ndash;&gt;-->
<!--                    <path>/</path>-->
<!--                </configuration>-->
            </plugin>
```

