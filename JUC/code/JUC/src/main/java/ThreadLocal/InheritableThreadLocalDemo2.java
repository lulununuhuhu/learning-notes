package ThreadLocal;

public class InheritableThreadLocalDemo2 {
    public static void main(String[] args) {
        ThreadLocal<String> threadLocal = new InheritableThreadLocal<>();
        threadLocal.set("主线程设置的值555");
        new Thread(()-> System.out.println("子线程的值："+threadLocal.get())).start();
    }
}
