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

  logger.info("user ==>", JSON.stringify(req.user))
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `you lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
