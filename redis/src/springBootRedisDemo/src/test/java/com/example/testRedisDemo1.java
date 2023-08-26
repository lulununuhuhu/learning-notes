package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.connection.DataType;
import org.springframework.data.redis.core.*;

import java.util.List;
import java.util.Set;

@SpringBootTest
public class testRedisDemo1 {

    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    public void testString(){
        redisTemplate.opsForValue().set("age","18");
        System.out.println("成功");
    }

    /**
     * 操作Hash类型的value
     */
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

    /**
     * 测试List类型的value
     */
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

    /**
     * 测试有序集合
     */
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

    /**
     * 测试redis中的一些针对key的通用命令
     * 对应如：查询所有key  判断某个key是否存在  删除某个key
     */
    @Test
    public void commonOperation(){

        //获取所有key 相当于keys *
        Set keys = redisTemplate.keys("*");
        keys.forEach(System.out::println);

        //判断某个key是否存在 相当于 EXISTS key
        Boolean isExist = redisTemplate.hasKey("haha");

        //删除某个key  DEL key
        redisTemplate.delete("hash1");
        redisTemplate.delete("set1");
        redisTemplate.delete("zset1");

        //获取某个key对应的value类型 type myset2
        DataType type = redisTemplate.type("myset2");
        System.out.println(type.name());
    }
}
