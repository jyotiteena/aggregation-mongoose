const { Schema, model } = require("mongoose");
const { common } = require("../utils/commonModel");

const stdSchema = new Schema({
    std_name: common,
    std_age: {
        ...common,
        type: Number
    },
    std_email: {
        ...common,
        unique: [true, "email id already exist"]
    },
    std_marks: [Number]
},
    {
        timestamps: true
    })


exports.Student = model('Student', stdSchema)