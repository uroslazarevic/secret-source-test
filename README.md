# secret-source-test

## NOTES

1. Licencing workflow is implemented so that App generates licences
2. CSV data is saved in the proccess of CSV upload, because we already recieve all the data when we are reading CSV
3. All CSV records are saved in history, and can be easily emailed to Admin userc, currently this is not implemented

## Get started

git clone https://github.com/uroslazarevic/secret-source-test.git

cd secret-source-test

## Settings

create .env file from .env.example

## Database

### Migrations

1. Create database: `npm run knex migrate:latest`
2. Create a new migration `npm run knex migrate:make -- migration_name`
3. Migrate up: `npm run knex migrate:up`
4. Migrate down: `npm run knex migrate:down`
5. Run specific migration: `npm run knex migrate:up migration_name.ts`

### Seeds

1. Create a new seed: npm run knex seed:make seed_name

## Instalation

npm install

## Run the server

npm start

## Future improvments

1. Validation for inputs should be added
2. Email verification of users
3. Forbid certification of already certified users
4. Better project structure
5. Remove app sensitive data from .env, and insert it .gitlab-ci
