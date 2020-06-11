# Java学习总结

## 1.enum

**注意**：

1. enum 类型不支持 public 和 protected 修饰符的构造方法，因此构造函数一定要是 private 或 friendly 的。也正因为如此，所以枚举对象是无法在程序中通过直接调用其构造方法来初始化的。
2. 定义 enum 类型时候，如果是简单类型，那么最后一个枚举值后不用跟任何一个符号；但如果有定制方法，那么最后一个枚举值与后面代码要用分号';'隔开，不能用逗号或空格。
3. 由于 enum 类型的值实际上是通过运行期构造出对象来表示的，所以在 cluster 环境下，每个虚拟机都会构造出一个同义的枚举对象。因而在做比较操作时候就需要注意，如果直接通过使用等号 ( ‘ == ’ ) 操作符，这些看似一样的枚举值一定不相等，因为这不是同一个对象实例。

```
package com.sankuai.learn.enums;

/**
 * @author dengquanliang
 * @date 2020/5/15
 */
public enum ColorEnum {
    GREEN(1, "green"), RED(2, "red"), WHITE(3, "white");

    private static final String MSG = "not exits";

    private int id;

    private String color;

    //构造函数私有化
    private ColorEnum(int id, String color) {
        this.id = id;
        this.color = color;
    }

    //普通方法
    public static String getColor(int id){
        for(ColorEnum cn : ColorEnum.values()){
            if(cn.id == id){
                return cn.getColor();
            }
        }
        return MSG;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return "ColorEnum{" +
                "id=" + id +
                ", color='" + color + '\'' +
                '}';
    }
}

```



## 2.@Resource和@Autowired区别对比

@Resource和@Autowired都是做bean的注入时使用，其实@Resource并不是Spring的注解，它的包是javax.annotation.Resource，需要导入，但是Spring支持该注解的注入。

### 1、共同点

两者都可以写在字段和setter方法上。两者如果都写在字段上，那么就不需要再写setter方法。

### 2、不同点

**（1）@Autowired**

@Autowired为Spring提供的注解，需要导入包org.springframework.beans.factory.annotation.Autowired;只按照**byType**注入。

```
public class TestServiceImpl {
    // 下面两种@Autowired只要使用一种即可
    @Autowired
    private UserDao userDao; // 用于字段上
    
    @Autowired
    public void setUserDao(UserDao userDao) { // 用于属性的方法上
        this.userDao = userDao;
    }
}
```

@Autowired注解是按照类型（byType）装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它的required属性为false。如果我们想使用按照名称（byName）来装配，可以结合@**Qualifier**注解一起使用。(通过类型匹配找到多个candidate,在没有@Qualifier、@Primary注解的情况下，会使用对象名作为最后的fallback匹配)如下：

```
public class TestServiceImpl {
    @Autowired
    @Qualifier("userDao")
    private UserDao userDao; 
}
```

**（2）@Resource**

@Resource默认按照ByName自动注入，由J2EE提供，需要导入包javax.annotation.Resource。@Resource有两个重要的属性：**name**和**type**，而Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。所以，如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不制定name也不制定type属性，这时将通过反射机制使用byName自动注入策略。

```
public class TestServiceImpl {
    // 下面两种@Resource只要使用一种即可
    @Resource(name="userDao")
    private UserDao userDao; // 用于字段上
    
    @Resource(name="userDao")
    public void setUserDao(UserDao userDao) { // 用于属性的setter方法上
        this.userDao = userDao;
    }
}
```

注：最好是将@Resource放在setter方法上，因为这样更符合面向对象的思想，通过set、get去操作属性，而不是直接去操作属性。

@Resource装配顺序：

①如果同时指定了name和type，则从Spring上下文中找到唯一匹配的bean进行装配，找不到则抛出异常。

②如果指定了name，则从上下文中查找名称（id）匹配的bean进行装配，找不到则抛出异常。

③如果指定了type，则从上下文中找到类似匹配的唯一bean进行装配，找不到或是找到多个，都会抛出异常。

④如果既没有指定name，又没有指定type，则自动按照byName方式进行装配；如果没有匹配，则回退为一个原始类型进行匹配，如果匹配则自动装配。

@Resource的作用相当于@Autowired，只不过@Autowired按照byType自动注入。

## 3.lombok

 **Lombok注解说明**:

- `val`：用在局部变量前面，相当于将变量声明为final

- `@NonNull`：给方法参数增加这个注解会自动在方法内对该参数进行是否为空的校验，如果为空，则抛出NPE（NullPointerException）

- `@Cleanup`：自动管理资源，用在局部变量之前，在当前变量范围内即将执行完毕退出之前会自动清理资源，自动生成try-finally这样的代码来关闭流

- `@Getter/@Setter`：用在属性上，再也不用自己手写setter和getter方法了，还可以指定访问范围

