## SQL语言简介

> SQL,全称Structure Query Language，结构化查询语言。是关系型数据库中进行操作的一门编程语言。

## SQL分类

SQL语言按照功能可以分为如下三大类：

* DDL（Data Definition Languages 数据定义语言），这些语句定义了不同的数据库、表、视图等数据库对象，还可以用来创建、删除、修改数据库和数据表的结构。主要的语句关键字包括`CREATE` 、`DROP`、`ALTER`等。
* DML(Data Manipulation Language 数据操作语言)，用于添加、删除、更新和查询数据库记录，并检查数据完整性。主要的语句关键字包括`INSERT`、`DELETE`、`UPDATE`、`SELECT`等。
* DCL(Data Control Language 数据操作语言)，用于定义数据库、表、字段、用户的访问权限和安全级别。主要的语句关键字包括`GRANT`、`REVOKE`、`COMMIT`、`ROLLBACK`、`SAVEPOINT`等。

> 注：由于select查询语句使用频率很高，所以很多人把查询语句单拎出来一类：DQL（数据查询语言）。
>
> 还有单独将COMMIT、ROLLBACK取出来称为TCL（Transaction Control Language,事务控制语言）。

## SQL语言的一些使用规范

Windows系统中对sql的变量关键字大小写不敏感，Linux对大小写敏感。在Linux环境下，数据库名、表名、表的别名、变量名是严格区分大小写的；而关键字、函数名、列名（或字段名）、列的别名是忽略大小写的。

这里有一个推荐的书写规范：

* 数据库名、表名、表别名、字段名、字段别名等都小写
* SQL关键字、函数名、绑定变量等都大写

## 导入现有的数据表、表的数据

方式一：source 文件的全路径名

​	例：source E:\BaiduNetdisk\BaiduNetdiskDownload\资料\atguigudb.sql

方式二：基于Navicat等具体化图形界面操作

选择所连接的数据库，右键运行SQL文件，然后找到SQL文件的路径。

## SELECT语句的使用

查询表中的某个字段

```sql
select 字段名1,字段名2 from 表名;
```

查询表中的所有字段

```sq
select * from 表名;
```

查询表中的某个字段并加入别名。类的别名可以使用一对`""`括起来，不要使用`''`

```sql
select 字段名1 [as] 别名1,字段名2 [as] 别名2 from 表名;
```

去重复行式的查询

```sql
select distinct 字段名 别名 from 表名;
```

显示表的结构（表中字段的详细信息）

```sql
DESCRIBE 表名;
```

### 使用where过滤数据

过滤关键词`where`，在from的后面。

例：

```sql
SELECT * FROM employees WHERE last_name = 'King';# 查找employees表中last_name为King的字段的所有信息
```

注：在MySQL中，对于筛选条件的数据不区分大小写，如上例总的条件变量写成`king`也可以匹配条件。这Oracle是严格区分大小写的。

### 常用运算符

1. `<=>`安全运算符

   	安全等于运算符(<=>)与等于运算符(=)的作用是相似的，唯一的区别就是<=>可以用来对NULL进行判断。在两个操作数均为NULL时，
   	其返回值为1，而不为NULL;当一个操作数为NULL时，其返回值为0，而不为NULL

	```sql
	# 通过使用安全等于运算符<=>可以筛选到commission_pct为null的字段
	SELECT first_name,last_name,salary,commission_pct
	FROM employees
	WHERE commission_pct <=> NULL;
	```

2. `IS NULL` `IS NOT NULL`

   ```sql
   # 查询表中commission_pct(不)为null的数据有哪些
   SELECT last_name,salary,commission_pct
   FROM employees 
   WHERE commission_pct IS (NOT) NULL;
   ```
   
3. `LEAST()` `GREATEST()`

	```sql
	# 找到比较参数中较短的值
	SELECT LEAST('g','b','t','m'),GREATEST('g','b','t','m')
	FROM DUAL;
	```

4. `BETWEEN`

   ```sql
   # BETWEEN 下界条件1 AND 上界条件2（查询条件1和条件2范围内的数据，包含边界）
   SELECT employee_id,last_name,salary
   FROM employees
   WHERE salary BETWEEN 6000 AND 8000;
   
   # 查询工资不在6000到8000的员工信息
   SELECT employee_id,last_name,salary
   FROM employees
   # WHERE salary < 6000 OR salary >8000;
   WHERE salary NOT BETWEEN 6000 AND 8000;
   ```

