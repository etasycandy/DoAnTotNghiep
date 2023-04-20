/**
 * Module dependencies.
 */
const { validationResult } = require("express-validator");
const { Order, Product, Review } = require("../models");

const paginateOrders = async (req, res) => {
  const query = req.query;
  const perPage = 5;
  const skip = (query.page - 1) * perPage;
  const option = query.userId ? { userId: query.userId } : {};

  try {
    const count = await Order.find(option).countDocuments();
    const response = await Order.find(option)
      .populate("productId", "-colors -sizes -createdAt -updatedAt -stock")
      .populate("userId", "-password -updatedAt -createdAt -admin")
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });
    // console.log(response);
    return res.status(200).json({ orders: response, perPage, count });
  } catch (error) {
    console.log(error.message);
  }
};

const orderDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const details = await Order.findOne({ _id: id })
      .populate("productId", "-colors -sizes -createdAt -updatedAt -stock")
      .populate("userId", "-password -updatedAt -createdAt -admin");
    return res.status(200).json({ details });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: error });
  }
};

const updateOrder = async (req, res) => {
  const { id, status } = req.query;
  let option = {};

  if (status === "delivered") {
    option = { status: true };
  } else if (status === "received") {
    option = { received: true };
  }

  try {
    await Order.findByIdAndUpdate(id, option, {
      new: true,
    });
    return res.status(200).json({
      msg:
        status === "delivered"
          ? "Order has delivered"
          : status === "received" && "Order received",
    });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

const createRating = async (req, res) => {
  const errors = validationResult(req);
  const { rating, message, user, product, id } = req.body;
  // console.log(req.body);

  if (errors.isEmpty()) {
    try {
      const createdReview = await Review.create({
        rating: parseInt(rating),
        comment: message,
        product,
        user,
      });
      //   console.log("review created: ", createdReview);
      await Order.findByIdAndUpdate(id, { review: true });
      await Product.findOneAndUpdate(
        { _id: product },
        { $push: { reviews: createdReview._id } },
      );
      return res.status(201).json({ msg: "Review has created successfully" });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = {
  paginateOrders,
  orderDetail,
  updateOrder,
  createRating,
};
