import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    ...html.configs['flat/recommended'],
    files: ['**/*.html'],
    plugins: {
      '@html-eslint': html,
    },
    languageOptions: {
      parser: htmlParser,
    },
  },
];
