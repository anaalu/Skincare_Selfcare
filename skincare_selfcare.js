require('dotenv').config();
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
const Database      = require('./routes/db-module');
const Index         = require('./routes/index');
const PORT          = process.env.PORT || 5000;
const app           = express();

// TODO: look into storing session id in database
var sess = {
  genid: (req) => {
    return uuid();
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true, 
  maxAge: 60000
}
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sess.secure = true;
}

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
app.get('/login', Index.getLogin);
app.get('/logout', Index.getLogout);
app.get('/signup', Index.getSignup);
app.get('/demo_products', Index.getProducts);
app.get('/demo', Index.getDemo);
app.get('/temp', Index.getTemp);

app.post('/demo_addproduct', (req, res) => res.render('pages/demo'));

app.post('/addproduct', (req, res) => res.render('pages/demo_products'));
app.post('/editproduct', (req, res) => res.render('pages/demo_products'));

app.post('/login', User.login);
app.post('/signup', User.signup);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Passportjs configuration
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, callback) =>  {
  Database().query('SELECT id, email, password FROM users WHERE email=$1', [email], (err, result) => {
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
  Database().query('SELECT id, email FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
    if (err) {
      // TODO: log error message
      return callback(err);
    } 
    callback(null, results.rows[0]);
  });
});

