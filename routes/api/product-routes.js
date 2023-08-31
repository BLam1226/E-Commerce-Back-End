const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/products", async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productsData = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }],
    });
    res.json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get("/products/:id", async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [Category, { model: Tag, through: ProductTag }],
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }
    res.json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post("/products", async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    if (req.body.tagIds) {
      await productData.addTags(req.body.tagIds);
    }
    res.status(201).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put("/products/:id", async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (!productData[0]) {
      res.status(404).json({ message: "No product found with this ID" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/product/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with this ID" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
