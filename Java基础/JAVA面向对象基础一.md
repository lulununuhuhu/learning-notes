[TOC]

## 面向对象和面向过程
面向过程
>把需要完成的任务分成一个个过程，以函数为最小单位，依次执行。
>例：
>把冰箱门打开--->把大象塞入冰箱--->关闭冰箱

面向对象:
>把需要完成的任务分为一个个具有功能/方法的类，以类实例化的对象为最小单位，进行功能的实现。
>例：
>先定义好相关功能的类
>人(打开冰箱  关闭冰箱  抬起大象)
>大象(进入冰箱)
>冰箱(打开 关闭)
>用类实例化一个对象，然后用该对象进行类功能的调用
>人 小明 = new 人 大象 兵兵 = new 大象  冰箱 美的 = new 冰箱
>小明.打开冰箱 小明.抬起大象
>兵兵.进入冰箱
>美的.关闭

## 类和对象
类和对象是面向对象中的两个核心概念
>类：是某一类行为和属性事物的概括，是抽象上、概念上的定义
>对象：对应某一类的具体事物，也称为实例(instance)
1. 创建类
> 包括创建类名、类的属性和方法
```java
//定义一个手机类
public class MobilePhone {
//类的成员变量    
    String brand;//成员变量1：手机品牌名    
    int price;//成员变量2：手机价格    
//类的成员方法    
public void call(){       
        System.out.println("打电话");    
    }    
public void sendMessage(){
        System.out.println("发短信");    
    }
}
```
2. 类的实例化
> 也叫创建类的对象，实例化类
```java
MobilePhone p = new MobilePhone();//创建一个MobilePhone的对象
```
3. 通过实例化的对象调用方法和属性
```java
p.brand = "华为";
p.price=4999;
p.call();
p.sendMessage();
```
## 属性和局部变量
属性定义在类的结构体中，而局部变量一般定义在成员方法中作为形参。属性申明时需用权限修饰符private public protected修饰，缺省时用protected，不同的类型有不同的默认初始值，而局部变量需要初始化。属性是加载到内存堆空间中，局部变量是加载到栈中。
对属性可以赋值的位置：

* 默认初始化
* 显示初始化
* 构造器中初始化
* 有了该类的对象后，通过对象.属性进行赋值
* 在代码块中赋值

