package ChainOfResponsibility.IntroductoryCase;

/**
 * 客户端测试类
 */
public class Client {
    public static void main(String[] args) {
        //实例化具体请求类
        ConcreteHandler1 handler1 = new ConcreteHandler1("处理对象1");
        ConcreteHandler2 handler2 = new ConcreteHandler2("处理对象2");
        ConcreteHandler3 handler3 = new ConcreteHandler3("处理对象3");

        //定义处理的顺序  处理对象1--->处理对象2--->处理对象3
        handler1.setSuccessor(handler2);handler2.setSuccessor(handler3);
        int request1 = 25;int request2 = 8;int request3 = 15;

        //将这三个请求依次进行处理
        handler1.handleRequest(request1);
        handler1.handleRequest(request2);
        handler1.handleRequest(request3);
    }
}
