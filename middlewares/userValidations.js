const { check } = require("express-validator");

const userValidator = [
  check("firstName")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Revise o campo firstName"),
  check("lastName")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Revise o campo firstName"),
  check("email").notEmpty().isEmail().withMessage("Revise o campo e-mail"),
  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Revise o campo password"),
  check("terms").notEmpty().isBoolean(),
];

module.exports = userValidator;
