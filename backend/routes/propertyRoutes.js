const express = require("express");
const router = express.Router();

const Property = require("../models/property");

// GET all properties
router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// ADD property
router.post("/", async (req, res) => {
  const newProperty = new Property(req.body);
  const saved = await newProperty.save();
  res.json(saved);
});

// DELETE property
router.delete("/:id", async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE property
router.put("/:id", async (req, res) => {
  const updated = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

module.exports = router;