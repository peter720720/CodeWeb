function About() {
  return (
    <section className="section-block">
      <div className="section-title">
        <span className="eyebrow">About CodeWeb</span>
        <h2>The coding academy designed for career growth, real projects, and practical skills.</h2>
        <p>
          CodeWeb helps students build strong foundations in web development, security, analytics, and product design. Our 
          trainings are delivered with mentor feedback, modern toolsets, and project-based experience so learners can move
          from classroom to career with confidence.
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>Hands-on learning</h3>
          <p>Complete real applications, workflows, and case studies so you graduate with a portfolio of work.</p>
        </div>
        <div className="feature-card">
          <h3>Industry-ready topics</h3>
          <p>From responsive frontend builds to scalable backend systems, every course targets in-demand technical skills.</p>
        </div>
        <div className="feature-card">
          <h3>Student support</h3>
          <p>Get help with learning resources, troubleshooting, coaching, and practical career guidance.</p>
        </div>
      </div>
    </section>
  );
}

export default About;
