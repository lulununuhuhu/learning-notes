## CSS基本语法规则

![image-20211109161311837](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211109161311837.png)

**选择器**：浏览器根据选择器决定受css样式影响的HTML元素标签

**属性property**：是你要改变的样式名，并且每个属性都有一个值。{属性：值1 值2}组成一个完整的样式申明。有多个声明的情况下，每条声明需用分号隔开,最后一条声明可以不加括号。

例：

```css
p{
    color:red;
    font-size:80px
}
```



## HTML和CSS结合

### 结合方式一

在标签名处添加style属性进行css样式设置


```html
<span style="border:1px red solid">span标签一</span>
<span style="border:1px red solid">span标签一</span>
<div style="border:2px green solid">div标签一</div>
```

缺点：代码不简洁，不能复用

### 结合方式二

独立创建一个style标签，可对同一类型标签进行全局的属性设置

```html
<style type="text/css">
    div{
       border:1px solid red;
       }
    span{
        border:1px solid red;
        }
</style>
```

缺点：只能在同一页面内复用代码，而实际工程中有很多页面，每个页面修改工作量很大。

### 结合方式三

单独创建一个css文件，然后通过link标签引入该文件进行样式设置

```css
/*新建一个css文件*/
div{
   border:1px red solid;
}
span{
    border:2px blue solid;
}
```

```html
<!--   方式三：通过link标签引入外部css文件，从而对指定标签进行设置-->
    <link rel="stylesheet" type="text/css" href="1.css"/>
```

### 标签选择器

```html
<style type="text/css">
    标签名1{
        property1：value1 value2 ... valueN;
        property2: value1 value2 ... valueN
    }
</style>

<body>
    <!--通过标签名进行css样式设置 -->
    <标签名1>xxx</标签名1>
</body>
```

### id 选择器

```html
<style type="text/css">
    #id名{
        property1：value1 value2 ... valueN;
        property2: value1 value2 ... valueN
    }
</style>
<body>
    <!--通过id名名进行css样式设置 -->
    <span id=id名> xxx</span>
</body>
```



###  class组合器

```html
<style type="text/css">
    .class名{
        property1：value1 value2 ... valueN;
        property2: value1 value2 ... valueN
    }
</style>
<body>
    <!--通过class名进行css样式设置 -->
    <span class=class名> xxx</span>
</body>
```

## JavaScript

JavaScript是一种浏览器脚本语言，用来在浏览器中网页和用户之间对话交互的作用。JavaScript是弱类型语言，即在程序中定义的变量类型可以根据需要动态的改变。

JavaScript与语言的优点有：

* 信息交互的多样性
* 安全性：不会执行访问硬盘数据
* 跨平台性：JavaScript语言由浏览器执行，与操作系统无关。

### 变量

JavaScript的变量类型有数值类型number，字符串类型string，对象类型object，布尔类型boolean，函数类型function。

JavaScript里有特定的特殊值，如undefined表示未定义，null表示空值，NAN表示not a number表示类型无法获取。

### 关系运算

与或非这些关系运算和Java、C中用法一样，JavaScript特有的关系运算符是===，全等于。

当`a===b`返回true时，a和b的值相同，数据类型也要相同；而`a==b`返回true时，a和b只要字面值相同即可，比如`12 == "12"`返回true

### 数组

JavaScript声明数组的方式：

```javascript
var a = [];//声明一个空数组
var 变量名 = new Array(元素列表);
```

JavaScript声明的数组具有动态扩容性，即数组长度可以跟随最后一个有值的索引位置增加。

```javascript
        var a = [];
        a[0] = 12;
        a[3] = "ac";
        alert(a.length);//4
        alert(a[1]);//undefined
```

#### 常用方法

1. push:添加元素
2. splice:删除元素

### String

#### 定义：

```javascript
var str = new String("ac");//方式一
var str = "abc";//方式二
```

#### 常用方法

trim():去除字符串两端的空白字符

### 函数

JavaScript中使用**function**来定义函数，基本格式是：

