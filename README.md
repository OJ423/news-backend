# Social News API

## Overview
This repo is a social news api providing backend functionality for an application. With a Postgres database and an Express server, the application serves JSON via various endpoints to use in a frontend.

**A hosted version** can be [found here](https://news-service-api.onrender.com/). *This service rebuilds after 15 minutes of inactivity so please bear with it if it take a while to load*. A list and description of available endpoints can be [found here](https://news-service-api.onrender.com/api).

The database contains tables for articles, comments, topics and users. These are joined in various ways. For a better understanding of their structure read the `seed.js` file. The API allows for get, post, patch, delete and query. 

Please feel free to clone and use this project as you wish.

## Set Up Instructions

### Clone

Clone to your own local directory using git:

```bash
git clone https://github.com/OJ423/news-backend.git
```

### Install Dependencies

- "dotenv": "^16.3.1" - npm i dotenv 
- "express": "^4.18.2" - npm i express
- "fs.promises": "^0.1.2" - npm i fs.promises
- "pg": "^8.11.3" - npm i pg
- "husky": "^8.0.2" - npm i husky

#### Developer Dependencies

To seed the database and for unit and integration testing, install the following dev dependencies:

- "jest": "^27.5.1" - npm i -D jest
- "jest-extended": "^2.0.0" - npm i --save-dev jest-extended
- "jest-sorted": "^1.0.14" - npm i -D jest-sorted
- "pg-format": "^1.0.4", - npm i -D pg-format
- "supertest": "^6.3.4" - npm i -D supertest

### Create Test, Development and Production Environments

In order to run this project locally. Use dotenv and configure your test and development environments.

1. Create file at root level called .env.development
2. In this file add - PGDATABASE=nc_news
3. Create another file at root level called .env.test.
4. In this file add PGDATABASE=nc_news_test
5. Create file at root level called .env.production
6. In this file you need to specify your production database address - for example DATABASE_URL=your_database_url

### Initialise Databases
Before seeding the database you may wish to change the database name. The database details can be found in the file called `setup.sql`. If you change the database names, ensure that you chance these references in your .env files.

To initialise the test and dev databases:

```bash
npm run setip-dbs
```

### Seed Database

*Requires PG format installation*

In the terminal:

```bash
npm run seed
```

To check you have seeded the database try -

```bash
psql
\c your_database
SELECT * FROM articles
```

This should return all articles in the database.

### Testing

If extending functionality or want get a better understanding of the API's functionality, take a look at the `__tests__` folder. In order to run tests you will need to have installed `jest`, `jest-extended`, `jest-sortby` and `supertest`.

Run tests from the terminal by using -

```bash
npm test
```