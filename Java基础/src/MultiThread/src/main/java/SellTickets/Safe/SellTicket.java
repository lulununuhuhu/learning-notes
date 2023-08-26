package SellTickets.Safe;

/**
 * 使用同步代码块或者同步方法解决卖票的线程安全问题
 */
class SellTicket implements Runnable{
    private int tickets = 50;
    private boolean finishFlag = false;

    @Override
    public void run() {
//            while (true){
//                //使用同步代码块,this为同步监视器,此处是调用run方法的进程对象
//                synchronized (this){
//                    if(tickets > 0){
//                        try {
//                            Thread.sleep(50);
//                        } catch (InterruptedException e) {
//                            throw new RuntimeException(e);
//                        }
//                        System.out.println(Thread.currentThread().getName()+" 出票:"+tickets);
//                        tickets--;
//                    }else
//                        break;
//                }
//            }
        while (finishFlag == false){
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            sell();
        }
    }

    /**
     * 使用synchronized修饰方法，让方法变成同步方法
     * 普通类同步方法的同步监视器默认是this对象
     * 静态类同步方法的同步监视器默认是类的字节码对象
     */
    private synchronized void sell(){
        if(tickets > 0){
            System.out.println(Thread.currentThread().getName()+" 出票:"+tickets);
            tickets--;
        }else{
            finishFlag = true;
        }
    }
}
