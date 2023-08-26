/**
 * >> 和 >>> 的区别
 * >> 是算数右移，必不会改变右移后的符号位；如果数是正数，右移后高位补0；数是负数，高位补1
 * >>> 是逻辑右移，可能会改变右移后的符号位；右移后高位不管怎样都是补0
 */

public class demo1 {
    public static void main(String[] args) {
        int i = -20 >>> 2;
        int j = -20 >> 2;
        System.out.println("i = "+ i);
        System.out.println("j = " + j);
    }
}
