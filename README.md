# Secret Source test app

## NOTES

1. Licencing workflow is implemented so that App generates licences
2. CSV data is saved in the proccess of CSV upload, because we already recieve all the data when we are reading CSV
3. All CSV records are saved in history, and can be easily emailed to Admin users. Currently this is not implemented

## Get started

All the sensitive information is inside `.env` file.
In production enviroment this file shouldn't be pushed into the git project,
but since this is a test project, it's fine (smiley)

Run following commands in your terminal to kick-start the project!

1. `git clone https://github.com/uroslazarevic/secret-source-test.git` -> clone project
2. `cd secret-source-test` -> enter the newly cloned project
3. `npm install` -> install all node_modules
4. `createdb test-db` -> this is the default name of the database found in `.env` file
5. `npm run knex migrate:latest` -> migrate all the tables
6. `npm run start` -> run the nodemon server

## Available APIs

Currently we have four endpoints. The easiest way to test endpoints is to use popular app named [Postman](https://www.postman.com/downloads/).
To use Postman, you need to install it and create **New Collection**. Collection name can be your database name. In your collection, you need to create **New Request's** with the following data.

### Register User request

1. Request name: Register User
2. Request method: POST
3. URL: http://localhost:8000/register
4. Body field should be **raw** format with the following input:

```
    {
        "name":"Test User",
        "password":"testtest",
        "email":"test@gmail.com",
    }
```

### Login User request

1. Request name: Login User
2. Request method: POST
3. URL: http://localhost:8000/login
4. Body field should be **raw** format with the following input:

```
    {
		"email":"test@gmail.com",
		"password":"testtest"
    }
```

5. In request response you should recieve your authorization token. Don't forget to use it for **CSV Upload** and **CSV Report** requests

### CSV Upload request

1. Request name: CSV Upload
2. Request method: POST
3. URL: http://localhost:8000/csv/upload
4. In **Authorization** field select **Bearer Token** and paste your authorization token recieved from **Login User** request
5. Body field should be **form-data** format:
   - In table header **KEY** select field type of **File** and name it **file**
   - Edit sample.csv with your data
   - In table header **VALUE** select **sample.csv** with **Select Files** and **SEND** request

### CSV Report request

1. Request name: CSV Report
2. Request method: POST
3. URL: http://localhost:8000/csv/report
4. In **Authorization** field select **Bearer Token** and paste your authorization token recieved from **Login User** request
5. Body field should be **none** format
6. Request response is simple message informing you that all road licences are emailed to matching users.
   If you check your database you will notice that road_licences records are updated.

## Future improvments

1. Add validation request body
2. Add User email verification
3. Forbid certification of already certified users
4. Better project structure
5. Remove app sensitive data from .env, and insert it via .gitlab-ci
