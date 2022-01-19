import type { DefaultThemeOptions } from '@vuepress/theme-default'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'

import { defineUserConfig } from '@vuepress/cli'

import { path } from '@vuepress/utils'
import { navbar, sidebar } from './configs'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
    bundler:
        // specify bundler via environment variable
        process.env.DOCS_BUNDLER ??
        // use vite by default
        '@vuepress/vite',
    bundlerConfig: {
        // 查看下方
    },

    plugins: [
        ['@vuepress/plugin-debug'],
        [
            '@vuepress/plugin-google-analytics',
            {
                // we have multiple deployments, which would use different id
                id: process.env.DOCS_GA_ID
            }
        ],
        [
            '@vuepress/plugin-register-components',
            {
                componentsDir: path.resolve(__dirname, './components')
            }
        ], // only enable shiki plugin in production mode
        [
            '@vuepress/plugin-shiki',
            isProd
                ? {
                      theme: 'dark-plus'
                  }
                : false
        ],
        [
            '@vuepress/container',
            {
                type: 'tip',
                locales: {
                    '/': {
                        defaultInfo: 'TIP'
                    },
                    '/zh/': {
                        defaultInfo: '提示'
                    }
                }
            }
        ]
    ]
})
