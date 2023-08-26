import java.time.LocalDateTime;

public class LocalDateTimeTest {
    public static void main(String[] args) {
        LocalDateTime time = LocalDateTime.now();
        System.out.println(time);//2023-04-10T14:23:47.669
        LocalDateTime dateTime = LocalDateTime.of(2021, 6, 21, 12, 25);
        System.out.println(dateTime);//2021-06-21T12:25
    }

}
