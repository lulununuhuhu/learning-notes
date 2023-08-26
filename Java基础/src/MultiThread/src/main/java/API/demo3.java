package API;

import java.lang.Thread;

/**
 * sleep(long millseconds):调用该方法的线程进入休眠状态(进入阻塞状态)
 */
public class demo3 {
    public static void main(String[] args) {
        Thread.currentThread().setName("主线程");
        Thread thread = new Thread(new Thread2(), "线程2");
        thread.start();
        for (int i = 0; i < 10000; i++) {
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }
}

class Thread2 implements Runnable{

    @Override
    public void run() {
        for (int i = 0; i < 50; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName()+ " "+i);
        }
    }
}
