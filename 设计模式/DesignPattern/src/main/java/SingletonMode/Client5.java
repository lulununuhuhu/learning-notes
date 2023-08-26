package SingletonMode;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Client5 {

    public static void main(String[] args) {
        //使用线程池创建20个线程
        ExecutorService service = Executors.newFixedThreadPool(500);
        //开启二十个线程
        for (int i = 0; i < 500; i++) {
            service.submit(new SafeLockThread2());
        }

        //关闭线程池
        service.shutdown();
    }
}

class SafeLockThread2 implements Callable<LockSingletonLazy3> {

    public LockSingletonLazy3 call() throws Exception {
        LockSingletonLazy3 instance = LockSingletonLazy3.getInstance();
        System.out.println(instance);
        return instance;
    }
}

