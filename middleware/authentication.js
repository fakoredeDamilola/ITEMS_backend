const jwt = require("jsonwebtoken");

const checkToken = (token) => {
  try {
    const key = process.env.JWT_SECRETE;
    console.log({key, token});
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (error) {
    throw new Error(error);
  }
};
const generateToken = (email, role, accessLevel, name) => {
  return jwt.sign({email, role, accessLevel, name}, process.env.JWT_SECRETE, {
    expiresIn: "30d",
  });
};

module.exports = {checkToken, generateToken};
