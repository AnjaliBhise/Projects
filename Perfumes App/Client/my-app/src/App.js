import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import AboutUs from './components/AboutUs.js';
import ContactUs from './components/ContactUs.js';
import HomePage from './Pages/HomePage.js'
import AllPerfumesPage from './Pages/AllPerfumesPage.js'
import PerfumesPage from './Pages/PerfumePage.js'



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/perfumes" element={<AllPerfumesPage />} />
          <Route path="/perfume/:id" element={<PerfumesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

