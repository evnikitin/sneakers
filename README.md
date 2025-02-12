# Проект на Next.js с Tailwind CSS, Prisma и NextAuth.js

Этот проект — веб-приложение, использующее **Next.js** для серверной и клиентской разработки, **Tailwind CSS** для стилизации, **Prisma** для работы с базой данных и **NextAuth.js** для аутентификации. Ниже представлена инструкция, как настроить и запустить проект на локальной машине.

## Содержание

- [Требования](#требования)
- [Установка](#установка)
- [Миграции Prisma](#миграции-prisma)
- [Инициализация базы данных](#инициализация-базы-данных)
- [Настройка аутентификации с NextAuth.js](#настройка-аутентификации-с-nextauthjs)
- [Запуск проекта](#запуск-проекта)

## Требования

Перед тем как начать, убедитесь, что на вашем компьютере установлены следующие инструменты:

- **Node.js** (рекомендуемая версия 18.x.x или выше) — [Скачать Node.js](https://nodejs.org/)
- **npm** или **yarn** (для управления пакетами) — npm обычно устанавливается вместе с Node.js
- **PostgreSQL** (или другая поддерживаемая СУБД для Prisma)

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone <URL-репозитория>
   cd <папка-проекта>
   ```

2. Установите зависимости:

   Если вы используете `npm`:

   ```bash
   npm install
   ```

   Или если вы используете `yarn`:

   ```bash
   yarn install
   ```

## Миграции Prisma

Проект использует Prisma для работы с базой данных. Перед запуском необходимо выполнить миграции.

1.  Настройка базы данных
    Для начала создайте и настройте вашу базу данных (например, PostgreSQL, MySQL или SQLite) в файле .env. Пример строки для PostgreSQL:

        ```bash
        DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
        ```

    Замените user, password, localhost, database_name на соответствующие значения для вашей базы данных.

2.  Выполнение миграций
    Примените миграции для настройки базы данных:

        ```bash
        npx prisma migrate dev
        ```
        Эта команда применит миграции и создаст необходимые таблицы в вашей базе данных.

3.  Генерация Prisma Client
    После выполнения миграций сгенерируйте клиент Prisma:

        ```bash
        npx prisma generate
        ```

4.  Открытие Prisma Studio
    Для удобного управления данными в базе данных и визуализации структуры используйте Prisma Studio:

        ```bash
        npx prisma studio
        ```
        Это откроет веб-приложение для работы с данными вашей базы данных.

## Инициализация базы данных

Для того, чтобы наполнить базу данных начальными данными, выполните скрипт seed.ts, который находится в папке prisma:

    ```bash
    npx prisma db seed
    ```

## Настройка аутентификации с NextAuth.js

В проекте используются авторизация через Google и GitHub

Для подключения аутентификации через Google и GitHub, вам нужно создать приложения в их соответствующих консолях:

Google:

1. Перейдите на Google Developer Console.
2. Создайте новый проект.
3. Перейдите в раздел Credentials и создайте новый OAuth 2.0 Client ID.
4. Укажите нужные настройки и добавьте URI редиректа: http://localhost:3000/api/auth/callback/google (для локальной разработки).
5. Сохраните clientId и clientSecret, которые вам понадобятся в следующем шаге.

GitHub:

1. Перейдите на GitHub Developer Settings.
2. Создайте новое приложение OAuth, указав необходимые параметры и URI редиректа: http://localhost:3000/api/auth/callback/github.
3. Сохраните clientId и clientSecret.

Добавьте переменные окружения в .env файл в корне проекта:

```bash
GOOGLE_CLIENT_ID=ваш_google_client_id
GOOGLE_CLIENT_SECRET=ваш_google_client_secret
GITHUB_CLIENT_ID=ваш_github_client_id
GITHUB_CLIENT_SECRET=ваш_github_client_secret
NEXTAUTH_SECRET=случайно_сгенерированное_значение_для_секрета
NEXTAUTH_URL=Ваш URL
```

По умолчанию при авторизации, вам будет присвоена роль-пользователя. Чтобы иметь функции админа, измените через prisma studio значение isAdmin в таблице User.

## Запуск проекта

Для запуска проекта в режиме разработки выполните команду:

```bash
npm run dev
```
