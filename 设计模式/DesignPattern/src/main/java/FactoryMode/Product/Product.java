package FactoryMode.Product;

/**
 * 定义一个抽象的产品类
 */
public abstract class Product {
    private String name;//产品名称

    public Product(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    //定义一个产品使用方法
    public abstract void use();
}
