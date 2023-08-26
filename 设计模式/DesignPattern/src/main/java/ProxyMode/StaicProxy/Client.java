package ProxyMode.StaicProxy;

public class Client {
    public static void main(String[] args) {
        Subject subject = new RealSubject();
        Proxy proxy = new Proxy(subject);//代理对象
        proxy.method();//指定代理对象执行具体逻辑
    }
}
