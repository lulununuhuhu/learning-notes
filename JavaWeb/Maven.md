## Maven介绍

> Apache Maven是一套专门管理进行项目管理和构建的工具，它基于项目对象模型(POM)的概念，通过一小段描述信息来管理项目的构建、报告和文档，具体功能有：
>
> * 提供了一套标准化的项目结构
> * 提供了一套标准化的构建流程（编译->测试->打包->发布）
> * 提供了一套依赖管理机制(通过 配置文件可以快速地导入指定的jar包)

maven项目标准的结构如下：

![image-20211113101841231](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113101841231.png)

## Maven导入jar包的过程

Maven通过pom.xml添加一条相关jar包信息的配置就可导入jar包，它是如何做到的呢？

答：在xml文件中导入jar包声明后，maven会根据配置信息去对应的仓库寻找jar包。在下载maven后，会在maven文件目录中有一个仓库，这称为本地仓库。除此之外，还有中央仓库和远程仓库。

* 本地仓库：计算机磁盘下的一个目录
* 中央仓库：由Maven团队维护的一个全球唯一的目录
* 远程仓库:一般由公司搭建的私有仓库

![image-20211113102712395](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113102712395.png)

当项目中使用坐标引入对应依赖的jar包后，首先会查找本地仓库是否有对应的jar包：

1. 如果有，则在项目中直接引用
2. 如果没有，则去中央仓库中下载对应的jar包到本地仓库
3. 由于国内去访问中央仓库下载jar包比较慢，所以有时会去国内的私服仓库寻找对应的jar包，让私服去中央仓库寻找对应的jar包然后返回给本地仓库进行下载，这样的速度会更快些（通过<mirror>标签进行配置）

## Maven安装&配置及基本使用

1. 去官网下载对应的Maven压缩包，解压到指定文件夹作为Maven的根目录。目录结构如下：

![image-20211113132026140](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113132026140.png)

2. 将其中bin文件夹路径添加到环境变量中

3. 配置本地仓库路径：在conf/settings.xml中的<localRepository></localRepository>中添加仓库路径。例：

   ```xml
   <localRepository>E:\apache-maven-3.8.3-bin\apache-maven-3.8.3\MavenLoacalRepository<!-- 修改仓库路径--></localRepository>
   ```

   4. 配置阿里云私服：修改conf/settings.xml中的<mirrors>标签，为其添加子标签。

   ```xml
   <mirror>
         <id>alimaven</id>
         <mirrorOf>central</mirrorOf>
         <name>aliyun maven</name>
         <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
         <blocked>true</blocked>
       </mirror>
   ```

   ## Maven常用命令

   * compile:编译  `mvn compile`
   * clean:清理 `mvn clean`：清理项目产生的临时文件，一般是模块下的target目录
   * test:测试 `mvn test`：测试命令或者执行src/test/java下面的测试用例
   * package:打包 `mvn package`：项目打包工具，会在模块下的target目录中生成jar或者war文件
   * install：安装 `mvn install`:模块安装命令，将打包的jar或者war文件复制到本地仓库
   * deploy：部署`mvn deploy`:发布命令，将打包的文件发布到远程maven仓库
   
   ## Maven生命周期
   
   Maven构建生命周期描述的是一次构建过程中经历的事件。Maven生命周期的项目构建可以分为3类。
   
   1. clean 清理工作
   
   ![image-20211113143124661](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113143124661.png)
   
   1. default：核心工作例如编译，测试，打包安装等
   
   ![image-20211113143140155](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113143140155.png)
   
   1. site:产生报告，发布站点等
   
   ![image-20211113143153768](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113143153768.png)
   
   同一类的生命周期中，在执行一个命令前会把之前的命令先执行一遍。

## idea配置Maven

### IDEA配置Maven

1. 选择IDEA中File-->Settings,搜索Maven，找到Maven配置的相关页面

![image-20211113171111799](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113171111799.png)

2. 依次配置好`Maven home path` `User settings file` `Local repository`三个文件路径。

### Maven坐标详解

> Maven中的坐标是**资源的唯一标识**，通过坐标来定义项目或引入项目中需要的依赖。

Maven坐标主要组成：

* groupId：定义当前Maven项目隶属组织的名称（通常域名反写,导入后以该id作为文件目录的存放路径）
* artifactId:定义当前Maven项目名称（通常是模块名称，例如order-service、goods-service）
* version：定义当前项目版本号

例：

```xml
<groupId>com.itheima</groupId>
<artufactId>maven-demo</artufactId>
<version>1.0-SNAPSHOT</version>
```

## 依赖管理和依赖范围

### 依赖管理

通过在pom.xml中<dependencies>中添加新标签<dependency>，比如添加MySQL驱动的jar包

```xml
    <dependencies>
<!--   导入MySQL驱动的jar包       -->
        <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.21</version>
            <scope>test</scope> <!--指定依赖作用的范围 -->
        </dependency>

    </dependencies>
```

然后点击右上角的刷新按钮，如果本地仓库已有的话，在导入的时候会有智能提示；如果本地仓库还没有的话，在刷新后maven会去指定的智能仓库进行下载到本地仓库中。

也可以按`alt+insert`快捷键打开仓库列表搜索想要依赖的指定包。

### 依赖范围

通过设置坐标的依赖范围<scope>标签，可以设置对应jar包的作用范围包括编译环境、测试环境、运行环境。常见的依赖范围关键词有compile、test、provided、runtime、system等。下图展示了不同关键字的依赖范围：

![image-20211113175050049](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211113175050049.png)

### 依赖传递

maven在导入依赖时，会将该依赖jar包所依赖的jar包一并导入。比如我们项目中引入junit后，在解析我的项目时，不仅会有junit，也会有junit依赖的jar包。可以使用`mvn dependency:tree`查看依赖关系。

![image-20211129102519811](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211129102519811.png)

