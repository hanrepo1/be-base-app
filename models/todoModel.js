const {Schema, model} = require('mongoose')

const todoSchema = new Schema ({
    name: {type: String, required: true},
    completed: {type: Boolean, default: false,},
    dueDate: {type: Date, required: true},
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true})


module.exports = model("ToDo", todoSchema)