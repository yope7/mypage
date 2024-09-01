import logo from './logo.svg';
import './App.css';
import TrumpCardPortfolio from './components/TrumpCardPortfolio';
import './styles/TrumpCardPortfolio.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Page1 from './components/TrumpCardPortfolio';
// import Main from './components/Main';
import Me from './components/Me';
import './styles/Me.css';

const NavLink = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick} className="nav-link">
    {children}
  </Link>
);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">MyApp</div>
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/components/TrumpCardPortfolio" onClick={closeMenu}>Page 1</NavLink>
          <NavLink to="./components/Me" onClick={closeMenu}>ページ</NavLink>
          {/* <NavLink to="/page3" onClick={closeMenu}>Page 3</NavLink> */}
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

const PageContent = ({ title }) => (
  <div className="page-content">
    <h1>{title}</h1>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<PageContent title="Home" />} />
          <Route path="/components/TrumpCardPortfolio" element={<TrumpCardPortfolio />} />
          <Route path="/components/Me" element={<Me />} />
          <Route path="/page3" element={<PageContent title="Page 3" />} />
        </Routes>
      </div>
    </Router>
  );
}