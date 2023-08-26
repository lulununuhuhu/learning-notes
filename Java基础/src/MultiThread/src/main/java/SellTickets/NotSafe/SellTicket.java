package SellTickets.NotSafe;


/**
 * 模拟线程不安全的情况下三个售票线程对共享变量tickets操作的情况：会出现重票和错票的情况
 * 重票：不同窗口卖的票号相同  原因：在线程A打印卖票信息后，就切换到另一个线程相同位置，而此时tickets数量没有变
 * 错票：最终窗口卖出的票号为负 原因：在tickets为1时，三个线程轮流切换，都满足ticket>0的条件进入，三个线程依次执行打印票号，再减一的操作
 */
class SellTicket extends Thread{
    static int tickets = 50;

    public SellTicket(String name) {
        super(name);
    }

    @Override
    public void run() {
        while (true){
            if(tickets > 0){
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                System.out.println(Thread.currentThread().getName()+" 出票:"+tickets);
                tickets--;
            }else
                break;
        }
    }
}
