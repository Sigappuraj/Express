const { verify } = require("../utils/jwtService");

const auth = (req, res, next) => {
  const payload = verify(req.cookies.jwt);
  if (payload) {
    req.jwt = payload;
    next();
  } else {
    res.redirect("/adminLogin");
  }
};

module.exports = auth;
