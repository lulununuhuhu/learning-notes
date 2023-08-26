### 意向锁

意向锁主要分为意向共享锁(IS)和意向排他锁(IX)。

#### 作用

意向锁是**表锁**，协调行锁和表锁的关系，支持多粒度的锁的共存。比如当事务A有行锁时，MySQL会自动为该表添加意向锁，事务B想申请表的写锁时，不需要遍历判断每一行是否有行锁，而只需要直接判断是否存在意向锁即可，大大提高了效率。

#### 意向锁的兼容互斥性

|             | 意向共享锁（IS） | 意向排他锁(IX) |
| ----------- | ---------------- | -------------- |
| 表共享锁(S) | 兼容             | 互斥           |
| 表排他锁(X) | 互斥             | 互斥           |

### 案例

```sql
-- 开启事务,对id为1的一条记录加独占锁(排他锁)
start transaction;
select * from users where id = 1 for update;
commit;
```

使用sql语句`select * from performance_schema.data_locks`查询相关锁的信息

![image-20230608153539643](E:/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/%E6%95%B0%E6%8D%AE%E5%BA%93/MySQL/img/image-20230608153539643.png)

此时对id为的1的记录加了独占锁，并在表上添加了意向独占锁。

当使用`lock tables users write`或者`lock tables user read`对表加读锁或写锁都会阻塞，因为意向独占锁与读锁写锁都互斥。

而意向共享锁和读锁兼容，和写锁互斥，所以当使用`select * from users where id = 2 lock in share mode`加读锁是，可以加表读锁，但不能加表写锁。

## 行锁

### 记录锁（record lock）

开启记录锁的方式：

```sql
SELECT * FROM Orders WHERE OrderId = 1 FOR UPDATE  # 开启排他锁
```

记录锁有两种类型：共享锁（S锁）和排他锁（X锁）。开启共享锁的话，其他事务也可以进行查询操作，但阻止任何事务进行写操作（包括事务自身）。开启排他锁的话，其他事务不能读取也不能写入被锁定的数据。

### 间隙锁（gap lock）

间隙锁的锁定范围是锁定两个索引之间的间隙，这样可以防止新的记录插入到该间隙中，**解决幻读问题**，确保数据的一致性和事务的隔离性。

### 临键锁（next-key-lock）

临键锁等于记录锁+间隙锁。除了锁住自身记录外，还会锁住到下一个记录之间的区间，这个区间是左开右闭的。临键锁只与非唯一索引列有关，在唯一索引列（包括主键列）上不存在临键锁。

https://gitee.com/oauth/authorize?response_type=code&client_id=bb2ac25afeeece5ca8269d9422c427cc31b59911c79148995960d34069d5489f&scope=user_info&redirect_uri=http://127.0.0.1:7777/oauth/giteeLogin