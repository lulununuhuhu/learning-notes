## SpringCache介绍

Spring框架中的一个基于注解的缓存开发框架。

Spring Cache提供了一层抽象接口，根据实际的实现类来调用不同的cache。

具体就是通过CacheManager接口来统一不同的缓存技术。CacheManager是Spring提供的各种缓存技术的抽象接口。

在框架使用过程中，要指定使用哪种缓存技术，就导入相关依赖包的maven坐标。比如要使用的缓存技术是redis，则导入redis的依赖坐标。

## 常见注解

### @EnableCaching

一般用于放在启动类上，用于开启缓存注解功能。

### @Cacheble

在方法执行前，框架会先调用方法查看框架中是否有指定参数的数据。如果有，直接返回缓存数据；如果没有，调用方法并将**方法返回值**放入缓存中

### @CachePut

将方法的返回值放到缓存中

### @CacheEvict

将一条或者多条数据从缓存中删除

## 具体应用

本次将SpringCache框架应用于瑞吉外卖的项目中，具体场景是用户端在查询套餐时，将套餐数据加入到缓存中，从而下次查询时直接查询缓存即可，缓解在高并发情况下数据库的压力。

具体操作如下：

导入SpringCache和Redis的依赖:

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-cache</artifactId>
            <version>2.4.9</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
            <version>2.2.5.RELEASE</version>
        </dependency>
```

导入成功后，即可在查询套餐的相关接口上使用注解进行缓存操作。

```java
 @Cacheable(value = "setmealCache",key = "#setmealDto.categoryId+'_'+#setmealDto.status")
//在缓存中查询value值那一类键值对中key为套餐分类id_套餐状态的对应信息，如果有直接返回，如果没有则按设置的value和key写入redis中
    public R<List<SetmealDto>> querySetmealInfo(SetmealDto setmealDto) {
        Long setmealDtoId = setmealDto.getId();//获取套餐id
        Long categoryId = setmealDto.getCategoryId();//获取菜品分类id
        List<SetmealDto> setmealDtoList = null;
        LambdaQueryWrapper<Setmeal> queryWrapper = new LambdaQueryWrapper<>();
        //根据套餐id和菜品分类id进行查询条件设置
        queryWrapper.eq(!ObjectUtils.isEmpty(setmealDtoId),Setmeal::getId,setmealDtoId);
        queryWrapper.eq(!ObjectUtils.isEmpty(categoryId),Setmeal::getCategoryId,categoryId);
        //设置status为起售状态
        queryWrapper.eq(Setmeal::getStatus, SystemConstant.STATUS_NORMAL);
        //设置排序条件
        queryWrapper.orderByDesc(Setmeal::getUpdateTime);

        //获取到所有套餐基本信息
        List<Setmeal> setmealList = list(queryWrapper);

        //获取所有套餐的具体菜品信息
        setmealDtoList = setmealList.stream().map(setmeal -> {
            SetmealDto setmealDto1 = new SetmealDto();
            BeanUtils.copyProperties(setmeal, setmealDto1);
            Long setmealId = setmeal.getId();
            LambdaQueryWrapper<SetmealDish> setmealDishQueryWrapper = new LambdaQueryWrapper<>();
            setmealDishQueryWrapper.eq(SetmealDish::getSetmealId, setmealId);
            List<SetmealDish> setmealDishes = setmealDishService.list(setmealDishQueryWrapper);
            setmealDto1.setSetmealDishes(setmealDishes);
            return setmealDto1;
        }).collect(Collectors.toList());
        return R.success(setmealDtoList);
    }
```

在要进行数据库增删改操作的接口方法中，使用@CacheEvict注解清除对应的缓存，保证缓存和数据库一致性。

```java
@CacheEvict(value = "setmealCache",allEntries = true) //需要修改数据库，所以要清空缓存
public R<String> changeStatus(Integer status, List<Long> ids) {
    //将ids中的每个对应的每个套餐数据的status值修改
    LambdaUpdateWrapper<Setmeal> setmealLambdaUpdateWrapper = new LambdaUpdateWrapper<>();
    setmealLambdaUpdateWrapper.in(!ObjectUtils.isEmpty(ids),Setmeal::getId,ids);
    setmealLambdaUpdateWrapper.set(Setmeal::getStatus,status);
    update(setmealLambdaUpdateWrapper);
    return R.success("修改成功");
}
```

```java
@Transactional
@CacheEvict(value = "setmealCache",allEntries = true) //执行该方法后，将所有的value的值那一类的缓存数据清除
public R<String> deleteSetmealWithDish(List<Long> ids) {
    //先判断待删除套餐是否处于在售状态，如处于在售状态则抛出异常
    LambdaQueryWrapper<Setmeal> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.in(Setmeal::getId,ids);
    queryWrapper.eq(Setmeal::getStatus,SystemConstant.STATUS_NORMAL);
    int count = count(queryWrapper);
    if(count > 0){
        throw new CustomException("有套餐正处于在售状态，无法删除");
    }
    //删除对应套餐
    removeByIds(ids);
    //删除套餐对应的菜品
    setmealDishService.remove(new LambdaQueryWrapper<SetmealDish>().in(SetmealDish::getSetmealId,ids));
    return R.success("删除套餐成功");
}
```

```java
@Transactional
@CacheEvict(value = "setmealCache",allEntries = true)
public R<String> addSetmealWithDish(SetmealDto setmealDto) {
    //先在套餐表添加套餐信息
    //  根据categoryId获取到套餐对应的分类名
    Category category = categoryService.getById(setmealDto.getCategoryId());
    setmealDto.setCategoryName(category.getName());
    save(setmealDto);

    List<SetmealDish> setmealDishes = setmealDto.getSetmealDishes();
    //再在套餐菜品关系表中添加信息
    setmealDishes = setmealDishes.stream().map(setmealDish -> {
        setmealDish.setSetmealId(setmealDto.getId().toString());
        return setmealDish;
    }).collect(Collectors.toList());
    setmealDishService.saveBatch(setmealDishes);
    return R.success("添加套餐成功");
}
```