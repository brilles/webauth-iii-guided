const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../api/secrets');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // the token is not valid
        res.status(401).json({ message: 'invalid credentials' });
      } else {
        // all good
        req.decodedJwt = decodedToken;

        next();
      }
    });
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }
};
