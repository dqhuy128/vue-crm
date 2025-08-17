import prettierConfig from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import vuePlugin from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default tseslint.config(
  // Áp dụng bộ quy tắc khuyến nghị cho Vue 3 và TypeScript
  ...vuePlugin.configs['flat/recommended'],
  ...tseslint.configs.recommended,

  // Cấu hình tùy chỉnh cho dự án
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    ignores: ['dist/**', '**/*.vue.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        // Do not enable type-aware linting globally to avoid parsing errors on non-source files
        project: null,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // Sắp xếp import/export
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Báo lỗi unused import/vars
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Các quy tắc khác
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'vue/require-v-for-key': 'warn',
      'vue/valid-v-for': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/no-dupe-keys': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Tắt các quy tắc xung đột với Prettier (phải ở cuối cùng)
  prettierConfig
)
