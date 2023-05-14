const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const caroselSchema = mongoose.Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
caroselSchema.plugin(toJSON);

/**
 * @typedef Carosel
 */
const Carosel = mongoose.model("Carosel", caroselSchema);

module.exports = Carosel;
