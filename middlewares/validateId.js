const { ObjectId } = require('mongoose').Types;
const { formatResponse } = require('../utils/helper');

module.exports = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json('Invalid ID');
  }
  return next();
};