- `@ToString`：用在类上，可以自动覆写toString方法，当然还可以加其他参数，例如@ToString(exclude=”id”)排除id属性，或者@ToString(callSuper=true, includeFieldNames=true)调用父类的toString方法，包含所有属性

- `@EqualsAndHashCode`：用在类上，自动生成equals方法和hashCode方法

- `@NoArgsConstructor, @RequiredArgsConstructor and @AllArgsConstructor`：用在类上，自动生成无参构造和使用所有参数的构造函数以及把所有@NonNull属性作为参数的构造函数，如果指定staticName = “of”参数，同时还会生成一个返回类对象的静态工厂方法，比使用构造函数方便很多

- `@Data`：注解在类上，相当于同时使用了`@ToString`、`@EqualsAndHashCode`、`@Getter`、`@Setter`和`@RequiredArgsConstrutor`这些注解，对于`POJO类`十分有用

- `@Value`：用在类上，是@Data的不可变形式，相当于为属性添加final声明，只提供getter方法，而不提供setter方法

- `@Builder`：用在类、构造器、方法上，为你提供复杂的builder APIs，让你可以像如下方式一样调用`Person.builder().name("Adam Savage").city("San Francisco").job("Mythbusters").job("Unchained Reaction").build();`更多说明参考[Builder](https://projectlombok.org/features/Builder.html)

- `@SneakyThrows`：自动抛受检异常，而无需显式在方法上使用throws语句

- `@Synchronized`：用在方法上，将方法声明为同步的，并自动加锁，而锁对象是一个私有的属性`$lock`或`$LOCK`，而java中的synchronized关键字锁对象是this，锁在this或者自己的类对象上存在副作用，就是你不能阻止非受控代码去锁this或者类对象，这可能会导致竞争条件或者其它线程错误

- `@Getter(lazy=true)`：可以替代经典的Double Check Lock样板代码

- ```
  @Log
  ```

  ：根据不同的注解生成不同类型的log对象，但是实例名称都是log，有六种可选实现类

  - `@CommonsLog` Creates log = org.apache.commons.logging.LogFactory.getLog(LogExample.class);
  - `@Log` Creates log = java.util.logging.Logger.getLogger(LogExample.class.getName());
  - `@Log4j` Creates log = org.apache.log4j.Logger.getLogger(LogExample.class);
  - `@Log4j2` Creates log = org.apache.logging.log4j.LogManager.getLogger(LogExample.class);
  - `@Slf4j` Creates log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
  - `@XSlf4j` Creates log = org.slf4j.ext.XLoggerFactory.getXLogger(LogExample.class);


链接：https://juejin.im/post/5a6eceb8f265da3e467555fe

## 4.lambda

### 4.1 从函数式接口说起

函数式接口(Functional Interface)，就是只包含**一个抽象方法**的接口（可以有默认方法)，可以使用@FunctionalInterface注解进行标注，但是也不是必须的，只要接口符合函数式接口的要求虚拟机就会自动判断，但是在开发中如果有特殊要求可以使用@FunctionalInterface注解，避免团队中其他人员误用。函数式接口很常见，Runnable、Comparator、Predicate就是常见的函数式接口，下面就是Runnable的接口定义

```
//JDK 1.7 中Runnable 的定义
public interface Runnable {
    public abstract void run();
}


//JDK 1.8 中Runnable的定义
@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```

常用的函数式接口

Predicate<T>

Function<T,R>

Consumer<T>

Supplier<T>

BinaryOperator<T>

Runnable

### 4.2 函数式编程

**lamda语法糖**

lamda表达式主要分为三个部分，参数、→、Lamda表达式主体，主体可以是一个表达式，也可以是使用{}扩起来的代码块

代码块

Plain Text

```
Runnable runnable = () -> System.out.println("runnable");
Predicate<Integer> predicate = x -> x > 2;
```

在Predicate中只有test方法，定义predicate为Predicate<Integer>对象，在执行predicate.test(5)，之后就是执行了 x > 2 的内容

```
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
}
```

### 4.3 lambda用例

#### 4.3.1 用lambda表达式实现Runnable

```
// Java 8之前：
new Thread(new Runnable() {
    @Override
    public void run() {
    System.out.println("Before Java8, too much code for too little to do");
    }
}).start();

//Java 8方式：
new Thread( () -> System.out.println("In Java8, Lambda expression rocks !!") ).start();
```

这个例子向我们展示了Java 8 lambda表达式的语法。你可以使用lambda写出如下代码：

```
(params) -> expression
(params) -> statement
(params) -> { statements } 
```

例如，如果你的方法不对参数进行修改、重写，只是在控制台打印点东西的话，那么可以这样写：

```
() -> System.out.println("Hello Lambda Expressions");
```

如果你的方法接收两个参数，那么可以写成如下这样：

