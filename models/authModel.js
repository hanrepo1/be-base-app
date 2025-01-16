import { Schema, model } from 'mongoose'

const authSchema = new Schema ({
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true})


module.exports = model("Auth", authSchema)