const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.sendStatus(401); // Unauthorized
  console.log(authHeader); // Bearer token
  const token = authHeader.split(' ')[1]; // The first position contains the username and the second position has the bearer token; read the authController.js in Controllers folder
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden or Invalid Access Token
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
