const whitelist = ['http://localhost:3000'];
module.exports = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
