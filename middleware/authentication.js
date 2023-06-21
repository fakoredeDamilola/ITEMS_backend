const jwt = require("jsonwebtoken");

const checkToken =(token) => {
  try{
    const key =process.env.JWT_SECRETE
    const decoded =  jwt.verify(token,key);
    return decoded
}catch(error){
  return null
}
}
  const generateToken = (email, role, id) => {
    const payload = {
        // id,role,
      email,
    };
    return jwt.sign({ id,email,role }, process.env.JWT_SECRETE, {
      expiresIn: "30d",
    })
  };

  
  module.exports = {checkToken,generateToken}