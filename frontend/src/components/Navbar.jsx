import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar({ accentColor, currentThemeId, colors, onColorChange }) {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { to: '/about', label: 'About' },
    { to: '/courses', label: 'Courses' },
    { to: '/opportunities', label: 'Opportunities' },
    { to: '/contact', label: 'Contact' },
    { to: '/enroll', label: 'Enroll Now' }
  ];

  return (
    <header className="site-header">
      <Link to="/" className="brand brand-link">
        <img src="/logo.png" alt="CodeWeb logo" className="logo-mark" />
        <span className="brand-title">CodeWeb</span>
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
        <div className={`color-panel ${isColorOpen ? 'active' : ''}`}>
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
