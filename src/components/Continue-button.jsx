import React, { useEffect, useState } from 'react';

const ScrollButton = () => {
  const [isFaded, setIsFaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFaded(window.scrollY > 100); // fade out after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollOnePage = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <style>
        {`
          .scroll-button {
            font-family: 'Unbounded', sans-serif;
            align-self: flex-end;
            margin: 20px 5vw;
            padding: 18px 35px;
            font-size: 24px;
            font-weight: 600;
            border: none;
            border-radius: 30px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            cursor: pointer;
            transition: transform 0.3s ease, background 0.3s ease, opacity 0.5s ease;
            z-index: 1000;
            user-select: none;
          }

          .scroll-button:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: scale(1.05);
          }

          .scroll-button:active {
            transform: scale(0.95);
          }

          .fade-out {
            opacity: 0;
            pointer-events: none;
          }
        `}
      </style>
      <button
        className={`scroll-button ${isFaded ? 'fade-out' : ''}`}
        onClick={scrollOnePage}
        aria-label="Scroll one page down"
      >
        Continue
      </button>
    </>
  );
};

export default ScrollButton;