function 函数名(形参1,形参2...形参n){

​	函数体

​	return 返回值

}

例:

```javascript
 function fun(){
         alert("这是一个无参函数");
        }
        //函数形参列表中无须对形参进行类型限制
 function fun1(a,b){
          alert("这是一个带参函数");
        }
  function sum(a,b){
            var sum =   a+b;
            return sum
        }
```

### 隐形参数Arguments

JavaScript中的函数都有一个名为arguments的隐形参数，即使在声明函数中没有使用形参，在调用该函数时也可输入形参并由arguments进行调用，其作用类似于java中的可变参数Object ...args。

```javascript
<script type="text/javascript">
    function fun(){
       for(var i=0;i<arguments.length;i++)
         alert(arguments[i])
    }
    fun(1,"abc",22);
</script>
```

### 自定义对象

#### 方式一:Object形式

对象的定义：var 对象名 = new Object();

​						对象名.属性 = 属性名;

​						对象名.属性 = 属性名;

​						对象名.函数名 = function(){}

对象的访问：对象名.属性

​						对象名.函数名

#### 方式二:花括号形式

>  对象的定义：var 变量名 = {
>
> ​	属性1:属性值,					
>
> ​    属性2:属性值,
>
> ​    函数名:function(){}			
>
> }

对象的访问: 变量名.属性/函数名

### 事件

JavaScript中的事件是指电脑输入设备与页面交互的响应。常见的如按钮被点击、鼠标移动到元素上、按下键盘按键

#### 常用事件

* `onclick()`:鼠标点击事件
* `onload()`：页面加载完成后首先执行的事件内容
* `onblur()`:失去焦点事件，常用于输入框失去焦点后验证其输入内容是否合法
* `onchange()`:属性值改变事件 ,常用于表单提交前验证所有表单项是否合法

#### 事件注册

> 将指定的事件与指定的代码块连接起来

1. 静态注册:通过HTML标签的事件属性绑定指定的程序代码

2. 动态注册:先通过JavaScript代码得到标签的dom对象，然后通过dom对象.事件名 = function(){}这种形式赋于事件响应后的代码。

    动态注册基本步骤如下：

   ```javascript
   window.onload = function(){
       //获取标签对象
       var Obj = document.getElementById(id名)
       //对象调用事件对象的触发函数
       Obj.事件名 = function(){
   	}
   }
   ```

#### 案例

* onload：当用户进入后及离开页面时，会触发 onload 和 onunload 事件。

   ```html
   <!DOCTYPE html>
   <!--onload事件用于在页面首次加载时触发的事件执行程序-->
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>onload事件</title>
   <!--    实现效果：在页面加载后显示cookie是否已经启用-->
       <script>
           window.onload = function(){
               var text = "";
               if(navigator.cookieEnabled == true){
                   text = "cookie已启用"
               }else{
                   text = "cookie未启用"
               }
               document.getElementById("demo").innerHTML = text;
           }
       </script>
   </head>
   <body>
       <p id="demo">asd</p>
   </body>
   </html>
   ```

* onclick

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>onClick事件</title>
    <script>
        function changeText(id){
            id.innerHTML = '你好呀，我是赛利亚';
        }
        function displayDate(){
            document.getElementsByTagName("p")[0].innerHTML = Date();//getElementsByTagName获得的是一个元素数组
        }
    </script>
</head>
<body>
<!--实现效果：当点击<h1></h1>标签内的文本后显示hello-->
    <!--方式一：静态绑定onClick事件-->
    <h1 onclick="this.innerHTML= '你好呀，我是赛利亚'">请点击此文字</h1>
    <!--方式二：动态绑定事件-->
    <h2 onclick="changeText(this)" >请再次点击此文字</h2>
<!--实现效果：当点击按钮后下方显示目前时间-->
    <!--方式一：静态绑定onClick事件-->
<!--    <button onclick="document.getElementsByTagName('p')[0].innerHTML = Date();">点击按钮显示当前时间</button>-->
    <!--方式二：动态绑定事件-->
    <button onclick="displayDate()">点击按钮显示当前时间</button>
    <p id="date">当前时间是：</p>
