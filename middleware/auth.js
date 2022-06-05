const jwt = require("jsonwebtoken");
const Logger = require("../logger/logger");
const {
  CustomAPIError,
  unauthentication,
} = require("../utils/errors/custom-error");
const logger = Logger.getLogger("./middleware/auth.js");

exports.authenticationMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    logger.info("aa");
    next(unauthentication("Token not present"));
  }
  logger.info("Token ==>", JSON.stringify(req.headers.authorization));

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.API_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    next(unauthentication("Invaild Token"));
  }
};
