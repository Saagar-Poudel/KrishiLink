import React from 'react'
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  return
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
}

export default App