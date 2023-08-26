package com.example;

import com.example.dao.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * 在非序列化配置的情况下写入键值对
 */
@SpringBootTest
public class testRedisDemo2 {

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * key使用String序列化,value使用JSON序列化
     */
    @Test
    public void testInstance1(){
        redisTemplate.opsForValue().set("user:002",new User(25,"Lucheng"));
//        redisTemplate.opsForValue().set("user","hahaha");//在没有自定义序列化器的情况下，会默认使用JdkSerializationRedisSerializer序列化器
        User user = (User) redisTemplate.opsForValue().get("user2:002");
        System.out.println("user2 = "+ user);
    }
    @Test
    public void testInstance2(){
        redisTemplate.opsForValue().set("user:003","lucheng");
        String str = (String) redisTemplate.opsForValue().get("user:003");
        System.out.println("user:003 = "+str);
    }

    /**
     * key和value都使用默认的jdk序列化器
     */
    @Test
    public void testInstance3(){
        redisTemplate.opsForValue().set("user:004","lucheng");
        String str = (String) redisTemplate.opsForValue().get("user:004");
        System.out.println("user:004 = "+str);
    }
}
