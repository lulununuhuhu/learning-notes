package SingletonMode;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Client3 {
    public static void main(String[] args) {
        //使用线程池创建20个线程
        ExecutorService service = Executors.newFixedThreadPool(20);
        //开启二十个线程
        for (int i = 0; i < 20; i++) {
            Future<LockSingletonLazy1> res = service.submit(new SafeLockThread());
        }

        //关闭线程池
        service.shutdown();
    }
}

/**
 * 每个线程获取单例对象
 */
class SafeLockThread implements Callable<LockSingletonLazy1> {

    public LockSingletonLazy1 call() throws Exception {
        LockSingletonLazy1 instance = LockSingletonLazy1.getInstance();
        System.out.println(instance);
        return instance;
    }
}
