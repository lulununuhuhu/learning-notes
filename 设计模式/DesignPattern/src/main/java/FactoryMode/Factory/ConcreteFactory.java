package FactoryMode.Factory;

import FactoryMode.Product.ConcreteProduct;
import FactoryMode.Product.Product;

public class ConcreteFactory extends Factory{
    public ConcreteFactory(String name) {
        super(name);
    }

    @Override
    protected Product createProduct(String productName) {
        System.out.println("工厂"+"生产了一件产品:"+productName);
        return new ConcreteProduct(productName);
    }

    @Override
    protected void step1() {
        System.out.println("进行生产产品的流程步骤1....");
    }

    @Override
    protected void step2() {
        System.out.println("进行生产产品的流程步骤2....");
    }

    @Override
    protected void step3() {
        System.out.println("进行生产产品的流程步骤3....");
    }
}
