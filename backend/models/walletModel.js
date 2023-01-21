const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema({
    userId:{
        type : String,
        require: true
    },
    phone:{
        type : String,
        require: true
    },
    balance:{
        type : Number,
        require: true
    },
    transfer_pin:{
        type : String,
        require: true
    },
}, {timestamps : true});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;