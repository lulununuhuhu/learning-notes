package ThreadLocal;

public class ThreadLocalDemo1 {
    private static ThreadLocal<String> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) throws InterruptedException {

        //线程1
        Thread thread1 = new Thread(() -> {
            System.out.println(threadLocal.get());
            threadLocal.set("线程1的local变量");
            System.out.println(threadLocal.get());
        });

        //线程2
        Thread thread2 = new Thread(() -> {
            System.out.println(threadLocal.get());
            threadLocal.set("线程2的local变量");
            System.out.println(threadLocal.get());
        });

        thread1.start();
        thread1.join();//让线程1先执行，线程2后执行
        thread2.start();
    }
}