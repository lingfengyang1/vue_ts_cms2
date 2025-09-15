// eslint.config.js
import js from "@eslint/js"
import vue from "eslint-plugin-vue"
import typescriptEslint from "typescript-eslint"
import vueParser from "vue-eslint-parser"
import prettierConfig from "eslint-config-prettier"
import prettier from "eslint-plugin-prettier"

export default [
  // 添加这个忽略配置 - 必须放在最前面
  {
    ignores: [
      "dist/**/*",
      "dist/",
      ".local",
      ".output.js",
      "node_modules/**/*",
      "**/*.svg",
      "**/*.sh",
      "public/*",
      "*.min.js",
      "build/**/*",
      "coverage/**/*",
      ".vite/**/*"
    ]
  },

  // 基础 JavaScript 推荐配置 对应.eslintrc中的eslint:recommended预配置
  js.configs.recommended,

  // Vue 3 基础配置 对应.eslintrc中的plugin:vue/vue3-essential预配置
  ...vue.configs["flat/essential"],

  // TypeScript 配置 - 使用新的 typescript-eslint v8 对应的是@vue/eslint-config-typescript预配置
  ...typescriptEslint.configs.recommended,

  // Vue + TypeScript 文件特殊配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptEslint.parser,
        ecmaVersion: "latest",
        sourceType: "module"
      }
    }
  },

  // 所有文件的语言配置
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    }
  },

  // Prettier 配置
  // Prettier预配置
  prettierConfig,
  {
    plugins: {
      prettier
    },
    rules: {
      // 不符合prettier规范时报错
      "prettier/prettier": "error"
    }
  },

  // 自定义规则
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off",
      "constructor-super": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off"
    }
  }
]
