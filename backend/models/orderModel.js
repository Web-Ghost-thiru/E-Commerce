const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
        cartItems:Array,
        stock:String,
        createdAt:Date,
})
const orderModel = mongoose.model('order',orderSchema);

module.exports = orderModel;