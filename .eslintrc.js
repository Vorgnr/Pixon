module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    quotes: ['error', 'single']
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
