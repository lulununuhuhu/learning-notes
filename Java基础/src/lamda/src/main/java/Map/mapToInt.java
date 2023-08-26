package Map;

import java.util.ArrayList;
import java.util.List;

/**
 * 使用stream流中的mapToInt映射方法
 */
public class mapToInt {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(123);
        list.add(456);
        list.add(456788);
        //使用mapToInt将Integer类型的元素转化伟int基本类型的元素
        int[] toArray = list.stream().mapToInt(Integer::intValue).toArray();
        for (int i : toArray) {
            System.out.println(i);
        }
    }
}
