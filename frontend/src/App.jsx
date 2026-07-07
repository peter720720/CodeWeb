import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Loader from './components/Loader.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Courses from './Courses.jsx';
import Opportunities from './Opportunities.jsx';
import Contact from './Contact.jsx';
import Auth from './Auth.jsx';
import './index.css';

const courses = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    category: 'Web Interface Design',
    description: 'Learn HTML, CSS, JavaScript, and modern frameworks to build beautiful user experiences for every screen.',
    details: 'Build responsive landing pages, modular component systems, accessible UI patterns, and cross-browser-friendly interfaces.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    category: 'Server & APIs',
    description: 'Master Node.js, databases, and REST APIs to power reliable server logic and secure data handling.',
    details: 'Create databases, authenticate users, write scalable microservices, and connect backend systems with real-world apps.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    category: 'Complete Web Systems',
    description: 'Combine frontend design and backend architecture into complete full-stack applications that are ready for launch.',
    details: 'Build end-to-end web products with modern stacks, deployment pipelines, and production-ready performance tuning.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'Security Engineering',
    description: 'Protect systems, networks, and applications with defensive skills, threat analysis, and secure coding practices.',
    details: 'Explore vulnerability auditing, secure architecture, incident response, and how to keep digital products safe from attack.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    category: 'Insight & Strategy',
    description: 'Turn raw data into meaningful insights using analytics, visualizations, and data storytelling techniques.',
    details: 'Work with datasets, dashboards, business metrics, and reporting tools to help teams make better decisions.',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    category: 'Visual Identity',
    description: 'Develop branding, layout, and digital visuals that communicate clearly and captivate modern audiences.',
    details: 'Use design systems, typography, and visual composition to create professional presentations, ads, and digital campaigns.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'production-design',
    title: 'Production Design',
    category: 'Launch-Ready Delivery',
    description: 'Learn how to plan, prototype, and refine digital products in a polished production workflow.',
    details: 'Focus on product structure, usability testing, real-world delivery, and experience design that guides users forward.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'product-management',
    title: 'Product Management',
    category: 'Strategy & Growth',
    description: 'Discover how to manage roadmaps, prioritize features, and bring useful digital products to market successfully.',
    details: 'Develop planning, stakeholder communication, and delivery strategies that make technical products more effective.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80'
  }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState({
    id: 'blue',
    accent: '#3b7fff',
    background: '#020617',
    text: '#f7f8fb',
    muted: '#cbd5e1',
    headerBg: 'rgba(2, 6, 23, 0.84)',
    headerFg: '#f7f8fb',
    panelBg: 'rgba(255, 255, 255, 0.03)',
    panelBorder: 'rgba(255, 255, 255, 0.08)',
    panelText: '#dfe5f2',
    buttonSecondaryBg: 'rgba(255, 255, 255, 0.08)',
    buttonSecondaryBorder: 'rgba(255, 255, 255, 0.14)',
    buttonSecondaryColor: '#f7f8fb',
    buttonOutlineBg: 'rgba(255, 255, 255, 0.04)',
    buttonOutlineBorder: 'rgba(120, 169, 255, 0.35)',
    buttonOutlineColor: '#dfe5f2',
    enrollBg: 'rgba(255, 255, 255, 0.12)',
    enrollFg: '#ffffff',
    enrollBorder: 'rgba(255, 255, 255, 0.18)'
  });

  const colorOptions = [
    { id: 'black', value: '#020617', label: 'Black', mode: 'background', background: '#020617', text: '#f7f8fb', muted: '#cbd5e1', headerBg: 'rgba(2, 6, 23, 0.84)', headerFg: '#f7f8fb', panelBg: 'rgba(255, 255, 255, 0.03)', panelBorder: 'rgba(255, 255, 255, 0.08)', panelText: '#dfe5f2', buttonSecondaryBg: 'rgba(255, 255, 255, 0.08)', buttonSecondaryColor: '#f7f8fb', buttonOutlineBg: 'rgba(255, 255, 255, 0.04)', buttonOutlineBorder: 'rgba(120, 169, 255, 0.35)', buttonOutlineColor: '#dfe5f2', enrollBg: 'rgba(255, 255, 255, 0.12)', enrollFg: '#ffffff', enrollBorder: 'rgba(255, 255, 255, 0.18)' },
    { id: 'white', value: '#ffffff', label: 'White', mode: 'background', background: '#ffffff', text: '#111111', muted: '#444444', headerBg: 'rgba(255, 255, 255, 0.96)', headerFg: '#111111', panelBg: 'rgba(0, 0, 0, 0.04)', panelBorder: 'rgba(0, 0, 0, 0.08)', panelText: '#111111', buttonSecondaryBg: 'rgba(0, 0, 0, 0.04)', buttonSecondaryBorder: 'rgba(0, 0, 0, 0.1)', buttonSecondaryColor: '#111111', buttonOutlineBg: 'rgba(0, 0, 0, 0.04)', buttonOutlineBorder: 'rgba(0, 0, 0, 0.1)', buttonOutlineColor: '#111111', enrollBg: 'rgba(0, 0, 0, 0.08)', enrollFg: '#111111', enrollBorder: 'rgba(0, 0, 0, 0.18)' },
    { id: 'blue', value: '#3b7fff', label: 'Blue', mode: 'accent', accent: '#3b7fff' },
    { id: 'red', value: '#ff4655', label: 'Red', mode: 'accent', accent: '#ff4655' },
    { id: 'green', value: '#2ddf9f', label: 'Green', mode: 'accent', accent: '#2ddf9f' },
    { id: 'gold', value: '#f5c453', label: 'Gold', mode: 'accent', accent: '#f5c453' },
    { id: 'purple', value: '#a655ff', label: 'Purple', mode: 'accent', accent: '#a655ff' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div
        className="app-shell"
        style={{
          '--accent-color': theme.accent,
          '--background-color': theme.background,
          '--text-color': theme.text,
          '--muted-color': theme.muted,
          '--header-bg': theme.headerBg,
          '--header-fg': theme.headerFg,
          '--panel-bg': theme.panelBg,
          '--panel-border': theme.panelBorder,
          '--panel-text': theme.panelText,
          '--button-secondary-bg': theme.buttonSecondaryBg,
          '--button-secondary-border': theme.buttonSecondaryBorder,
          '--button-secondary-color': theme.buttonSecondaryColor,
          '--button-outline-bg': theme.buttonOutlineBg,
          '--button-outline-border': theme.buttonOutlineBorder,
          '--button-outline-color': theme.buttonOutlineColor,
          '--enroll-bg': theme.enrollBg,
          '--enroll-fg': theme.enrollFg,
          '--enroll-border': theme.enrollBorder
        }}
      >
        <Navbar
          accentColor={theme.accent}
          currentThemeId={theme.id}
          colors={colorOptions}
          onColorChange={(option) => {
            if (option.mode === 'background') {
              setTheme((prev) => ({
                ...prev,
                id: option.id,
                background: option.background,
                text: option.text,
                muted: option.muted,
                headerBg: option.headerBg,
                headerFg: option.headerFg,
                panelBg: option.panelBg,
                panelBorder: option.panelBorder,
                panelText: option.panelText,
                buttonSecondaryBg: option.buttonSecondaryBg,
                buttonSecondaryBorder: option.buttonSecondaryBorder,
                buttonSecondaryColor: option.buttonSecondaryColor,
                buttonOutlineBg: option.buttonOutlineBg,
                buttonOutlineBorder: option.buttonOutlineBorder,
                buttonOutlineColor: option.buttonOutlineColor,
                enrollBg: option.enrollBg,
                enrollFg: option.enrollFg,
                enrollBorder: option.enrollBorder
              }));
            } else {
              setTheme((prev) => ({
                ...prev,
                id: option.id,
                accent: option.accent,
                buttonSecondaryColor: option.accent,
                buttonOutlineColor: option.accent,
                enrollFg: option.accent,
                headerFg: option.accent,
                panelText: option.accent,
                text: option.accent
              }));
            }
          }}
        />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home courses={courses} />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses courses={courses} />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enroll" element={<Auth courses={courses} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="footer-brand">
            <img src="/logo.png" alt="CodeWeb logo" className="logo-mark" />
            <div>
              <p className="footer-title">CodeWeb Academy</p>
              <p className="footer-tag">Learning today, building tomorrow.</p>
            </div>
          </div>

          <div className="footer-grid">
            <div>
              <p className="footer-heading">Navigate</p>
              <a href="/about">About</a>
              <a href="/courses">Courses</a>
              <a href="/opportunities">Opportunities</a>
              <a href="/contact">Contact</a>
            </div>
            <div>
              <p className="footer-heading">Address</p>
              <p>CodeWeb Campus</p>
              <p>Unity Drive, Lagos</p>
              <p>NG · +234 800 123 4567</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
