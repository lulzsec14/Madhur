const bcrypt = require('bcryptjs');

const comparePasswords = (text, password) => {
  return bcrypt.compareSync(text, password);
};

module.exports = comparePasswords;
