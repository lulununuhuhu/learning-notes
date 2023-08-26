package ThreadLocal;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 基于ThreadLocal让每个线程有自己的计数器
 *
 * 线程1的计数器：1 3 5 7 9 的形式
 * 线程2的计数器：2 4 6 8 10的形式
 * 线程3的计数器: 1 2 3 4 5的形式
 */
public class ThreadLocalCounter {
    //创建ThreadLocal对象counter
    private static ThreadLocal<Integer> counter = new ThreadLocal<>();

    public static void main(String[] args) {
        //创建线程池
        ExecutorService executorService = Executors.newFixedThreadPool(3);

        //开启指定线程
        executorService.submit(new Counter1("线程1"));
        executorService.submit(new Counter2("线程2"));
        executorService.submit(new Counter3("线程3"));

        //关闭线程池
        executorService.shutdown();
    }

    static class Counter1 implements Runnable{
        private String threadName;

        public Counter1(String threadName) {
            this.threadName = threadName;
        }

        @Override
        public void run() {
            //初始化ThreadLocal对象
            counter.set(1);
            for (int i = 0; i < 5; i++) {
                Integer currentValue = counter.get();
                System.out.println("当前线程："+threadName+"  计数值为:"+currentValue);
                counter.set(currentValue+2);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }

            //清除ThreadLocal实例，防止内存泄露
            counter.remove();
        }
    }

    static class Counter2 implements Runnable{
        private String threadName;

        public Counter2(String threadName) {
            this.threadName = threadName;
        }

        @Override
        public void run() {
            //初始化ThreadLocal对象
            counter.set(2);
            for (int i = 0; i < 5; i++) {
                Integer currentValue = counter.get();
                System.out.println("当前线程："+threadName+"  计数值为:"+currentValue);
                counter.set(currentValue+2);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }

            //清除ThreadLocal实例，防止内存泄露
            counter.remove();
        }
    }

    static class Counter3 implements Runnable{
        private String threadName;

        public Counter3(String threadName) {
            this.threadName = threadName;
        }

        @Override
        public void run() {
            //初始化ThreadLocal对象
            counter.set(1);
            for (int i = 0; i < 5; i++) {
                Integer currentValue = counter.get();
                System.out.println("当前线程："+threadName+"  计数值为:"+currentValue);
                counter.set(currentValue+1);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
            //清除ThreadLocal实例，防止内存泄露
            counter.remove();
        }
    }

}
