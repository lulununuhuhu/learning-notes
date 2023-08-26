package com.example.controller;

import com.example.dao.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {


    @PostMapping("/getInfo")
    public User getUserInfo(@RequestBody User user){
        System.out.println(user);
        return user;
    }
}
