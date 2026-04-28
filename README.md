# HouseKeeper Frontend

Frontend-приложение HouseKeeper для управления домами, помещениями, платежами, пользователями и связанными сущностями. Проект собран на Create React App и использует React 18, TypeScript, Redux Toolkit, React Router, Ant Design, SCSS и Axios.

## Требования

- Node.js 20 рекомендуется, так как Docker-сборка использует `node:20`.
- npm и зависимости из `package-lock.json`.

Установка зависимостей:

```bash
npm install
```

## Локальный запуск

```bash
npm start
```

Приложение откроется на `http://localhost:3000`. Dev-сервер автоматически перезагружает страницу при изменениях в исходниках.

## Переменные окружения

Backend API задаётся переменной `REACT_APP_BACKEND_URL`. Она используется в `src/backend/axios.ts` как `axios.defaults.baseURL`.

Важно: в Create React App все переменные `REACT_APP_*` встраиваются в bundle **во время сборки**. Если изменить переменную окружения в уже запущенном nginx-контейнере, собранный frontend не изменится.

Файлы окружения:

- `.env` — общие значения для всех режимов.
- `.env.development` — значения для `npm start`.
- `.env.production` — значения для `npm run build`.
- `.env.local`, `.env.development.local`, `.env.production.local` — локальные override-файлы, игнорируются git.

Пример локального override:

```bash
REACT_APP_BACKEND_URL=https://backend.housekpr.ru/api
```

## Команды

```bash
npm start
```

Запускает приложение в development-режиме.

```bash
npm test
```

Запускает Jest/React Testing Library через CRA в watch-режиме.

```bash
npm run build
```

Собирает production bundle в директорию `build/`. В сборку также встраивается `REACT_APP_GIT_SHA` из текущего git-коммита.

```bash
npm run lint:fix
```

Запускает ESLint для `src/**/*.ts` и `src/**/*.tsx` с автоматическим исправлением доступных ошибок.

```bash
npm run swagger:codegen
```

Генерирует backend API-клиент в `src/backend/services/backend`.

## Структура проекта

- `src/index.tsx`, `src/App.tsx` — точки входа приложения.
- `src/pages/` — страницы и feature-разделы: `auth`, `buildings`, `payments`, `gates`, `admin`, `rooms`.
- `src/components/` — переиспользуемые UI-компоненты.
- `src/layout/` — общий layout, header, sider и page header.
- `src/store/` — Redux store, reducers, selectors и middleware.
- `src/navigation/` — маршруты, типы роутинга и private route.
- `src/backend/` — Axios-конфигурация, кодогенерация и сгенерированные API-сервисы.
- `src/hooks/`, `src/utils/`, `src/context/`, `src/icons/` — общие хуки, утилиты, контекст и иконки.
- `public/` — статические ресурсы CRA.
- `conf/` — nginx-конфигурация для Docker-образа.

## API-клиент

Базовый URL backend задаётся через `REACT_APP_BACKEND_URL`. Общие настройки Axios находятся в `src/backend/axios.ts`: base URL, timeout, обработка 401/403 и сериализация query-параметров.

Сервисы backend генерируются через `npm run swagger:codegen`. Скрипт использует `src/backend/task.js` и складывает результат в `src/backend/services/backend`. После регенерации проверьте diff, потому что эти файлы входят в кодовую базу.

## Docker и деплой

`Dockerfile` собирает frontend в node builder stage, затем копирует `build/` в nginx image.

Backend URL для Docker-сборки передаётся build argument:

```bash
docker build --build-arg REACT_APP_BACKEND_URL=https://backend.housekpr.ru/api .
```

GitHub Actions workflow `.github/workflows/deploy-to-mr17dom1.yml` передаёт `REACT_APP_BACKEND_URL` из repository secret с таким же именем. Для production-деплоя убедитесь, что secret `REACT_APP_BACKEND_URL` задан.

`docker-compose.yml` используется на сервере для запуска опубликованного образа `lobanovsky/housekeeper-frontend:${TAG}` за Traefik.

## Стиль кода

Форматирование задаётся Prettier:

- одинарные кавычки;
- tabs, `tabWidth: 4`;
- `printWidth: 100`;
- одинарные кавычки в JSX.

ESLint расширяет `react-app`, `react-app/jest`, Airbnb, Airbnb TypeScript и `plugin:import/typescript`. Перед pull request запускайте `npm run lint:fix` и проверяйте оставшиеся предупреждения вручную.

## Тестирование

Тесты запускаются командой:

```bash
npm test
```

Проект использует Jest и React Testing Library. Новые тесты лучше размещать рядом с тестируемым компонентом или модулем в формате `*.test.tsx` / `*.test.ts`. Для UI-изменений покрывайте видимое поведение пользователя, а не внутреннюю реализацию компонента.
