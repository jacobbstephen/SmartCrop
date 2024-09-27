const mongoose = require('mongoose')

const userSchemas = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    }, 
    previousData: { 
        type: [{
            N: Number,
            P: Number,
            K: Number,
            temperature: Number,
            humidity: Number,
            ph: Number,
            rainfall: Number,
            predictedCrop: String 
        }], 
        default: [] 
    
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchemas)