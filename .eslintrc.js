module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'airbnb',
      'react-app',
      'plugin:prettier/recommended',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      quotes: [2, 'single'],
      indent: 'off',
      '@typescript-eslint/indent': ['error', 2],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.js', '.jsx', '.tsx'] },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*.stories.tsx'] },
      ],
      'react/jsx-one-expression-per-line': 'off',
  
      // This rule was deprecated in v6.1.0. It will no longer be maintained. Please use label-has-associated-control instead.
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/label-has-associated-control': 'warn',
  
      // TODO: these might be nice to have but are creating too many errors right now
      '@typescript-eslint/explicit-function-return-type': 'off',
      // '@typescript-eslint/no-object-literal-type-assertion': 'off',
      '@typescript-eslint/indent': 'off',
      'import/no-unresolved': 'off',
    },
  };
  