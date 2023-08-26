package SellTickets.NotSafe;

public class SellTicketTest {
    public static void main(String[] args) {
        SellTicket window1 = new SellTicket("窗口一");
        SellTicket window2 = new SellTicket("窗口二");
        SellTicket window3 = new SellTicket("窗口三");
        window1.start();window2.start();window3.start();
    }
}
