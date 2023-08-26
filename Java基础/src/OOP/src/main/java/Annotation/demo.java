package Annotation;

//@demo1  该注解不能申明在类上
public class demo {
    @demo1  //该注解可以申明在属性上
    private int age;

    @demo1
    public demo(int age) {
        this.age = age;
    }

    @demo1 //该注解可以申明在方法上
    public void show(){
        System.out.println("hello world");
    }
}