```
(int even, int odd) -> even + odd 
```

顺便提一句，通常都会把lambda表达式内部变量的名字起得短一些。这样能使代码更简短，放在同一行。所以，在上述代码中，变量名选用a、b或者x、y会比even、odd要好。

#### 4.3.2 使用lambda表达式对列表进行迭代

```
// Java 8之前：
List features = Arrays.asList("Lambdas", "Default Method", "Stream API", "Date and Time API");
for (String feature : features) {
    System.out.println(feature);
} 

// Java 8之后：
List features = Arrays.asList("Lambdas", "Default Method", "Stream API", "Date and Time API");
features.forEach(n -> System.out.println(n));

// 使用Java 8的方法引用更方便，方法引用由::双冒号操作符标示，
// 看起来像C++的作用域解析运算符
features.forEach(System.out::println);

```

#### 4.3.3 使用lambda表达式和函数式接口Predicate

```
@Test
public void testPredicate(){
    List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);
    System.out.println("print all numbers");
    evaluate(list, n -> true);
    System.out.println("print no number");
    evaluate(list, n -> false);
    System.out.println("print even numbers");
    evaluate(list, n -> n % 2 == 0);
    System.out.println("print odd numbers");
    evaluate(list, n -> n % 2 != 0);
}

public void evaluate(List<Integer> list, Predicate<Integer> predicate){
    for(Integer n : list){
        if(predicate.test(n)){
            System.out.print(n + " ");
        }
    }
}
```

输出：

```
print all numbers
1 2 3 4 5 6 7 8 print no number
print even numbers
2 4 6 8 print odd numbers
1 3 5 7
```

#### 4.3.4 如何在lambda表达式中加入Predicate

**java.util.function.Predicate** 允许将两个或更多的 **Predicate** 合成一个。它提供类似于逻辑操作符AND和OR的方法，名字叫做 **and()**、**or()**，用于将传入 **filter()** 方法的条件合并起来。例如，要得到所有以J开始，长度为四个字母的语言，可以定义两个独立的 **Predicate** 示例分别表示每一个条件，然后用 **Predicate.and()** 方法将它们合并起来，如下所示

```
  @Test
    public void testPredicate(){
        List<String> names = Arrays.asList("Jack", "Jav", "WERAD", "DDDDD", "JACS");
        // 甚至可以用and()、or()逻辑函数来合并Predicate，
        // 例如要找到所有以J开始，长度为四个字母的名字，你可以合并两个Predicate并传入
        Predicate<String> startsWithJ = (n) -> n.startsWith("J");
        Predicate<String> fourLetterLong = (n) -> n.length() == 4;
        names.stream()
                .filter(startsWithJ.and(fourLetterLong))
                .forEach(System.out :: println);
    }

```

输出：

```
Jack
JACS
```

#### 4.3.5 使用lambda表达式的Map和Reduce示例

本例介绍最广为人知的函数式编程概念map。它允许你将对象进行转换。例如在本例中，我们将 **costBeforeTax** 列表的每个元素转换成为税后的值。我们将 **x -> x\*x** lambda表达式传到 map() 方法，后者将其应用到流中的每一个元素。然后用 forEach() 将列表元素打印出来。使用流API的收集器类，可以得到所有含税的开销。有 toList() 这样的方法将 map 或任何其他操作的结果合并起来。由于收集器在流上做终端操作，因此之后便不能重用流了。你甚至可以用流API的 reduce() 方法将所有数字合成一个，下一个例子将会讲到。

```
 @Test
    public void testMap(){
        // 不使用lambda表达式为每个订单加上12%的税
        List<Integer> costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
        for (Integer cost : costBeforeTax) {
            double price = cost + .12*cost;
            System.out.print(price + " ");
        }
        System.out.println();
        // 使用lambda表达式
        costBeforeTax.stream().map((cost) -> cost + .12*cost).forEach(n -> System.out.print(n + " "));
    }
```

输出：

```
112.0 224.0 336.0 448.0 560.0 
112.0 224.0 336.0 448.0 560.0 
```

```
@Test
public void testReduce() {
    // 为每个订单加上12%的税
    // 老方法：
    List<Integer> costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
    double total = 0;
    for (Integer cost : costBeforeTax) {
        double price = cost + .12 * cost;
        total = total + price;
    }
    System.out.println("Total : " + total);

    // 新方法：
    double bill = costBeforeTax.stream().map((cost) -> cost + .12 * cost).reduce((sum, cost) -> sum + cost).get();
    System.out.println("Total : " + bill);

}
```

输出：

```
Total : 1680.0
Total : 1680.0
```

#### 4.3.6 通过过滤创建一个String列表

