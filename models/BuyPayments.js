const mongoose = require('mongoose');
const { Schema } = mongoose;

const buyPayments = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: [80, 'Name can not be longer than 80 characters!'],
    required: [true, 'Please provide Full Name of the Stock!'],
  },
  paymentMode: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  stockReference: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'PurchasedStocks',
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const BuyPayments = mongoose.model('BuyPayments', buyPayments);
module.exports = BuyPayments;
