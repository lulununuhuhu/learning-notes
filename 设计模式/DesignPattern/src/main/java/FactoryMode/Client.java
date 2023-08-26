package FactoryMode;

import FactoryMode.Factory.ConcreteFactory;
import FactoryMode.Factory.Factory;
import FactoryMode.Product.Product;

/**
 * 测试工厂模式
 */
public class Client {
    public static void main(String[] args) {
        //新建一座工厂
        Factory factory = new ConcreteFactory("1号工厂");

        //该工厂生产一个产品,产品名为LK99
        Product product = factory.generateProduct("LK-99");

        //使用该产品
        product.use();
    }
}
