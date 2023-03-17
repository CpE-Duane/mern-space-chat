const express = require('express')
const userController = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/')
     .post(userController.registerUser)
     .get(authMiddleware.protect ,userController.allUsers)

router.post('/login', userController.authUser)


module.exports = router