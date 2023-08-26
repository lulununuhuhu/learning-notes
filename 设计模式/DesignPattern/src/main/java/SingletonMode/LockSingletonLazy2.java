package SingletonMode;

/**
 * 线程安全的懒汉式模式的第二种加锁方式,这是对第一种加锁方式在性能上的改进
 */
public class LockSingletonLazy2 {
    private static LockSingletonLazy2 instance = null;

    private LockSingletonLazy2() {
    }

    /**
     * 加锁方式二：if的那段逻辑作为同步代码块，LockSingletonLazy2的类对象作为同步监视器
     */
    public static  LockSingletonLazy2 getInstance(){
//        synchronized (LockSingletonLazy2.class) {
            if(instance == null){
                synchronized (LockSingletonLazy2.class) {
                    instance  = new LockSingletonLazy2();
                }
            }
//        }
        return instance;
    }
}
