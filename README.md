# Vue 3 + Vite

На хостинге https://feedback-form-for-the-dream-team-1r.vercel.app/

Тестовое задание для https://hh.ru/vacancy/127971290?from=share_ios

Сделала рандомное появление окон о провале и успехе, чтобы показать оба их вида, нужно доработать темную тему и адаптив, но вцелом за короткий срок годный пет-проект

Figma: https://www.figma.com/design/caO5UqS6n5MAG3QtvZah6O/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0-%D0%9E%D0%A1-%D0%B4%D0%BB%D1%8F-%D0%B2%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B8?node-id=4-693&t=j5BKOYwkBvIWPhPt-0

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
