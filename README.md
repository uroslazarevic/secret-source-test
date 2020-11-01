# secret-source-test

## Get started

git clone https://github.com/uroslazarevic/secret-source-test.git

cd secret-source-test

## Settings

create .env file from .env.example

## Database

1. Create database: `npm run knex migrate:latest`
2. Create a new migration `npm run knex migrate:make -- migration_name`
3. Migrate up: `npm run knex migrate:up`
4. Migrate down: `npm run knex migrate:down`
5. Run specific migration: `npm run knex migrate:up migration_name.ts`

## Instalation

npm install

## Run the server

npm start
