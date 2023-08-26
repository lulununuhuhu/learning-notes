package ProxyMode.StaicProxy;

/**
 * 静态代理模式角色3： proxy 代理对象  客户端和真实主题之间的中间层，该代理类持有一个对真实主题的引用。
 * 代理对象在访问真实主题的前后可以执行一些额外的逻辑，以提供附加的功能
 */
public class Proxy implements Subject{


    // 主题对象
    private Subject subject;

    /**
     * 对具体真实主题的引用
     * @param subject
     */
    public Proxy(Subject subject) {
        this.subject = subject;
    }

    public void method() {
        System.out.println("这是执行代理前的一些操作");
        //调用真实主题
        subject.method();
        System.out.println("这是执行代理后的一些操作");
    }
}
