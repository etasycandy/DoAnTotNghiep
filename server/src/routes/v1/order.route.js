/**
 * Module dependencies.
 */
const express = require("express");
const { orderController } = require("../../controllers");
const Authorization = require("../../services/Authorization");
const { ratingValidation } = require("../../validations");

const router = express.Router();

router
  .route("/")
  .get(Authorization.authorized, orderController.paginateOrders)
  .put(Authorization.authorized, orderController.updateOrder);

router
  .route("/add-review")
  .post(
    [Authorization.authorized, ratingValidation],
    orderController.createRating,
  );

router.route("/:id").get(Authorization.authorized, orderController.orderDetail);

module.exports = router;
