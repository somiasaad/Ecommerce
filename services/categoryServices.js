const slugify = require("slugify");

const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/categoryModel");
const apiError = require("../utils/apiError");
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});
// get category by 1d
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryModel.findById(id);
  if (!category) {
    // res.status(404).json({ msg: `no category for this id ${id}` });
    return next(new apiError(`no category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(200).json({ data: category });
});
// updata
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(req.body);
    const category = await categoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!category) {
      res.status(404).json({ msg: `no category for this id ${id}` });
    }
    res.status(200).json({ data: category });
  } catch (error) {
    console.error(error.message);
    // console.log(name);
    res.status(404).json({ msg: error.message });
  }
};

// delete
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new apiError(`no category for this id ${id}`, 404));
  }
  res.status(200).json("deleted");
});
