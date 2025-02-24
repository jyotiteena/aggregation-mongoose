const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000


/////////// config ///////
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//// db connected 
require('./config/db').dbConfig()

//////// import routers ///////
const Student = require('./routes/student.route')


///// routing ////////
app.use('/api/student',Student)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))