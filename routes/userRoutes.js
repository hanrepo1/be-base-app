const {Router} = require('express')


const {getUser} = require("../controllers/userControllers")
const authMiddleware = require('../middleware/authMiddleware.js')

const router = Router()

router.get('/:id', getUser)

module.exports = router