package Exception;

import org.junit.Test;

import java.util.Scanner;

public class ExceptionTest {
    @Test
    public void testCustomException(){
        try {
            exceptionMethod();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void exceptionMethod() throws Exception {
        Scanner scanner = new Scanner(System.in);
        int nextInt = scanner.nextInt();
        if (nextInt < 0)
            throw new CustomException("小于0,不合法");
    }
}
