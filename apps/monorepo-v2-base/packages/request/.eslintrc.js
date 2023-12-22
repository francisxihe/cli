module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['@fl/eslint-config-ts', '@fl/eslint-config-vue2'],
  settings: {
    next: {},
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-use-before-define': 1,
  },
};
