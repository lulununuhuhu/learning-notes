package innerClass;

public class Animal {
    //申明静态成员内部类
    static class Dog{
        public void eat(){
            System.out.println("狗吃骨头");
        }
    }

    //申明普通成员内部类
    class Cat{
        public void eat(){
            System.out.println("猫吃鱼");
        }
    }

    public Comparable getInstance(){
        return new Comparable() {
            @Override
            public int compareTo(Object o) {
                return 1;
            }
        };
    }
}
