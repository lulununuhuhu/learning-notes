[TOC]

## 反射机制概述

> Reflection(反射)是被是为动态语言的关键，反射机制允许程序在执行期间借助于Reflection API**取得任何类的内部信息**，并能直接操作任意对象的内部属性及方法。

[^动态语言]: 是指哪些在运行时可以改变其结构的语言：例如新的函数、对象、甚至代码可以被引进，已有的函数可以被删除或是其他结构上的变化，即在运行时代码可以根据某些条件改变自身结构，主要动态语言有`Object-c c#  JavaScript PHP Python`等
[^静态语言]: 运行时结构不可变的语言就是静态语言，如`Java C C++` ,但是Java可以通过反射机制，可以获得类似动态语言的特性

> 加载完类之后，在堆内存的方法区种就产生了一个Class类型的对象（一个类只有一个Class对象），这个对象就包含了完整的类的结构信息。我们可以通过这个对象看到类的结构。这个对象就像一面镜子，透过这个镜子看到类的结构，所以形象的称他为反射。

## 反射相关的API

* `java.lang.Class`：代表一个类
* `java.lang.reflect.Method`:代表类的方法
* `java.lang.reflect.Field`:代表类的成员变量
* `java.lang.reflect.Constructor`:代表类的构造器
* .....

## 关于java.lang.class类的理解

首先我们回复一下类的加载过程：首先通过javac.exe命令将Java文件编译成字节码文件(.class文件)；然后我们使用java.exe命令对某个字节码文件进行解释运行，相当于将某个字节码文件加载到内存中，这个过程称为类的加载。加载到内存中的类，我们就称为运行时类，此运行时类就是作为Class的一个实例。Class的一个实例对应着一个运行时类。

