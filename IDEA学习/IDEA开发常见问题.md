## 中文乱码

### 乱码原因

>文件自身的编码方式和打开文件读取内容的编码方式不一致

所以对应到IDEA控制台输出出现中文乱码的原因就是：

> 文件自身编码是UTF-8，控制台编码方式是GBK。

### 解决方案

1. 修改IDEA控制台的编码方式为UTF-8

   jvm 启动参数 `VM options` 加个配置 `-Dfile.encoding=UTF-8`

2. 直接使用 IDEA 控制台显示的 GBK 编码, 把 tomcat, jvm 输出的日志编码有中文的文件全部改为 GBK编码

   jvm 启动参数 `VM options` 加个配置 `-Dfile.encoding=GBK`

   一般情况下，控制台编码方式是以你的系统编码方式为准，在中国系统默认编码方式是GBK。

### 乱码场景

1. properties文件的中文乱码	：思路就是在settings中的file encoding中将编码方式统统改为UTF-8

   解决方案：[(56条消息) IDEA：*.properties文件中文乱码解决方案_仰望星空的尘埃的博客-CSDN博客](https://blog.csdn.net/u010285974/article/details/107102644)

