const { Schema, Types, model } = require("mongoose");
const { toJSON } = require("./plugins");

const orderSchema = Schema(
  {
    productId: {
      type: Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    quantities: {
      type: Number,
      required: true,
    },
    address: {
      type: Map,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    received: {
      type: Boolean,
      default: false,
    },
    review: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);

/**
 * @typedef Order
 */
const Order = model("Order", orderSchema);

module.exports = Order;
