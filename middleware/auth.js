const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function requireAuth(req, res, next) {
  // منطق التحقق الموجود لديك
  next();
}

function requireModule(moduleName) {
  return function (req, res, next) {
    // منطق التحقق من صلاحية الـ module الموجود لديك
    next();
  };
}

module.exports = {
  requireAuth,
  requireModule,
};
