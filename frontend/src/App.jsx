
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import Admin from './pages/Admin';
import Login from './pages/Login';

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
      <nav className="p-4 bg-white/70 backdrop-blur sticky top-0 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">Online Quiz App</h1>
          <div className="space-x-4">
            <Link to="/" className="px-3 py-1 rounded bg-indigo-600 text-white">Home</Link>
            <Link to="/dashboard" className="px-3 py-1 rounded bg-pink-500 text-white">Dashboard</Link>
            <Link to="/admin" className="px-3 py-1 rounded bg-green-500 text-white">Admin</Link>
            <Link to="/login" className="px-3 py-1 rounded bg-gray-200">Login</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/quiz/:id" element={<QuizPage/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </div>
  )
}
