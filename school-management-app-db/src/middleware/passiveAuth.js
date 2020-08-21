const { verify } = require("../utils/jwtService");

const passiveAuth = (req, res, next) => {
  const payload = verify(req.cookies.jwt);
  if (payload) {
    req.jwt = payload;
  }
  next();
};

module.exports = passiveAuth;