过滤是Java开发者在大规模集合上的一个常用操作，而现在使用lambda表达式和流API过滤大规模数据集合是惊人的简单。流提供了一个 **filter()** 方法，接受一个 **Predicate** 对象，即可以传入一个lambda表达式作为过滤逻辑。下面的例子是用lambda表达式过滤Java集合，将帮助理解。

```
@Test
    public void testString(){
        // 创建一个字符串列表，每个字符串长度大于2
        List<String> strList = Arrays.asList("hello", "word", "a", "null", "b");
        List<String> filtered = strList.stream().filter(x -> x.length()> 2).collect(Collectors.toList());
        System.out.println(strList);
        System.out.println(filtered);
    }
```

输出：

```
[hello, word, a, null, b]
[hello, word, null]
```

#### 4.3.7 对列表的每个元素应用函数

```
@Test
public void testFunction(){
    // 将字符串换成大写并用逗号链接起来
    List<String> G7 = Arrays.asList("USA", "Japan", "France", "Germany", "Italy", "U.K.","Canada");
    String G7Countries = G7.stream().map(x -> x.toUpperCase()).collect(Collectors.joining(", "));
    System.out.println(G7Countries);
}
```

输出：

```
USA, JAPAN, FRANCE, GERMANY, ITALY, U.K., CANADA
```

#### 4.3.8 复制不同的值，创建一个子列表

本例展示了如何利用流的 **distinct()** 方法来对集合进行去重。

```
@Test
public void testDistinct(){
    // 用所有不同的数字创建一个正方形列表
    List<Integer> numbers = Arrays.asList(9, 10, 3, 4, 7, 3, 4);
    List<Integer> distinct = numbers.stream().map( i -> i*i).distinct().collect(Collectors.toList());
    System.out.println(numbers);
    System.out.println(distinct);
}
```

输出：

```
[9, 10, 3, 4, 7, 3, 4]
[81, 100, 9, 16, 49]
```

#### 4.3.9 计算集合元素的最大值、最小值、总和以及平均值

**IntStream**、**LongStream** 和 **DoubleStream** 等流的类中，有个非常有用的方法叫做 **summaryStatistics()** 。可以返回 **IntSummaryStatistics**、**LongSummaryStatistics** 或者 **DoubleSummaryStatistics**，描述流中元素的各种摘要数据。在本例中，我们用这个方法来计算列表的最大值和最小值。它也有 **getSum()** 和 **getAverage()** 方法来获得列表的所有元素的总和及平均值。

```
@Test
public void test(){
    //获取数字的个数、最小值、最大值、总和以及平均值
    List<Integer> primes = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29);
    IntSummaryStatistics stats = primes.stream().mapToInt((x) -> x).summaryStatistics();
    System.out.println("Highest prime number in List : " + stats.getMax());
    System.out.println("Lowest prime number in List : " + stats.getMin());
    System.out.println("Sum of all prime numbers : " + stats.getSum());
    System.out.println("Average of all prime numbers : " + stats.getAverage());
}
```

#### 4.3.10 从 Lambda 表达式到双冒号操作符

使用 Lambda 表达式，我们已经看到代码可以变得非常简洁。

例如，要创建一个比较器，以下语法就足够了

```
Comparator c = (Person p1, Person p2) -> p1.getAge().compareTo(p2.getAge());
```

然后，使用类型推断：

```
Comparator c = (p1, p2) -> p1.getAge() - (p2.getAge());
```

但是，我们可以使上面的代码更具表现力和可读性吗？我们来看一下：

```
Comparator c = Comparator.comparing(Person::getAge);
```

使用 `::` 运算符作为 Lambda 调用特定方法的缩写，并且拥有更好的可读性。

### 4.4 Lambda 表达式和匿名类之间的区别

- `this` 关键字。对于匿名类 `this` 关键字解析为匿名类，而对于 Lambda 表达式，`this` 关键字解析为包含写入 Lambda 的类。
- 编译方式。Java 编译器编译 Lambda 表达式时，会将其转换为类的私有方法，再进行动态绑定。

### 4.5 Lambda 表达式的结构

Lambda 表达式的结构：

- Lambda 表达式可以具有零个，一个或多个参数。
- 可以显式声明参数的类型，也可以由编译器自动从上下文推断参数的类型。例如 `(int a)` 与刚才相同 `(a)`。
- 参数用小括号括起来，用逗号分隔。例如 `(a, b)` 或 `(int a, int b)` 或 `(String a, int b, float c)`。
- 空括号用于表示一组空的参数。例如 `() -> 42`。
- 当有且仅有一个参数时，如果不显式指明类型，则不必使用小括号。例如 `a -> return a*a`。
- Lambda 表达式的正文可以包含零条，一条或多条语句。
- 如果 Lambda 表达式的正文只有一条语句，则大括号可不用写，且表达式的返回值类型要与匿名函数的返回类型相同。
- 如果 Lambda 表达式的正文有一条以上的语句必须包含在大括号（代码块）中，且表达式的返回值类型要与匿名函数的返回类型相同。

