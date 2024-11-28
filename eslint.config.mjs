import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['src/local_modules/*', './src/local_modules/*'],
  },
  ...fixupConfigRules(compat.extends('plugin:react/recommended', 'airbnb')),
  {
    files: ['**/*.{js,jsx,mjs}'],
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
    },

    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        Image: 'readonly',
        WebSocket: 'readonly',
        navigator: 'readonly',
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        FileReader: 'readonly',
        location: 'readonly',
        alert: 'readonly',
        self: 'readonly',
        caches: 'readonly',
        AudioContext: 'readonly',
        AudioWorkletNode: 'readonly',
        OfflineAudioContext: 'readonly',
        MediaRecorder: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        ClipboardItem: 'readonly',
        __APP_VERSION__: 'readonly',
      },

      parser: babelParser,
      ecmaVersion: 2018,
      sourceType: 'module',

      parserOptions: {
        requireConfigFile: false,

        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx'],
        },
      },
    },

    rules: {
      'no-alert': 'off',
      'consistent-return': 'off',
      'no-return-assign': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-unused-vars': 'warn',

      'no-console': ['warn', {
        allow: ['warn', 'error', 'info'],
      }],

      'func-names': 'off',
      'no-process-exit': 'off',
      'object-shorthand': 'off',
      'class-methods-use-this': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'operator-linebreak': 'off',
      quotes: [2, 'single', 'avoid-escape'],
      'linebreak-style': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'max-len': ['error', {
        code: 120,
      }],

      'no-restricted-syntax': 'off',
      'guard-for-in': 'off',
      'no-restricted-properties': 'off',
      'no-useless-escape': 'off',
      radix: 'off',
      camelcase: 'warn',
      'no-restricted-globals': 'off',
      'use-isnan': 2,
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',

      'no-param-reassign': ['error', {
        props: false,
      }],

      'no-unused-expressions': ['error', {
        allowShortCircuit: true,
      }],

      'react/no-array-index-key': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/react-in-jsx-scope': 'off',

      'react/prop-types': [0, {
        ignore: ['children'],
      }],

      'react/jsx-props-no-spreading': 'off',
      'react/forbid-prop-types': 'off',
      'react/state-in-constructor': 'off',
      'react/jsx-filename-extension': 'off',
      'react/require-default-props': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-danger': 'off',
      'default-param-last': 'off',
      'no-nested-ternary': 'off',

      'react/function-component-definition': [0, {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      }],

      'jsx-a11y/label-has-associated-control': 'off',

      'import/order': ['error', {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],

        pathGroups: [{
          pattern: '@/**',
          group: 'internal',
        }],
      }],
    },
  },
];
