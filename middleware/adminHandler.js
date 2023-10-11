const { ADMIN_USER, ADMIN_PASS } = process.env;

function isAdmin(req, res, next) {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // The user has admin credentials, so they are authorized.
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized. Admin credentials required.' });
  }
}

module.exports = isAdmin;

  
  