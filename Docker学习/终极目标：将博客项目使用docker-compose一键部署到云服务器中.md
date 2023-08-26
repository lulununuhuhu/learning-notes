## 终极目标：将博客项目使用docker-compose一键部署到云服务器中（只有ip地址的情况）

### 打包前端项目

完成了。将npm手动修改为作者指定的版本，然后下载了yarn，用yarn成功安装了依赖并打包成功，

前台和后台项目分别生成两个dist目录

## 打包后端项目

使用maven 的clean先清除target目录，然后使用maven 的package命令进行打包