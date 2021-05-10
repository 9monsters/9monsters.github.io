---

---
[[toc]]

## 1. 概览

Spring Native提供了使用`GraalVM`本机图像编译器将Spring应用程序编译为本机可执行文件的支持。

与Java虚拟机相比，本机映像可以为许多类型的工作负载提供更便宜，更可持续的托管。这些包括微服务，功能工作负载，非常适合容器和Kubernetes

使用本机映像具有关键优势，例如即时启动，即时峰值性能和减少的内存消耗。

GraalVM本机项目希望随着时间的推移会改善一些缺点和折衷方案。构建本机映像是一个繁重的过程，比常规应用程序要慢。预热后，本机映像具有较少的运行时优化。最后，它比具有某些不同行为的JVM还不成熟。

常规JVM和此本机映像平台之间的主要区别是：

- 在构建时会从主入口点对应用程序进行静态分析。

- 在构建时将未使用的零件删除。

- 反射，资源和动态代理需要配置。

- 类路径在构建时是固定的。

- 没有类延迟加载：可执行文件中附带的所有内容都将在启动时加载到内存中。

- 一些代码将在构建时运行。

- 围绕Java应用程序的某些方面存在一些局限性，这些局限性未得到完全支持。

该项目的目标是孵化对`Spring Native`（Spring JVM的替代方案）的支持，并提供旨在打包在轻量级容器中的本机部署选项。实际上，目标是在此新平台上支持几乎未修改的Spring应用程序。

::: tip
这项工作正在进行中，有关更多详细信息，请参阅支持的功能列表
:::

### 1.1 模块

Spring Native由以下模块组成：

- `spring-native`：运行`Spring Native`所需的运行时依赖项，还提供了Native提示API。

- `spring-native-configuration`：`Spring AOT`插件使用的Spring类的配置提示，包括各种`Spring Boot`自动配置。

- `spring-native-docs`：参考指南，采用`asciidoc`格式。

- `spring-native-tools`：用于查看图像构建配置和输出的工具。

- `spring-aot`：Maven和Gradle插件共有的AOT转换基础结构。

- `spring-aot-gradle-plugin`：调用AOT转换的Gradle插件。

- `spring-aot-maven-plugin`：调用AOT转换的Maven插件。

- `samples`：包含各种示例，这些样本演示了功能用法，并用作集成测试。

## 2. 入门

构建Spring Boot本机应用程序的两种主要方法：

- 使用`Spring Boot Buildpacks`支持生成包含本地可执行文件的轻量级容器。

- 使用`GraalVM`本机映像Maven插件支持来生成本机可执行文件。

