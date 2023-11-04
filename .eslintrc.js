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
  plugins: ['filename-rules'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    '@typescript-eslint/no-use-before-define': 'error',
    'promise/prefer-await-to-then': 'off',
    'filename-rules/match': [
      2,
      {
        '.ts': 'camelCase',
        '^(?!index.tsx?$).+.tsx$': 'PascalCase',
      },
    ],
  },
};
