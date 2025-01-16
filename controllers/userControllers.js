const mongoose = require('mongoose');
const User = require('../models/userModel')
const HttpError = require("../models/errorModel")


//========== USER PROFILE
// GET : api/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
    try {
        const {id} = req.params

        if (!mongoose.isValidObjectId(id)) {
            return next(new HttpError("User  not found.", 404));
        }

        const user = await User.findById(id).select('-password')

        if (!user) {
            return next(new HttpError("User not found.", 404))
        }

        res.status(200).json(user)

    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports = {getUser}