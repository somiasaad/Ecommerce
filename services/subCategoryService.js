const slugify = require("slugify");

const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");

const apiError = require("../utils/apiError");
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) require.body.category = req.params.categoryId;
  next();
};
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(200).json({ data: subCategory });
});
///////////////////////////////////////////

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await subCategoryModel.find({}).skip(skip).limit(limit);
  // .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ result: categories.length, page, data: subCategories });
});
// get SUBcategory by 1d
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await subCategoryModel.findById(id);
  // .populate({ path: "category", select: "name -_id" });
  if (!subCategory) {
    // res.status(404).json({ msg: `no category for this id ${id}` });
    return next(new apiError(`no subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// updata
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;
    console.log(req.body);
    const suCategory = await subCategoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name), category },
      { new: true }
    );
    if (!suCategory) {
      res.status(404).json({ msg: `no subcategory for this id ${id}` });
    }
    res.status(200).json({ data: suCategory });
  } catch (error) {
    console.error(error.message);
    // console.log(name);
    res.status(404).json({ msg: error.message });
  }
};

// delete
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new apiError(`no subcategory for this id ${id}`, 404));
  }
  res.status(200).json("deleted");
});
