package CreateThread;

/**
 * 创建线程的方式2：实现Runnable接口
 * 1. 创建一个实现Runnable接口的类
 * 2. 重写run方法
 * 3. 创建该类的对象
 * 4. 创建Thread类，构造器中以第三步创建的对象为参数
 */
public class Way2 implements Runnable{
    public static void main(String[] args) {
        Way2 way2 = new Way2();
        Thread thread = new Thread(way2);
        thread.start();//开启线程
        Thread thread1 = new Thread(way2);
        thread1.start();//再开一个线程
        for (int i = 1; i <= 10000; i+=2) {
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }

    @Override
    public void run() {
        for (int i = 2; i <= 10000; i+=2) {
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }
}
