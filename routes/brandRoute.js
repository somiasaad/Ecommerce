const express = require("express");

const {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandServices");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validator/brandValidator");
// const subCategoryRoute = require("./subCategory");
const router = express.Router();
// router.use("/:categoryId/subcategory", subCategoryRoute);
router.route("/").get(getBrands).post(createBrandValidator, createBrand);
// router.route("/:id").get(getCategory);
// router
//   .route("/:id")
//   .get(getCategory)
//   .put(updateCategory)
//   .delete(deleteCategory);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);
// app.get("/", (req, res) => {
//   res.send("dev Api Vi");
// });
module.exports = router;
