const express = require('express')
const messageController = require('../controllers/messageControllers')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

router.route('/')
     .post(authMiddleware.protect, messageController.sendMessage)

router.route('/:chatId')
     .get(authMiddleware.protect, messageController.allMessages)

module.exports = router