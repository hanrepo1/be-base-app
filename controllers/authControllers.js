const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const HttpError = require("../models/errorModel")


//========== REGISTER USER
// POST : api/auth/register
// PROTECTED
const registerUser = async (req, res, next) => {
    try {
        const {email, password, password2} = req.body
        if (!email || !password) {
            return next(new HttpError("Fill in all fields", 422))
        }

        const newEmail = email.toLowerCase()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(newEmail)) {
            return next(new HttpError("Invalid email format.", 422))
        }

        const emailExists = await User.findOne({email: newEmail})
        if (emailExists) {
            return next(new HttpError("Email already exists.", 422))
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError("Password should be at least 6 characters.", 422))
        }

        if (password != password2) {
            return next(new HttpError("Passwords do not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = await User.create({email: newEmail, password: hashedPass})

        res.status(201).json(`New user ${newUser.email} registered.`)

    } catch (error) {
        return next(new HttpError("User registration failed", 422))
    }
}

//========== LOGIN USER
// POST : api/auth/login
// PROTECTED
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return next(new HttpError("Fill in all fields.", 422))
        }
        const newEmail = email.toLowerCase()

        const user = await User.findOne({email: newEmail})
        if (!user) {
            return next(new HttpError("Invalid credentials.", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password)
        if (!comparePass) {
            return next(new HttpError("Invalid credentials.", 422))
        }

        const {_id: id} = user;
        const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({token})

    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials.", 422))
    }
}


module.exports = {registerUser, loginUser}