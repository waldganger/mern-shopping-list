const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get all items
// @access Public
// Puisqu'on utilise le router d'express, pas besoin de spécifier la route complète '/api/items'
// cette route est déjà spécifiée dans server.js, qui renvoit sur ce fichier. Donc on est dans '/'
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) // -1 classement descendant
    .then((items) => res.json(items));
});

// @route   POST api/items
// @desc    Create an item
// @access  Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  // :id === placeholder for the id we'll pass
  Item.findById(req.params.id) // findById vient de Mongoose et fetch l'info de l'uri
    .then((item) =>
      item.remove().then(() => res.json({ delete_success: true }))
    )
    .catch((err) =>
      res.status(404).json({ delete_success: false, message: err })
    );
});

module.exports = router;