</body>
</html>
```

* onmouseover和onmouseout：当鼠标移到或移出某HTML标签元素后触发的事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>onmouse</title>
    <script>
        function moveOn(id){
            id.innerHTML = "很好";
        }
        function moveOut(id){
            id.innerHTML = "请把鼠标移上来"
        }
    </script>
</head>
<body>
    <div style="background-color:red;width:120px;height:20px;padding:80px;" onmouseout="moveOn(this)" onmouseover="moveOut(this)">请把鼠标移上来</div>
</body>
</html>
```

* onmousedown和onmouseup：当鼠标**点下并持续**的时候触发的事件和当**鼠标松开**触发的事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>onmousedownmouseover</title>
    <script>
        function mouseDown(obj){
            obj.style.backgroundColor = "green";
            obj.innerHTML = "很好,现在鼠标可以松开了";
        }
        function mouseUp(obj){
            obj.style.backgroundColor = "red";
            obj.innerHTML = "鼠标点击并持续";
        }
    </script>
</head>
<body>
    <div style="background-color:blue;width:100px;height:20px;padding:40px;" onmousedown="mouseDown(this)" onmouseup="mouseUp(this)">
        鼠标点击并持续
    </div>
</body>
</html>
```

### DOM模型

DOM全称是Document Object Model文档对象模型，通俗点说就是文档中的标签、属性、文本转换成对象来管理。 

* Document：整个文档对象
* Element：元素对象
* Attribute：属性对象
* Text：文本对象
* Comment：注释对象

HTML中各种标签有并列、包含等关系，可以按照层次将元素抽象成树状图，一个典型的Document对象结构关系图如下：

![image-20211112181530615](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211112181530615.png)

### 获取Element对象

> 使用Document对象的方法来获取。`getElementById` `getElementByName` `getElementsByTagName``getElementsByClassName`分别表示根据id属性值/标签名称/name属性值/class属性值获取，并返回Element对象数组。

获取到Element对象后，可以对该对象进行属性内容的更改，事件的监听，不同的Element对象有着不同的属性，具体使用时学会查看[JavaScript 教程 (w3school.com.cn)](https://www.w3school.com.cn/js/index.asp)

### BOM

> Browser Object Model，即浏览器对象模型。包括W
>
> Window：浏览器窗口对象
>
> Navigator：浏览器对象
>
> Screen：屏幕对象
>
> History：历史记录兑现
>
> Location：地址栏对象

### 正则表达式

> 正则表达式：RegExp，是描述字符模式的对象。正则表达式用于对字符串模式匹配及检索替换，是对字符串执行模式匹配的强大工具。

#### 语法

JavaScript中的正则表达式有两种语法形式：

1. `var patt = new RegExp(pattern,modifiers)`
2. `var patt = /pattern/modifiers` 注：**不要加引号**

其中pattern代表的了匹配的模式，modifiers指定了全局匹配，指定大小写匹配，多行匹配。

常见的语法有：

* `^`:表示开始
* `$`:表示结束
* `[]`:代表某个范围内的单个字符，比如[0-9]表示0~9之间的单个数字字符，[a-z]表示任意一个小写字符
* `.`:代表任意单个字符，除了换行和行结束符
* `\d`:代表数字字符：相当于[0-9]
* `+`:至少一个
* `*`:零个或多个
* `?`:零个或一个
* `{x}`:x个
* `{m,}`:至少m个
* `{m,n}`:至少m个，最多n个

常用的正则表达式有

```javascript
var patt = /e/;//要求字符串中是否有e
var patt = /[a-z]/;//要求字符串中有小写字母
var patt = /\w/;//要求字符串中有单词字符，单词字符包括a-z A-Z 0-9以及_(下划线)字符
```

### 方法

`reg.test(str)`:判断str是否符合正则表达式的规则，符合的话返回true

具体文档见：[JavaScript RegExp 对象_w3cschool](https://www.w3cschool.cn/jsref/jsref-obj-regexp.html)

