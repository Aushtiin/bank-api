const { verify } = require("jsonwebtoken");
const { promisify } = require("util");

const verifyToken = promisify(verify);

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .send("Authentication Failed, Please provide an authentication token");

  try {
    const decoded = await verifyToken(token, process.env.SECRET);
    req.decoded = decoded;
    return next();
  } catch (error) {
    res.status(401).send("Authentication Failed");
  }
};

module.exports = {
    authenticate,
}