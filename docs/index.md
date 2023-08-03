---
layout: home

title: 9Monsters
titleTemplate: 一站式全栈内容网站，包括学习路线、知识体系

hero:
  name: 9Monsters
  text: "Full-stack learning document collection"
  tagline: |
    一站式全栈内容网站，包括学习路线、知识体系
  image:
    src: /it.svg
    alt: 9Monsters
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide
features:
  - icon: Spring
    title: Spring Cloud
    details: Spring Cloud。
    link: /spring-cloud/
    linkText: 编程学习
  - icon: ☁️
    title: 云原生
    details: 云原生知识。
    link: /cloud-native/
    linkText: 编程学习
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';

const members = [
  {
    avatar: 'https://www.github.com/9Monsters.png',
    name: '9Monsters wang',
    title: '逆水行舟，不进则退',
    desc: 'BE Developer<br/>Creator @ <a href="https://github.com/9Monsters" target="_blank">9Monsters</a>',
    links: [
      { icon: 'github', link: 'https://github.com/9Monsters' },
      {
       icon: { svg: '"fa-solid fa-user-secret"' } ,link: "https://space.bilibili.com/111",
      },
    ]
  }
]
</script>

<DataPanel/>