module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'react-app',
    // 'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jsx-a11y/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  plugins: ['jsx-a11y', 'prettier'],
  rules: {
    // 'no-console': [
    //   'error',
    //   {
    //     allow: ['warn', 'error']
    //   }
    // ],
    'no-nested-ternary': 2,
    'react/prop-types': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 'off',
    'no-debugger': 1
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {}
    }
  ]
}