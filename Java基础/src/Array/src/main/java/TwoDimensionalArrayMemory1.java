/**
 * 二维数组的初始化及应用
 */
public class TwoDimensionalArrayMemory1 {
    public static void main(String[] args) {
        String[][] ad = new String[3][];
        ad[0] = new String[]{"heelo","world"};
        ad[2] = new String[]{"no","master"};
        System.out.println(ad);

        int[][] ad2 = new int[5][4];
        System.out.println(ad2[0]);
        System.out.println(ad2);
    }
}
