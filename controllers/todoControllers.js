const mongoose = require('mongoose');
const ToDo = require('../models/todoModel')
const User = require('../models/userModel')
const HttpError = require('../models/errorModel')


//========== CREATE NEW ITEM
// POST : api/todo/
// PROTECTED
const createItem = async (req, res, next) => {
    try {
        let {name, dueDate} = req.body
        if (!name || !dueDate) {
            return next(new HttpError("Fill in all fields.", 422))
        }

        const parsedDueDate = new Date(dueDate)
        if (isNaN(parsedDueDate.getTime())) {
            return next(new HttpError("Invalid due date format.", 422))
        }

        const newToDo = await ToDo.create({ name, completed: false, dueDate: parsedDueDate, creator: req.user.id })

        if (!newToDo) {
            return next(new HttpError("To-do could not be created", 422))
        }

        const currentUser  = await User.findById(req.user.id)
        const userToDoCount = currentUser .todo + 1
        await User.findByIdAndUpdate(req.user.id, { todo: userToDoCount })

        res.status(201).json(newToDo);

    } catch (error) {
        return next(new HttpError(error))
    }
}

//========== GET ALL ITEMS
// GET : api/todo/
// UNPROTECTED
const getItems = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const skip = (page - 1) * limit

        const todos = await ToDo.find()
            .sort()
            .skip(skip)
            .limit(limit)

        const totalItems = await ToDo.countDocuments();

        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            page,
            totalPages,
            totalItems,
            todos
        });
    } catch (error) {
        return next(new HttpError(error))
    }
}

//========== GET ITEM DETAIL
// GET : api/todo/:id
// UNPROTECTED
const getItemDetail = async (req, res, next) => {
    try {
        const {id} = req.params

        if (!mongoose.isValidObjectId(id)) {
            return next(new HttpError("To-do  not found.", 404));
        }

        const todo = await ToDo.findById(id)
        if (!todo) {
            return next(new HttpError("To-do not found.", 404))
        }
        res.status(200).json(todo)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//========== EDIT ITEM DETAIL
// PUT : api/todo/:id
// PROTECTED
const editItem = async (req, res, next) => {
    try {
        const itemId = req.params.id
        if(!itemId) {
            return next(new HttpError("To-do unavailable.", 400))
        }

        let {name, completed ,dueDate} = req.body
        if (!name || !completed || !dueDate) {
            return next(new HttpError("Fill in all fields.", 422))
        }

        const editToDo = await ToDo.findByIdAndUpdate(
            itemId,
            { name, completed, dueDate }
        )
        if (!editToDo) {
            return next(new HttpError("To-do could not be updated", 422))
        }

        res.status(200).json(editToDo)

    } catch (error) {
        return next(new HttpError(error))
    }
}

//========== DELETE ITEM
// DELETE : api/todo/:id
// PROTECTED
const deleteItem = async (req, res, next) => {
    try {
        const itemId = req.params.id
        if(!itemId) {
            return next(new HttpError("To-do unavailable.", 400))
        }

        const todo = await ToDo.findById(itemId)
        const currentUser = await User.findById(req.user.id)
        console.log(currentUser._id)
        console.log(todo.creator)
        if (currentUser._id.equals(todo.creator)) {
            await ToDo.findByIdAndDelete(itemId)
            const userTodoCount = currentUser?.todo - 1
            await User.findByIdAndUpdate(req.user.id, {posts: userTodoCount})
        } else {
            return next(new HttpError("Todo could not be deleted.", 403))
        }

        res.json(`Todo ${itemId} deleted succesfully.`)

    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports = {createItem, getItems, getItemDetail, editItem, deleteItem}