### 4.6 总结

1）lambda表达式内可以使用方法引用，仅当该方法不修改lambda表达式提供的参数。本例中的lambda表达式可以换为方法引用，因为这仅是一个参数相同的简单方法调用。

```
list.forEach(n -> System.out.println(n)); 
list.forEach(System.out::println);  // 使用方法引用 
复制代码
```

然而，若对参数有任何修改，则不能使用方法引用，而需键入完整地lambda表达式，如下所示：

```
list.forEach((String s) -> System.out.println("*" + s + "*")); 
```

事实上，可以省略这里的lambda参数的类型声明，编译器可以从列表的类属性推测出来。

2）lambda内部可以使用静态、非静态和局部变量，这称为lambda内的变量捕获。

3）Lambda表达式在Java中又称为闭包或匿名函数，所以如果有同事把它叫闭包的时候，不用惊讶。

4）Lambda方法在编译器内部被翻译成私有方法，并派发 **invokedynamic** 字节码指令来进行调用。可以使用JDK中的 **javap** 工具来反编译class文件。使用 **javap -p** 或 **javap -c -v** 命令来看一看lambda表达式生成的字节码。大致应该长这样：

```
private static java.lang.Object lambda$0(java.lang.String);
```

5）lambda表达式有个限制，那就是只能引用 **final** 或 **final** 局部变量，这就是说不能在lambda内部修改定义在域外的变量。

```
List<Integer> primes = Arrays.asList(new Integer[]{2, 3,5,7});
int factor = 2;
primes.forEach(element -> { factor++; }); 

Compile time error : "local variables referenced from a lambda expression must be final or effectively final"
```

另外，只是访问它而不作修改是可以的，如下所示：

```
List<Integer> primes = Arrays.asList(new Integer[]{2, 3,5,7});
int factor = 2;
primes.forEach(element -> { System.out.println(factor*element); }); 
```

### 4.7 参考：

1.https://juejin.im/post/5abc9ccc6fb9a028d6643eea

## 5.Stream API

### 5.1 流和其它集合具体的区别

1. **不存储数据**。流是基于数据源的对象，它本身不存储数据元素，而是通过管道将数据源的元素传递给操作。
2. **函数式编程**。流的操作不会修改数据源，例如`filter`不会将数据源中的数据删除。
3. **延迟操作**。流的很多操作如filter,map等中间操作是延迟执行的，只有到终点操作才会将操作顺序执行。
4. **可以解绑**。对于无限数量的流，有些操作是可以在有限的时间完成的，比如`limit(n)` 或 `findFirst()`，这些操作可是实现"短路"(Short-circuiting)，访问到有限的元素后就可以返回。
5. **纯消费**。流的元素只能访问一次，类似Iterator，操作没有回头路，如果你想从头重新访问流的元素，对不起，你得重新生成一个新的流。

流的操作是以管道的方式串起来的。流管道包含一个数据源，接着包含零到N个中间操作，最后以一个终点操作结束。

### 5.2 并行 Parallelism

所有的流操作都可以串行执行或者并行执行。
除非显示地创建并行流，否则Java库中创建的都是串行流。 `Collection.stream()`为集合创建串行流而`Collection.parallelStream()`为集合创建并行流。`IntStream.range(int, int)`创建的是串行流。通过`parallel()`方法可以将串行流转换成并行流,`sequential()`方法将流转换成串行流。

### 5.3 创建Stream

可以通过多种方式创建流：

1、通过集合的`stream()`方法或者`parallelStream()`，比如`Arrays.asList(1,2,3).stream()`。
2、通过`Arrays.stream(Object[])`方法, 比如`Arrays.stream(new int[]{1,2,3})`。
3、使用流的静态方法，比如`Stream.of(Object[])`, `IntStream.range(int, int)` 或者 `Stream.iterate(Object, UnaryOperator)`，如`Stream.iterate(0, n -> n * 2)`，或者`generate(Supplier s)`如`Stream.generate(Math::random)`。
4、`BufferedReader.lines()`从文件中获得行的流。
5、`Files`类的操作路径的方法，如`list`、`find`、`walk`等。
6、随机数流`Random.ints()`。
7、其它一些类提供了创建流的方法，如`BitSet.stream()`, `Pattern.splitAsStream(java.lang.CharSequence)`, 和 `JarFile.stream()`。
8、更底层的使用`StreamSupport`，它提供了将`Spliterator`转换成流的方法。

### 5.4 中间操作 

**中间操作会返回一个新的流，并且操作是延迟执行的(lazy)，它不会修改原始的数据源，而且是由在终点操作开始的时候才真正开始执行。**
这个Scala集合的转换操作不同，Scala集合转换操作会生成一个新的中间集合，显而易见Java的这种设计会减少中间对象的生成。

