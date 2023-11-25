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
    'plugin:storybook/recommended',
  ],
  plugins: ['filename-rules'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    '@typescript-eslint/no-use-before-define': 'warn',
    'promise/prefer-await-to-then': 'off',
    'filename-rules/match': [
      2,
      {
        '.ts': 'camelCase',
        '^(?!index.tsx?$).+.tsx$': 'PascalCase',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
