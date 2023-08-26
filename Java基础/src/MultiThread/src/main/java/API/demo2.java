package API;

/**
 * yield():调用该方法的线程当前时刻释放cpu的使用权
 */
public class demo2 {
    public static void main(String[] args) {
        Thread1 thread1 = new Thread1();
        thread1.setName("偶数线程");
        Thread.currentThread().setName("主线程");
        thread1.start();
        for (int i = 1; i < 1000; i++) {
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }
}

class Thread1 extends Thread{
    @Override
    public void run() {
        for (int i = 2; i <= 1000; i+=2) {
            if(i % 100 == 0)
                Thread.yield();
            System.out.println(getName()+" "+i);
        }
    }
}
