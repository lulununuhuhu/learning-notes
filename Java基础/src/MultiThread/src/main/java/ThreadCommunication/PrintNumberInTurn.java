package ThreadCommunication;

/**
 * 使用两个线程打印1-100。线程1和线程2交替打印
 * 基本思路：1. 打印数字和number++放在同步代码块中保证同步操作
 *         2. notify 唤醒另一个线程
 *         2. wait自身阻塞并释放同步监视器
 */
public class PrintNumberInTurn {
    public static void main(String[] args) {
        PrintNumber2 printNumber = new PrintNumber2();
        Thread thread1 = new Thread(printNumber, "线程一");
        Thread thread2 = new Thread(printNumber, "线程二");
        thread1.start();thread2.start();
    }
}

/**
 * 实现形式1：线程一和线程二交替打印，但是如果使用wait()空参方法的话，线程会一直阻塞在那;使用wait(long timeout)指定有限等待时间解决
 */
class PrintNumber1 implements Runnable{
    private int number = 1;

    @Override
    public void run() {
        while(true){
            if(number <= 100) {
                synchronized (this) {
                    notify();
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    System.out.println(Thread.currentThread().getName() + "打印:" + number);
                    number++;
                    try {
//                        wait(500);  线程如果没有被notify唤醒的话，500ms后自动唤醒
                        wait();
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
            }else {
                break;
            }
        }
    }
}

/**
 * 实现形式2：线程一和线程二交替打印，在if和else两个判断条件中都加上notify，保证再最后一个数打印后，另一个wait的线程能及时被唤醒
 */
class PrintNumber2 implements Runnable{
    private int number = 1;

    @Override
    public void run() {
        while(true){
            synchronized (this) {
                if(number <= 100) {
                    notify();
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    System.out.println(Thread.currentThread().getName() + "打印:" + number);
                    number++;
                    try {
                        wait();
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }else {
                    notify();
                    break;
                }
            }
        }
    }
}