![image-20220508094931130](https://gitee.com/lulununuhuhu/img/raw/master/img/202205080949275.png)

​														   **Class类、具体类、对象之间的关系**

其中**Class类与某个运行时类是一对一的关系**，**运行时类与对象是一对多的关系**；即一个Class类只能实例一个运行时类（**单例**）；而一个运行时类可以实例化多个对象。

## 哪些类可以有Class实例

* Class:包括外部类、成员（成员内部类、静态类）、局部内部类、匿名内部类
* interface:接口
* []：数组
* enum:枚举
* annotation:注解
* primitive type:基本类型
* void



## 获取Class实例的方式

加载到内存中的运行时类，会缓存一定的时间。在此时间之内，我们可以通过不同的方式获取此运行时类的Class实例。

* 调用运行时类的属性class

  ```java
  Class clazz = Person.class;
  ```

* 通过运行时类的对象调用getClass()方法

  ```java
  Person p1 = new Person();
  Class clazz = p1.getClass();
  ```

* 调用Class的静态方法:`forName(String classpath)` classpaths是包名.类名  (最常使用)

  ```java
  Class clazz = Class.forName("Reflection1.Person");
  Class clazz1 = Class.forNmae("java.lang.String");
  ```

* 使用类的加载器：ClassLoader

  ```java
  ClassLoader classLoader = ReflectionTest.class.getClassLoader();//类名.class.getClassLoader()
  Class clazz = classLoader.loadClass("Reflection1.Person");
  
  ```

## 类的加载与ClassLoader的理解

![image-20211026175133133](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211026175133133.png)

![image-20211026175619746](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211026175619746.png)

```java
/**
 * 了解类的加载器ClassLoader
 */
public class ClassLoaderTest {
    @Test
    public void test(){
        //对于自定义类，使用系统加载器进行加载
        ClassLoader classLoader = ClassLoaderTest.class.getClassLoader();
        System.out.println(classLoader);
        //调用系统类加载器的getParent():获取扩展类加载器
        ClassLoader classLoader1 = classLoader.getParent();
        System.out.println(classLoader1);
        //扩展类加载器的上一层是引导类加载器bootraploader
        ClassLoader classLoader2 = classLoader1.getParent();
        System.out.println(classLoader2);//无法获得引导类加载器的对象

        System.out.println(String.class.getClassLoader());//String类的类加载器是引导类加载器，无法获取
    }
}
```

## 使用ClassLoader读取properties文件

### 方式一

```java
@Test
public void way1() throws Exception {
    //默认当前目录是module目录下
    FileInputStream fis = new FileInputStream("src//demo.properties");
    Properties properties = new Properties();
    properties.load(fis);
    String user = properties.getProperty("user");
    String password = properties.getProperty("password");
    System.out.println(user);
    System.out.println(password);
}
```

### 方式二

```java
public void way2() throws IOException {
    Properties properties = new Properties();
    //默认当前目录是src目录下
    InputStream is = ClassLoader.getSystemResourceAsStream("demo.properties");
    properties.load(is);
    String user = properties.getProperty("user");
    String password = properties.getProperty("password");
    System.out.println(user+password);
}
```

## 通过反射获取类的内部结构

### 获取类的属性

`Class.getFields()`:获取当前运行时类及其父类**所有的public修饰的属性**

`Class.getDeclaredFields()`:获取当前运行时类的**所有属性**

```java
Class clazz = Class.forName("Info.Person");//获取Class实例
//getFields()获取当前运行时类及其父类的所有public修饰的属性
Field[] fields = clazz.getFields();
for (Field f:fields)
    System.out.println(f);
System.out.println("******************************");
//getDeclaredFields()获取当前运行时类的所有属性
Field[] declaredFields = clazz.getDeclaredFields();
for(Field f:declaredFields)
    System.out.println(f);
```

### 获取类的方法

`Class.getMethods()`:获取当前运行时类及其父类**所有的public修饰的属性**

`Class.getDeclaredMethods()`:获取当前运行时类的所有方法

### 获取类的注解、返回值类型、形参列表、异常类型

`Method.getAnnotations()`:获取方法的注释类型（只返回`RetentionPolicy.RUNTIME`类型的注解）

`Method.getRuturnType()`:获取方法的返回值类型，以Method数组的形式呈现

`Method.getParameterTypes()`:获取形参列表的类型

`Method.getExceptionTypes()`:获取方法的异常类型

```java
Class clazz = Class.forName("Info.Person");
Method[] methods = clazz.getDeclaredMethods();//获取Person类中的所有方法
for(Method m:methods){
    System.out.print(m);//获取方法名
    Annotation[] annotations = m.getAnnotations();//获取m方法的注解
    for(Annotation a:annotations)
        System.out.print("\t注解是:"+a);//由于@override的注解定义是RetentionPolicy.SOURCE，无法显示出来
    String modify = Modifier.toString(m.getModifiers());//获取m方法的权限修饰符
    System.out.print("\t权限修饰符是:"+modify);
    Class returnType = m.getReturnType();
    System.out.println("\t返回类型是:"+returnType.getName());//获取m方法的返回类型
    Class[] parameterTypes = m.getParameterTypes();//获取m方法的形参列表的类型
    if(parameterTypes == null ||parameterTypes.length==0)
        System.out.println("\t无形参");
    else{
        for(Class c:parameterTypes)
            System.out.println("\t"+c.getName());
    }
}
```

### 获取类的构造器

`Class.getConstructors()`:获取当前运行时类的public权限的构造器

`Class.getDeclaredConstructors()`:获取当前运行时类的所有构造器

### 获取父类及泛型类类型

`Class.getSuperClass()`：获取运行时类的父类

`Class.getGenericSuperClass()`:获取运行时类中带泛型的父类

获取运行时类中泛型的类型

```java
Class clazz = Class.forName("Info.Person");
ParameterizedType genericSuperclass = (ParameterizedType) clazz.getGenericSuperclass();
System.out.println(genericSuperclass);
ParameterizedType parameterizedType = (ParameterizedType) genericSuperclass;
Type[] genericArgumentsTypes = parameterizedType.getActualTypeArguments();
for(Type t:genericArgumentsTypes)
    System.out.println(t.getTypeName());//获取泛型的类型
```

**此外，还可以通过反射获取接口、所在包信息等，方法基本类似，不再赘述**

### 设置类中指定的属性

```java
Class<Person> clazz = Person.class;
//创建运行时类的对象
Person instance = clazz.getDeclaredConstructor().newInstance();
Field age = clazz.getDeclaredField("age");
age.setAccessible(true);//将属性age设置为可访问的
age.set(instance,15);//设置指定属性age的值

Object o = age.get(instance);//获取instance对象的age属性的值
System.out.println(o);
```

### 设置类中指定的方法

```java
Class<Person> clazz = Person.class;
Person person = clazz.getDeclaredConstructor().newInstance();
System.out.println("******************反射调用person类中的私有方法*************");
//获取指定的方法，注意对应参数的运行时类的实例
Method getIntroduction = clazz.getDeclaredMethod("getIntroduction");
getIntroduction.setAccessible(true);
Object o = getIntroduction.invoke(person);//使用invoke方法让person调用getIntroduction方法，返回方法的返回值
System.out.println(o);//getIntroduction没有返回值，所以返回值是null

System.out.println("****************反射调用person类中的静态方法**************");
Method desc = clazz.getDeclaredMethod("desc", String.class);
desc.setAccessible(true);
Object res = desc.invoke(clazz, "陆成");
System.out.println(res);
```

### 设置类中指定的构造器

```java
Class clazz = Person.class;
//获取指定的私有构造器private Person(String name)
Constructor constructor = clazz.getDeclaredConstructor(String.class);
//保证此构造器是可访问的
constructor.setAccessible(true);

//使用此构造器创建运行时类的对象
Person p = (Person) constructor.newInstance("Tom");
System.out.println(p);
```
