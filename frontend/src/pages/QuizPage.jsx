
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function QuizPage(){
  const {id} = useParams();
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [scoreInfo, setScoreInfo] = useState(null);

  useEffect(()=>{ fetchQuestion(); },[id]);

  async function fetchQuestion(){
    const res = await axios.get(import.meta.env.VITE_API_BASE + '/quiz/questions');
    // for demo, pick the question that matches id
    const q = res.data.find(x => x._id === id) || res.data[0];
    setQuestion(q);
  }

  async function handleSubmit(e){
    e.preventDefault();
    // submit single-question answer for demo (wrap as array)
    const token = localStorage.getItem('token') || '';
    try {
      const res = await axios.post(import.meta.env.VITE_API_BASE + '/quiz/submit',
        {answers:[{questionId: question._id, selectedIndex: selected}] ,
        },
        { headers: { Authorization: 'Bearer '+token } }
      );
      setScoreInfo(res.data);
      setSubmitted(true);
    } catch(err){ alert(err.response?.data?.message || 'Submit failed'); }
  }

  if(!question) return <div className="card">Loading...</div>;
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-indigo-700">Quiz</h2>
      <p className="mt-2">{question.questionText}</p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        {question.options.map((op, idx) => (
          <label key={idx} className={"block p-2 rounded cursor-pointer " + (selected===idx ? 'bg-indigo-100' : 'bg-white')}>
            <input type="radio" name="opt" checked={selected===idx} onChange={()=>setSelected(idx)} /> <span className="ml-2">{op.text}</span>
          </label>
        ))}
        <div className="mt-3">
          <button className="px-4 py-2 bg-pink-600 text-white rounded" disabled={selected===null}>Submit</button>
        </div>
      </form>

      {submitted && scoreInfo && (
        <div className="mt-4 p-3 bg-green-50 rounded">
          <strong>Score:</strong> {scoreInfo.score} / {scoreInfo.total}
        </div>
      )}
    </div>
  )
}
