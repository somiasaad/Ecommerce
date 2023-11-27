const express = require("express");

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productServices");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validator/productValidator");
// const subCategoryRoute = require("./subCategory");
const router = express.Router();
// router.use("/:categoryId/subcategory", subCategoryRoute);
router.route("/").get(getProducts).post(createProductValidator, createProduct);
// router.route("/:id").get(getCategory);
// router
//   .route("/:id")
//   .get(getCategory)
//   .put(updateCategory)
//   .delete(deleteCategory);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
// app.get("/", (req, res) => {
//   res.send("dev Api Vi");
// });
module.exports = router;
