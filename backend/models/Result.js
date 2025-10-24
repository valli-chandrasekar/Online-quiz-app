
const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  score:{type:Number},
  total:{type:Number},
  answers:[{questionId:mongoose.Schema.Types.ObjectId, selectedIndex:Number}],
  createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Result', ResultSchema);
