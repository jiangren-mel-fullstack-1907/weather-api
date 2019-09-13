const { validateToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('Access denied. No Authorization Header provided.');
  }
  const contentArr = authHeader.split(' ');
  if (contentArr.length !== 2 || contentArr[0] !== 'Bearer') {
    return res.status(401).send('Access denied. Invalid token format, should be "Bearer {TOKEN}".');
  }
  const decoded = validateToken(contentArr[1]);
  if (decoded) {
    req.user = decoded;
    return next();
  }
  return res.status(401).send('Access denied. Invalid token.');
};
