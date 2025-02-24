const { default: mongoose } = require("mongoose")

exports.dbConfig = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("db connected 👍"))
    .catch((err)=>console.log(err))
}