package Wrapper;

import org.junit.Test;

/**
 * 包装类的两种定义方法：
 */
public class WrapperDemo1 {

    @Test
    public void test(){
        //使用构造器定义
        int i = 10;
        Integer integer = new Integer(i);
        System.out.println(integer);
    }
    
    @Test
    public void testWrapper(){
        //使用jdk5之后的新特性：自动装箱
        Integer integer = 5;
        System.out.println(integer);
    }
}
