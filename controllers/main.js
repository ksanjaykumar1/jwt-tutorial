const { CustomAPIError } = require("../utils/errors/custom-error");
const jwt = require("jsonwebtoken");
const Logger = require("../logger/logger");
const logger = Logger.getLogger("./conrollers/main");
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
  }

  // id  create using data just for demo
  const id = new Date().getDate();
  logger.info("id ==>", id);

  // try to keep the payload small
  logger.info("api key", process.env.API_SECRET);
  const token = jwt.sign({ id, username }, process.env.API_SECRET, {
    expiresIn: "30d",
  });

  logger.info("Token ==>", token);
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("Invaild Bearer Token", 401);
  }
  const token = authHeader.split(" ")[1];
  logger.info(token);

  try {
    const decoded = jwt.verify(token, process.env.API_SECRET);
    logger.info(JSON.stringify(decoded));
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `you lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    // throw response if not able to verify token
    // for reason like expired key, wrong API key

    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
