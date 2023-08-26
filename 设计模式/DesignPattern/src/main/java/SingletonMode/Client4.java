package SingletonMode;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Client4 {

    public static void main(String[] args) {
        //使用线程池创建20个线程
        ExecutorService service = Executors.newFixedThreadPool(500);
        //开启二十个线程
        for (int i = 0; i < 500; i++) {
            service.submit(new SafeLockThread1());
        }

        //关闭线程池
        service.shutdown();
    }
}

class SafeLockThread1 implements Callable<LockSingletonLazy2> {

    public LockSingletonLazy2 call() throws Exception {
        LockSingletonLazy2 instance = LockSingletonLazy2.getInstance();
        System.out.println(instance);
        return instance;
    }
}

