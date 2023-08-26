## UNICODE

### 定义

UNICODE，万国码，是一套集全球文字的字符集，是计算机行业的业内标准，对于世界上几乎所有文字，都有对应的二进制代码。

### 存在的问题

UNICODE只是一个字符集，没有规定这个字符对应的二进制代码该如何存储。这就会出现一个问题：

1. 常见的汉字对应的unicode字符集都是两个字节及以上，而所有英文字母都是1个字节(ascii码)。那在存储时计算机如何分辨两个字节的是一个汉字还是两个字母呢？
2. 如果将字符统计按固定字节来编码，那英文字母等字节少的字符的有很多字节需要用0填充，这导致存储效率不高

### 解决方法

使用编码方式，根据不同的字符进行不同的编码长度。最常见的编码方式是utf-8，其他的还有utf-16，gbk等。



在python中，print函数打印汉字的unicode字符，而将汉字写入文件时，是使用utf-8的编码方式进行写入的；

如果读取文件字符指定的编码方式和文件创建时的编码方式不同，会报错。

```python
# 汉的unicode字符
a = '\u6c49'
print(a) # 汉

a = '汉'
# 将汉使用utf-8进行编码
print('汉的utf-8格式:',a.encode('utf-8'))
print('汉的unicode格式',a.encode('unicode-escape'))
print('汉的gbk格式',a.encode('gbk'))

with open('demo.txt','w') as fp:
    fp.write(a)

content =fp.read()
print(content) # 汉
```