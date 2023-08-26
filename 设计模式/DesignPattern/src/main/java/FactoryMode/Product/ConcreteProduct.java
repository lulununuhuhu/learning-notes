package FactoryMode.Product;

public class ConcreteProduct extends Product{
    public ConcreteProduct(String name) {
        super(name);
    }

    @Override
    public void use() {
        System.out.println("使用产品:"+this.getName());
    }
}
