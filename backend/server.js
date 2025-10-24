
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);

app.get('/', (req, res) => res.send({message: 'Quiz App API running'}));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quiz_app')
  .then(() => {
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
