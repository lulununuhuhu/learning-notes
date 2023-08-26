首先明确一下目标：使用docker**自定义**一个nginx镜像，该镜像是基于nginx作为静态页面服务器，将两个前端项目部署到云服务器的两个端口81和82。

基本步骤如下：

1. 先将前端项目进行打包，取出其中的dist文件夹存放指定的目录中。我们这里分别命名为admin和blog，存放在当前文件夹下

2. 编写Dockerfile自定义镜像

   首先我们考虑下，如果使用docker原生命令的话我们会怎么写。

   我们定义镜像名称为：my-nginx。由于需要两个端口要访问，所以这个nginx镜像需要暴露两个端口，这里我们设置为81和82端口。

   nginx原生镜像中的设置文件nginx.conf是将前端请求映射到默认的html目录下的一个index页面，这里我们需要修改。分别将81端口映射到blog目录下，82端口映射到admin目录下。所以我们的配置文件应该这么写：

   ```c
   # 第一个项目
   server{
       listen 81;
       server_name 47.96.16.56;
   
       location / {
           root /blog;
           index index.html;
       }
   }
   
   # 第二个项目
   server{
       listen 82;
       server_name 47.96.16.56;
   
       location / {
           root /admin;
           index index.html;
       }
   }
   ```

   这样的话就可以把该配置文件挂载到nginx镜像中，在容器初始化时配置文件会以我们写的为准。

   这是我们可以写出对应的docker命令了：

   ```dockerfile
   docker run --name nginx -p 81:81 -p 82:82 -v 配置文件路径名(建议写绝对路径):/etc/nginx/conf.d/default.conf -v blog文件夹绝对路径:/usr/share/nginx/html/blog -v admin文件夹绝对路径名:/usr/share/nginx/html/admin -d my-nginx
   ```

   很好，在我们写完docker命令后我们就可以按照这思路将该命令的内容转化为Dockerfile文件：

   ```dockerfile
   # 定于基础镜像nginx
   FROM nginx:latest
   
   # 将nginx.conf文件复制到容器中去
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   
   # 将blog和admin文件夹复制到容器中去
   COPY admin /usr/share/nginx/html/admin
   COPY blog /usr/share/nginx/html/blog
   
   # 声明该镜像端口
   EXPOSE 81 82
   
   # 指定容器启动时要启用的命令
   CMD ["nginx","-g","daemon off;"]
   
   
   ```

   然后就可以基于这个Dockerfile自定义出镜像了，使用命令`docker build -t 镜像名  .(当前目录下)`

3. 启动镜像

   `docker run --namne 镜像名 -p 81:81 -p 82:82 -d 容器名`

4. 访问服务器ip地址+端口号，判断是否部署成功



最终一个完整的自定义镜像是由如下文件创建而成.

![image-20230717205421010](..\img\image-20230717205421010.png)

