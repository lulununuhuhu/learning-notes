package API;

/**
 * join()方法：在线程A中使用线程B对象调用join方法，则A进入阻塞状态，知道B线程执行完后再返回A进行执行
 */
public class demo4 {
    public static void main(String[] args) throws InterruptedException {
        Thread.currentThread().setName("主线程");
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    System.out.println(Thread.currentThread().getName() + " " + i);
                }
            }
        }, "子线程");
        thread.start();
//        Thread.currentThread().join();
        for (int i = 1; i < 10000; i++) {
            if(i % 251 == 0){
                thread.join();//执行thread对象的线程内容直到结束才返回
            }
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }
}

