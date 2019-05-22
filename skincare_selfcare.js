const cool = require('cool-ascii-faces')
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

const { Pool } = require('pg');


var session = { 
    name: 'session', 
    keys: ['nimbus'], 
    maxAge: 60000
}
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
    app.set('trust proxy', 1);
    session.secure = true;
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession(session));
app.use(flash());

app.get('/', (req, res) => res.render('pages/index'));
app.get('/login', (req, res) => res.render('pages/login'));
app.get('/signup', (req, res) => res.render('pages/signup'));
app.get('/demo', (req, res) => res.render('pages/demo'));
app.get('/temp', (req, res) => {
  var face = cool();
  res.render('pages/temp', { face: face });
});
app.post('/login', (req, res) => res.redirect('/temp'));
app.post('/signup', (req, res) => res.redirect('/temp'));
  
app.get('/db', async (req, res) => {
    try {
      const results = await getUsers();
      console.log(results);
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

getUsers = async () => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM test_table');
  const results = { 'results': (result) ? result.rows : null};
  client.release();
  return results;
}