package Wrapper;

import org.junit.Test;

/**
 * 包装类转化成基本数据类型
 */
public class WrapperDemo2 {

    @Test
    public void test1(){
        //调用包装类中的xxValue方法
        Integer integer = new Integer(5);
        int i = integer.intValue();
        System.out.println(i);
        Float aFloat = new Float(5.6);
        float floatValue = aFloat.floatValue();
        System.out.println(floatValue);
    }

    @Test
    public void test2(){
        //采用jdk5之后的新特性：自动拆箱
        Double aDouble = new Double(5.66);
        System.out.println(aDouble);
    }
}