## 对象的内存解析
JVM的内存区域分布
![image-20210914082901807](https://gitee.com/lulununuhuhu/img/raw/master/img/202203031418953.png)

1. 堆:存放实例化的对象
2. 虚拟机栈:通常就是指栈，用于存储方法体中的局部变量等。局部变量表存放了编译器可知长度的各种基本数据类型（boolean、byte、char、short、int、float、long、double）、对象引用(reference类型，是对象在堆内存的首地址)。方法执行完后自动释放。
3. 方法区（Method Area），用于存储已被虚拟机加载的类信息、常量、静态变量，即使编译器后的代码等数据。
## 方法重载
1. 概念：overload，在一个类中可以有同名的方法，但这些方法的参数类型和个数或顺序不同
2. 特点：**与返回值类型、权限修饰符、形参变量名、方法体都无关**，**只看参数列表**，且参数列表必须不同。根据调用方法参数列表的不同来区别。
3. 实例：
```java
//返回两个整数的和
int add(int x,int y){return x+y;}
//返回三个这个整数的和
int add(int x,int y,int z){return x+y+z;}
//返回两个double数据的和
double add(double x,double y){return x+y;}
```
## 方法重写
1. 概念：override,子类对继承的父类中的一个方法进行覆盖操作
2. 重写的方法与被重写的方法的形参列表相同，仅是方法体不同（与重载的区别）
3. 重写的方法的权限不小于被重写的方法的权限
4. 不能重写父类中private修饰的方法
5. 返回值类型
1、父类被重写的方法的返回值类型是void，子类重写的方法返回值也为void
2、父类被重写的方法的返回值类型是基本数据类型，子类重写的方法返回值也是基本数据类型（如double，重写方法也是double）
3、父类被重写的方法的返回值类型是A类型，则子类重写的方法返回的数据类型可以是A类或者A类的子类

6. 子类和父类中同名同参数的方法只有同时是非static的情况下才定义为重写，同为static的不能称为重写。
## java中的参数传递机制
> 值传递机制：如果参数是实参类型，那么传递给方法形参的数据是实参实际的数据；如果参数是引用数据类型，赋给形参的是实参存储数据的地址值

## 四种权限修饰符
java中有四种权限修饰符：public、protected、private、缺省。可以用来修饰类中的成员、方法等，用来限定对象对成员的访问权限。
不同权限修饰符的访问限定范围:public>protected>缺省>private
![image-20210914082807575](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20210914082807575.png)

## 构造器
1. 每一个类都有一个默认的空参构造器
2. 定义构造器的格式：权限修饰符 类名(形参列表){}
3. 一个类中可以有多个不同参数的构造器构成重载
4. 一旦我们显式的定义了类的构造器后，就不会再提供默认的空参构造器了

## Java继承性说明
1. 一个类可以被多个子类继承
2. 单继承性：一个子类可继承一个父类（c++中一个子类可继承多个父类）
3. 子类继承父类之后即可拥有直接父类和间接父类的所有属性和方法
4. 所有的类不管有没有显式申明继承类，都可私用`java.lang.object`类中的方法，object类是所有类的基类

## Super关键字的使用
1. 在子类和父类出现相同的属性名时（类的属性相同不会覆盖）,需用super和this来区分。super.属性调用的是父类的属性，this.属性调用的是子类的属性。
2. 在父类的方法被重写后，又需要在子类的方法中调用父类未被重写的方法，则需用super.方法进行显示的声明。
3. super调用构造器
3.1 我们可以在子类的构造器中显式的使用“super（形参列表)”的方式，调用父类中声明的指定的构造器
3.2 super(形参列表)的使用必须声明在子类构造器的首行
3.3 在类的构造器中，针对于"this（形参列表）"或者"super（形参列表）"只能二选一，不能同时出现
3.4 在构造器的首行，没有显式的声明"this(形参列表)"或super（形参列表），则默认调用的是父类空参的构造器即super()
3.5 在类的多个构造器中，至少有一个类的构造器中使用了"super(形参列表)"，调用了父类的构造器。
## 多态
1. 定义：一个事物的多种形态
2. 对象的多态性：父类的引用指向子类的对象或者说子类的对象赋给父类的引用
3. 在有了对象的多态性以后，我们在编译器只能调用父类中声明的方法，但在运行期实际执行的是子类重写父类的方法。比如：Person p = new Student()
4. 多态使用的前提：1、类的继承性 2、有方法的重写
5. 多态性只适用于方法，**不适用于属性和子类特有的方法**。即Person p = new Student()中p只能用自己类的属性，不能用Student子类的属性
多态情况下的虚拟方法调用：子类与父类有同名同参的方法时。在多态情况下，将此时父类的方法称为虚拟方法。父类根据赋给它的不同子类对象，动态地调用属于子类的该方法。这样的方法在编译时时无法确定的。
## equals()方法和==的区别
1. equals()是一个方法，只能用于引用数据类型，而==则可以比较基本数据类型以及引用数据类型的**地址值**
2. Object类中equals（）的定义：
    `public boolean equals(Object obj){
        return this == obj;
    }`
    该方法比较类对象的值与obj是否相同，功能上与==相同
3. 像String、Date、File、包装类等都重写了Object类中的equals方法。重写之后，比较的是对象中内容是否相同
4. 通常情况下，我们自定义的类如果使用equals()的话，也通常是比较两个对象的内容是否相同，所以我们需要对Object类中的equals方法进行重写。
5. equals()方法在idea等IDE中可以一键生成 
```java
@Overridepublic 
boolean equals(Object o) { 
if (this == o) return true;  
if (o == null || getClass() != o.getClass()) return false;  
MyDate myDate = (MyDate) o;  
return day == myDate.day && month == myDate.month && year == 
myDate.year;
}
//IEAD生成的重写equals()方法模板
```
## toString（）的使用
1. 当我们输出一个对象的引用时，实际上就是调用当前对象的toString()
2. Object类中toString()的定义:
```java
public String toString（）{
return getClass().getName()+"@"+Integer.toHexString（hashCode()）;
}
```
3. 像String、Date、File、包装类等重写了Object类中的toString()方法，可以自定义返回方法体中属性的内容。

