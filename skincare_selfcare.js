// const cool = require('cool-ascii-faces')
require('dotenv').config();
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');

var pool = null;
if (process.env.NODE_ENV === 'development') {
    pool = new Pool({  
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/login', (req, res) => res.render('pages/login'))
  .get('/signup', (req, res) => res.render('pages/signup'))
  .get('/db', async (req, res) => {
    try {
      const results = await getUsers();
      // res.render('pages/db', results );
      console.log(results);
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

getUsers = async () => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM test_table');
  const results = { 'results': (result) ? result.rows : null};
  client.release();
  return results;
}