package SingletonMode;


import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * 多线程下验证饿汉式单例模式的线程安全
 */
public class Client1 {
    public static void main(String[] args) {
        //使用线程池创建20个线程
        ExecutorService service = Executors.newFixedThreadPool(20);

        //开启二十个线程
        for (int i = 0; i < 20; i++) {
            Future<ThreadSafeSingletonHungry> res = service.submit(new InstanceThread());
        }

        //关闭线程池
        service.shutdown();
    }
}

/**
 * 每个线程获取单例对象
 */
class InstanceThread implements Callable<ThreadSafeSingletonHungry>{

    public ThreadSafeSingletonHungry call() throws Exception {
        ThreadSafeSingletonHungry instance = ThreadSafeSingletonHungry.getInstance();
        System.out.println(instance);
        return instance;
    }
}
