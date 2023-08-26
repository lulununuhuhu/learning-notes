package Class;

/**
 * Class类相关的方法一
 *
 * 获取Class对象的三种方式
 */
public class ClassAPI1 {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<Object> objectClass = Object.class;
        System.out.println(objectClass);


        Class<?> name = Class.forName("java.lang.Object");
        System.out.println(name);

        Object o = new Object();
        Class<?> oClass = o.getClass();
        System.out.println(oClass);
    }
}
