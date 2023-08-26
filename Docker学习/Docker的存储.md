## Docker的存储

docker容器可以保证代码和数据隔离。将数据保留在宿主机上，不用存储在容器中，可以让容器不会随着数据变多而体积增大。同时下次加载容器是，可以将宿主机的数据快速**挂载**到容器中，可以快速的恢复。

Docker提供了三种存储选项。

1. volume卷

   卷volume是存储在宿主机文件系统的一块**专有存储区域**，只有docker进程能对这一块区域进行修改。是推荐的一种存储方式。

   数据卷的创建的基本语法是:

   ```shell
   docker volume [COMMAND]
   ```

   常见的有create、ls、inspect（查看数据卷的详细信息）、prune(删除未使用的volume)、rm（删除一个或多个volume）

   ```dockerfile
   # 查看ruoyi-data数据卷的详细信息
   docker volume inspect ruoyi-data
   ```

   ![image-20230715120934273](.\img\image-20230715120934273.png)

   ```dockerfile
   # 创建卷
   docker volume create my-volume
   
   # 将指定卷映射到容器中
   docker run --name mysql1 -b 卷名:/var/lib/mysql -d mysql:5.7 # 将卷名和mysql5.7版本的镜像创建的容器mysql1的/var/lib/mysql文件夹进行映射,如果卷名不存在，docker会自动帮助我们创建这个新卷
   ```

   

2. bind mount 绑定挂载

   绑定挂载就是将主机文件系统上目录或文件的数据挂载到容器中，但是主机上的非docker进程也可修改，容器中也可以修改

   ```nginx
   # mysql的配置文件和数据存储使用主机的目录。并将配置文件设置为只读(read-only)防止容器更改主机中的文件
   docker run --name some-mysql \
   -v /home/mysql/mysql.cnf:/etc/mysql/conf.d/mysql.cnf:ro\
   -v /home/mysql/data:/var/lib/mysql \
   -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0
   ```

3. 临时挂载

   tmpfs挂载仅存储在主机系统的内存中，不会写入主机的文件系统，生命周期和容器周期相同，容器停止数据将被删除