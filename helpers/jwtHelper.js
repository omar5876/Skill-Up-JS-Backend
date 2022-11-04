const config = require("../config/config");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const createToken = (user) => {
  let payload = {
    dataUser: [user.id, user.roleId, user.firstName],
    iat: moment().unix(),
    exp: moment().add(4, "minute").unix(),
  };
  return jwt.sign(payload, config.development.tokenSecret);
};

const decodeToken = (headerAuthorization) => {
  let token = headerAuthorization.split(" ")[1];
  let decodeDataToken = jwt.decode(token, config.development.tokenSecret);
  return { decodeDataToken };
};

const verifyToken = (headerAuthorization, res) => {
  let token = headerAuthorization.split(" ")[1];
  let verifyToken = jwt.verify(
    token,
    config.development.tokenSecret,
    (err, result) => {
      if (err) {
        res = err;
      } else {
        res = false;
      }
    }
  );

  return { verifyToken, res };
};

module.exports = { createToken, decodeToken, verifyToken };
