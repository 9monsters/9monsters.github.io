---

---

为了解决原子性的问题，Java加入了锁机制，同时保证了可见性和顺序性。
JDK1.5的并发包中新增了Lock接口以及相关实现类来实现锁功能，比synchronized更加灵活，开发者可根据实际的场景选择相应的实现类。

本文注重讲解其不同衍生类的使用场景以及其内部AQS的原理

## Lock特性

1. 可重入性
2. 可响应中断
3. 可设置超时时间
4. 公平性


## 锁的使用

### ReentrantLock

### ReentrantReadWriteLock

### StampedLock

### Condition

### BlockingQueue

### CountDownLatch

### CyclicBarrier

### Semaphore

## AQS原理

### 并发问题解决

#### 原子性

#### 可见性与有序性

#### 线程阻塞与唤醒

#### AQS内部有两种模式：独占模式和共享模式

### 独占模式

#### AQS提供的独占模式相关的方法

#### AQS子类需要实现的独占模式相关的方法

#### 获取独占锁的流程

#### 释放独占锁的流程

### 共享模式

#### AQS提供的共享模式相关的方法

#### AQS子类需要实现的共享模式相关的方法

#### 获取共享锁的流程

#### 释放共享锁的流程

#### 等待队列中节点的状态变化

### ReentrantLock示例

#### tryAcquire逻辑

#### tryRelease逻辑
