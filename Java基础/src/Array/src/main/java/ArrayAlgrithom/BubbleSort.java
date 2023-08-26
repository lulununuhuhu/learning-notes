package ArrayAlgrithom;

/**
 * 冒泡排序
 */
public class BubbleSort {
    public static void main(String[] args) {
        int[] nums = {5, 3, 2, 1,9,9,6,8,-8,18,6,3,98,7,2,36,5,4};
        BubbleSort bubbleSort = new BubbleSort();
        bubbleSort.bubbleSort(nums);
        System.out.println("排序结果");
        for(int x:nums){
            System.out.print(x+"   ");
        }
    }

    /**
     * 从前往后冒泡
     * @param nums
     * @return
     */
    public void bubbleSort(int[] nums){
        for (int i = nums.length-1; i >= 0; i--) {
            boolean swapFlag = false;
            for (int j = 0; j < i; j++) {
                if(nums[j] > nums[j+1]){
                    int tmp = nums[j];
                    nums[j] = nums[j+1];
                    nums[j+1] = tmp;
                    swapFlag = true;
                }
            }
            if(swapFlag == false)   break;
        }
    }

}
