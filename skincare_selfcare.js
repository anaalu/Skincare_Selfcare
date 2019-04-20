// const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  // ssl: true
  
    user: 'me',
    host: 'localhost',
    database: 'testdb',
    password: 'password',
    port: 5432,
  
});

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
      res.render('pages/db', results );
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' '
  }
  return result;
}

getUsers = async () => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM test_table');
  const results = { 'results': (result) ? result.rows : null};
  client.release();
  return results;
}