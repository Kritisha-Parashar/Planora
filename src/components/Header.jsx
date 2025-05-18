import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import '../App.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80); // Adjust threshold if needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo"
        className={`logo ${scrolled ? 'logo-fade' : ''}`}
      />
    </header>
  );
};

export default Header;
