const {Router} = require('express')

const {createItem, getItems, getItemDetail, editItem, deleteItem} = require('../controllers/todoControllers') 
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/', authMiddleware, createItem)
router.get('/', getItems)
router.get('/:id', getItemDetail)
router.put('/:id', authMiddleware, editItem)
router.delete('/:id', authMiddleware, deleteItem)

module.exports = router