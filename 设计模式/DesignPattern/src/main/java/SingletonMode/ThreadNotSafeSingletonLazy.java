package SingletonMode;

/**
 * 线程不安全的单例模式：懒汉模式
 */
public class ThreadNotSafeSingletonLazy {

    private static ThreadNotSafeSingletonLazy instance = null;

    private ThreadNotSafeSingletonLazy() {
    }

    /**
     * 在获取实例对象时再创建,且只创建一次
     * @return
     */
    public static ThreadNotSafeSingletonLazy getInstance(){
        if(instance == null)
            instance  = new ThreadNotSafeSingletonLazy();
        return instance;
    }
}
