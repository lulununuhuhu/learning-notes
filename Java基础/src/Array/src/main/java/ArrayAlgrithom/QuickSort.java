package ArrayAlgrithom;

/**
 * 快速排序代码实现
 */
public class QuickSort {
    public static void main(String[] args) {
        int[] nums = new int[]{3,-1,-2,-5,0};
        System.out.println("排序之前:");
        for(int x:nums)
            System.out.print(x+" ");
        quickSort(nums,0,nums.length-1);
        System.out.println("\n排序之后:");
        for(int x:nums)
            System.out.print(x+" ");
    }

    private static void quickSort(int[] nums, int start, int end) {
        subSort(nums,start,end);
    }

    private static void subSort(int[] nums, int start, int end) {
        if(start < end){
            int pivot = nums[start];//中枢元素
            int low = start;
            int high = end+1;
            while (true){
                while (low < end && nums[++low] - pivot <= 0);//low指向第一个大于中枢元素的值或者指向end
                while (high > start && nums[--high] - pivot >= 0);//high指向第一个小于中枢元素的值或者指向start
                if(low < high){
                    swap(nums,low,high);
                }else{
                    break;
                }
            }
            swap(nums,start,high);//保证最后于与中枢元素更换位置的值一定是high
            subSort(nums,start,high-1); //右递归 范围 [start,high-1]
            subSort(nums,high+1,end); //左递归 范围 [high+1,end]
        }
    }

    private static void swap(int[] nums,int x,int y){
        int tmp = nums[x];
        nums[x] = nums[y];
        nums[y] = tmp;
    }
}
