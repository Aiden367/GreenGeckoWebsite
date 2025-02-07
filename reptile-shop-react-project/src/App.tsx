
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './FRONTEND/Pages/Home';
import Nav from './COMPONENTS/Navbar'; // Ensure this matches the alias
import React from 'react';
import CreateAccount from './FRONTEND/Pages/CreateAccount';
import Login from './FRONTEND/Pages/Login';
import Dashboard from './FRONTEND/Pages/AdminDashboard';
const App: React.FC = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Login" element={<Login />}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App
