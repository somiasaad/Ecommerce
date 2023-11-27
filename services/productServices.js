const slugify = require("slugify");

const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");
const apiError = require("../utils/apiError");
// const ApiError = require("../utils/apiError");
exports.getProducts = asyncHandler(async (req, res) => {
  // filtering

  const queryStringObj = { ...req.query };
  const excludesFields = ["page", "sort", "limit", "fields"];
  excludesFields.forEach((field) => delete queryStringObj[field]);
  // Apply filteration using [gte|gt|lte|lt]
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (march) => `$${match}`);
  console.log(queryStringObj);
  // console.log(JSON.parse(queryStr));

  //2 pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  //built query
  let mongooseQuery = products
    .find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", Select: "name-_id" });

  //sorting
  if (req.query.sort) {
    mongooseQuery = mongooseQuery.sort(req.query.sort);
  } else {
    mongooseQuery = mongooseQuery.sort("-createAt");
  }
  //fields
  if (req.query.fields) {
    const fields = req.body.field.split(",").join(" ");
    mongooseQuery = mongooseQuery.Select(fields);
  } else {
    mongooseQuery = mongooseQuery.Select("-__v");
  }

  const products = mongooseQuery;
  res.status(200).json({ result: products.length, page, data: products });
});
// get category by 1d
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);
  if (!product) {
    // res.status(404).json({ msg: `no category for this id ${id}` });
    return next(new apiError(`no product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(200).json({ data: product });
});
// updata
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.title) {
      request.body.slug = slugify(req.body.title);
    }

    console.log(req.body.title);
    const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!product) {
      // return next(new ApiError(`no product for this id ${id}`,404))
      res.status(404).json({ msg: `no category for this id ${id}` });
    }
    res.status(200).json({ data: category });
  } catch (error) {
    console.error(error.message);
    // console.log(name);
    res.status(404).json({ msg: error.message });
  }
};
//////////////////////////////////////////////////////////////
// exports.updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   request.body.slug = slugify(req.body.title);
//   console.log(req.body.title);
//   const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
//     new: true,
//   });
//   if (!product) {
//     return next(new ApiError(`no product for this id ${id}`, 404));
//     // res.status(404).json({ msg: `no category for this id ${id}` });
//   }
//   res.status(200).json({ data: category });
// });
// delete
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    return next(new apiError(`no product for this id ${id}`, 404));
  }
  res.status(200).json("deleted");
});
