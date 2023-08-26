package Wrapper;

import org.junit.Test;

/**
 * 包装类型和String类型之间的互相转化
 */
public class WrapperDemo3 {

    /**
     * 包装类转化成String类型：调用String的静态方法valueOf()
     */
    @Test
    public void testWrapperToString(){
        int i = 5;
        Integer integer = new Integer(i);
        String s = String.valueOf(integer);
        System.out.println(s);

        boolean flag = false;
        Boolean aBoolean = new Boolean(flag);
        String s1 = String.valueOf(aBoolean);
        System.out.println(s1);
    }

    /**
     * String类型转化成包装类,调用包装类的parseXXX()静态方法
     */
    @Test
    public void testStringToWrapper(){
        String a = "falses";
        Boolean b = Boolean.parseBoolean(a);
        System.out.println(b);
    }
}
