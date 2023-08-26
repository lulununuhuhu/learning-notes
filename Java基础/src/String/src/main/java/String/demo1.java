package String;

import java.util.*;

/**
 * 展示字符串拼接的不同类型
 * 拼接类型
 *      1. 常量+常量  返回拼接字符串在字符串常量池中的地址
 *      2. 变量+变量   拼接类型中其中有一个变量，那就会使用StringBuilder中的toString方法，在堆中新建一个对象
 */
public class demo1 {
    public static void main(String[] args) {
        Map<String,Integer> map = new HashMap<>();
        map.put("lucheng",123);
        List<Integer>  list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            list.add(5);
        }
        list.add(6);
        String s1 = "coder";
        String s2 = "coder";
        String s3 = "coder"+s2;
        String s4 = "coder"+"coder";
        String s5 = s1+s2;//变量+变量
        System.out.println(s3 == s4);//false
        System.out.println(s3 == s5);//false
        System.out.println(s4 == "codercoder");//true
    }
}
