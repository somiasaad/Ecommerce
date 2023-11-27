const { check } = require("express-validator");
const validatorMiddleWare = require("../../middleware/validatorMiddleWare");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand format"),
  validatorMiddleWare,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("brand require")
    .isLength({ min: 3 })
    .withMessage("too short brand name")
    .isLength({ max: 32 })
    .withMessage("too long brand name"),
  validatorMiddleWare,
];
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand format"),
  validatorMiddleWare,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand format"),
  validatorMiddleWare,
];
