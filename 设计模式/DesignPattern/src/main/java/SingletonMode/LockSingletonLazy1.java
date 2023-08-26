package SingletonMode;

/**
 * 加了锁的单例懒汉式保证线程安全
 */
public class LockSingletonLazy1 {
    private static LockSingletonLazy1 instance = null;

    private LockSingletonLazy1() {
    }

    /**
     * 加锁方式一：获取单例的静态方法加上synchronized锁变成同步方法
     * 优点：达到了饿汉式下线程安全的目的
     * 缺点：锁的粒度比较大，每个获取单例对象时都要得到锁后才能执行，性能较低
     */
    public static synchronized LockSingletonLazy1 getInstance(){
        if(instance == null)
            instance  = new LockSingletonLazy1();
        return instance;
    }
}
