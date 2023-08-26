package Class;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 使用Class中的setAccessible访问类中的私有对象
 */
class User {
    private String name;
    private String age;
    private String sex;

    private User(String name) {
        this.name = name;
    }

    private void setName(String name) {
        this.name = name;
    }

    private String getName() {
        return name;
    }
}

public class ClassAPI2{
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<User> userClass = User.class;
        //获取参数是String的构造器的对象
        Constructor<User> constructors = userClass.getDeclaredConstructor(String.class);
        constructors.setAccessible(true);
        User instance = constructors.newInstance("LuCheng");
        for (Field field : userClass.getDeclaredFields()) {
            //获取name字段的属性，然后给它赋值
            if("name".equals(field.getName())){
                field.setAccessible(true);//设置可以直接访问
                field.set(instance,"Zhong");
            }
        }

        for (Method method : userClass.getDeclaredMethods()) {
            if("getName".equals(method.getName())){
                //获取到getName方法，然后调用该方法
                method.setAccessible(true);
                Object res = method.invoke(instance);
                System.out.println(res);
            }
        }


    }
}
