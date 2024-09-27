const mongoose = require('mongoose')
require('dotenv').config()
// Connect the db url to node js appln
mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("Connected to DB")
})
.catch((err) =>{
    console.log("Connection to db error" + err)
})