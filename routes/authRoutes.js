const express = require('express');
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes

// route for register
router.post('/register', registerController)

// route for login
router.post('/login', loginController)

// current user get
router.get('/current-user', authMiddleware, currentUserController)


module.exports = router