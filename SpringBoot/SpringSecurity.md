## 介绍

SpringSecurity是Spring家族中的一个安全管理框架，经常拿来和另一个安全框架Shiro做对比。

SpringSecurity的优点是：功能和社区资源更加丰富全面，适合在大中项目中使用。而Shiro的优点是上手比较简单。

SpringSecurity的两大核心功能是认证和授权。

认证：**验证访问的用户是否是本系统的用户，如果是认证通过；如果不是，就认证失败**

授权：**判断用户的权限等级，并根据不同等级返回给用户不同的内容**



## 入门案例

前后端分离不能使用session？

## 认证

### SpringSecurity完整流程

SpringSecurity的原理就是一个**过滤器链**，内部包含了提供各种功能的过滤器。以入门案例中的过滤器为例,介绍几个核心的过滤器的功能。

![image-20221003173804946](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20221003173804946.png)

**UsernamePasswordAuthenticationFilter**:负责处理我们在登陆页面填写的用户名和密码后的登录请求

**ExceptionTranslationFilter**:处理过滤器链抛出的任何AccessDeniedException和AuthenticationException

**FilerSecurityInterceptor**:负责权限校验的过滤器

### 认证流程详解

入门的案例认证流程

![image-20221002164000440](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20221002164000440.png)

* Authentication接口:它的实现类,封装了当前访问系统的用户，封装了用户的相关信息。

* AuthenticationManager接口：定义了认证Authentication的方法

* UserDetailsService接口：加载用户特定主数据的核心接口。里面定义了一个根据用户名查询对应的权限信息的方法

* UserDetails接口：提供核心用户信息。通过UserDetailsService根据用户名获取到用户信息（权限信息）封装成UserDetails对象返回，然后将这些信息封装到Authentication对象中。

### 定制化的认证流程

根据不同的场景，需要对在原生的SpringSecurity认证流程中的接口进行重新实现，以满足符合自己业务需求的认证流程。

#### 思路分析

登录

1. 自定义登录接口
   1. 调用ProviderManager的方法进行认证，如果认证通过就生成jwt
   2. 将生成的用户信息存入到redis中
2. 自定义UserDetailsService
   1. 查询数据库

校验

1. 定义jwt认证过滤器
   1. 获取token
   2. 解析token获取其中的userid
   3. 从redis中获取用户信息
   4. 存入SecurityContxtHolder

#### 实现

1. 引入依赖 redis jwt fastjson