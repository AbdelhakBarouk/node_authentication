const JWT = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isValideToken = ({ token }) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    //secure:process.env.NODE_ENV === "production", this ligne make the cookie accessible only from the web server and not from the client side scriptiong
    signed: true,
  });
};

module.exports = { createJWT, isValideToken, attachCookiesToResponse };
