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
  }
};
