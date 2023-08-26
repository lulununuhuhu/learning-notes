## Linux 安装常见软件

### 安装linux宝塔面板

本次安装是**基于centOs7版本**的安装宝塔面板7.x版本，不同的发行版本的安装命令不同，具体可参考[宝塔Linux面板安装教程 - 2023年2月2日更新 - 7.9.8正式版 - Linux面板 - 宝塔面板论坛 (bt.cn)](https://www.bt.cn/bbs/thread-19376-1-1.html)

1. 使用以下命令安装宝塔面板

   ```shell
   yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh 12f2c1d72
   ```

安装成功后，会出现如下提示：

![image-20230216173558492](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20230216173558492.png)

会生成宝塔面板的登录地址，并提供一个初始的用户名和账户

2. 放行端口

   根据黄色字体提示，去云服务器管理页面中找到防火墙配置，放行21314号端口。

3. 修改宝塔面板的账号和密码

   由于一开始登录面板的账号和密码是系统给的一个随机值，不容易记忆。可以进行修改，换成自己熟悉的账号和密码。

   ![image-20230216184020166](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20230216184020166.png)