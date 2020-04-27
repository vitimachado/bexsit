const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log('authHeader', req.originalUrl)

  if(req.originalUrl === '/register' || req.originalUrl === '/authenticate' || req.originalUrl === '/verifyToken') return next();  
  //return next();  
  if (!authHeader) {
    return res.status(401).send({ error: "Nenhuma token enviada" });
  }

  const [scheme, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, "secret150");

    req.userId = decoded.id;
    req.username = decoded.username;
    res.userId = decoded.id;
    res.username = decoded.username;
    //console.log('rrrrrrreeeeeeesssssssssss+', res)

    return next();
  } catch (err) {
    return res.status(401).send({ error: "Token inválida" });
  }
};
