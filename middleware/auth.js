const jwt = require("jsonwebtoken");
const Logger = require("../logger/logger");
const { UnAuthenticationError } = require("../utils/errors");
const logger = Logger.getLogger("./middleware/auth.js");

exports.authenticationMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    logger.info("aa");
    throw new UnAuthenticationError("Token not present");
  }
  logger.info("Token ==>", JSON.stringify(req.headers.authorization));

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.API_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthenticationError("Invaild Token");
  }
};
