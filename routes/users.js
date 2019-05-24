const login = (req, res) => {
  console.log('IT LOGGED IN!')
  console.log(req.user);
  res.redirect('/temp');
}

module.exports = {
  login
}