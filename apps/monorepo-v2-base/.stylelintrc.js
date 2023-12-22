module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  defaultSeverity: 'warning',
  plugins: ['stylelint-scss'],
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': null,
  },
  customSyntax: 'postcss-css',
};
