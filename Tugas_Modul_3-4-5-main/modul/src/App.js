import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modul3 from './Page/Modul3';
import Modul4 from './Page/Modul4';
import Modul5 from './Page/Modul5';




const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Modul3 />} />
        <Route path="/Modul4" element={<Modul4 />} />
        <Route path="/Modul5" element={<Modul5 />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;