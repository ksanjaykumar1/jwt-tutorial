const jwt = require("jsonwebtoken");
const Logger = require("../logger/logger");
const { CustomAPIError } = require("../utils/errors/custom-error");
const logger = Logger.getLogger("./middleware/auth.js");

exports.authenticationMiddleware = async (req, res, next) => {
  logger.info("Token ==>", JSON.stringify(req.headers.authorization));
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    throw new CustomAPIError("Token not present", 401);
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.API_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("Invaild Token", 401);
  }
};
 