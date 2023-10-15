/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [
    'eslint-config-siyoon',
    'eslint-config-siyoon/typescript',
    'eslint-config-siyoon/imports',
    'eslint-config-siyoon/react',
    'eslint-config-siyoon/prettier',
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
};
