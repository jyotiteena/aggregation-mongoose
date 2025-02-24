const { Student } = require("../models/student.model")
const { createPost, fetchPost, unwindArrPost, windWithCondition, matchByAge, skipRecords } = require("../utils/Api")

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
        await matchByAge(Student, res,req.params.id)
    } catch (error) {
        console.log('error: ', error);
    }
}

exports.skipRecord = async (req, res) => {
    try {
        await skipRecords(Student, res,req.params.id)
    } catch (error) {
        console.log('error: ', error);
    }
}