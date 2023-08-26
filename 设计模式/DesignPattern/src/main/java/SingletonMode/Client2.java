package SingletonMode;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * 多线程下验懒汉式单例模式的线程不安全
 */
public class Client2 {
    public static void main(String[] args) {
        //使用线程池创建20个线程
        ExecutorService service = Executors.newFixedThreadPool(30);

        //开启二十个线程
        for (int i = 0; i < 30; i++) {
            Future<ThreadNotSafeSingletonLazy> res = service.submit(new LazyInstanceThread());
        }

        //关闭线程池
        service.shutdown();
    }
}

/**
 * 每个线程获取单例对象
 */
class LazyInstanceThread implements Callable<ThreadNotSafeSingletonLazy> {

    public ThreadNotSafeSingletonLazy call() throws Exception {
        ThreadNotSafeSingletonLazy instance = ThreadNotSafeSingletonLazy.getInstance();
        System.out.println(instance);
        return instance;
    }
}