下面介绍流的这些中间操作：

#### 5.4.1 distinct

`distinct`保证输出的流中包含唯一的元素，它是通过`Object.equals(Object)`来检查是否包含相同的元素。

```
List<String> l = Stream.of("a","b","c","b")
        .distinct()
        .collect(Collectors.toList());
System.out.println(l); //[a, b, c]
```

#### 5.4.2 filter

`filter`返回的流中只包含满足断言(predicate)的数据。

下面的代码返回流中的偶数集合。

```
List<Integer> l = IntStream.range(1,10)
        .filter( i -> i % 2 == 0)
        .boxed()
        .collect(Collectors.toList());
System.out.println(l); //[2, 4, 6, 8]
```

#### 5.4.3 map

`map`方法将流中的元素映射成另外的值，新的值类型可以和原来的元素的类型不同。

下面的代码中将字符元素映射成它的哈希码(ASCII值)。

```
List<Integer> l = Stream.of('a','b','c')
        .map( c -> c.hashCode())
        .collect(Collectors.toList());
        
// List<String> l = list.stream().map(Student :: getName).collect(Collectors.toList());
System.out.println(l); //[97, 98, 99]
```

#### 5.4.4 limit

`limit`方法指定数量的元素的流。对于串行流，这个方法是有效的，这是因为它只需返回前n个元素即可，但是对于有序的并行流，它可能花费相对较长的时间，如果你不在意有序，可以将有序并行流转换为无序的，可以提高性能。

```
List<Integer> l = IntStream.range(1,100).limit(5)
        .boxed()
        .collect(Collectors.toList());
System.out.println(l);//[1, 2, 3, 4, 5]
```

#### 5.4.5 peek

`peek`方法方法会使用一个Consumer消费流中的元素，但是返回的流还是包含原来的流中的元素。

```
String[] arr = new String[]{"a","b","c","d"};
Arrays.stream(arr)
        .peek(System.out::println) //a,b,c,d
        .count();
```

#### 5.4.6 sorted

`sorted()`将流中的元素按照自然排序方式进行排序，如果元素没有实现`Comparable`，则终点操作执行时会抛出`java.lang.ClassCastException`异常。
`sorted(Comparator comparator)`可以指定排序的方式。

对于有序流，排序是稳定的。对于非有序流，不保证排序稳定。

```
String[] arr = new String[]{"b_123","c+342","b#632","d_123"};
List<String> l  = Arrays.stream(arr)
        .sorted((s1,s2) -> {
            if (s1.charAt(0) == s2.charAt(0))
                return s1.substring(2).compareTo(s2.substring(2));
            else
                return s1.charAt(0) - s2.charAt(0);
        })
        .collect(Collectors.toList());
System.out.println(l); //[b_123, b#632, c+342, d_123]
```

#### 5.4.7 skip

`skip`返回丢弃了前n个元素的流，如果流中的元素小于或者等于n，则返回空的流。

### 5.5 终点操作 terminal operations

#### 5.5.1 Match

```
public boolean 	allMatch(Predicate<? super T> predicate)
public boolean 	anyMatch(Predicate<? super T> predicate)
public boolean 	noneMatch(Predicate<? super T> predicate)
```

这一组方法用来检查流中的元素是否满足断言。
`allMatch`只有在所有的元素都满足断言时才返回true,否则flase,流为空时总是返回true

`anyMatch`只有在任意一个元素满足断言时就返回true,否则flase,

`noneMatch`只有在所有的元素都不满足断言时才返回true,否则flase,

```
      System.out.println(Stream.of(1,2,3,4,5).allMatch( i -> i > 0)); //true
      System.out.println(Stream.of(1,2,3,4,5).anyMatch( i -> i > 0)); //true
      System.out.println(Stream.of(1,2,3,4,5).noneMatch( i -> i > 0)); //false

System.out.println(Stream.<Integer>empty().allMatch( i -> i > 0)); //true
      System.out.println(Stream.<Integer>empty().anyMatch( i -> i > 0)); //false
      System.out.println(Stream.<Integer>empty().noneMatch( i -> i > 0)); //true
```

#### 5.5.2 count

`count`方法返回流中的元素的数量。它实现为：

```
mapToLong(e -> 1L).sum();
```

#### 5.5.3 collect

```
<R,A> R 	collect(Collector<? super T,A,R> collector)
<R> R 	collect(Supplier<R> supplier, BiConsumer<R,? super T> accumulator, BiConsumer<R,R> combiner)
```

使用一个collector执行`mutable reduction`操作。辅助类[`Collectors`](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collectors.html)提供了很多的collector，可以满足我们日常的需求，你也可以创建新的collector实现特定的需求。它是一个值得关注的类，你需要熟悉这些特定的收集器，如聚合类`averagingInt`、最大最小值`maxBy` `minBy`、计数`counting`、分组`groupingBy`、字符串连接`joining`、分区`partitioningBy`、汇总`summarizingInt`、化简`reducing`、转换`toXXX`等。

