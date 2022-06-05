// By default index.js will be served in errors folder
// we can keep all the errors here and point to errors folder to import it

const { CustomAPIError } = require("./custom-error");
const BadRequestError = require("./bad-request");
const UnAuthenticationError = require("./unauthentication");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnAuthenticationError,
};
