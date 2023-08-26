###  创建好Maven项目后读取POM.xml文件错误

错误原因：Maven目录下的conf文件夹中的settings.xml文件中修改仓库路径错误，<localRepository>没有有些对应的闭合标签</localRepository>,添加后即可解决问题。

[(37条消息) 报错处理_MAVEN构建项目时读取文件 /pom.xml 时出错_m0_37836911的博客-CSDN博客](https://blog.csdn.net/m0_37836911/article/details/116100189)

### 在命令行窗口对Maven项目执行编译时的问题

执行`mvn compile`后

![image-20211113143451368](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113143451368.png)

然后在idea中发现maven管理窗口中的plugin爆红，猜测进行compile操作的相关插件没有配置好，于在maven管理窗口中进行rebuild![image-20211113144858725](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113144858725.png)

rebulid之后错误解决。

[Maven :Cannot resolve xxx Plugin方法 - 简书 (jianshu.com)](https://www.jianshu.com/p/1864f9d2f85d)

### 不支持源选项5，请使用7或更高版本

![image-20211113145205690](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113145205690.png)

这种问题一般是xml文件中的jdk和idea的jdk没有同步配置好。具体由三种方法：见下面链接

[(37条消息) ERROR:JAVA: 错误: 不支持发行版本 5 解决方法_eli的博客-CSDN博客](https://blog.csdn.net/xiao_yi_xiao/article/details/119142118)

