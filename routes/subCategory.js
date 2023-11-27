const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../services/subCategoryService");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validator/subCategoryValidator");

// const authService = require("../services/authService");
const router = express.Router({ mergeParams: true });
// authService.protect,
// authService.allowedTo("admin", "manager"),
// setCategoryIdToBody,
router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObj, getSubCategories);
// .get(createFilterObj, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
// authService.protect,
// authService.allowedTo("admin", "manager"),
// authService.protect,
// authService.allowedTo("admin"),
module.exports = router;
