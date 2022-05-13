const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchasedStocks = mongoose.Schema({
  stockId: {
    type: String,
    required: [true, 'No Stock Id assigned to stock!'],
    unique: true,
  },
  name: {
    type: String,
    minLength: 3,
    maxLength: [20, 'Name can not be longer than 20 characters!'],
    required: [true, 'Please provide Full Name of the Stock!'],
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  seller: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      maxLength: [80, 'Address can not be longer than 80 characters'],
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 12,
    },
  },
  datePurchased: {
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

const PurchasedStocks = mongoose.model('PurchasedStocks', purchasedStocks);
module.exports = PurchasedStocks;
