package Wrapper;

/**
 * new Short()是新创建了一个对象
 *
 * Short.valueOf()是在一个指定的Short[]数组cache根据参数获得相应的哈希值，相同的参数返回相同的哈希值
 */
public class WrapperDemo4 {
    public static void main(String[] args) {
        Short s1 = Short.valueOf((short) 5);
        Short s2 = Short.valueOf((short) 5);
        System.out.println(s1.equals(s2)); //true
        System.out.println(s1 == s2); //true
        Short s3 = new Short((short) 5);
        Short s4 = new Short((short) 5);
        System.out.println(s3.equals(s4)); //true
        System.out.println(s3 == s4); //false
    }
}
