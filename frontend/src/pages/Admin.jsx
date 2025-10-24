
import React, {useState} from 'react';
import axios from 'axios';

export default function Admin(){
  const [qtext,setQtext] = useState('');
  const [opts,setOpts] = useState(['','','','']);
  const [correct,setCorrect] = useState(0);

  async function handleAdd(e){
    e.preventDefault();
    const token = localStorage.getItem('token') || '';
    const options = opts.map((t,i)=>({text:t, isCorrect:i===correct}));
    try {
      const res = await axios.post(import.meta.env.VITE_API_BASE + '/quiz/admin/addQuestion',
        {questionText:qtext, options},
        { headers: { Authorization: 'Bearer '+token } }
      );
      alert('Added');
      setQtext(''); setOpts(['','','','']); setCorrect(0);
    } catch(err){ alert(err.response?.data?.message || 'Add failed'); }
  }

  return (
    <div className="card max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700">Admin - Add Question</h2>
      <form onSubmit={handleAdd} className="mt-3 space-y-2">
        <input value={qtext} onChange={e=>setQtext(e.target.value)} placeholder="Question text" className="w-full p-2 rounded border" />
        {opts.map((o,i)=>(
          <div key={i} className="flex gap-2">
            <input value={o} onChange={e=>{ const copy=[...opts]; copy[i]=e.target.value; setOpts(copy); }} className="flex-1 p-2 rounded border" placeholder={'Option '+(i+1)} />
            <label className="flex items-center gap-2"><input type="radio" name="correct" checked={correct===i} onChange={()=>setCorrect(i)} /> Correct</label>
          </div>
        ))}
        <button className="px-4 py-2 bg-green-600 text-white rounded">Add Question</button>
      </form>
    </div>
  )
}
