package ArrayAlgrithom;

/**
 * 获取某个数组的最小子序列的和,要求时间复杂度是O(n)
 */
public class GetMinSumOfSubarray {
    public static void main(String[] args) {
        int[] array = new int[]{10,-6,-3};
        GetMinSumOfSubarray instance = new GetMinSumOfSubarray();
        int res = instance.getMinSum(array);
        System.out.println("最小子序列和是:"+res);
    }

    /**
     * 使用动态规划,使用滚动数组的思想将空间复杂度讲到O(1)
     * @param nums 对象数组
     * @return
     */
    public int getMinSum(int[] nums){
//        int i = 0,j = 1;
//        int sum = array[i];
//        for (; j < array.length; j++) {
//            if(array[j]<0){
//                if(array[j] + sum <= 0){
//                    sum = Math.max(array[j],sum);
//                    i = j+1;
//                }
//                else{
//                    sum += array[j];
//                }
//            }else{
//                sum += array[j];
//            }
//        }
//        return sum;
        int pre = 0;//滚动数组,从F[-1]开始
        int maxAns = Integer.MIN_VALUE;
        for (int n: nums){
            pre = Math.max(n,pre+n);//F[i-1] ----> F[i]   F[i] = max{F[i-1]+nums[i],nums[i]}
            maxAns = Math.max(maxAns,pre);
        }
        return maxAns;
    }

    /**
     * 使用动态规划，空间复杂度为O(n)
     * @param sums
     * @return
     */
    int getSum1(int[] sums){
        int[] F = new int[sums.length];
        F[0] = sums[0];
        int res = sums[0];
        for (int i = 1; i < sums.length; i++) {
            F[i] = Math.max(F[i-1]+sums[i],sums[i]);
            res = Math.max(F[i],res);
        }
        return res;
    }
}
