package SellTickets.NotSafe;

/**
 * 使用继承Thread方式创建线程时，同步代码块可能会失效的情况
 */
public class SellTicketTest2 {
    public static void main(String[] args) {
        SellTicket2 windows1 = new SellTicket2("窗口一");
        SellTicket2 windows2 = new SellTicket2("窗口二");
        SellTicket2 windows3 = new SellTicket2("窗口三");
        windows1.start();windows2.start();windows3.start();
    }
}
