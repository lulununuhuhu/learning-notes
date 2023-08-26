package CreateThread;

/**
 * 创建线程的方式一：
 * 1.创建继承Thread类的一个子类
 * 2.重写run方法
 * 3.创建子类对象
 * 4.调用start方法开启线程
 */

/**
 * 创建一个子线程，打印1~10000的偶数
 * 主线程，打印1~10000的奇数
 */
public class Way1 extends Thread {
    @Override
    public void run() {
        for (int i = 2; i <= 10000; i+=2) {
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }

    public static void main(String[] args) {
        Way1 way1 = new Way1();
        way1.start();//开始线程，执行run方法体中的内容

        for (int i = 1; i < 10000; i+=2) {
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }
}
