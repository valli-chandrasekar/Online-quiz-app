
const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quiz_app')
  .then(async () => {
    await Question.deleteMany({});
    const sample = [
      { questionText: 'What is 2 + 2?', options: [{text:'3', isCorrect:false},{text:'4', isCorrect:true},{text:'5', isCorrect:false},{text:'2', isCorrect:false}]},
      { questionText: 'Which is a JavaScript framework?', options: [{text:'Django', isCorrect:false},{text:'Laravel', isCorrect:false},{text:'React', isCorrect:true},{text:'Rails', isCorrect:false}]},
      { questionText: 'HTML stands for?', options: [{text:'HyperText Markup Language', isCorrect:true},{text:'Home Tool Markup Language', isCorrect:false},{text:'Hyperlinks and Text Markup', isCorrect:false},{text:'None', isCorrect:false}]}
    ];
    await Question.insertMany(sample);
    console.log('Seeded questions');
    process.exit(0);
  });
