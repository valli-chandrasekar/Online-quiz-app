
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// register
router.post('/register', async (req, res) => {
  try {
    const {name,email,password, role} = req.body;
    if(!name||!email||!password) return res.status(400).json({message:'Missing fields'});
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({message:'Email exists'});
    const user = new User({name,email,password, role});
    await user.save();
    const token = jwt.sign({id:user._id, role:user.role}, JWT_SECRET, {expiresIn:'7d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  } catch(err){ console.error(err); res.status(500).json({message:'Server error'}); }
});

// login
router.post('/login', async (req,res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'Invalid credentials'});
    const match = await user.comparePassword(password);
    if(!match) return res.status(400).json({message:'Invalid credentials'});
    const token = jwt.sign({id:user._id, role:user.role}, JWT_SECRET, {expiresIn:'7d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  } catch(err){ console.error(err); res.status(500).json({message:'Server error'}); }
});

module.exports = router;
