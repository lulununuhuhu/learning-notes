1. mapper层依赖注入失败

常见报的异常如下：

```
Injection of resource dependencies failed; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'houseOwnerServiceImpl': Unsatisfied dependency expressed through field 'baseMapper'; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type
```

原因就是：`mybatis-plus`中无法扫描到自定义的Mapper从而导致自定义Mapper无法注入到`houseOwnnerServiceImpl`类的`baseMapper`字段，最终导致Controller层在使用`@Autowired`自动注入bean时失败从而报错。

解决方法有如下：

1. 在springboot启动类中添加以下注解

```java
@MapperScan("com.ncu.housemanagementsystem.mapper")
```

这将告诉Spring Boot扫描`com.ncu.housemanagementsystem.mapper`包中的所有接口，并自动将它们注册为Spring的服务组件。

2. 在自定义的mapper接口处使用`@Mapper`注解，让mybatis能扫描到接口