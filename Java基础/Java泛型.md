## 泛型概念

> 所谓泛型，就是允许在定义类、接口时通过一个标识`<>`表示类中某个属性的类型或者是某个方法的返回值及参数类型，这个类型参数将在使用时（例如继承或实现这个接口，用这个类型声明变量、创建对象时）确定。
>
> 从Jdk1.5之后，Java引入了参数化类型的概念，允许我们在创建集合时再指定集合元素的类型，正如`List<String>`表示该list只能保存字符串类型的对象。

## 集合中使用泛型

1. 集合接口或集合类在jdk5.0时都修改为带泛型的结构
2. 在实例化集合类时，可以指明具体的泛型类型
3. 指明完以后，在集合类或接口中凡是定义类或接口时，内部结构（比如方法、构造器。属性等）都会自动调用实例化的泛型类型
4. 泛型的类型必须是类，不能是基本数据类型，需要用包装类替换
5. 如果实例化时没有指明泛型的类型，则默认类型是java.lang.Object类型

```java
 //在ArrayList中使用泛型
 @Test
public void test1() {
    ArrayList<Integer> list = new ArrayList<Integer>();//通过泛型创建一个只有Integer类型元素的ArrayList
    list.add(78);
    list.add(88);
    list.add(98);
    list.add(68);
    for (Integer score : list) {
        System.out.println(score);
    }

    Iterator<Integer> iterator = list.iterator();
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
}

//在HashMap中使用泛型
 @Test
 public void test2(){
     HashMap<String, Integer> map = new HashMap<>();//用泛型定义一个key是String类型，value是Integer类型的HashMap
     map.put("tom",13);
     map.put("nancy",19);
     map.put("gucci",50);

     Set<Map.Entry<String, Integer>> entrySet = map.entrySet();
     Iterator<Map.Entry<String, Integer>> iterator = entrySet.iterator();
     while (iterator.hasNext()){
         Map.Entry<String, Integer> entry = iterator.next();
         System.out.println(entry.getKey()+"------>"+entry.getValue());
     }
 }
```

## 自定义泛型结构

![image-20211101111719519](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211101111719519.png)

1. 泛型类可能有多个参数，此时应该将多个参数一起放在<>内，比如<T1,T2,T3> 
2. 泛型类的构造器是`public GenericClass()`而不是~~`public GenericClass<E>(){}`~~
3. 实例化后，操作原来泛型位置的结构必须与指定的泛型类型一致
4. 泛型如果不指定，即不使用<>的情况下，对应的类型均按Object处理，但不等价于Object。一般情况 下：泛型要么在整个类的结构中都是用，要么都不要用
5. 如果泛型是一个接口或抽象类，则不可创建泛型类的对象
6. Jdk1.7以后的泛型简化操作：`ArrayList<String> list = new ArratList<>()`,即可以类型推断
7. 泛型的指定用不能使用基本数据类型，需用相应的包装类代替
8. 在类/接口上声明的泛型，在本类或本接口中即代表某种类型，可以作为非静态属性的类型、非静态方法的参数类型、非静态方法的返回值类型。但**在静态方法中不能使用类的泛型**
9.  不能使用`new E[]`但是可以用`E[] elements = (E[])new Object[capacity]`来代替，比如ArrayList源码中声明使用的是Object[] elementData，而非泛型参数类型数组
10. 父类有泛型的情况下，子类可以选择保留泛型也可以选择指定泛型类型

![image-20211101112630753](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211101112630753.png)

## 泛型在继承方面的体现

> 假如A是B的父类，在多态性的原则下，A、B类实例出来的对象可以互相转化，例如

```java
Object[] A = new Object[];
String[] B = new String[];
A = B;//编译器不报错
```

而G<A>和G<B>实例化出来的对象两者之间不能互相转化，例如

```java
ArrayList<String> list1 = new ArrayList<>();
ArrayList<Object> list2 = new ArrayList<>();
list1 = list2;//编译器会报错
```

总结：当类A是类B的父类时，G<A>和G<B>二者之间不具有子父类关系，二者是并列关系，无法进入引用转化和形参赋值。

> 假如 A是B的父类,A<G>和B<G>两者之间是可以互相转化的,例如

```java
AbstractList<String>  list3 = null;
ArrayList<String> list4 = null;
list3 = list4;//编译器不报错
```

总结：A<G>和B<G>之间可以转化，而且子类在继承父类时可以指定泛型类型，具体见上图。

## 通配符?的使用

上一节提到G<A>和G<B>无法转化，则无法应用多态性在一个通用方法中进行形参赋值，此时通过引入G<?>解决

```java
public void show(ArrayList<?> list){
    Iterator<?> iterator = list.iterator();
    while(iterator.hasNext())
        System.out.println(iterator.next());
}//ArrayList<?> list 可以作为ArrayList0反应的通用方法,ArrayList<String>和ArrayList<Object>都可以作为参数传入
```

### 有限制条件的通配符的使用

`? extends A`:`G<? extends A>`可以作为G<A>和G<B>的父类，其中B是A的子类

`? super A`:`G<? super A>`可以作为G<A>和G<B>的父类，其中B是A的父类

### 自定义泛型类的练习

```java
import java.util.*;

/**
 * 定义个泛型类DAO<T>,在其中定义一个Map成员变量，Map的key是String类型，值是T类型
 */
public class DAO<T> {
    private Map<String,T> map = new HashMap<>();

    /**
     * 保存T类型的对象到Map成员变量中
     * @param id
     * @param entity
     */
    public void save(String id,T entity){
        map.put(id,entity);
    }

    /**
     * 从Map中获取键值为id的Map对象
     * @param id
     * @return
     */
    public T get(String id){
        return map.get(id);
    }

    /**
     * 替换map中key为id的内容改为entity对象
     * @param id
     * @param entity
     */
    public void update(String id,T entity){
        if(map.containsKey(id))
            map.put(id,entity);
    }

    /**
     * 返回map中存放的所有T对象
     * @return
     */
    public List<T> list(){
        List<T> list = new ArrayList<>();
        Collection<T> values = map.values();
        for (T ele:
             values) {
            list.add(ele);
        }
        return list;
    }

    /**
     * 删除map的指定id对象
     * @param id
     */
    public void delete(String id){
        map.remove(id);
    }
}

public class DAOTest {
    public static void main(String[] args) {
        DAO<Person> dao = new DAO<>();//设置泛型T为Person类
        DAO<Person> dao = new DAO<>();//设置泛型T为Person类
        dao.save("周杰伦",new Person("蔡依林",40));
        dao.save("罗志祥",new Person("蔡卓妍",41));
        dao.save("林心如",new Person("福尔康",41));
        dao.save("赵薇",new Person("许家印",41));
        Person person1 = dao.get("周杰伦");
        System.out.println(person1);//Person{name='蔡依林', age=40}
        dao.update("周杰伦",new Person("昆凌",28));
        person1 = dao.get("周杰伦");
        System.out.println(person1);//Person{name='昆凌', age=28}
    }
```

