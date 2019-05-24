require('dotenv').config();
const cool          = require('cool-ascii-faces')
const path          = require('path');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const session       = require('express-session');
const passport      = require('passport'), 
  LocalStrategy     = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const uuid          = require('uuid');
const flash         = require('connect-flash');

const User          = require('./routes/users');
const { Pool }      = require('pg');
const PORT          = process.env.PORT || 5000;
const app           = express();

// TODO: look into storing session id in database
// TDOD: config prod env to provide secret key
var sess = {
  genid: (req) => {
    return uuid();
  },
  secret: 'nimbus',
  resave: false,
  saveUninitialized: true, 
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
    sess.secure = true;
}

pool.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(session(sess));
app.use(flash());

app.get('/', (req, res) => res.render('pages/index'));
app.get('/login', (req, res) => res.render('pages/login'));
app.get('/signup', (req, res) => res.render('pages/signup'));
app.get('/demo', (req, res) => res.render('pages/demo'));
app.get('/temp', (req, res) => {
  var face = cool();
  res.render('pages/temp', { face: face });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      // TODO: send error message to UI
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      // TODO: change to correct route when it is complete
      return res.redirect('/temp');
    });
  }) (req, res, next);
});

app.post('/signup', async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    pool.query('SELECT id FROM users WHERE email=$1', [req.body.email], (err, result) => {
      if (result.rows[0]) {
        // TODO: log error message and send to ejs
        res.redirect('/signup');
      } else {
        pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [req.body.email, hash], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/login');
          }
        });
      }
    })
  });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, callback) =>  {
  pool.query('SELECT id, email, password FROM users WHERE email=$1', [email], (err, result) => {
    if (err) {
      // TODO: log error message
      return callback(err);
    }

    if (result.rows.length > 0) {
      const user = result.rows[0];
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          callback(null, { id: user.id, email: user.email });
        } else {
          callback(null, false);
        }
      })
    } else {
      callback(null, false);
    }
  })
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, callback) => {
  db.query('SELECT id, email FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
    if (err) {
      // TODO: log error message
      return callback(err);
    } 
    callback(null, results.rows[0]);
  });
});

