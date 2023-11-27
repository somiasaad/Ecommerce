const mongoose = require("mongoose");

//1-create schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand require"],
      unique: [true, "brand must be unique"],
      minlength: [3, "too short brand name"],
      maxlength: [32, "too long brand name"],
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

module.exports = mongoose.model("brand", brandSchema);
