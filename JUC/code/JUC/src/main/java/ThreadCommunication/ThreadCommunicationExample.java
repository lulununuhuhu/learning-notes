package ThreadCommunication;

public class ThreadCommunicationExample {
    public static void main(String[] args) {
        Message message = new Message();

        Thread producerThread = new Thread(new Producer(message));
        Thread consumerThread = new Thread(new Consumer(message));

        producerThread.start();
        consumerThread.start();
    }
}

class Message {
    private String content;
    private boolean isNewContent = false;

    public synchronized void put(String content) {
        while (isNewContent) {
            try {
                wait(); // 等待消费者取走消息
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        this.content = content;
        isNewContent = true;
        notify(); // 通知消费者有新消息
    }

    public synchronized String take() {
        while (!isNewContent) {
            try {
                wait(); // 等待生产者放入消息
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        isNewContent = false;
        notify(); // 通知生产者可以放入新消息
        return content;
    }
}

class Producer implements Runnable {
    private Message message;

    public Producer(Message message) {
        this.message = message;
    }

    public void run() {
        for (int i = 1; i <= 5; i++) {
            String content = "Message " + i;
            message.put(content);
            System.out.println("Produced: " + content);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class Consumer implements Runnable {
    private Message message;

    public Consumer(Message message) {
        this.message = message;
    }

    public void run() {
        for (int i = 1; i <= 5; i++) {
            String content = message.take();
            System.out.println("Consumed: " + content);
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
