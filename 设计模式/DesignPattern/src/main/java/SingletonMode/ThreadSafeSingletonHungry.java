package SingletonMode;

/**
 * 线程安全的单例模式  饿汉式
 */
public class ThreadSafeSingletonHungry {

    /**
     * 单例对象
     */
    public static ThreadSafeSingletonHungry instance = new ThreadSafeSingletonHungry();

    private ThreadSafeSingletonHungry() {
    }

    /**
     * 私有化构造器
     */


    public static ThreadSafeSingletonHungry getInstance(){
        return instance;
    }
}
