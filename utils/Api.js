const { model } = require("mongoose")

exports.createPost = async (model, data, res, message) => {
    await model.create(data)
        .then((record) => {
            res.json({
                success: true,
                id: record._id,
                message
            })
        })
        .catch((err) => console.log(err))
}

exports.fetchPost = async (model, res) => {
    await model.aggregate(
        [
            { $project: { std_name: 1, std_email: 1, _id: 0, std_marks: 1 } }
        ]
    ).then((record) => {
        res.json({
            success: true,
            record
        })
    })
}

exports.unwindArrPost = async (model, res) => {
    await model.aggregate().unwind('$std_marks')
        .then((record) => {
            res.json({
                success: true,
                record
            })
        })
}

exports.windWithCondition = async (model, res) => {
    await model.aggregate(
        [
            { $unwind: '$std_marks' },
            { $project: { std_name: 1, std_email: 1, std_marks: 1 } }
        ]
    ).then((record) => {
        res.json({
            success: true,
            record
        })
    })
}

exports.matchByAge = async (model, res, id) => {
    const record = await model.aggregate([
        { $match: { std_age: { $gte: Number(id) } } },
    ])
    let count = await model.aggregate([
        { $match: { std_age: { $gte: Number(id) } } },
        { $count: 'count' }
    ])

    count = count.length > 0 ? count[0].count : 0

    res.json({
        success: true,
        count,
        record,
    })
}

exports.skipRecords = async (model, res) => {

    ///// method1 /////////
    await model.aggregate().skip(2)
        .then((record) => {
            res.json({
                success: true,
                record,
            })
        })


    ///// method2 ///////
    await model.aggregate([
        { $skip: 2 }
    ])
        .then((record) => {
            res.json({
                success: true,
                record,
            })
        })
}