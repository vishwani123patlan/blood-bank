const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, allInventoriesController } = require('../controllers/inventoryController')

const router = express.Router()

// create inventory
router.post('/create', authMiddleware, createInventoryController)

router.get('/inventories', authMiddleware, allInventoriesController)

module.exports = router