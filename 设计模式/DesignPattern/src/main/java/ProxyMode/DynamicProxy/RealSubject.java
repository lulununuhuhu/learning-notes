package ProxyMode.DynamicProxy;

public class RealSubject implements Subject{
    private String name;

    public RealSubject(String name) {
        this.name = name;
    }

    public void methodA() {
        System.out.println(name+":执行具体代理业务1...");
    }

    public String methodB() {
        System.out.println(name+":执行具体代理业务1...");
        return "执行业务2完成";
    }
}
