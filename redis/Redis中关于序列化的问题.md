## Redis中关于序列化的问题

由于**redis中存储的key和value只能是字符串的形式**，但是实际应用场景中，常常需要redis存储一些对象的数据。如果直接调用java客户端的API，会报错。

```
DefaultSerializer requires a Serializable payload but received an object of type 
```

这个错误原因就是对象没有序列化。

序列化(Serializable)就是将实例化的对象转换为字符串的一种技术。

![image-20230225115720080](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20230225115720080.png)

序列化的方式也有很多，不同的序列化方式支持的可序列化的数据类型不同，序列化的结果也不一样。常见的序列化方式有：JdkSerializationRedisSerializer、GenericJackson2JsonRedisSerializer。

|                                                              | 序列化方式                                    |                                                              |
| ------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------ |
| redisTemplate.opsForValue().<br />set("user:004","lucheng"); | JdkSerializationRedisSerializer               | key:\xAC\xED\x00\x05t\x00user:004<br />value:\xAC\xED\x00\x05t\x00 lucheng |
| redisTemplate.opsForValue().<br />set("user:002",new User(25,"Lucheng")); | KEY:String序列化 <br /><br />Value:Json序列化 | key:user:002<br />value:{  <br />"@class": "com.example.dao.User",  "age": 25,  "name": "Lucheng"<br />} |

上述序列化方法的优点和缺点：

优点：可以将各种数据类型的对象简单方便的写入到redis中，读取时也可以通过反序列化自动转换成对应的数据对象进行读取。

缺点：jdk序列化方式后的字符串多了很多字符，和一开始设置的key和value相差比较大，且导致内存开销大。

## Spring中配置redis序列化

导入maven依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <version>2.2.5.RELEASE</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.14.1</version>
</dependency>
```
配置RedisTemplate：

```java
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        //创建Template
        RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();
        //设置连接工厂
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        //设置序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();

        //key和hashKey采用String序列化
        redisTemplate.setKeySerializer(RedisSerializer.string());
        redisTemplate.setHashKeySerializer(RedisSerializer.string());

        //value和hashValue采用JSON序列化
        redisTemplate.setValueSerializer(jsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jsonRedisSerializer);
        return redisTemplate;

    }
}
```

## StringRedisTemplate类

Spring中提供了一个封装好的key和value都采用String序列化的类，不过使用这个类，需要在写入读取对象时自动的进行序列化和反序列化。

![image-20230225120614103](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20230225120614103.png)

```java
public class StringRedisTemplateDemo {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    public static final ObjectMapper objectMapper = new ObjectMapper();
    @Test
    public void demo1() throws JsonProcessingException {
        User user = new User(20, "陆诚");
        //将对象手动序列化
        String value = objectMapper.writeValueAsString(user);
        stringRedisTemplate.opsForValue().set("user:004",value);

        String s = stringRedisTemplate.opsForValue().get("user:004");
        //将字符串手动反序列化
        User user1 = objectMapper.readValue(s, User.class);
        System.out.println(user1);
    }
}
```