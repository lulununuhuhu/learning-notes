package API;

public class demo5 {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        Thread thread = new Thread(myThread, "子线程");
        thread.start();
//        thread.sleep(2500);//这里实际进入休眠状态的是主线程，效果等同于Thread.sleep()，不看调用的对象是谁，而是看调用的位置
        for (int i = 0; i < 20; i++) {
            System.out.println(Thread.currentThread().getName()+i);
        }
    }
}

class MyThread implements Runnable{

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName()+i);
        }
    }
}