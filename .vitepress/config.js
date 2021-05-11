module.exports = {
  base: '/',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }]
  ],
  title: 'Nine',
  description: '王佳的个人小站',

  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2, 3, 4] },
    config: (md) => {
      // use more markdown-it plugins!
      // md.use(require('markdown-it-katex'))
    }
  },

  themeConfig: {
    repo: 'NineSwordsMonster',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    algolia: {
      apiKey: '380c0fa62872c88c54072130d9e6e78d',
      indexName: 'Github Page'
    },

    nav: [
      { text: '首页', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: '博客',
        link: '/blogs/',
        activeMatch: '^/blogs/'
      }
    ],

    sidebar: {
    }
  }
}