const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    parentCategory: {type: mongoose.Types.ObjectId, ref:'Categories'},
    properties: [{type:Object}]
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", categorySchema);

module.exports = Categories;
