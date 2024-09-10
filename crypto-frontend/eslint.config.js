import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] }, // Ignore dist folder
  {
    files: ['**/*.{js,jsx}'], // Target JS and JSX files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Use browser globals
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: 'module', // Allow import/export syntax
      },
    },
    settings: { react: { version: '18.2' } }, // Updated to stable React version
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh, // Used for React Refresh
    },
    rules: {
      ...js.configs.recommended.rules, // Use recommended rules from ESLint
      ...react.configs.recommended.rules, // React plugin recommended rules
      ...react.configs['jsx-runtime'].rules, // Enable JSX runtime support
      ...reactHooks.configs.recommended.rules, // React hooks rules
      'react/jsx-no-target-blank': 'off', // Turn off 'no target blank' rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow constant exports with warning
      ],
    },
  },
];
