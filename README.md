# Vue 3 + Vite

Тестовое задание для https://hh.ru/vacancy/127971290?from=share_ios

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


# ESLint автоматическое исправление ошибок:
npx eslint src --ext .js,.vue --fix

# Форматирование все JS и Vue файлы в src
npx prettier --write "src/**/*.{js,vue}"

# просто проверить ошибки
npx eslint src --ext .js,.vue

# 1. Сначала автофикс ESLint (отрегулирует отступы, правила Vue)
yarn lint:fix

# 2. Потом Prettier (сделает одинарные кавычки, пробелы, точки с запятой)
yarn format
