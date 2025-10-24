
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="card">
      <h2 className="text-3xl font-extrabold text-indigo-700">Welcome to the Online Quiz App</h2>
      <p className="mt-3 text-gray-700">A colorful, real-time themed quiz application generated from your Phase 1-4 details.</p>
      <div className="mt-6 space-x-3">
        <Link to="/dashboard" className="px-4 py-2 bg-indigo-600 text-white rounded">Go to Dashboard</Link>
        <Link to="/admin" className="px-4 py-2 bg-green-600 text-white rounded">Admin Panel</Link>
      </div>
    </div>
  )
}
