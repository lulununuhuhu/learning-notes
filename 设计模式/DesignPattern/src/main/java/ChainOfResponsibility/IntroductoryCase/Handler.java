package ChainOfResponsibility.IntroductoryCase;

/**
 * 定义一个抽象类Handler：用来处理请求
 * 设置属性  successor
 * 定义抽象方法  requestHandler()
 */
public abstract class Handler {

    protected Handler successor;//责任链上的下一个对象

    protected String name;//定义责任链对象的名字

    public Handler(String name) {
        this.name = name;
    }

    public void setSuccessor(Handler successor){
        this.successor = successor;
    }

    public abstract void handleRequest(int request);
}