第二个提供了更底层的功能，它的逻辑类似下面的伪代码：

```
R result = supplier.get();
for (T element : this stream)
    accumulator.accept(result, element);
return result;
```

例子：

```
List<String> asList = stringStream.collect(ArrayList::new, ArrayList::add,
                                           ArrayList::addAll);
String concat = stringStream.collect(StringBuilder::new, StringBuilder::append,
                                     StringBuilder::append)
                            .toString();
```

#### 5.5.4 find

`findAny()`返回任意一个元素，如果流为空，返回空的Optional，对于并行流来说，它只需要返回任意一个元素即可，所以性能可能要好于`findFirst()`，但是有可能多次执行的时候返回的结果不一样。
`findFirst()`返回第一个元素，如果流为空，返回空的Optional。

#### 5.5.5 forEach、forEachOrdered

`forEach`遍历流的每一个元素，执行指定的action。它是一个终点操作，和`peek`方法不同。这个方法不担保按照流的`encounter order`顺序执行，如果对于有序流按照它的`encounter order`顺序执行，你可以使用`forEachOrdered`方法。

```
Stream.of(1,2,3,4,5).forEach(System.out::println);
```

#### 5.5.6 max、min

`max`返回流中的最大值，
`min`返回流中的最小值。

#### 5.5.7 reduce

`reduce`是常用的一个方法，事实上很多操作都是基于它实现的。
它有几个重载方法：

```
pubic Optional<T> 	reduce(BinaryOperator<T> accumulator)
pubic T 	reduce(T identity, BinaryOperator<T> accumulator)
pubic <U> U 	reduce(U identity, BiFunction<U,? super T,U> accumulator, BinaryOperator<U> combiner)
```

第一个方法使用流中的第一个值作为初始值，后面两个方法则使用一个提供的初始值。

```
Optional<Integer> total = Stream.of(1,2,3,4,5).reduce( (x, y) -> x +y);
Integer total2 = Stream.of(1,2,3,4,5).reduce(0, (x, y) -> x +y);
```

值得注意的是`accumulator`应该满足结合性(associative)。

#### 5.5.8 toArray()

将流中的元素放入到一个数组中。

## 6.异常处理

### 6.1 什么时候才需要抛异常

​       首先我们需要了解一个问题，什么时候才需要抛异常？异常的设计是方便给开发者使用的，但不是乱用的，。其实这个问题很简单，如果你觉得某些”问题”解决不了了，那么你就可以抛出异常了。比如，你在写一个service,其中在写到某段代码处,你发现可能会产生问题，那么就请抛出异常吧，相信我，你此时抛出异常将是一个最佳时机。

### 6.2 应该选用哪种异常

​      RuntimeException异常和受检异常之间的区别就是:是否强制要求调用者必须处理此异常，如果强制要求调用者必须进行处理，那么就使用受检异常，否则就选择非受检异常(RuntimeException)。一般来讲，如果没有特殊的要求，我们建议使用RuntimeException异常。

## 7.Java序列化

### 7.1 什么是序列化和反序列化

- 把对象转换为字节序列的过程称为对象的序列化。

- 把字节序列恢复为对象的过程称为对象的反序列化。

### 7.2 对象的序列化的用途：

对象的序列化主要有两种用途：

1） 把对象的字节序列永久地保存到硬盘上，通常存放在一个文件中；

2） 在网络上传送对象的字节序列。

### 7.3 常见的序列化的方法

| 序列化方法     | 简单描述                                                     |
| :------------- | :----------------------------------------------------------- |
| java原生序列化 | 利用InputStream和OutputStream进行转化                        |
| Json序列化     | 常用jackson包，一般用com.fasterxml.jackson.databind.ObjectMapper进行转化 |
| FastJson序列化 | 阿里制造，一般用com.alibaba.fastjson.JSON                    |
| gson序列化     | google制造，一般用com.google.gson.Gson                       |
| ProtoBuff      | google制造，二进制                                           |
| thrift序列化   | thrift框架使用，二进制                                       |
| hession        | pigeon常用，轻量，二进制                                     |

###  7.4 Java序列化要注意什么？

#### 7.4.1 Java序列化实现

1. 常见写法：实现Serializable【推荐】

```
public class Person implements Serializable {

    /**
     * 序列化ID
     */
    private static final long serialVersionUID = 1L;

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```

1.2 其他写法：实现Externalizable【除非要定制特殊逻辑】

```
public class Person implements Externalizable {

    /**
     * 序列化ID
     */
    private static final long serialVersionUID = 1L;

    private String name;

    private String sex;

```

