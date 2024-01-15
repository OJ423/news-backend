# Oliver's News API

In order to run this project locally. Use dotenv and configure your test and development environments.

1. Install dotenv - npm i dotenv
2. Create file at root level called .env.development
3. In this file add - PGDATABASE=nc_news
4. Create another file at root level called .env.test.
5. In this file add PGDATABASE=nc_news_test
6. Create a file called .gitignore at root level
7. Add .env.* to the .gitignore file to prevent git sync

Once done, see the scripts in the package.json to get started.