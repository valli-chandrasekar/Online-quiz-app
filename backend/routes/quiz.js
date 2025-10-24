
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Result = require('../models/Result');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// helper auth (simple)
function authMiddleware(req,res,next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({message:'Missing token'});
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch(err){
    return res.status(401).json({message:'Invalid token'});
  }
}

// get all questions
router.get('/questions', async (req,res) => {
  const qs = await Question.find({});
  res.json(qs);
});

// admin add question
router.post('/admin/addQuestion', authMiddleware, async (req,res) => {
  if(req.user.role !== 'admin') return res.status(403).json({message:'Forbidden'});
  const {questionText, options} = req.body;
  const q = new Question({questionText, options});
  await q.save();
  res.json({message:'Question added', q});
});

// admin update
router.put('/admin/updateQuestion/:id', authMiddleware, async (req,res) => {
  if(req.user.role !== 'admin') return res.status(403).json({message:'Forbidden'});
  const q = await Question.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json({message:'Updated', q});
});

// admin delete
router.delete('/admin/deleteQuestion/:id', authMiddleware, async (req,res) => {
  if(req.user.role !== 'admin') return res.status(403).json({message:'Forbidden'});
  await Question.findByIdAndDelete(req.params.id);
  res.json({message:'Deleted'});
});

// submit answers and calculate score
router.post('/submit', authMiddleware, async (req,res) => {
  try {
    const {answers} = req.body; // [{questionId, selectedIndex}]
    const qids = answers.map(a => a.questionId);
    const questions = await Question.find({_id: {$in: qids}});
    let score = 0;
    for(const ans of answers){
      const q = questions.find(x => x._id.toString() === ans.questionId);
      if(!q) continue;
      const selected = q.options[ans.selectedIndex];
      if(selected && selected.isCorrect) score++;
    }
    const result = new Result({userId:req.user.id, score, total:questions.length, answers});
    await result.save();
    res.json({score, total:questions.length, resultId:result._id});
  } catch(err){ console.error(err); res.status(500).json({message:'Server error'}); }
});

// get user results
router.get('/results', authMiddleware, async (req,res) => {
  const results = await Result.find({userId:req.user.id});
  res.json(results);
});

module.exports = router;
