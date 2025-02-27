const Product = require("../models/product.model");

exports.store = async (req, res) => {
    try {
        const { name, category, price, stock, ratings } = req.body;
        await Product.create({ category, name, price, stock, ratings })
        res.json("product added")
    } catch (error) {
        console.log('error: ', error);
    }
}

exports.index = async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product)
    } catch (error) {
        console.log('error: ', error);
    }
}

exports.totalStock = async (req, res) => {
    await Product.aggregate([
        { $group: { _id: null, totalStock: { $sum: "$stock" } } }
    ]).then((record) => {
        res.json({ record })
    })
}

exports.totalAvg = async (req, res) => {
    await Product.aggregate([
        { $group: { _id: null, totalPrice: { $sum: "$price" }, totalAvg: { $avg: '$price' } } }
    ]).then((record) => {
        res.json({ record })
    })
}

exports.minPrice = async (req, res) => {
    await Product.aggregate([
        { $group: { _id: null, minPrice: { $min: "$price" }, maxPrice:{$max:"$price"} }}
    ]).then((record) => {
            res.json({ record })
        })
}