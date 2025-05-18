import React from 'react';
import './Banner.css';

const AnimatedTitleBanner = ({ title, subtitle }) => {
  const lastChar = title.slice(-1);
  const rest = title.slice(0, -1);

  return (
    <div className="animated-banner">
      <h1 className="glow-text">
        {rest}
        <span className="last-letter">{lastChar}</span>
      </h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};

export default AnimatedTitleBanner;
