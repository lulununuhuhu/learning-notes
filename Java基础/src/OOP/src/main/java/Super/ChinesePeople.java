package Super;

/**
 * 1. 子类在创建对象时，会连同父类的对象一起创建
 * 2. Super关键字：
 *      super可以调用父类的公有构造器、属性和方法
 *      super()调用父类的无参构造器，super(参数列表)调用父类的有参构造器；如不显式调用的话，默认使用super()调用无参构造器
 *      子类创建对象时，父类构造器会先执行，因为super在构造体中必须在第一行否则会报错
 */
public class ChinesePeople extends Person{
    int age = 20;
    String name = "lucheng";

    private int number;


    public static void main(String[] args) {
        ChinesePeople people = new ChinesePeople(20,"lucheng");
        people.show();
    }

    @Override
    public void show(){
        super.show();
        System.out.println("age:"+ this.age);
        System.out.println("age:"+ super.age);
    }

    public ChinesePeople(int age, String name) {
        this.age = age;
        this.name = name;
    }
}
