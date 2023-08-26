package Enum;

/**
 * 使用枚举类实现单例模式
 */
public class EnumSingleton {
    public static void main(String[] args) {
        System.out.println(SingletonEnum.SINGLETON);
        System.out.println(SingletonEnum.SINGLETON.getName());
        System.out.println(SingletonEnum.SINGLETON.getAge());
    }
}

enum SingletonEnum{
    SINGLETON("路程",50);//只创建一个实例

    //定义成员属性
    private final String name;
    private final int age;

    /**
     * 枚举类中构造器默认是private的
     * @param name
     * @param age
     */
    SingletonEnum(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
