module.exports = {
  root: true,
  extends: ['@fl/eslint-config', '@fl/eslint-config-ts'],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
