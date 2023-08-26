package Super;


import java.util.Objects;

public class Person {
    int age = 50;
    String name = "luyaonan";

    public Person() {
        System.out.println("调用父类无参构造器");
    }

    public Person(int age, String name) {
        System.out.println("调用父类有参构造器");
        this.age = age;
        this.name = name;
    }

    public void show(){
        System.out.println("Person对象方法:"+age+" "+name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(age, name);
    }
}
