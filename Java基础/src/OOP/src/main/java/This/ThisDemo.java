package This;

/**
 * this关键字的使用
 */
public class ThisDemo {
    private int age;
    private String name;

    public ThisDemo() {
        System.out.println("调用了空参构造器1");
    }

    public ThisDemo(int age){
        this();
        System.out.println("调用了构造器2");
        this.age = age;
    }

    public ThisDemo(int age, String name) {
        this(age);
        this.name = name;
        System.out.println("调用了构造器3");
    }

    public static void main(String[] args) {
        ThisDemo instance = new ThisDemo(20, "lucheng");
    }
}
