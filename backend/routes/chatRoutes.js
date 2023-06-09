const express = require('express')
const chatController = require('../controllers/chatControllers')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.route("/")
     .post(authMiddleware.protect, chatController.accessChat)
     .get(authMiddleware.protect, chatController.fetchChats)

router.route("/group")
     .post(authMiddleware.protect, chatController.createGroupChat)

router.route("/rename")
     .put(authMiddleware.protect, chatController.renameGroup)

router.route("/groupadd")
     .put(authMiddleware.protect, chatController.addToGroup)

router.route("/groupremove")
     .put(authMiddleware.protect, chatController.removeFromGroup)


module.exports = router