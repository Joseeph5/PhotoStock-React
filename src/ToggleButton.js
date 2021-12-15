import React, { useEffect, useState } from 'react';
import './toggler.css';

const getStorageTheme = () => {
  let theme = 'light-theme';
  let ballPosition = 'ball-right';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
    ballPosition = localStorage.getItem('ballPosition');
  }
  return { theme, ballPosition };
};

export default function ToggleButton() {
  const [theme, setTheme] = useState(getStorageTheme().theme);
  const [ballPosition, setBallPosition] = useState(getStorageTheme().ballPosition);

  const themeToggle = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
      setBallPosition('ball-left');
    } else {
      setTheme('light-theme');
      setBallPosition('ball-right');
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    localStorage.setItem('ballPosition', ballPosition);
  }, [theme, ballPosition]);

  return (
    <div>
      <div className={ballPosition} onClick={themeToggle}>
        <label htmlFor='toggle' className='label'>
          <i className='fas fa-moon'></i>
          <i className='fas fa-sun'></i>
          <div className='blob'></div>
        </label>
      </div>
    </div>
  );
}
