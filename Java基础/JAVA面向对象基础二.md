[TOC]

## 设计模式

### 单例(Singleton)设计模式

- 核心思想：采取一定的方法保证在整个的软件系统中对某个类**只能存在一个对象实例**，并且该类只提供一个取得其对象实例的方法。

- 具体逻辑：首先将类的构造器的访问权限设置为private，这样就不能用new操作符在类的外部开始还无法得到类的对象，只能调用**该类的某个静态方法**以返回类内部创建的对象，静态方法只能访问类中的静态成员变量，所以指向类内部产生的**该类对象的变量也必须定义成静态的**

- 设计方法

  1. 饿汉式

     ```java
     class bank{
         //1. 私有化类的构造器
         private bank(){}
     
         //2. 内部创建类的对象,且该对象必须是static
         private static bank instance = new bank();
     
         //3. 创建一个方法进行调用实例，类方法必须是static
         public static bank getInstance(){
             return instance;
         }
     }
     ```

     

  2. 懒汉式

     ```
     class Order{
         //先对构造器进行私有化
         private Order(){
     
         }
         //先将类实例对象初始为null
         private static Order order = null;
     
         //使用静态对象获取实例
         public static Order getInstance(){
             if(order == null){
                 order = new Order();//如果order未被实例化仍为null时，将order实例化出来
             }
             return order;
         }
     }
     ```

- 单例模式的优点

  由于单例模式只生产一个实例，**减少了系统性能开销**，当一个对象的产生需要比较多的资源时，如读取配置、产生其他依赖对象时，则可以 通过在应用启动时直接产生一个单例对象，然后永久驻留内存的方式来解决。

- 常见应用场景：网站的计数器；应用程序的日志应用、数据库连接池、读取配置文件的类等等。

### 模板方法(Template method)

> 抽象类体现的就是一种模板模式的设计。当功能内部一部分实现是确定的，而其中有一部分是不确定的，这是可以让**这个不确定的部分功能定义成一个抽象方法，在子类中实现具体的功能**，然后通过多态进行具体调用，这就是一种模板模式。

### 代理模式（proxy）

> 代理模式是Java开发中使用较多的一种设计模式。代理设计就是为其他对象提供代理以控制这个对象的访问

1. 应用场景：

   1. 安全代理：屏蔽对真实角色的直接访问
   2. 远程代理：通过代理类处理远程方法调用（RMI）
   3. 延迟加载：先加载轻量级的代理对象，真正需要时加载全部对象

2. 分类：

   1. 静态代理（静态定义代理类）

   ```java
   package ProxyDemo;
   /*
   * 接口的应用：代理模式
   * */
   public class NetworkTest {
       public static void main(String[] args) {
           Server server = new Server();
           ProxyServer proxyServer = new ProxyServer(server);
           proxyServer.browse();
       }
   }
   interface Network{
       public void browse();
   }
   
   //被代理类
   class Server implements Network{
   
       @Override
       public void browse() {
           System.out.println("真实的服务器访问网络");
       }
   }
   
   //代理类
   class ProxyServer implements Network{
       private Network network;
       public ProxyServer(Network network){
           this.network = network;
       }
       public void check(){
           System.out.println("联网前检查工作!");
       }
   
       @Override
       public void browse() {
           check();
           network.browse();//使用被代理类的browse方法
       }
   }
   ```

   2.动态处理（动态生成代理类）JDK自带的动态处理，需要反射等知识。

## 代码块

1. 作用：用来初始化类、对象

2. 代码块只能用static修饰，分为静态代码块和非静态代码块

3. 静态代码块

   1. 作用：初始化类的信息
   2. **随着类的加载而执行且只执行一次**
   3. 如果一个类中定义了多个静态代码块，则按声明顺序进行执行
   4. 静态代码块执行先于非静态代码块执行
   5. 内部可以有输出语句
   6. 静态代码块只能使用静态属性和方法

4. 非静态代码块

   1. 作用：可以在创建对象时对对象的属性等进行初始化
   2. **随着对象的创建而执行**
   3. 每创建一个对象就执行一次非静态代码块
   4. 如果一个类中定义了多个非静态代码块，按声明顺序执行
   5. 非静态代码块既可以使用静态的属性和方法也可以使用非静态的


## final

1. final可以用来修饰类、方法、变量

2. final用来修饰类时，此类不能被其他类所继承，比如String类、System类 、StringBuffer类

3. final用来修饰方法时，方法也不能再被重写

4. final用来修饰变量时，此时的变量就称为是一个常量

   1. final修饰属性时可以考虑赋值的位置有：显式初始化、代码块中初始化、构造器中初始化
   2. final修饰局部变量：尤其是使用final修饰形参时，表明此形参是一个常量。当我们调用此方法时，给常量形参赋一个实参，一旦赋值以后，就只能在方法体内调用形参但不能重新赋值。
   3. static final可以组合在一起修饰属性，可以作为**全局常量**

   
## 抽象类

>  随着继承层次中一个个新子类的定义，类变得越来越具体，而父类则更一般更通用。类的设计应该保证父类和子类能够共享特征。或者说抽象类作为多个子类的通用模板，子类在抽象类的基础上进行扩展、改造，但子类总体上会保留抽象类的行为方式。有时将一个子类设计得非常抽象以至于它没有具体的实例，这样的类叫做**抽象类**,用abstract修饰

