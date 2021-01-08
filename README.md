# Skincare Is Selfcare

[Skincare Is Selfcare](https://whispering-waters-40836.herokuapp.com/) is a web application currently being worked on. It strives to provide users with an intuitive way to track multi-step skincare routines. Hosted on Heroku, it is backed by a PostgreSQL database and Javascript.  


***
## Table of Contents
- [Getting Started](#getting-started)
    - [PostgreSQL](#postgresql)
    - [Javascript](#javascript)
    - [Heroku](#heroku)


## Getting Started
* Create a `.env` file with the following:
```
NODE_ENV=development
DB_USER= anything you want
DB_HOST=localhost
DB_DATABASE=skincare_app
DB_PASSWORD=password
DB_PORT=5432
SESSION_SECRET= ask someone for this
```

### PostgreSQL
This part has to be completed otherwise the code will not run!

* Install PostgreSQL following the steps for your particular OS:
    * Mac: https://www.robinwieruch.de/postgres-sql-macos-setup
    * Linux: ?
    * Windows: ?

* Initialize a database with properties as specified in the `.env` file above and create the following tables:
```sql
CREATE TABLE "users" (
  "id" smallserial PRIMARY KEY,
  "email" varchar(255) NOT NULL UNIQUE,
  "password" varchar(100) NOT NULL
);

CREATE TABLE "products" (
  "product_id" smallserial PRIMARY KEY,
  "user_id" smallserial,
  "product_name" varchar,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

### Javascript
* Install Yarn: https://classic.yarnpkg.com/en/docs/install

* (Git clone this repo)

* Run and build (you can refer to the scripts in `package.json`):
```
yarn install
yarn start
```
Open your browser to http://localhost:5000/ and you should see the same landing page as the one deployed on Heroku.


### Heroku
* Nothing yet.

