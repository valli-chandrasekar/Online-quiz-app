
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [questions,setQuestions] = useState([]);

  useEffect(()=>{ fetchQuestions(); },[]);

  async function fetchQuestions(){
    const res = await axios.get(import.meta.env.VITE_API_BASE + '/quiz/questions');
    setQuestions(res.data);
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-pink-600">Available Quizzes</h2>
      <p className="text-gray-600">Each quiz contains multiple choice questions.</p>
      <div className="mt-4 grid gap-4">
        {questions.map(q => (
          <div key={q._id} className="p-4 rounded-lg bg-white/60 border">
            <h3 className="font-semibold">{q.questionText}</h3>
            <div className="mt-2">
              <Link to={'/quiz/'+q._id} className="px-3 py-1 text-sm bg-indigo-500 text-white rounded">Attempt</Link>
            </div>
          </div>
        ))}
        {questions.length===0 && <p className="text-gray-500">No questions yet. Admin can add questions.</p>}
      </div>
    </div>
  )
}
