package BuilderMode;

import BuilderMode.Builder.Builder;
import BuilderMode.Builder.ConcreteBuilder;
import BuilderMode.Director.Director;

public class Client {
    public static void main(String[] args) {
        Builder builder = new ConcreteBuilder();
        Director director = new Director(builder);
        director.construct();
        builder.getResult();
    }
}
