package BuilderMode.Builder;

/**
 * 具体的构建类
 */
public class ConcreteBuilder extends Builder{
    @Override
    public void buildPart1() {
        System.out.println("建造部分1");
    }

    @Override
    public void buildPart2() {
        System.out.println("建造部分2");
    }

    @Override
    public void buildPart3() {
        System.out.println("建造部分3");
    }

    @Override
    public void getResult(){
        System.out.println("获取构建结果");
    }
}
