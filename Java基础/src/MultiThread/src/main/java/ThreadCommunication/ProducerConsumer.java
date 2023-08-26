package ThreadCommunication;

import java.util.Random;

/**
 * 生产者消费者问题：
 * 生产者将产品交给店员(Clerk),而消费者(Consumer)从店员处取走产品，店员一次只能持有固定数量的产品（20个）。
 * 如果生产者试图生成更多的产品，店员会叫生产者停一下，如果店中有空位放产品了再通知生产者继续生产；
 * 如果店中没有产品了，店员会告诉消费者等一下，如果店中有产品了再通知消费者来取走产品
 *
 * 问题分析：
 * 1. 是否有共享数据 有 产品
 * 2. 是否有并发线程：有 消费者消费线程 生产者生产线程
 * 3. 是否有线程通信  有 生产者生产产品大于20要阻塞，小于20要继续生产   消费者要购买的产品大于当前生产的产品数量时，消费者线程阻塞，等待生产者线程生产产品
 */


public class ProducerConsumer {
    public static void main(String[] args) {
        Shop shop = new Shop();
        Producer producer = new Producer(shop);
        Consumer consumer = new Consumer(shop);
        Thread thread1 = new Thread(producer, "生产者");
        Thread thread2 = new Thread(consumer, "消费者1");
        Thread thread3 = new Thread(consumer, "消费者2");
        thread1.start();thread2.start();thread3.start();
    }
}

class Shop{
    private int products = 0;


    /**
     * 生产者生产产品
     */
    public synchronized int produce(){
        if(products >= 20){
            System.out.println("当前产品数量已达到最大存储容量,无法生产!");
            notify();//唤醒消费者线程
            try {
                wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }else{
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            products++;
            System.out.println(Thread.currentThread().getName()+"生产了一个产品。当前产品数量为:"+products);
        }
        return products;
    }

    /**
     * 消费者消费产品
     * @param counts
     * @return 0:表示当前产品数量不足以消费者消费  其他值：消费产品的数量
     */
    public synchronized int consume(int counts){
        if(products-counts < 0){
            System.out.println(Thread.currentThread().getName()+"消费"+counts+"件商品,库存不足,无法消费");
            notify();//唤醒生产者线程
            try {
                wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return 0;
        }else{
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            products -= counts;
            System.out.println(Thread.currentThread().getName()+"消费"+counts+"件商品,剩余库存数量："+products);
            return counts;
        }
    }
}

/**
 * 生产者进程
 */
class Producer implements Runnable{
    private Shop shop;

    public Producer(Shop shop) {
        this.shop = shop;
    }

    @Override
    public void run() {
        while (true){
            shop.produce();
        }
    }
}

/**
 * 消费者进程
 */
class Consumer implements Runnable{
    private Shop shop;

    public Consumer(Shop shop) {
        this.shop = shop;
    }

    @Override
    public void run() {
        while (true){
            Random random = new Random();
            int counts = random.nextInt(10) +1;//获得[1,10]的随机数
            shop.consume(counts);
        }
    }
}


