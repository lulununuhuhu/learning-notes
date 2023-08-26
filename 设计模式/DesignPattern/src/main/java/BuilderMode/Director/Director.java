package BuilderMode.Director;

import BuilderMode.Builder.Builder;

/**
 * 监控角色
 */
public class Director {
    private Builder builder;

    public Director(Builder builder) {
        this.builder = builder;
    }

    /**
     * 负责指挥具体构建者进行建造并组装
     */
    public void construct(){
        builder.buildPart1();
        builder.buildPart2();
        builder.buildPart3();
    }
}
