package com.example.dao;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class User {

    //姓
    @JsonProperty(value = "saad",required = true)
    private String xing;

    //名
    private String ming;

    @JsonCreator
    public User(@JsonProperty("name")String name) {
        String[] split = name.split("-");
//        xing = split[0];
        ming = split[1];
    }
}
