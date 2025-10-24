
const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: String,
  // optional: you can attach ids
});

const QuestionSchema = new mongoose.Schema({
  questionText:{type:String, required:true},
  options:[{text:String, isCorrect:Boolean}],
  createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Question', QuestionSchema);
