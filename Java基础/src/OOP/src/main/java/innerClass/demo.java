package innerClass;

public class demo {
    public static void main(String[] args) {
        //创建静态内部类的实例
        Animal.Dog dog = new Animal.Dog();
        dog.eat();

        //创建普通内部类的实例
        // 1. 先创建外部类对象
        Animal animal = new Animal();
        //  2. 再创建内部类对象
        Animal.Cat cat = animal.new Cat();
        cat.eat();
    }
}
