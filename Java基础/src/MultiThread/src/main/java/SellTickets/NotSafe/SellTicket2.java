package SellTickets.NotSafe;

/**
 * 使用继承Thread方式创建线程时，同步代码块可能会失效的情况
 */
class SellTicket2 extends Thread{
    private static int tickets = 100;

    public SellTicket2(String name) {
        super(name);
    }

    @Override
    public void run() {
        while (true){
            //此处synchronized锁的是调用run方法的线程对象，而在使用继承Thread类的子类对象开启线程时，每开一个线程，都要新建一个对象
            //所以这里的同步监视器不共用，无法起到锁的效果，应该将同步监视器改成线程类唯一的字节码对象
            synchronized (SellTicket2.class){
                try {
                    Thread.sleep(5);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                if(tickets > 0) {
                    System.out.println(Thread.currentThread().getName() + " 出票:" + tickets);
                    tickets--;
                }
                else break;
            }
        }
    }
}
