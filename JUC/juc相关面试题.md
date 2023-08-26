## JUC相关面试题

### 进程和线程的区别

* 进程有独立的地址空间；线程属于某个进程的，共享相同的内存空间
* 上下文切换：进程的切换开销比较大，需要保存和恢复整个进程的状态信息，包括寄存器、程序计数器等。线程共享相同的内存地址和其他资源，只有切换时只要保存少量的上下文信息和栈信息
* 进程是资源分配的基本单位，线程是cpu调度的基本单位。每一个进程都有操作系统为其分配一片系统资源，而线程没有独立的资源，只拥有一些独立的上下文信息和堆栈
* 进程之间相互独立，一个进程的崩溃不会影响其他进程。而线程的崩溃可能会影响整个进程

总结：线程是轻量的执行单元，切换开销比较小；进程是独立的执行实体，每个进程都有独立的资源。线程主要用来提升程序的并发性和性能，进程用来保证隔离性。

### 创建线程的方式

在java中创建线程的方式有多种：

1. 继承Thread类，实现Thread类中的run方法

2. 声明一个实现runnable接口的类，实现run方法

   ```java
   class MyRunnable implements Runnable {
       public void run() {
           // 线程执行的逻辑
           System.out.println("Thread is running.");
       }
   }
   
   public class Main {
       public static void main(String[] args) {
           MyRunnable myRunnable = new MyRunnable();
           Thread thread = new Thread(myRunnable);
           thread.start();
       }
   }
   ```

   

3. 声明一个实现callable接口的类，实现call方法

   ```java
   /**
   这个一个结合callable和Excutor实现的线程常见的一个demo
   */
   package Thread;
   
   import java.util.concurrent.*;
   
   /**
    * 使用Callable接口来创建一个线程
    */
   public class CallableDemo1 {
       public static void main(String[] args) throws ExecutionException, InterruptedException {
           ExecutorService executor = Executors.newSingleThreadExecutor();
           MyCallable myCallable = new MyCallable();
           Future<Integer> future = executor.submit(myCallable);
           Integer res = future.get();
           System.out.println("result:"+res);
           executor.shutdown();
       }
   }
   
   class MyCallable implements Callable<Integer>{
   
       /**
        * 实现Callable接口中的call方法
        * @return
        * @throws Exception
        */
       public Integer call() throws Exception {
           return 42;
       }
   }
   
   ```

4. 使用线程池实现

   1. 申请指定大小的线程池

   ```java
   ExecutorService service = Executors.newFixedThreadPool(10);
   ```

   2. 执行指定线程的操作，可以是Runnable或Callable类实现类的对象

   ```java
   service.execute(new Runnable());//适用于Runnable接口线程
   service.submit(new Callable());//适用于Callable接口线程
   ```

   3. 设置一些线程池参数如核心池大小、最大线程数等

   ```java
   ThreadPoolExecutor executor = (ThreadPoolExecutor)service;//service实际上是ThreadPoolExecutor类
   executor.setCorePoolSize(10);
   ```

   4. 关闭线程池

   ```java
   service.shutdown();
   ```

### java中线程的状态有哪些

### runnable和callable的区别

* 返回值。runnable接口的run方法返回值是空，而callable接口的call方法可以有返回值
* 异常处理。runnable接口的run方法不能抛出异常，出现异常只能自己捕获并处理；callable接口的call方法的向上抛出异常

### synchronized和lock的区别

synchronized和Lock都是Java中用于解决多线程并发访问共享资源 时可能出现的数据问问题。

* 来源：synchronized是java原生的关键字，Lock是juc包下的一个锁机制
* 锁的获取和释放机制：synchronized关键字是自动获取和释放锁，而Lock接口需要显式地调用lock()方法获取锁，并在使用完之后调用unlock()方法释放锁。
* 锁的使用的灵活性：使用synchronized时，同步代码块的范围是整个方法或者指定的代码块，无法灵活地控制。而使用Lock接口可以通过手动获取和释放锁，可以灵活控制同步代码块的范围
* 锁的可中断性：使用synchronized时，如果一个线程在同步代码块中等待锁，那么就会一直等待下去，无法中断；而Lock接口提供了可中断的获取锁的方式，通过lockinterrupttibly()方法可以中断等待锁的进程
* 锁的公平性：synchronized是非公平锁，无法保证等待时间最长的线程能够优先获取到锁。Lock接口可以根据需要，创建公平锁和非公平锁

### 说一下你对ThreadLocal的理解

