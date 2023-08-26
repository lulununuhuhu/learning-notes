package ThreadLocal;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * InheritableThreadLocal类是ThreadLocal的子类，最大的特点就是使用它可以使子线程继承父线程的ThreadLocal变量
 */
public class InheritableThreadLocalDemo {
    // 创建InheritableThreadLocal对象
    private static InheritableThreadLocal<String> threadVariable = new InheritableThreadLocal<>();

    public static void main(String[] args) {

        ExecutorService executorService = Executors.newSingleThreadExecutor();

        threadVariable.set("主线程变量");
        //主线程中创建一个子线程
        executorService.submit(new childThread());

        //关闭线程池
        executorService.shutdown();
    }


    static class childThread implements Runnable{
        @Override
        public void run() {
            System.out.println("value = "+threadVariable.get());
        }
    }
}
