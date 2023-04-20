/**
 * Module dependencies.
 */
const express = require("express");
const { userValidation } = require("../../validations");
const { authController, userController } = require("../../controllers");

const router = express.Router();

router.route("").get(userController.getUsers);

router
  .route("/register")
  .post(userValidation.registerValidations, authController.register);

router
  .route("/login")
  .post(userValidation.loginValidations, authController.login);

router.route("/update").patch(userController.updateUser);

router.route("/delete/:id").delete(userController.deleteUser);

module.exports = router;