:::tip
要在您的IDE中使用Spring Native，需要执行其他步骤。有关更多详细信息，请查看[专用部分](#4-1-maven)。
:::

### 2.1 Buildpacks入门

本部分为您提供了使用`Cloud Native Buildpacks`构建`Spring Boot`本机应用程序的实用概述。这是使用`RESTful Web Service`入门指南的实用指南。

::: tip
启动新的本机Spring Boot项目的最简单方法是转到[start.spring.io](https://start.spring.io/)，添加`Spring Native`依赖项并生成项目。
:::

#### 2.1.1 系统要求

应该安装`Docker`，有关更多详细信息，请参阅获取`Docker`。如果您使用的是`Linux`，请将其配置为允许非`root`用户

::: tip
您可以运行docker run hello-world（不使用sudo）来检查Docker守护程序是否可以正常访问，请参阅相关的[Maven](https://docs.spring.io/spring-boot/docs/2.4.5/maven-plugin/reference/htmlsingle/#build-image-docker-daemon)或[Gradle](https://docs.spring.io/spring-boot/docs/2.4.5/gradle-plugin/reference/htmlsingle/#build-image-docker-daemon) Spring Boot插件文档。
:::

::: tip
在MacOS上，建议将分配给Docker的内存增加到至少8GB，并可能增加更多CPU。有关更多详细信息，请参见此[Stackoverflow](https://stackoverflow.com/questions/44533319/how-to-assign-more-memory-to-docker-container/44533437#44533437)答案。在Microsoft Windows上，请确保启用[Docker WSL 2后端](https://docs.docker.com/docker-for-windows/wsl/)以获得更好的性能。
:::

#### 2.1.2 样例项目设置

可以使用以下命令来检索完整的“ RESTful Web服务”指南：

``` bash
git clone https://github.com/spring-guides/gs-rest-service
cd gs-rest-service/complete
```

##### 验证Spring Boot版本

::: danger
Spring Native 0.9.2仅支持Spring Boot 2.4.5，因此如有必要，请更改版本。
:::

- Maven

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.4.5</version>
    <relativePath/>
</parent>
```

- Gradle Groovy

```gradle
plugins {
    // ...
    id 'org.springframework.boot' version '2.4.5'
}
```

- Gradle Kotlin

``` gradle
plugins {
    // ...
    id("org.springframework.boot") version "2.4.5"
}
```

##### 添加Spring Native依赖项

`org.springframework.experimental：spring-native`提供本机配置API，例如`@NativeHint`以及将Spring应用程序作为本机映像运行所需的其他强制类。您只需要使用Maven显式地指定它。

- Maven
```xml
<dependencies>
    <!-- ... -->
    <dependency>
        <groupId>org.springframework.experimental</groupId>
        <artifactId>spring-native</artifactId>
        <version>0.9.2</version>
    </dependency>
</dependencies>
```

- Gradle Groovy

```gradle
// 无需使用Gradle显式添加spring-native依赖项，Spring AOT插件将自动添加它。
```

- Gradle Kotlin

```gradle
// 无需使用Gradle显式添加spring-native依赖关系，Spring AOT插件将自动添加它。
```

##### 添加Spring AOT插件

Spring AOT插件执行提前转换，以改善本机图像兼容性和覆盖范围。

::: tip
转换也适用于JVM，因此无论如何均可应用。
:::

- Maven

```xml
<build>
    <plugins>
        <!-- ... -->
        <plugin>
            <groupId>org.springframework.experimental</groupId>
            <artifactId>spring-aot-maven-plugin</artifactId>
            <version>0.9.2</version>
            <executions>
                <execution>
                    <id>test-generate</id>
                    <goals>
                        <goal>test-generate</goal>
                    </goals>
                </execution>
                <execution>
                    <id>generate</id>
                    <goals>
                        <goal>generate</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

- Gradle Groovy

```gradle
plugins {
    // ...
    id 'org.springframework.experimental.aot' version '0.9.2'
}
```

- Gradle Kotlin

```gradle
plugins {
    // ...
    id("org.springframework.experimental.aot") version "0.9.2"
}
```

该插件提供了许多用于自定义转换的选项，有关更多详细信息，请参见配置[Spring AOT](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#spring-aot-configuration)。

##### 启用本机图像支持

Spring Boot的[Cloud Native Buildpacks](https://docs.spring.io/spring-boot/docs/2.4.5/reference/html/spring-boot-features.html#boot-features-container-images-buildpacks)支持使您可以为Spring Boot应用程序构建容器。可以使用BP_NATIVE_IMAGE环境变量来启用[本机映像构建包](https://github.com/paketo-buildpacks/native-image)，如下所示

##### Maven仓库

将构建配置为包括`spring-native`依赖项所需的存储库，如下所示：

#### 2.1.3 构建本机应用程序

#### 2.1.4 运行本机应用程序

### 2.2 本机镜像Maven插件入门

## 3. 支持

### 3.1 GraalVM

### 3.2 Language

### 3.3 功能标志

### 3.4 Spring Boot

::: danger

:::

### 3.5 Spring Cloud


### 3.6 其他

### 3.7 局限性

不支持类的`CGLIB`代理，目前仅支持接口上的`JDK动态代理`。因此，使用`Spring Native`时，*spring.aop.proxy-target-class*设置为*false*。如果您对课程的代理支持感兴趣，可以订阅并投票给＃356。

## 4. Spring AOT

### 4.1 Maven


