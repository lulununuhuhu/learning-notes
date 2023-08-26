package 代码块;

public class Ancestor {
    private String country = "中国";
    private static String a = "haha";
    public Ancestor() {
        System.out.println("Ancestor类的空参构造方法");
    }

    static {
        System.out.println(a);
        System.out.println("执行Ancestor类的静态代码块");
    }
    {
        System.out.println("country = "+country);
        System.out.println("执行Demo类的非静态代码块");
    }
}
