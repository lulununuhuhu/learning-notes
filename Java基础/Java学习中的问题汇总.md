## junit的单元测试方法不能使用Scanner控制台输入

解决方法：[(29条消息) Java JUnit测试实现控制台输入的正确姿势_明明如月的技术博客-CSDN博客](https://blog.csdn.net/w605283073/article/details/89976888)

此问题会在idea编辑器出现，eclipse不会出现

## 进行数据库相关的操作时出现“You have an error in your SQL syntax； check the manual that corresponds to your MySQL”的错误

错误原因：sql语句错误，一般有几方面：

1. 语法或拼写错误
2. 当sql语句过长时，我们可能会使用"+"进行字符串拼接,注意拼接时要注意留有空格，不然没有空格的画sql语句本来是两个单词变成了一个单词，如`"select name,age,grade from order where id =?"`拆成`"select name,age,grade"+"from order"+"where id=?"`，程序实际上将他识别成`"select name,age,gradefrom orderwhere id=?"`了，这自然是错误的。

3. 表名与关键字重复，则表明需要用反单引号进行区分，如select * from order中的order需用反单引号标识一下

   [(29条消息) 解决办法汇总：You have an error in your SQL syntax； check the manual that corresponds to your MySQL_SummerDream-CSDN博客](https://blog.csdn.net/qq_41548233/article/details/87817070)

   

   

