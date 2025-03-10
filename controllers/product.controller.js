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
        { $group: { _id: null, minPrice: { $min: "$price" }, maxPrice: { $max: "$price" } } }
    ]).then((record) => {
        res.json({ record })
    })
}

exports.uniqueCat = async (req, res) => {
    try {
        const categories = await Product.aggregate([
            { $group: { _id: null, uniqueCat: { $addToSet: "$category" }, uniqueProduct: { $addToSet: "$name" } } }
        ]);
        res.json(categories[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.OnlyProduct = async (req, res) => {
    try {
        const productNames = await Product.aggregate([
            { $group: { _id: null, allNames: { $push: "$name" } } }
        ]);
        res.json(productNames[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.firstProduct = async (req, res) => {
    await Product.aggregate([
        { $sort: { createdAt: 1 } },
        { $group: { _id: null, firstProduct: { $first: '$$ROOT' } } }
    ]).then((record) => {
        res.json({ record })
    })
}

// This sorts the documents in ascending order (1 means oldest to newest).
// Sorting by createdAt ensures that older products appear first in the aggregation pipeline.

exports.lastProduct = async (req, res) => {
    await Product.aggregate([
        { $sort: { createdAt: 1 } },
        { $group: { _id: null, lastProduct: { $last: '$$ROOT' } } }
    ]).then((record) => {
        res.json({ record })
    })
}