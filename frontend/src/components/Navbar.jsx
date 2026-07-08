import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Added theme prop to the incoming parameter list
function Navbar({ accentColor, currentThemeId, colors, onColorChange, theme }) {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const colorRef = useRef(null);
  const links = [
    { to: '/about', label: 'About' },
    { to: '/courses', label: 'Courses' },
    { to: '/opportunities', label: 'Opportunities' },
    { to: '/contact', label: 'Contact' },
    { to: '/enroll', label: 'Enroll Now' }
  ];

  useEffect(() => {
    function handleOutside(e) {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (isColorOpen && colorRef.current && !colorRef.current.contains(e.target)) {
        setIsColorOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsColorOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('keydown', handleEsc);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isColorOpen]);

  // Clean, fully isolated logic check using explicit state tracking props
  const getLogoFilter = () => {
    if (theme === 'white') {
      return 'brightness(0)'; // Stays perfectly black on light background layouts
    }
    return 'brightness(0) invert(1)'; // Stays perfectly white on dark background layouts
  };

  return (
    <header className="site-header">
      <Link to="/" className="brand brand-link">
        <img 
          src="/logo.png" 
          alt="CodeWeb logo" 
          style={{ 
            height: '110px', 
            width: '110px', 
            objectFit: 'contain',
            display: 'block',
            margin: '-20px 0',
            maxWidth: 'none', 
            maxHeight: 'none',
            filter: getLogoFilter(),
            transition: 'filter 0.25s ease'
          }} 
        />
      </Link>
      <button
        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
        aria-label="Toggle navigation menu"
        onClick={() => setIsMenuOpen((p) => !p)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-panel" ref={menuRef}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `nav-link ${link.to === '/enroll' ? 'enroll-button' : ''} ${isActive ? 'active' : ''}`.trim()}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="nav-tools">
        <button
          type="button"
          className={`color-toggle ${isColorOpen ? 'open' : ''}`}
          onClick={() => setIsColorOpen((prev) => !prev)}
          aria-expanded={isColorOpen}
          aria-label="Toggle color selector"
        >
          <span className="color-toggle-icon" />
        </button>
        <div ref={colorRef} className={`color-panel ${isColorOpen ? 'active' : ''}`}>
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              className={`color-swatch ${currentThemeId === color.id ? 'active' : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => onColorChange(color)}
              aria-label={`Select ${color.label}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
