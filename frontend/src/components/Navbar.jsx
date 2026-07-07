import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar({ accentColor, currentThemeId, colors, onColorChange }) {
  const [isOpen, setIsOpen] = useState(false);
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
      <nav className="nav-links">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${link.to === '/enroll' ? 'enroll-button' : ''} ${isActive ? 'active' : ''}`.trim()}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="nav-tools">
        <button
          type="button"
          className={`color-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle color selector"
        >
          <span className="color-toggle-icon" />
        </button>
        <div className={`color-panel ${isOpen ? 'active' : ''}`}>
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
