## SpringBoot整合redis

Sprintboot为简化操作redis，封装了一个RedisTemplate类。

### 导入springBoot的redis依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <version>2.2.5.RELEASE</version>
</dependency>
```

### 在yaml配置文件中配置redis相关参数

```yaml
spring:
  redis:
    database: 0
    host: localhost
    port: 6379
    jedis:
      pool:
        max-active: 8
        max-wait: 1ms
        max-idle: 4
        min-idle: 0

```

### 导入redis配置类对象，设置序列化器

在没有设置反序列化之前，设置的key和value都会在序列化后再存入redis。

如:

```java
redisTemplate.opsForValue().set("age","18");
```

实际存入redis的key的值是:

![image-20230205232618577](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20230205232618577.png)

```java
@Configuration
public class RedisConfig {

    @Bean
    @SuppressWarnings(value = { "unchecked", "rawtypes" })
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory)
    {
        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();

        //默认的Key序列化器为：JdkSerializationRedisSerializer
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        redisTemplate.setConnectionFactory(connectionFactory);

        return redisTemplate;
    }
}
```

### 实例化RedisTemplate类进行redis操作

首先，自动注入RedisTemplate类对象。

```java
@Autowired
private RedisTemplate redisTemplate;
```

#### 操作String类型

```java
@Test
public void testString(){
    redisTemplate.opsForValue().set("age","18");
    System.out.println("成功");
}
```

#### 操作Hash类型的value

```java
    @Test
    public void testHash(){
        HashOperations hashOperations = redisTemplate.opsForHash();
//        对key为hash1的value进行赋值
        hashOperations.put("hash1","1","lucheng");
        hashOperations.put("hash1","2","wangfang");
        hashOperations.put("hash1","3","zhanglan");

//       取出所有值
        List values = hashOperations.values("hash1");
        values.forEach(System.out::println);
    }
```

#### 操作List类型的value

```java
@Test
public void testList(){
    ListOperations listOperations = redisTemplate.opsForList();
    //把list看成一个双向队列,可以从左进入/退出，也可从右进入/退出

    //赋值
    listOperations.rightPush("list1","a");
    listOperations.rightPush("list1","b");
    listOperations.leftPush("list1","c");
    listOperations.leftPushAll("list1","e","f","g");

    Long size = listOperations.size("list1");
    int intSize = size.intValue();
    //取值
    for (int i = 0; i < intSize; i++) {
        String element = (String) listOperations.leftPop("list1");
        System.out.print(element+" ");
    }
}
```

#### 操作无序集合set

```java
@Test
public void testSet(){
    //集合中添加元素
    SetOperations setOperations = redisTemplate.opsForSet();
    setOperations.add("set1","a","v","a","a","b");
    Long size = setOperations.size("set1");
    int intValue = size.intValue();

    //集合中删除元素
    setOperations.remove("set1","b");

    //获取集合中的所有元素
    Set<String> set = setOperations.members("set1");

    set.forEach(System.out::println);
}
```

#### 操作有序集合zset

```java
@Test
public void testZset(){
    ZSetOperations zSetOperations = redisTemplate.opsForZSet();
    zSetOperations.add("zset1","5",10.0);
    zSetOperations.add("zset1","6",11.0);
    zSetOperations.add("zset1","4",1.0);

    //获取集合
    Set<String> set = zSetOperations.range("zset1", 0, -1);
    set.forEach(System.out::println);

    zSetOperations.incrementScore("zset1","4",10.1);

    //在修改分数后重新获取集合
    Set<String> set2 = zSetOperations.range("zset1", 0, -1);
    set2.forEach(System.out::println);
}
```
