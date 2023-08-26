## MySQL字段类型

### 整数类型

### 浮点类型

整数类型和浮点类型主要参考尚硅谷课件的讲解，这里不再写笔记。

### 定点数类型

> Decimal，定点数，是MySQL中唯一一种定点数类型。使用Decimal(M,D)定义字段类型，其中M是总宽度，D是小数点后位数。其中0=<M<=65,0=<D<=30。存储空间为M+2个字节，所以存储空间由M决定。
>
> 例：Decimal(5,2):表示该列的取值范围是：-999.99~999.99。

Decimal与浮点数的比较：

1. Decimal和浮点数在同字节的情况下，浮点数表示的数的范围更大一点
2. Decimal适合**对数据精度要求很高**的情况下，如银行金额交易等场景；而浮点数适合对数据允许有部分偏差的情况

### 位类型

> BIT类型中存储的是二进制值

| 二进制字符串类型 | 长度 | 长度范围 | 占用空间           |
| ---------------- | ---- | -------- | ------------------ |
| BIT(M)           | M    | 1<=M<=64 | 约为(M+7)//8个字节 |

```sql
CREATE TABLE test_bit1(
f1 BIT, # 没有标字段就默认是一位
f2 BIT(5), 
f3 BIT(64) );
```

### 日期类型

MySQL有多种表示日期和时间的数据类型，不同的版本可能有所差异。MySQL8.0中的日期和时间类型主要有：YEAR类型、TIME类型、DATE类型、DATETIME类型和TIMESTAMP类型。

* YEAR类型通常用来表示年
* DATE类型通常用来表示年、月、日
* TIME类型通常用来表示时、分、秒
* DATETIME类型通常用来表示年、月、日、时、分、秒
* TIMESTAMP类型通常用来表示带时区的年、月、日、时、分、秒

![image-20220409194212514](https://gitee.com/lulununuhuhu/img/raw/master/img/202204091942679.png)

### 文本字符串类型

MySQL中，文本字符串总体上分为`CHAR` `VARCHAR` `TINYTEXT` `TEXT` `MEDIUMTEXT` `LONGTEXT` `ENUM` `SET` 等类型。

![image-20220409195759219](https://gitee.com/lulununuhuhu/img/raw/master/img/202204091957299.png)

#### CHAR与VARCHAR类型

![image-20220409200010650](https://gitee.com/lulununuhuhu/img/raw/master/img/202204092000770.png)

>  CHAR没有在括号中声明长度时，默认长度是1。



#### TEXT类型

在MySQL中，TEXT用来保存文本类型的字符串，总共包含4中类型，分别为`TINYTEXT` `TEXT` `MEDIUMTEXT`  `LONGTEXT`类型。

不同的TEXT类型保存的数据长度和占用的存储空间不同。如下：

![image-20220409201337097](https://gitee.com/lulununuhuhu/img/raw/master/img/202204092013160.png)

**由于实际存储的长度不确定，MySQL不允许TEXT类型的字段做主键。**这时一般用CHAR(M)或者VARCHAR(M)来代替。

### 枚举类型

> ENUM类型也叫作枚举类型，ENUM类型的取值范围需要在定义字段时进行指定。设置字段值时，ENUM类型只允许从成员中选取单个值，不能一次选取多个值。其所需要的存储空间由定义ENUM类型时指定的成员个数决定。

```sql
# ENUM类型
CREATE TABLE IF NOT EXISTS test_enum(
	season ENUM('春','夏','秋','冬') # ENUM类型字段，枚举值有四个。插入该字段数据时只能从这四个中选择(直接赋值选择也可以使用索引选择)
);
INSERT INTO test_enum
VALUES ('春');#赋值选择

INSERT INTO test_enum
VALUES(2),(3);#索引选择

INSERT INTO test_enum
VALUES ('不知大');# Data truncated for column 'season' at row 1
```

### SET类型

> SET类型在存储数据时成员个数越多，其占用的存储空间越大。注意：SET类型在选取成员时，可以一次
>
> 选择多个成员，这一点与ENUM类型不同。

```sql
CREATE TABLE test_set( 
    s SET ('A', 'B', 'C') 
);
INSERT INTO test_set (s) 
VALUES ('A'), ('A,B'); 
#插入重复的SET类型成员时，MySQL会自动删除重复的成员 
INSERT INTO test_set (s) VALUES ('A,B,C,A');
#向SET类型的字段插入SET成员中不存在的值时，MySQL会抛出错误。 
INSERT INTO test_set (s) VALUES ('A,B,C,D');
```

### 二进制字符串类型

BLOB是一个 二进制大对象 ，可以容纳可变数量的数据。

MySQL中的BLOB类型包括TINYBLOB、BLOB、MEDIUMBLOB和LONGBLOB 4种类型，它们可容纳值的最大

长度不同。可以存储一个二进制的大对象，比如 图片 、 音频 和 视频 等。

需要注意的是，在实际工作中，往往不会在MySQL数据库中使用BLOB类型存储大对象数据，通常会将图

片、音频和视频文件存储到 服务器的磁盘上 ，并将图片、音频和视频的访问路径存储到MySQL中。

### JSON类型

在MySQL 5.7中，就已经支持JSON数据类型。在MySQL 8.x版本中，JSON类型提供了可以进行自动验证的

JSON文档和优化的存储结构，使得在MySQL中存储和读取JSON类型的数据更加方便和高效。 创建数据

表，表中包含一个JSON类型的字段 js 。

```sql
#向表中插入json类型数据
INSERT INTO test_json (js) 
VALUES ('{"name":"songhk", "age":18, "address":{"province":"beijing", "city":"beijing"}}');

#读取json数据中某个键的值
SELECT js -> '$.name' AS NAME,js -> '$.age' AS age ,js -> '$.address.province' AS province, js -> '$.address.city' AS city
-> FROM test_json;
```

