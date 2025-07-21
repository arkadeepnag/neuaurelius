// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import Consultation from "./pages/Consultation";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
