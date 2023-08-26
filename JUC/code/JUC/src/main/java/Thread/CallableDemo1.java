package Thread;

import java.util.concurrent.*;

/**
 * 使用Callable接口来创建一个线程
 */
public class CallableDemo1 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        MyCallable myCallable = new MyCallable();
        Future<Integer> future = executor.submit(myCallable);
        Integer res = future.get();
        System.out.println("result:"+res);
        executor.shutdown();
    }
}

class MyCallable implements Callable<Integer>{

    /**
     * 实现Callable接口中的call方法
     * @return
     * @throws Exception
     */
    public Integer call() throws Exception {
        return 42;
    }
}