**可能的问题：没有实现序列化接口，在【使用java.io.ObjectOutputStream#writeObject】进行序列化时报错java.io.NotSerializableException**

#### 7.4.2 serialVersionUID

**常见写法：见代码【推荐】**

该方案可前向兼容，但是注意某些特殊场景需要非兼容。

```
private static final long serialVersionUID = 1L;//或IDE生成
```

不写则根据字段和特定算法生成一个

**可能的问题：方法字段变更时，系统生成的serialVersionUID也会变。此时无法前向兼容，java.io.InvalidClassException【反序列化时serialVersionUID不匹配】**

serialVersionUID的取值是**Java运行时环境根据类的内部细节自动生成的**。如果对类的源代码作了修改，再重新编译，新生成的类文件的serialVersionUID的取值有可能也会发生变化。
类的serialVersionUID的默认值完全依赖于Java编译器的实现，对于同一个类，用不同的Java编译器编译，有可能会导致不同的 serialVersionUID，也有可能相同。**为了提高serialVersionUID的独立性和确定性，强烈建议在一个可序列化类中显示的定义serialVersionUID，为它赋予明确的值**。

**显式地定义serialVersionUID有两种用途：**
　　1、 在某些场合，希望类的不同版本对序列化兼容，因此需要确保类的不同版本具有相同的serialVersionUID；
　　2、 在某些场合，不希望类的不同版本对序列化兼容，因此需要确保类的不同版本具有不同的serialVersionUID。

### 7.3 父类的序列化

问题：当子类实现了Serializable，但是父类没有，序列化时会拿到父类的状态么？

由于父类没有序列化，将导致反序列化时，虽然创建出了父类，但是父类的状态没有被保存，全部都是初始值。

### 7.4 静态变量序列化

问题：序列化对象中，存在静态变量时，静态变量的状态会保存吗？

序列化保存的是对象的状态，静态变量属于类的状态，因此**序列化并不保存静态变量**

### 7.5 Transient 关键字

Transient 关键字的作用是控制变量的序列化，用**Serializable**时，凡事用Transient声明的变量，状态都不会被序列化（**手动指定的除外，如实现Externalizable**）。

由此可知，反序列化时，该被Transient声明的字段，将会是初始值。

### 7.6 对象序列化步骤

**对象序列化步骤**：

　　1） 创建一个对象输出流，它可以包装一个其他类型的目标输出流，如文件输出流；
　　2） 通过对象输出流的writeObject()方法写对象。

**对象反序列化的步骤如下：**
　　1） 创建一个对象输入流，它可以包装一个其他类型的源输入流，如文件输入流；
　　2） 通过对象输入流的readObject()方法读取对象。

```java
/**
27      * MethodName: SerializePerson 
28      * Description: 序列化Person对象
29      * @author xudp
30      * @throws FileNotFoundException
31      * @throws IOException
32      */
33     private static void SerializePerson() throws FileNotFoundException,
34             IOException {
35         Person person = new Person();
36         person.setName("gacl");
37         person.setAge(25);
38         person.setSex("男");
39         // ObjectOutputStream 对象输出流，将Person对象存储到E盘的Person.txt文件中，完成对Person对象的序列化操作
40         ObjectOutputStream oo = new ObjectOutputStream(new FileOutputStream(
41                 new File("E:/Person.txt")));
42         oo.writeObject(person);
43         System.out.println("Person对象序列化成功！");
44         oo.close();
45     }
46 
47     /**
48      * MethodName: DeserializePerson 
49      * Description: 反序列Perons对象
50      * @author xudp
51      * @return
52      * @throws Exception
53      * @throws IOException
54      */
55     private static Person DeserializePerson() throws Exception, IOException {
56         ObjectInputStream ois = new ObjectInputStream(new FileInputStream(
57                 new File("E:/Person.txt")));
58         Person person = (Person) ois.readObject();
59         System.out.println("Person对象反序列化成功！");
60         return person;
61     }
```

### 7.7 优秀文章推荐

[Java基础学习总结——Java对象的序列化和反序列化](https://www.cnblogs.com/xdp-gacl/p/3777987.html)

[Thrift序列化与反序列化](https://blog.csdn.net/xuemengrui12/article/details/60963538)

## 8.CollectionUtils

### 8.1 依赖

```java
<dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-collections4</artifactId>
            <version>4.2</version>
        </dependency>
```

### 8.2 主要方法

1.并集

CollectionUtils.union(listA, listB)

2.交集

CollectionUtils.intersection(listA, listB)

3.交集的补集

CollectionUtils.disjunction(listA, listB)

4.差集

CollectionUtils.subtract(listA, listB)

5.判断集合是否为空

CollectionUtils.isEmpty(list)

6.判断集合是否相等

CollectionUtils.isEqualCollection(listA, listB)