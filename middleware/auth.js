const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'توكن غير صالح' });
  }
}

function requireModule(moduleKey) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'غير مصرح' });
    if (req.user.roleKey === 'ceo') return next();
    const perms = req.user.permissions || {};
    if (perms[moduleKey]) return next();
    return res.status(403).json({ error: 'ليس لديك صلاحية' });
  };
}

module.exports = { requireAuth, requireModule };
