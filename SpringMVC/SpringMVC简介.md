## SpringMVC简介

SpringMVC时Spring的一个后续产品，是Spring的一个子项目。

SPringMVC是Spring为表述层开发提供的一整套完备的解决方案。目前SpringMVC是业界开发Java EE项目的主流框架。

MVC是一种软件架构思想，将软件按照通用的功能划分为M、V、C三种模块。

> M：Model，模型层，指工程中的JavaBean，作用是处理数据。JavaBean可分成两类：1.实体类Bean，定义类的数据结构，如Student、User等。2.业务处理Bean：专指Service或Dao对象，专门**处理业务逻辑和数据访问**。
>
> V:View，视图层，在工程中通常是html或者jsp等页面，用于与用户界面的直接交互、数据展示等C:Controller，控制层，指工程中的servlet，作用是接收请求和响应浏览器。

SpringMVC的特点有：

1. Spring家族系列产品，与Spring中的IOC、AOP等思想无缝连接
2. 基于原生的Servlet，通过了功能强大的前端控制器**DispatcherServlet**，对请求和相应进行统一处理
3. 内部组件化程度高，组件可插拔即插即用，想要什么功能配置相应组件即可