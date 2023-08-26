package 代码块;

/**
 * 该demo中展示了类中成员的初始化顺序
 */

/**
 * 经过实践可以的类中成员的初始化顺序为：父类静态代码块--->子类静态代码块--->父类成员初始化-->父类非静态代码块--->父类构造器--->子类成员初始化--->子类非静态代码块--->子类构造器
 *
 */
public class Demo extends Ancestor{
    private int age = 5;
    private String name = "lucheng";

    private static String b = "hahha";

    public Demo() {
        System.out.println("demo类空参构造方法");
    }

    //静态代码块
    static {
        System.out.println("执行demo类的静态代码块");
    }

    //非静态代码块
    {
        System.out.println("age = "+age+", name = "+name);
        System.out.println("执行Demo类的非静态代码块");
    }

    public static void main(String[] args) {
        Demo demo = new Demo();
    }
}
