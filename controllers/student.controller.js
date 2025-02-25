const { Student } = require("../models/student.model")
const { createPost, fetchPost, unwindArrPost, windWithCondition, matchByAge, skipRecords, sortRecords, sortByCounts } = require("../utils/Api")

exports.store = async (req, res) => {
    const { std_name, std_age, std_email, std_marks } = req.body
    try {
        await createPost(Student, { std_name, std_age, std_email, std_marks }, res, "student registration successfully!")
    } catch (error) {
        console.log(error)
    }
}

exports.index = async (req, res) => {
    try {
        await fetchPost(Student, res);
    } catch (error) {
        console.log('error: ', error);
    }
}

exports.unwindArr = async (req, res) => {
    try {
        await unwindArrPost(Student, res)
    } catch (error) {
        console.log('error: ', error);
    }
}

exports.unwindArrCondition = async (req, res) => {
    try {
        await windWithCondition(Student, res)
    } catch (error) {
        console.log('error: ', error);
    }
}

exports.matchAge = async (req, res) => {
    try {
        await matchByAge(Student, res, req.params.id)
    } catch (error) {
        console.log('error: ', error);
    }
}

exports.skipRecord = async (req, res) => {
    try {
        await skipRecords(Student, res, req.params.id)
    } catch (error) {
        console.log('error: ', error);
    }
}

exports.sortRecord = async (req, res) => {
    try {
        await sortRecords(Student, res)
    } catch (error) {
        console.log(error)
    }
}

exports.sortByCount = async (req, res) => {
    try {
        await sortByCounts(Student, res)
    } catch (error) {
        console.log(error)
    }
}

exports.multipleMatch = async (req, res) => {
    var { name } = req.params

    name = name.split(',')
    console.log(name)
    await Student.aggregate().match({
        std_name: { $in: [...name] }
    }).then((record) => {
        res.json({
            success: true,
            record,
        })
    })
}

exports.cursorName = async (req, res) => {
    await Student
        .aggregate([
            { $project: { std_name: 1 } }
        ])
        .cursor({ batchSize: 1000 })
        .eachAsync((record, count) => {
            res.json({
                success: true,
                record,
                count
            })
        })
}

exports.multiplyMarks = async (req, res) => {
    await Student.aggregate().addFields(
        { multiAge: { $multiply: ["$std_age"] } }
    ).then((record) => {
        res.json({
            success: true,
            record,
        })
    })
}

exports.sumMarks = async (req, res) => {
    await Student.aggregate().addFields(
        { totalMarks: { $sum: "$std_marks" } }
    ).then((record) => {
        res.json({
            success: true,
            record,
        })
    })
}

