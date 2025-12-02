import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // применяем к JS и Vue файлам
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      // JS правила
      indent: ["error", 2],            // отступы в JS
      quotes: ["error", "single"],     // одинарные кавычки
      semi: ["error", "always"],       // точки с запятой
      "no-trailing-spaces": "error",   // нет пробелов в конце строки

      // Vue правила
      "vue/html-indent": ["error", 2], // отступы 2 пробела в шаблоне
      "vue/max-attributes-per-line": ["error", {
        "singleline": 3,               // сколько атрибутов на одной строке
        "multiline": { "max": 1 }      // многострочные: по одному на строку
      }],
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off"
    }
  },
  pluginVue.configs["flat/essential"]
]);
