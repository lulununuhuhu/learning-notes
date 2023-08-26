package ChainOfResponsibility.IntroductoryCase;

/**
 * 具体处理对象2
 */
public class ConcreteHandler3 extends Handler {

    /**
     * 定义处理对象的姓名和下一个处理者
     *
     * @param name
     */
    public ConcreteHandler3(String name) {
        super(name);
    }

    public void handleRequest(int request) {
        if (request > 20) {
            System.out.println(name+"来处理");
        } else {
            System.out.println("交给下一个对象来处理");
            if(successor != null)
                successor.handleRequest(request);//让下一个对象去处理
        }
    }
}
