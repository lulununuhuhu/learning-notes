[TOC]

# 异常处理

## 异常概述与异常体系结构

> 在Java语言中，将程序执行中发生的不正常情况称为异常

所有异常类型的根父类是`Throwable`,它的两个子类是Exception和Error，分别代表了Java异常体系中的两类事件。

Java程序在执行过程中所发生的异常事件可分为两类：

 	1. Error类型：Java虚拟机无法解决的严重问题。如JVM系统内部错误、资源耗尽等严重情况，常见的由StackOverflow和OutOfMemory。这种情况一般不编写针对性的代码修改
 	2. Exception：其他因编程错误或偶然的外因素导致的一般性问题可以使用抛出异常的方式来获取异常类型。常见的异常类型由空指针访问、试图读取不存在的文件、网络连接中断、数组角标越界等

根据Java程序运行时**发生异常的不同时期**也可分为两类：

1. 编译时异常（红色方框）
2. 运行时异常（蓝色方框）

![image-20230311180034377](img/image-20230311180034377.png)

> 判断某个异常是编译时异常还是运行时异常最简单的方法就是：在idea等开发工具中，如果代码下面出现要你添加异常处理的波浪线时就是编译时异常，因为你不添加的话无法编译通过。如果某个异常是在运行后出现的，那它就是运行时异常。

## 异常处理机制

在编写程序时，要经常考虑在有可能出错的代码中添加检测。如进行x/y运算时，要检测分母为0，是否为空，输入的是否是字符。如果采用if-else判断的话，代码过于臃肿，可读性差。

Java采用的异常处理进制，是将异常处理的程序代码集中在一起，并抛出不同的异常类型供程序员进行判断。这样可以使程序便于维护。

Java采用的异常机制可分为两种模型，抓取异常然后处理，即try-catch-final模型；还有一种就是抛出异常给上层调用者处理，即throws+异常类型。

### try-catch-final的使用

代码结构为：

```java
try{
    //可能出现异常的代码
}catch(异常类型1 变量名1){
	//处理异常的方式1
}catch(异常类型2 变量名){
	//处理异常的方式2
}
...
finally{
	//一定会执行的代码
}
//finally可以不使用
```

1. finally是可选的
2. 使用try将可能出现异常的代码块包起来，在执行过程中一旦出现异常，就会生成一个对应异常类的对象，根据此对应异常的类型，去catch中进行匹配，执行对应catch语块中的程序（生成异常的代码后面的语句就不会再执行）
3. 一旦try中的异常对象匹配到一个catch时，就会直接跳到catch中进行异常的处理。处理完成后就会跳出try-catch，去执行finally中的代码块（如果有的话），然后最终按顺序执行接下来的代码
4. catch中的异常类型如果没有子父类关系，则谁声明在上，谁声明在下无所谓；如果异常类型满足子父类关系，则要求子类一定声明在父类的上面，否则会报错
5. 常用的异常对象处理的方式 String getMessage()  printStackTrace()
6. 在try结构中声明的变量，生命周期只在try-catch结构体中
7. try-catch-finally结构可以嵌套

例：

```java
   FileInputStream fis = null;
        try{
            File file = new File("D:\\IdeaProjects\\20210918\\src\\hello.txt");//使用绝对路径
            fis = new FileInputStream(file);
            int data = fis.read();
            while (data != -1){
                System.out.println((char)data);
                data = fis.read();
            }
        } catch (FileNotFoundException e){
            System.out.println(e.getMessage());//FileNotFoundException是IOException的子类
        }catch (IOException e){
            System.out.println(e.getMessage());
        }finally {
            try {
                if(fis != null)
                    fis.close();//避免fis为null导致空指针异常
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
```

8. 一旦有异常没有捕获到，那么异常下面的**除了finally块中的语句都不会执行**
9. 在try或者catch块中返回的值会**生成一个副本存储到方法栈中的一个局部变量**中，即使接下来finally对返回值的变量进行了修改，最终返回的仍然是之前的那个局部变量，即try或catch中返回的值。
10. 如果finally中有return的话，那会覆盖try或者catch中返回的结果，一般不建议这么做

例:

```java
public class TryCatchDemo2 {
    public static void main(String[] args) {
        int res = test();
        System.out.println("res = "+res);
    }

    public static int test(){
        int a = 25;
        try {
            System.out.println("这是在try块中执行的内容");
//            int b = 10/0;
            return 0;
        }catch (Exception e){
            System.out.println("这是在catch块中执行的内容");
            return a;
        }finally {
            System.out.println("这是在finally块中执行的内容");
            a = 2;
            return 3;   //finally中return的值会覆盖掉catch块中return的值
        }
    }
}
```

总结：使用try-catch-finally处理编译时异常，使得程序在编译时就不再报错，但是运行时仍然可能报错。可理解为我们使用try-catch-finally将一个编译时可能出现的异常**延迟**到运行时出现；实际开发中，**由于运行时异常比较常见，所以我们通常就不针对运行时异常编写try-catch-finally了，针对编译时异常，一定要考虑异常的处理**。

### throws+异常类型

1. throws+异常类型写在方法声明处，指明此方法执行时可能会抛出的异常类型。一旦当方法体执行时，出现异常仍然会在异常代码处生成一个异常类的对象，此对象满足throws后异常类型时就会被抛出。出现的异常代码后续的的代码，不会再执行。

### 两种处理机制的区别

throws+异常类型是将出现异常的代码的异常类型抛出给上层的调用对象，自己不处理；而try-catch将异常捕获后会进行处理。

如果**<u>父类中被重写的方法没有throws方式处理异常，则子类重写的方法也不能使用throws</u>**，意味着如果子类重写的方法中有异常，必须使用try-catch-finally方式处理。

执行的方法a中，先后调用了另外的几个方法，这几个方法是递进关系执行的。我们建议这几个方法使用throws的方式进行处理，而执行的方法a可以考虑使用try-catch-finally方式进行处理。

### 关于异常对象的产生

1. 系统自动生成的异常对象
2. 手动的生成一个异常对象，并用throw抛出

## 自定义异常类

自定义异常类要求：

1. 继承于现有的异常结构：如RuntimeException、Exception
2. 提供全局常量：serialVersionUID
3. 提供重载的构造器

例：

```java
class MyException extends Exception{
    static final long serialVersionUID = -7034897190745766939L;

    public MyException() {
    }

    public MyException(String message) {
        super(message);
    }
}
```
