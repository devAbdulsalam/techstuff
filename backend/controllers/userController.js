const User = require('../models/userModel')
const Wallet = require('../models/walletModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}
const passwordToken = (email, _id) => {
    const secret = _id + process.env.SECRET
  return jwt.sign({email, _id}, secret, { expiresIn: '5m' })
}

// // login user
const loginUser = async (req, res) => {
    const {phone, password} = req.body
    try {
        // retrieve user and wallet
        const user = await User.login(phone, password)
        const wallet = await Wallet.findOne({ userId: user._id });
        // create a token
        const token = createToken(user._id)
    
        res.status(200).json({user, wallet, token, message : "Log in successfully"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// create User
const signinUser = async (req, res) => {
    const {name, phone, email, password} = req.body
    try {
        const user = await User.signup(name, phone, email, password)
        // create new wallet for user
        const wallet =  await Wallet.create({ userId: user._id });
         // create a token
        const token = createToken(user._id)

        res.status(200).json({user, token, message: "Account created successfully"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// // forget Password
const forgetPassword = async (req, res) => {
    const {email} = req.body
    try {
        const user = await User.fgtpswd(email)
        // create a token
        const token = passwordToken(user.email, user._id)
        
        const link = `http://localhost:4000/reset-password/${user._id}/${token}`;
        
        res.status(200).json({link, token, message : "Password reset link sent"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// // reset Password
const resetPassword = async (req, res) => {
    const {id, token} = params
    try {
        const user = await User.resetpswd(id)
        // // create a token
        const secret = passwordToken(user.email, user._id)
        // // verify the token
        const verify =  jwt.verify(token, secret);
        if(!verify){
           res.status(401).json({error: "verification failed"}) 
        }
        res.status(200).json({verify, token, message : "Password Reset Successfully"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    signinUser,
    loginUser,
    forgetPassword,
    resetPassword
}