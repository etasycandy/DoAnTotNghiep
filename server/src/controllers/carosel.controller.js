const { PATH_UPLOAD_FILE } = require("../../config/envConfig");

/**
 * Module dependencies.
 */
const fs = require("fs");
const { validationResult } = require("express-validator");
const { Carosel } = require("../models");

const create = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { file, body } = req;

    if (file !== undefined) {
      body.image = file.filename;
    }

    await Carosel.create(body);
    return res.status(201).json({ message: "Carosel created successfully!" });
  } else {
    console.log(errors.message);
    return res.status(400).json({ errors: errors.array() });
  }
};

const getCarosel = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const results = await Carosel.find({ isActive: true }).sort({
      position: 1,
    });

    return res.status(201).json({ results });
  } else {
    console.log(errors.message);
    return res.status(400).json({ errors: errors.array() });
  }
};

const updateCarosel = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { id } = req.params;
    const { file, body } = req;

    const carosel = await Carosel.findById(id);
    const filePath = PATH_UPLOAD_FILE + "carosel/";

    if (carosel) {
      fs.unlinkSync(filePath + carosel.uri);
      req.body.uri = file.filename;

      Object.assign(carosel, req.body);
      await carosel.save();

      return res
        .status(200)
        .json({ msg: "Carosel updated successfully!", carosel });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: `Carosel is already exist` }] });
    }
  } else {
    console.log(errors.message);
    return res.status(400).json({ errors: errors.array() });
  }
};

const deleteCarosel = async (req, res) => {
  const { id } = req.params;

  try {
    const filePath = PATH_UPLOAD_FILE + "carosel/";
    const carosel = await Carosel.findById(id);

    if (carosel) {
      fs.unlinkSync(filePath + carosel.uri);

      await Carosel.findByIdAndDelete(id);

      return res.status(200).json({ msg: "Carosel deleted successfully" });
    } else {
      return res.status(404).json({ message: "Carosel not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  getCarosel,
  updateCarosel,
  deleteCarosel,
};