5. `IN(参数集合)` `NOT IN(参数集合)`

   ```sql
   # 查询部门为10，20，30的员工信息
   SELECT last_name,salary,department_id
   FROM employees
   WHERE department_id IN(10,20,30);
   #查询工资不是6000，7000，8000的员工信息
   SELECT last_name,salary,department_id
   FROM employees
   WHERE salary NOT IN (6000,7000,8000);
   ```

6. `LIKE`:模糊查询

   ```sql
   # %:表示任意多个字符
   # 查询last_name中包含字符'a'的员工信息(a的大小写和位置不要求)
   SELECT last_name
   FROM employees
   WHERE last_name LIKE '%a%';
   
   # 查询last_name中以字符'a'开头的员工信息
   SELECT last_name
   FROM employees
   WHERE last_name LIKE 'a%';
   
   #查询last_name中包含字符'a'且包含字符'e'的员工信息
   SELECT last_name
   FROM employees
   WHERE last_name LIKE '%a%' AND last_name LIKE '%e%';
   #WHERE last_name LIKE '%a%e%' OR last_name LIKE '%e%a%';
   
   #_:一个下划线代表一个不确定的字符
   # 查询last_name中第二个字符是'a'的员工信息
   SELECT last_name
   FROM employees
   WHERE last_name LIKE '_a%';
   
   # 查询第2个字符是_且第3个字符是'a'的员工信息
   # 需要使用转义字符: \
   SELECT last_name
   FROM employees
   WHERE last_name LIKE '_\_a%';
   ```

7. REGEXP运算符

   REGEXP运算符用来匹配字符串，语法格式为：`expr REGEXP 匹配条件`。如果expr满足匹配条件，返回1；如果不满足，则返回0.。若expr或匹配条件任意一个为NULL，则结果为NULL。

   REGEXP常用的有几下几种通配符”

   ```
   (1)'^'匹配以该字符后面的字符开头的字符串
   (2)'$'匹配以该字符前面的字符结尾的字符串
   (3)'.'匹配任何一个单字符
   (4) "[...]"匹配在方括号内的任何字符。例如,"[a,b,c]"匹配"a""b""c"。为了命名字符的范围，使用一个'-'。"[a-z]"匹配任何字母，而"[0-9]"匹配任何数字
   (5)'*'匹配零个或多个在它面前的字符。例如,'x*'匹配任何数量的'x'字符，"[0-9]*"匹配任何数量的数字，而"*"匹配任何数量的任何字符
   ```

   ```sql
   SELECT 'shkstart' REGEXP '^s','shkstart' REGEXP 't$','shkstart' REGEXP 'hk'
   FROM DUAL;
   ```

### 分页与排序

排序：`ORDERY BY`

```sql
# 按照salary从高到低的顺序显示员工信息
#ASC(ascend)  DESC(descend)
SELECT employee_id,last_name,salary
FROM employees
ORDER BY salary;#默认是升序

SELECT employee_id,last_name,salary
FROM employees
ORDER BY salary DESC;#降序排序
```

```sql
#可以使用列的别名，进行排序(但是where中不能使用)
SELECT employee_id,salary,salary*12 annual_salary
FROM employees
ORDER BY annual_salary DESC;
```

```sql
# where放在from之后,order by之前
SELECT department_id,last_name,salary
FROM employees
WHERE department_id IN(50,60,70)
ORDER BY department_id DESC;
```

```sql
#二级排序 
#先按照department_id的降序排列，salary的升序排列
SELECT employee_id,salary,department_id
FROM employees
ORDER BY department_id DESC,salary ASC;
```

分页：`LIMIT`

语法：`LIMIT 偏移量(缺省值0),分页显示数据量`

```sql
SELECT employee_id,last_name
FROM employees
LIMIT 0,20;#偏移量0 显示数据量20个
```

```sql
#WHERE ... ORDER BY ...LIMIT 声明顺序如下:
SELECT employee_id,last_name,salary
FROM employees
WHERE salary > 6000
ORDER BY salary DESC
LIMIT 10;
```

