/**
 * 一维数组的内存解析
 */
public class OneDimensionalArrayMemory1 {

    public static void main(String[] args) {
        int[] arr1 = new int[4];
        arr1[0] = 10;
        arr1[2] = 20;

        String[] arr2 = new String[2];
        System.out.println(arr2);
        arr2[1] = "周杰伦";
        String s2 = arr2[1];
        arr2 = new String[3];
        System.out.println(arr2);
        System.out.println(arr2[1]);
        System.out.println(s2);
    }
}
