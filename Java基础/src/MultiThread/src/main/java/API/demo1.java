package API;

/**
 * getName()获取当前线程的名字
 * setName()设置当前线程的名字
 */
public class demo1 {
    public static void main(String[] args) {
        PrintEvenNumber printEvenNumber = new PrintEvenNumber();
        Thread thread1 = new Thread(printEvenNumber);
        Thread thread2 = new Thread(printEvenNumber, "奇数线程2");
        thread1.setName("奇数线程1"); //设置thread1线程的线程名是奇数线程1
        thread1.start();
        thread2.start();
    }
}

class PrintEvenNumber implements Runnable{

    @Override
    public void run() {
        for (int i = 2; i <= 10000; i+=2) {
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }
}
