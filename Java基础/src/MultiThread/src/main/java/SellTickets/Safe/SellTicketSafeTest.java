package SellTickets.Safe;

public class SellTicketSafeTest {
    public static void main(String[] args) {
        SellTicket sellTicket = new SellTicket();
        Thread window1 = new Thread(sellTicket, "窗口一");
        Thread window2 = new Thread(sellTicket, "窗口二");
        Thread window3 = new Thread(sellTicket, "窗口三");
        window1.start();window2.start();window3.start();
    }
}
