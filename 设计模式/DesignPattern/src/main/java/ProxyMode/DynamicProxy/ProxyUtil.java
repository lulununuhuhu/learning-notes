package ProxyMode.DynamicProxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class ProxyUtil  {

    /**
     * 创建subject的代理对象
     * @param subject
     * @return
     */
    public static Subject createProxy(Subject subject){
        /**
         * 参数1：用于指定一个类加载器
         * 参数2：指定具体的代理类
         * 参数3：指定具体的代理逻辑
         */
        Subject proxyInstance = (Subject) Proxy.newProxyInstance(ProxyUtil.class.getClassLoader(), new Class[]{Subject.class}, new InvocationHandler() {

             //回调函数
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                //代理对象进行代理操作以及代理前后的一些固定业务逻辑
                if ("methodA".equals(method.getName())) {
                    System.out.println("代理执行业务A前的一些操作");
                } else if ("methodB".equals(method.getName())) {
                    System.out.println("代理执行业务B前的一些操作");
                }
                Object invokeRes = method.invoke(subject, args);
                System.out.println("执行代理业务完成后的一些操作");
                return invokeRes;
            }
        });
        return proxyInstance;
    }
}
