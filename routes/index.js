const cool = require('cool-ascii-faces')

exports.getLogin = (req, res) => {
  var message = req.query.redirect;
  res.render('pages/login', { message: message });
}

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
}

exports.getSignup = (req, res) => {
  var message = "";
  res.render('pages/signup', { message: message });
}

exports.getProducts = (req, res) => {
  res.render('pages/products');
}

exports.getDemo = (req, res) => {
  res.render('pages/demo');
}

exports.getTemp = (req, res) => {
  var face = cool();
  res.render('pages/temp', { face: face });
}