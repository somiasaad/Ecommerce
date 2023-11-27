const { check } = require("express-validator");
const validatorMiddleWare = require("../../middleware/validatorMiddleWare");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category format"),
  validatorMiddleWare,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category require")
    .isLength({ min: 3 })
    .withMessage("too short category name")
    .isLength({ max: 32 })
    .withMessage("too long category name"),
  validatorMiddleWare,
];
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category format"),
  validatorMiddleWare,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category format"),
  validatorMiddleWare,
];
