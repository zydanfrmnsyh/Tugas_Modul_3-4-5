// Utama.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navigasi.css';
// YourReactComponent.js


const Utama = () => {
  return (
    <div>
      <nav className="main-nav">
        <h2 className="logo">Zydan<span>Azwar</span>Firmansyah</h2>
        <ul>
          <li><Link to="/" className="nav-link">Modul3</Link></li>
          <li><Link to="/Modul4" className="nav-link scroll-link">Modul4</Link></li>
          <li><Link to="/Modul5" className="nav-link scroll-link">Modul5</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Utama;
