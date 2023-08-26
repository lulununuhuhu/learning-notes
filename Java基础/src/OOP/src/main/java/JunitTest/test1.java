package JunitTest;

import org.junit.Test;

import java.util.Scanner;

/**
 * JUnit单元测试的使用
 */
public class test1 {

//    public test1(int age){
//        System.out.println(age);
//    }    单元测试类只能有一个无参构造器

    @Test
    public void test1(){
        System.out.println("hello world");
    }

    //单元测试方法默认都是public、void返回类型、空参的
    @Test
    public void test(){
        Scanner scanner = new Scanner(System.in);
        int nextInt = scanner.nextInt();
        System.out.println(nextInt);
    }
}
