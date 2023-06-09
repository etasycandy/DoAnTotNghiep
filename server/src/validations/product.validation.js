const { body } = require("express-validator");

module.exports = [
  body("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Title is required"),
  body("price")
    .custom((value) => {
      if (parseInt(value) < 1) {
        throw new Error("Price should be above $1");
      } else {
        return parseInt(value);
      }
    })
    .trim()
    .escape(),
  body("discount")
    .custom((value) => {
      if (parseInt(value) < 0) {
        throw new Error("Discount must not be negative");
      } else {
        if (parseInt(value) > body("price")) {
          throw new Error("Discount must not be greater than the price");
        } else {
          return parseInt(value);
        }
      }
    })
    .trim()
    .escape(),
  body("category")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Category is required"),
  body("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Description is required"),
  body("stock")
    .custom((value) => {
      if (parseInt(value) < 1) {
        throw new Error("Stock must be above 1");
      } else {
        return parseInt(value);
      }
    })
    .trim()
    .escape(),
];
