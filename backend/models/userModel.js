const  mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type : String,
        require: true
    },
    phone:{
        type : String,
        require: true,
        unique: true
    },
    email:{
        type : String,
        unique: true
    },
    password:{
        type : String,
        require: true
    }
});

// static signup method
userSchema.statics.signup = async function(name, phone, email, password) {
    if (!name) {
        throw Error('Name is required')
    }
    if (!password) {
        throw Error('password is required')
    }
    if (!phone || !email ) {
        throw Error('Input Phone or Email-address')
    }
        // //Validator
    if(!validator.isStrongPassword(password)){
        throw Error('Input a strong password')
    }

   const phoneexists = await this.findOne({ phone })

  if (phoneexists) {
    throw Error('Phone Number already in use my another account')
  }

  const emailexists = await this.findOne({ email })

  if (emailexists) {
    throw Error('Email already in use my another account')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ name, phone, email, password : hash})
  return user
}

// static login method
userSchema.statics.login = async function(phone, password) {

  if (!phone  && !password) {
    throw Error('All fields must be filled')
  }

  let user = await this.findOne({ phone})

  if (!user) {
    throw Error('user does not  exixt')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


// static forgot password method
userSchema.statics.fgtpswd = async function(email) {

  if (!email) {
    throw Error('Email is required')
  }

  let user = await this.findOne({ email})

  if (!user) {
    throw Error('User does not  exist!!')
  }

  return user
}

// // static for reset password
userSchema.statics.resetpswd = async function(id) {

  let user = await this.findOne({_id: id})

  if (!user) {
    throw Error('User does not  exist!!')
  }

  return user
}
module.exports = mongoose.model('User', userSchema);