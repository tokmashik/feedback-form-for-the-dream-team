# Vue 3 + Vite

На хостинге https://feedback-form-for-the-dream-team-1r.vercel.app/

Тестовое задание для https://hh.ru/vacancy/127971290?from=share_ios

Сделала рандомное появление окон о провале и успехе, чтобы показать оба их вида, нужно доработать темную тему и адаптив, но вцелом за короткий срок годный пет-проект

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
