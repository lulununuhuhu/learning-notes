package String;

/**
 * String的格式化输出
 */
public class StringStructureOutput {
    public static void main(String[] args) {
        String pi = "3.141592653";
        String formattedPi = String.format("|%05.2f|", Double.parseDouble(pi));
        System.out.println(formattedPi);
    }
}
