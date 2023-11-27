const express = require("express");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryServices");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");
// const subCategoryRoute = require("./subCategory");
const router = express.Router();
// router.use("/:categoryId/subcategory", subCategoryRoute);
router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
// router.route("/:id").get(getCategory);
// router
//   .route("/:id")
//   .get(getCategory)
//   .put(updateCategory)
//   .delete(deleteCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
// app.get("/", (req, res) => {
//   res.send("dev Api Vi");
// });
module.exports = router;
