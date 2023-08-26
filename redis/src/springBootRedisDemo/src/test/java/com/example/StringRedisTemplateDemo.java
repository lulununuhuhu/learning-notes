package com.example;

import com.example.dao.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;

/**
 * 这是一个使用StringRedisTemplate的demo
 * StringRedisTemplate：key和value都采用String序列化
 */

@SpringBootTest
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
