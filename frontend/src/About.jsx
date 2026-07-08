import React from 'react';

function About() {
  return (
    <div className="section-block about-page" style={{ paddingTop: '28px' }}>
      {/* Small top label */}
      <span className="eyebrow" style={{ fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
        About CodeWeb
      </span>

      {/* Main Big Title Header scaled to match your live layout */}
      <h1 style={{ 
        fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)', 
        lineHeight: '1.2', 
        fontWeight: '700',
        margin: '12px 0 20px',
        maxWidth: '850px'
      }}>
        The coding academy designed for career growth, real projects, and practical skills.
      </h1>

      {/* Paragraph Context description */}
      <p style={{ 
        maxWidth: '740px', 
        fontSize: '0.95rem', 
        lineHeight: '1.6', 
        opacity: '0.85',
        marginBottom: '42px'
      }}>
        CodeWeb helps students build strong foundations in web development, security, analytics, and 
        product design. Our trainings are delivered with mentor feedback, modern toolsets, and project-based 
        experience so learners can move from classroom to career with confidence.
      </p>

      {/* Three Feature Info Layout Cards */}
      <div className="feature-grid">
        
        <div className="feature-card" style={{ padding: '24px' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '8px' }}>
            METHODOLOGY
          </span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 10px' }}>
            Hands-on learning
          </h3>
          <p style={{ margin: 0, opacity: '0.8', fontSize: '0.9rem', lineHeight: '1.55' }}>
            Complete real applications, workflows, and case studies so you graduate with a portfolio of work.
          </p>
        </div>

        <div className="feature-card" style={{ padding: '24px' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '8px' }}>
            CURRICULUM
          </span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 10px' }}>
            Industry-ready topics
          </h3>
          <p style={{ margin: 0, opacity: '0.8', fontSize: '0.9rem', lineHeight: '1.55' }}>
            From responsive frontend builds to scalable backend systems, every course targets in-demand technical skills.
          </p>
        </div>

        <div className="feature-card" style={{ padding: '24px' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '8px' }}>
            MENTORSHIP
          </span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 10px' }}>
            Student support
          </h3>
          <p style={{ margin: 0, opacity: '0.8', fontSize: '0.9rem', lineHeight: '1.55' }}>
            Get help with learning resources, troubleshooting, coaching, and practical career guidance.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;
