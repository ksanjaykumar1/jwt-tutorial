const { CustomAPIError } = require("../utils/errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
  }

  res.send("Fake Login/");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello john doe`,
    secret: `you lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
