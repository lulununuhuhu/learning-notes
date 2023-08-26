package Enum;


public class EnumDemo {
    public static void main(String[] args) {
        GirlFriends.LIU_YI_FEI.show("刘亦菲","青春可爱");
        GirlFriends.LARA.show("梁心颐","中俄混血");
        GirlFriends.ZHANG_SAN.show("张三","成绩优异");
        System.out.println(GirlFriends.LIU_YI_FEI.ordinal());
        System.out.println(GirlFriends.ZHANG_SAN.ordinal());

    }
}

enum GirlFriends{
    //设置需要枚举的实例变量,每个实例变量都有一个标号，从0开始
    ZHANG_SAN(18),
    LIU_YI_FEI(20),
    LARA(22);

    //定义枚举类的成员属性
    private final int age;

    GirlFriends(int age) {
        this.age = age;
    }
    public void show(String name,String characteristic){
        System.out.println(name+"的特点是："+characteristic);
    }

}
