const log = require('../Utils/Logger');
const jwt = require('jsonwebtoken');

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.isAuth;
    // matchToken = false;
    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Not authorized to perform this operation!',
      });
      return;
    }
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        error: 'Not authorized to perform this operation!',
      });
    }
  } catch (err) {
    log.info(err);
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = { checkAdmin };