abstract可以修饰类和方法

1. abstract修饰类：
   - 此类**不能实例化**
   - 抽象类中一定有构造器，便于子类实例对象进行调用
   - 开发中，都会提供抽象类的子类，让子类对象实例化，完成相关的操作
2. abstract修饰方法
   - 抽象方法**只有方法的声明没有方法体**
   - 包含抽象方法的类一定是个抽象类
   - 若子类重写了父类中的所有的抽象方法后，此类方可实例化
   - 若子类没有重写父类中的所有的抽象方法，则此类**仍然是个抽象类**，需用abstract修饰
3. abstract使用上的注意点：
   - abstract不能用来修饰：属性、构造器等结构
   - abstract不能用来修饰私有方法、静态方法、final的方法和类


```
补充：抽象类中的方法可以有方法体，也可以没有方法体，但是没有方法体的话一定要用abstract修饰；继承该抽象类的子类，如果没有重写该方法那么也只能是抽象类
```

## 接口

> 用Interface关键字定义。Java中有个一个类只能继承一个父类的原则，所以当一个类想要拥有多个类的属性方法时，该怎么解决呢？Java提供了接口进行解决这个问题。

1. Java中接口和类是并列的两个结构

2. 定义接口中的成员

   2.1 JDK7及以前，只能定义全局常量和抽象方法

   - 全局常量：public static final类型的，是接口中变量的默认类型
   - 抽象方法：public abstract

   2.2 JDK8以后：除了定义全局变量和抽象方法之外，还可以定义静态方法、默认方法

   ​		例如：

   ```java
   interface Circle{
   	public static void method1();//静态方法1，静态方法不能由实现类的对象调用，可以由接口自身调用
       public default void method2();//默认方法2，使用default关键字
       public default void method3();//默认方法3，默认方法可以通过实现类的类对象进行调用，如果实现类重写了此方法，则可调用重写的默认方法
   }
   ```

   

3. 接口中不能有构造器，所以接口不能实例化

4. Java开发中，接口通过让类去实现(implements)的方式来使用，如果实现类覆盖了接口中的所有抽象方法，对此实现类就可以实例化。如果实现类没有覆盖接口中所有的抽象方法，则此实现类**仍然为一个抽象类**

5. Java类可以实现多个接口从而弥补Java单继承的局限性

```java
class AA extends BB implements CC,DD,EE//类AA继承自类BB并实现接口CC、DD、EE中的抽象方法
```

6. 接口与接口之间可以继承而且**可以多继承**
7. 在方法中使用接口作为形参也可以实现多态性

```java
public class  USBTest{
    public static void main(String[] args) {
        Computer computer = new Computer();
        Printer printer = new Printer();
        computer.transferData(printer);//USB usb = new Printer()
        //输出：打印机开始工作
		//		传输数据..
		//		打印机结束工作 
    }
}
class Computer{
    //通过形参接口实现接口的多态性
    public void transferData(USB usb){
        usb.start();
        System.out.println("传输数据..");
        usb.end();
    }
}
class Printer implements USB{

    @Override
    public void start() {
        System.out.println("打印机开始工作");
    }
    @Override
    public void end() {
        System.out.println("打印机结束工作");
    }
}
```

## 内部类

>类的完整声明放在另一个类中，该类称为内部类，所在的类称为外部类。
>
>这是类的又一个成员。

### 内部类使用举例：

Thread类

HashMap类

### 内部类分类

按是否有static修饰可以分成静态内部类和非静态内部类。

静态内部类和非静态内部类的申明方法如下：

```java
public class Animal {
    //申明静态成员内部类
    static class Dog{
        public void eat(){
            System.out.println("狗吃骨头");
        }
    }

    //申明普通成员内部类
    class Cat{
        public void eat(){
            System.out.println("猫吃鱼");
        }
    }
}
```

静态内部类和非静态内部类的创建实例方法如下：

```java
//创建静态内部类的实例
Animal.Dog dog = new Animal.Dog();
dog.eat();

//创建普通内部类的实例
// 1. 先创建外部类对象
Animal animal = new Animal();
//  2. 再创建内部类对象
Animal.Cat cat = animal.new Cat();
cat.eat();
```

按照声明位置又可分为成员内部类和局部成员内部类

实际开发场景中，经常在方法体，构造器中创建匿名的局部成员内部类的对象。

```java
public Comparable getInstance(){
    //这是创建匿名局部成员内部类的简化方式
    return new Comparable() {
        @Override
        public int compareTo(Object o) {
            return 1;
        }
    };
}
```

## 枚举类

> 枚举类是一种特殊的类，类名由enum关键字修饰。枚举类通过**私有化了构造器**只能在类内部自己声明有限个对象实例,然后供外部进行调用。所以枚举类**不能在外部类实例化**
>
> 在JDK5.0之后，enum枚举类默认继承了lang包下的Enum类，该类中公有了一些方法属性如`name ordinal`等方法用来获取枚举对象实例的相关属性。
