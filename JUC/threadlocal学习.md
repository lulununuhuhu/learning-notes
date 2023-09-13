## ThreadLocal介绍

ThreadLocal是一个线程安全的类，可以用它来存每个线程的私有变量，这个变量可以在线程的上下文中直接使用，但是不会对其他线程是隔离的。

下面一个案例

```java
public class ThreadLocalDemo1 {
    private static ThreadLocal<String> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) throws InterruptedException {

        //线程1
        Thread thread1 = new Thread(() -> {
            System.out.println(threadLocal.get());
            threadLocal.set("线程1的local变量");
            System.out.println(threadLocal.get());
        });

        //线程2
        Thread thread2 = new Thread(() -> {
            System.out.println(threadLocal.get());
            threadLocal.set("线程2的local变量");
            System.out.println(threadLocal.get());
        });

        thread1.start();
        thread1.join();//让线程1先执行，线程2后执行
        thread2.start();
    }
}
```

## ThreadLocal的应用

1. 请求上下文传递（Request Context Propagation）：在Web应用程序中，ThreadLocal常用于在多个层次的方法之间传递请求上下文，比如HTTP请求的用户信息、请求ID等。这样可以避免在每个方法中显式传递上下文对象。
2. 上下文管理（Context Management）：在一些框架和库中，ThreadLocal经常用于存储当前线程的上下文信息，例如用户身份、语言设置、事务信息等。这样可以避免在每个方法或组件之间传递这些上下文信息。
3. 全局变量替代（Replacement for Global Variables）：在多线程环境中，全局变量可能导致线程安全问题。ThreadLocal可以被用作替代方案，以便每个线程可以拥有自己的变量副本，而不必担心线程之间的冲突。

## ThreadLocal实现隔离线程变成的原理

ThreadLocal类中有一个静态内部类 `static class ThreadLocalMap`,这个类中有一个Entry存放K V键值对，即线程的私有变量。而这个ThreadLocalMap是Thread类的一个属性，所以不同的Thread类有不同的ThreadLocalMap，从而实现不同的线程私有变量互相独立的功能。

## ThreadLocal解决哈希冲突的方式

线性探测法

## ThreadLocal内存泄漏的场景



## 额外知识点  强应用  弱应用

