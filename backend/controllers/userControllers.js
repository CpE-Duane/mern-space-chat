const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async (req, res) => {
     const {name, email, password, pic} = req.body
     if (!name || !email || !password) {
          res.status(400)
          throw new Error("All fields are required.")
     }

     const userExist = await User.findOne({email})
     if (userExist) {
          res.status(400)
          throw new Error("User already exist.")
     }

     const hashPassword = await bcrypt.hash(password, 10)
     const user = await User.create({
          name,
          email,
          password: hashPassword,
          pic
     })

     if (user) {
          res.status(201).json({
               message: "Registered successfully",
               user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id)
               }
          })
     } else {
          res.status(400)
          throw new Error("Failed to create user.")
     }
})

const authUser = asyncHandler(async (req, res) => {
     const { email, password } = req.body
     const user = await User.findOne({ email })
     if (user && (await bcrypt.compare(password, user.password))) {
          res.status(201).json({
               message: "Login successfully.",
               user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id)
               }
          })
     } else {
          res.status(401)
          throw new Error("Invalid email or password.")
     }
})

const allUsers = asyncHandler(async (req,res) => {
     const keyword = req.query.search ? {
          $or: [
               { name: {$regex: req.query.search, $options: "i" } },
               // { email: { $regex: req.query.search, $options: "i" } },
          ]
     } : {}

     const users = await User.find(keyword).find({
          _id: {$ne: req.user._id}
     })

     res.send(users)

})

const userController = {
     registerUser,
     authUser,
     allUsers
}

module.exports = userController