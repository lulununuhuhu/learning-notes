package FactoryMode.Factory;

import FactoryMode.Product.Product;

/**
 * 定义一个抽象工厂
 */
public abstract class Factory {
    private String name;//工厂名

    public Factory(String name) {
        this.name = name;
    }

    /**
     * 产品的生成步骤：步骤1---> 步骤2---> 步骤3
     */
    public final Product generateProduct(String productName){
        step1();
        step2();
        step3();
        Product product = createProduct(productName);
        return product;
    }

    protected abstract Product createProduct(String productName);

    //定义产品的生产步骤，生成一个生成模板
    protected abstract void step1();
    protected abstract void step2();
    protected abstract void step3();

}
