import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import EnterName from './components/EnterName';  
import QueScreen from './components/QueScreen';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/enter-name" element={<EnterName />} />
        <Route path="/quiz" element={<QueScreen />} /> 
      </Routes>
    </Router>
  );
}

export default App;
