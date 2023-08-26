import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

public class ReflectDemo1 {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        List<Integer> res = new ArrayList<>();
        res.add(99);
        res.getClass().getMethod("add", Object.class).invoke(res,"reflect");
        System.out.println(res);
    }
}
