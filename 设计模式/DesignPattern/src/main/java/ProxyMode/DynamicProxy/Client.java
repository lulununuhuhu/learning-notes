package ProxyMode.DynamicProxy;

public class Client {
    public static void main(String[] args) {
        RealSubject realSubject = new RealSubject("陆诚");
        //创建一个代理对象，参数即是需要代理的对象
        Subject proxyInstance = ProxyUtil.createProxy(realSubject);
        proxyInstance.methodA();//调用代理对象执行实际对象的业务A
        String res = proxyInstance.methodB();//调用代理对象执行实际对象的业务B
        System.out.println(res);
        String s = proxyInstance.toString();
        System.out.println(s);
    }
}
