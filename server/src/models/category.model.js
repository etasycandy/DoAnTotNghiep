const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    image: {
      type: String,
      required: true,
      default: "categoryDefault.jpg",
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);

/**
 * @typedef Category
 */
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