```sql
# 表里有107条数，我们只想要显示第32、33条数据
SELECT employee_id,last_name
FROM employees
LIMIT 3,2;
```

### 多表查询

#### 笛卡尔积（或交叉连接）的理解

笛卡尔乘积是一个数学计算。假如我有两个集合X和Y。那么（x，y）{x属于X，y属于Y}的所有组合个数就是X集合个数*Y集合个数。

![image-20220327173858583](https://gitee.com/lulununuhuhu/img/raw/master/img/202203271738733.png)

例：

```sql
# （多表查询的错误实现方法）笛卡尔积错误
SELECT employee_id,department_name
FROM employees,departments; # 查询出2862条记录106(employees的字段数)*27(departments的字段数)
```

```sql
# 多表查询的正确实现方式
SELECT last_name,department_name
FROM employees,departments
# 两个表的连接条件
WHERE employees.department_id = departments.department_id;
```

```sql
# 如果查询语句中出现了多个表中都存在的字段，则必须指明此字段所在的表
SELECT employees.last_name,departments.department_name,employees.department_id
FROM employees,departments
WHERE employees.department_id = departments.department_id;
```

```sql
# 对上述sql多表查询语句进行sql优化
SELECT emp.last_name,dep.department_name,emp.department_id
FROM employees emp,departments dep # 对表起别名，可以简化多表查询时对不同表别名的前缀修饰
WHERE emp.department_id = dep.department_id;
```

```sql
# 查询员工的employee_id,last_name,department_name,city
SELECT emp.employee_id,emp.last_name,dep.department_name,loc.city
FROM employees emp,departments dep,locations loc
WHERE emp.department_id = dep.department_id
AND dep.location_id = loc.location_id;
```

> 总结：如果有n个表完成多表查询，则至少要n-1个查询条件。

#### 内连接和外连接

##### 内连接：

>  合并具有同一列的两个以上的表的行，结果集中只包含一个表与另一个表匹配的结果。

![image-20220328105212902](https://gitee.com/lulununuhuhu/img/raw/master/img/202203281052156.png)

```sql
# SQL92语法实现内连接
SELECT last_name,department_name
FROM employees e,departments d
WHERE e.department_id = d.department_id;
```

```sql
# SQL99语法实现内连接
SELECT last_name,department_name
FROM employees e INNER JOIN departments d
ON e.department_id = d.department_id;
```

##### 外连接：

>  合并具有同一列的两个以上的表的行，结果集中除了包含一个表与另一个表匹配的行之外，还查询到了左表或者右表中不匹配的行,从而可以分成左外连接和右外连接、满外连接。

###### 左外连接

![image-20220328105923619](https://gitee.com/lulununuhuhu/img/raw/master/img/202203281059834.png)

```sql
SELECT last_name,department_name
FROM employees e LEFT OUTER JOIN departments d
ON e.department_id = d.department_id;
```

###### 右外连接

![image-20220328105939213](https://gitee.com/lulununuhuhu/img/raw/master/img/202203281059404.png)

```sql
SELECT last_name,department_name
FROM employees e RIGHT OUTER JOIN departments d
ON e.department_id = d.department_id;
```

###### 满外连接

![image-20220328110022516](https://gitee.com/lulununuhuhu/img/raw/master/img/202203281100704.png)

```sql
#满外连接(MYSQL不支持满外连接)
SELECT last_name,department_name
FROM employees e FULL OUTER JOIN departments d
ON e.department_id = d.department_id;
```

#### 自连接和非自连接

##### 自连接

> 多表查询的表是同一张表，自我引用。

```sql
# 查询员工id，员工姓名及其管理者的id和姓名(employees表中的manager_id = employees表的employee_id)
SELECT e.employee_id,e.last_name,m.manager_id,m.last_name
FROM employees e, employees m
WHERE e.manager_id = m.employee_id;
```

#### 等值连接和非等值连接

##### 非等值连接

> 一个表中的字段和另一个表的一个或多个字段进行非等值的比较。

```sql
# 根据job_grades表和employees表中的salary字段获取员工的salary_grades
SELECT e.last_name,e.salary,j.grade_level
FROM job_grades j,employees e
WHERE e.salary BETWEEN j.lowest_sal AND j.highest_sal;
```



