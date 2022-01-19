module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@lint-md/recommend'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  },
  overrides: [
    {
      files: ['*.md'],
      parser: '@lint-md/eslint-plugin/lib/parser',
      extends: ['plugin:@lint-md/recommend'],
      rules: {
        // 在这里覆盖已有的 rules
        '@lint-md/no-long-code': [
          2,
          {
            length: 100,
            exclude: []
          }
        ]
      }
    }
  ]
}
