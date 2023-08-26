Redis中有5种常用的数据类型String、Hash、List、Set、sorted set。

![image-20230203172551304](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20230203172551304.png)

### 字符串String

关于字符串的常见操作命令有:

* **SET** key value   设置指定key的值
* **GET** key       获取指定key的值
* **SETEX** key seconds value      设置指定key的值，并将key的过期时间
* **SETNX** key value 在不存在这个key的情况下，设置该key的值

### 哈希hash

Redis hash是一个field和value的映射表(field和value都是String类型)，hash特别适合用于存储对象

关于哈希的常见操作命令有：

* **HSET** key field value  将哈希表key种的字段field的值设为value
* **HGET** key field  获取存储在哈希表中指定字段field的值
* **HDEL** key field 删除存储在哈希表中的指定字段
* **HKEYS** key   获取哈希表中的所有字段
* **HVALS** key 获取哈希表中的所有值
* **HGETALL** key 获取在哈希表中指定key的所有字段和值

### 列表List

Redis list是一种有序列表的数据类型，按照插入顺序排序。

关于列表的常用操作命令有：

* **LPUSH** key value1[value2]          将一个或多个值插入到列表头部
* **LRANGE** key start stop    获取列表指定范围内的元素（元素索引从0开始，-1表示到列表结束）
* **RPOP** key    获取然后移除列表最后一个元素
* **LLEN** key    获取列表长度
* **BRPOP** key1[key2]  timeout    获取然后移除列表的最后一个元素，如果列表元素为空则会**一直阻塞**直到到timeout结束或者发现可弹出元素为止

### 集合set操作命令

Redis set是string类型的无序集合。集合成员是唯一、不重复的。

关于集合的常用命令：

* **SADD** key member1[member2]    向集合中添加一个或多个成员
* **SMEMBERS** key        返回集合中的所有成员
* **SCARD** key     返回集合的元素个数
* **SINTER** key1[key2]     返回两个集合的交集
* **SUNION** key1[key2]   返回两个集合的并集
* **SDIFF** key1[key2]  返回key1-key2的差集(key1有而key2没有)
* **SREM** key member[member...]  移除集合中的一个或多个成员

### 有序集合sorted set

Redis sorted set有序集合也是string类型元素的集合，和普通集合相比：

* 相同点是：元素唯一
* 不同点是：每个元素通过关联的**一个double类型的分数(score)**来进行从小到大的排序。有序集合的成员唯一，但是**分数可以重复**

常用命令有：

* **ZADD** key score1 member1[score2 member2]      向有序集合添加一个或多个成员，或者更新已存在成员的分数
* **ZRANGE** key start stop[withscores]  查询某个key在区间下的所有元素(-1表示元素末尾)
* **ZINCRBY** key increment member   为key的成员member的score加上增量increment
* **ZREM** key member[member ...]   删除某个key的对应元素



### 通用命令

* Keys pattern   查找所有符合给定模式的key
* EXISTS key 检查给定key是否存在
* TYPE key   返回key对应的值的类型
* TTL key   返回给定key的剩余生存时间，以秒为单位（-1表示永久存货）
* DEL key  删除对应key