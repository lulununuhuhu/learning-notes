package ProxyMode.StaicProxy;

/**
 * 静态代理模式角色二：真实对象  定义被代理方法的具体逻辑，这个代理方法只能由代理对象访问
 */
class RealSubject implements Subject{
    public void method() {
        System.out.println("这个一个被代理的方法");
    }
}
