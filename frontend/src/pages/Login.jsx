
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  async function handleLogin(e){
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_BASE + '/auth/login', {email,password});
      localStorage.setItem('token', res.data.token);
      alert('Logged in as '+res.data.user.name);
      nav('/dashboard');
    } catch(err){ alert(err.response?.data?.message || 'Login failed') }
  }

  return (
    <div className="card max-w-md mx-auto">
      <h3 className="text-2xl font-bold">Login</h3>
      <form onSubmit={handleLogin} className="mt-4 space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded border" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 rounded border" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
