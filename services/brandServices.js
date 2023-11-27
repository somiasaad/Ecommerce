const slugify = require("slugify");

const asyncHandler = require("express-async-handler");
const brandModel = require("../models/brandModels");
const apiError = require("../utils/apiError");
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: brands.length, page, data: brands });
});
// get category by 1d
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findById(id);
  if (!brand) {
    // res.status(404).json({ msg: `no category for this id ${id}` });
    return next(new apiError(`no brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

exports.createBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(200).json({ data: brand });
});
// updata
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(req.body);
    const brand = await brandModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!brand) {
      res.status(404).json({ msg: `no brand for this id ${id}` });
    }
    res.status(200).json({ data: brand });
  } catch (error) {
    console.error(error.message);
    // console.log(name);
    res.status(404).json({ msg: error.message });
  }
};

// delete
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new apiError(`no brand for this id ${id}`, 404));
  }
  res.status(200).json("deleted");
});
