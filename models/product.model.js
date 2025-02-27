const mongoose = require("mongoose");
const { common } = require("../utils/commonModel");

const ProductSchema = new mongoose.Schema({
    name: common,
    category: common,
    price: {
        ...common,
        type: Number
    },
    stock: {
        ...common,
        type: Number
    },
    ratings: {
        ...common,
        type: Number
    },
},
{
    timestamps: true
}
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;