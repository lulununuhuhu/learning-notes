/**
 * 一维数组的内存解析2
 */
public class OneDimensionalArrayMemory2 {
    public static void main(String[] args) {
        int[] arr = new int[3];
        arr[0] = 5;
        arr[1] = 6;
        arr[2] = 7;

        //定义新的数组变量将arr的地址值赋给arr1
        int[] arr1 = arr;
        arr1[1] = 9;
        System.out.println();
        System.out.println(arr[1]);
    }
}
