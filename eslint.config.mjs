import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { configs, plugins } from 'eslint-config-airbnb-extended';

export default [
  {
    ignores: ['src/local_modules/*', './src/local_modules/*'],
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  ...configs.react.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],

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

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: './jsconfig.json',
        }),
      ],
    },

    rules: {
      'no-alert': 'off',
      'consistent-return': 'off',
      'no-return-assign': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'no-unused-vars': 'warn',

      'no-console': ['warn', {
        allow: ['warn', 'error', 'info'],
      }],

      'func-names': 'off',
      'no-process-exit': 'off',
      'object-shorthand': 'off',
      'class-methods-use-this': 'off',
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/linebreak-style': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@stylistic/max-len': ['error', {
        code: 120,
      }],

      'no-restricted-syntax': 'off',
      'guard-for-in': 'off',
      'no-restricted-properties': 'off',
      'no-useless-escape': 'off',
      radix: 'off',
      camelcase: 'warn',
      'no-restricted-globals': 'off',
      'use-isnan': 'error',
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',

      'no-param-reassign': ['error', {
        props: false,
      }],

      'no-unused-expressions': ['error', {
        allowShortCircuit: true,
      }],

      '@stylistic/brace-style': ['error', '1tbs', {
        allowSingleLine: true,
      }],
      '@stylistic/max-statements-per-line': 'off',
      'import-x/no-rename-default': 'off',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',

      'react/no-array-index-key': 'off',
      'react/jsx-one-expression-per-line': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
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

      'import-x/order': ['error', {
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