## Wrap包装类的使用
1.定义：Wrap包装类可以将一些常见的数据类型如int、double、char等封装到对应的类中。如int封装到Integer类中，这样就可以在Integer类中使用int数据类型。Java提供了8中基本数据类型对应的包装类，使得基本数据类型有了类的特征,同时可以在只针对引用数据类型设计的java高级特性中（如泛型、集合类）使用。

例：

```java
int num = 10;
Integer n = new Integer(num);//将整形数字num封装都Integer类中
System.out.PrintIn(n.toString());//使用Inerger类中的toString()方法
```
基本数据类型到包装类的两种定义方法：

```java
    @Test
    public void test(){
        //使用构造器定义
        int i = 10;
        Integer integer = new Integer(i);
        System.out.println(integer);
    }
    
    @Test
    public void testWrapper(){
        //使用jdk5之后的新特性：自动装箱
        Integer integer = 5;
        System.out.println(integer);
    }
```

包装类转化成基本数据类型的方法：调用方法的xxxValue

```java
    @Test
    public void test1(){
        //调用包装类中的xxValue方法
        Integer integer = new Integer(5);
        int i = integer.intValue();
        System.out.println(i);
        Float aFloat = new Float(5.6);
        float floatValue = aFloat.floatValue();
        System.out.println(floatValue);
    }

    @Test
    public void test2(){
        //采用jdk5之后的新特性：自动拆箱
        Double aDouble = new Double(5.66);
        System.out.println(aDouble);
    }
```

2. 自动装箱和自动拆箱
    这是一个JDK5.0之后的新特性，可以说是一个语法糖，可以将基本数据类型和包装类之间的转化变得非常简单。
    
    基本类型--->包装类型就是自动装箱，包装类型--->基本类型就是自动拆箱。

```java
//基本数据类型->包装类的对象 
int num1 = 10;
Integer in1 = num2;//自动装箱

//包装类的对象->基本数据类型
int num3 = in1;//自动拆箱
```
### 基本数据类型 包装类 String类之间互相转化关系

```java
/**
 * 包装类转化成String类型：调用String的静态方法valueOf()
 */
@Test
public void testWrapperToString(){
    int i = 5;
    Integer integer = new Integer(i);
    String s = String.valueOf(integer);
    System.out.println(s);

    boolean flag = false;
    Boolean aBoolean = new Boolean(flag);
    String s1 = String.valueOf(aBoolean);
    System.out.println(s1);
}

/**
 * String类型转化成包装类,调用包装类的parseXXX()静态方法
 */
@Test
public void testStringToWrapper(){
    String a = "falses";
    Boolean b = Boolean.parseBoolean(a);
    System.out.println(b);
}
```

## static关键字的使用
1. static可以用来修饰属性、方法、代码块、内部类(**不能是外部类**)。static的最大特点：**随着类的加载而加载**
2. 使用static修饰的属性称为静态变量或类变量，不用static修饰的叫实例变量。
静态变量：一个类的多个实例化的对象共享这一个静态变量，其中一个实例化对象修改后，另一个实例化对象调用的就是修改后的值。
实例变量：一个类的每个实例化对象都独享自己的变量，相互不会影响。
3. 静态变量随着类的加载而加载，可以通过“类.静态变量”的方式进行说明；静态变量的加载要早于对象的创建；由于类只会加载一次，所以静态变量在内存中也只会存在一份于方法区的静态域中
4. 使用static修饰方法是静态方法，随着类的加载而加载，可以通过“类.静态方法”的方式进行调用；**静态方法中，只能调用静态的方法或属性;非静态方法中，既可以调用非静态的方法或属性，也可以调用静态的方法或属性**。
5. 注意点：在静态的方法内，不能使用this、super关键字
6. 设置属性或变量为static的常见情况：属性可以是多个对象共享，可以共同变化；操作静态属性的方法一般设置为静态方法或者一些工具类，习惯上会声明static，比如Math，Arrays，Collections。

