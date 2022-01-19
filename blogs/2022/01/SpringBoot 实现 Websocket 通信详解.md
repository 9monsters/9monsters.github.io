---
date: '2022-01-19'
description: 'Spring Boot 实现websocket 通信'
# head:
#     - - meta
#       - name: foo
#         content: bar
#     - - link
#       - rel: canonical
#         href: foobar
# lang: 'zh-CN'
# layout: 'CustomLayout'
# permalink: 'spring-websocket'
# permalinkPattern: ':year/:month/:day/:slug.html'
# routeMeta: 
title: 'Spring Boot 实现websocket 通信'
---

## WebSocket 简介

WebSocket 是一种基于 TCP 的网络协议。在 2009 年诞生，于 2011 年被 IETF 定为标准 RFC 6455 通信标准，并由 RFC7936 补充规范。WebSocket API 也被 W3C 定为标准。

WebSocket 也是一种全双工通信的协议，既允许客户端向服务器主动发送消息，也允许服务器主动向客户端发送消息。在 WebSocket 中，浏览器和服务器只需要完成一次握手，两者之间就可以建立持久性的连接，进行双向数据传输。

## WebSocket 特点

- 连接握手阶段使用 HTTP 协议；
- 协议标识符是 ws，如果采用加密则是 wss；
- 数据格式比较轻量，性能开销小，通信高效；
- 没有同源限制，客户端可以与任意服务器通信；
- 建立在 TCP 协议之上，服务器端的实现比较容易；
- 通过 WebSocket 可以发送文本，也可以发送二进制数据；
- 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器；

## 为什么需要 WebSocket

1. 短轮询(Traditional Polling)

    短轮询是指客户端每隔一段时间就询问一次服务器是否有新的消息，如果有就接收消息。这样方式会增加很多次无意义的发送请求信息，每次都会耗费流量及处理器资源。

    - 优点：短连接，服务器处理简单，支持跨域、浏览器兼容性较好。
    - 缺点：有一定延迟、服务器压力较大，浪费带宽流量、大部分是无效请求。

2. 长轮询(Long Polling)

    长轮询是段轮询的改进，客户端执行 HTTP 请求发送消息到服务器后，等待服务器回应，如果没有新的消息就一直等待，知道服务器有新消息传回或者超时。这也是个反复的过程，这种做法只是减小了网络带宽和处理器的消耗，但是带来的问题是导致消息实时性低，延迟严重。而且也是基于循环，最根本的带宽及处理器资源占用并没有得到有效的解决。

    - 优点：减少轮询次数，低延迟，浏览器兼容性较好。
    - 缺点：服务器需要保持大量连接。

## WebSocket 连接流程

## WebSocket 使用场景

## WebSocket 中子协议支持

## 什么是 STOMP 协议

## Spring 封装的 STOMP

## SpringBoot 实现 WebSocket 示例一：实现简单的广播模式

## SpringBoot 实现 WebSocket 示例二：实现点对点模式(引入 Spring Security 实现鉴权)

## SpringBoot 实现 WebSocket 示例三：实现点对点模式(根据请求头 Header 实现鉴权)

## SpringBoot 实现 WebSocket 示例四：实现点对点模式(根据 HTTP Session 实现鉴权)

## SpringBoot 结合 WebSocket 的常用方法示例

### WebSocket 开启跨域选项

### WebSocket 用户上、下线监听
