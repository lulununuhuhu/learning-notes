package Annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 自定义注解
 */
@Target({ElementType.FIELD,ElementType.CONSTRUCTOR,ElementType.METHOD})//该注解指定了@demo1注解可申明的结构类型为属性、构造器、方法
@Retention(RetentionPolicy.RUNTIME) //该注解申明了@demo1的声明周期为Runtime，即在运行时该注解仍然能调用
public @interface demo1 {
    String value() default "haha";
}


