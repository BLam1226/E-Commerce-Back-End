const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// get all categories
router.get("/categories", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll();
    res.json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one category
router.get("/categories/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post("/categories", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put("/categories/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete("/categories/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
