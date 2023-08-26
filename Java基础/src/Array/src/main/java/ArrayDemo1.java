/**
 * 该类演示下数组的基本使用
 */

public class ArrayDemo1 {
    public static void main(String[] args) {
        //初始化int类型数组,需定义好数组的长度
        int[] intArray = new int[5];
        //初始化String类型数组
        String[] stringArray = new String[]{"hello","world","yes","my","boss"};
        stringArray[6] = "sad";
        System.out.println(stringArray.length);
    }
}
