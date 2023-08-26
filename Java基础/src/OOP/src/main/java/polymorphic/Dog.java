package polymorphic;

public class Dog extends Animal{
    @Override
    public void bark() {
        System.out.println("狗会犬吠");
    }

    public void move(){
        System.out.println("狗会移动");
    }

    public static void main(String[] args) {
        Animal a = new Animal();
        Animal b = new Dog();
        a.bark();
        b.bark();
//        b.move(); 编译无法通过  因为编译时 变量b的类型时Animal类，而Animal类中没有move方法
    }
}
