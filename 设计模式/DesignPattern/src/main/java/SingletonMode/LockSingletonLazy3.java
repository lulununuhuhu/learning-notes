package SingletonMode;

/**
 * 线程安全的懒汉式模式的第三种加锁方式，这是在第二种加锁方式的基础上进一步优化，并将对象加上volatile关键字修饰
 *
 * volatile：保证变量的可见性；保证初始化对象的指令序列，不会让其他线程获得未初始化完全的对象
 */
public class LockSingletonLazy3 {

    private static volatile LockSingletonLazy3 instance = null;

    private LockSingletonLazy3() {
    }

    /**
     * 加锁方式二：双重检测锁
     */
    public static  LockSingletonLazy3 getInstance(){
        //如果实例为空，再上锁；否则不上锁直接返回
        if(instance == null){
            synchronized (LockSingletonLazy3.class) {
                //为防止多个线程进入上锁进行创建对象，还要再加一次检测
                if(instance == null)
                    instance  = new LockSingletonLazy3();
            }
        }
        return instance;
    }
}
