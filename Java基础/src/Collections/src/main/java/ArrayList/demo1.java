package ArrayList;

import java.util.ArrayList;
import java.util.List;

/**
 * 测试ArrayList的remove方法
 */
public class demo1 {
    public static void main(String[] args) {
        List<Integer> res= new ArrayList<>();
        res.add(5);
        res.add(3);
        for (Integer integer : res) {
            if(integer == 5)
                res.remove(integer);
        }
        System.out.println(res);
    }
}
