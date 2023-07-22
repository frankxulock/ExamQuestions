# Backend Exam

### Docker compose

[Install Docker](https://www.cherryservers.com/blog/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

```
  $ cd ./mysqlServices
  $ docker-compose up -d
```

### MySQL initial sql

You could use any client to connect MySQL and setup.

**database**

Please create a database in MySQL namded `examdemo`.

```
CREATE DATABASE examdemo;
```

**users table**

Please create a table named users in examdemo.

```
CREATE TABLE users (
    id    SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) UNIQUE NOT NULL,
    name  VARCHAR(30) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT   CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

## Run Your process

```
$ yarn install
$ yarn dev
```

After start the proccess you could got this two example.

[Example API](http://localhost:3000/example)

[Swagger](http://localhost:3000/api-docs)

### unitest and coverage

```
  $ yarn test
```

## Authorization

[JWT](https://en.wikipedia.org/wiki/JSON_Web_Token)

## Issues

[Issues](https://github.com/frankxulock/ExamQuestions/issues)

You could use any one of NPM packages to connect Mysql and these functions.

Please complete the coverage report and bonus options as much as possible
