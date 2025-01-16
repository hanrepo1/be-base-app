const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    todo: {type: Number, default: 0},
})


module.exports = model('User', userSchema)