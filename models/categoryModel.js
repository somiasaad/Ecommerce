const mongoose = require("mongoose");

//1-create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category require"],
      unique: [true, "category must be unique"],
      minlength: [3, "too short category name"],
      maxlength: [32, "too long category name"],
    },
    //A and B  ==> shopping
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
// 2-create model
const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
