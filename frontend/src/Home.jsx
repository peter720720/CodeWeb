import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ courses }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCourse = courses[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % courses.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev + courses.length - 1) % courses.length);
  };

  return (
    <section className="home-page">
      <div className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Welcome to CodeWeb</span>
          <h1>Build skills, launch careers, and join the next wave of digital makers.</h1>
          <p>
            At CodeWeb Academy, we guide learners through real-world web, product and design courses. Explore
            focused pathways for frontend, backend, cybersecurity, data analysis, and product strategy.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/courses">View Courses</Link>
            <Link className="button button-secondary" to="/enroll">Start Enrollment</Link>
          </div>
        </div>
        <div className="hero-image" aria-hidden="true">
          <div className="hero-image-frame">
            <div className="hero-image-block" />
          </div>
        </div>
      </div>

      <div className="course-intro">
        <div>
          <h2>Explore the learning path that fits your ambition.</h2>
          <p>
            Our courses are crafted for beginners, career switchers, and professionals ready to level up. Each program
            includes project-driven lessons, mentorship guidance, and clear outcomes so students can launch confident work.
          </p>
        </div>
        <Link className="button button-tertiary" to="/courses">See all course outlines</Link>
      </div>

      <div className="carousel-panel">
        <div className="carousel-copy">
          <p className="eyebrow">Featured course</p>
          <h3>{activeCourse.title}</h3>
          <p>{activeCourse.description}</p>
          <p className="course-details">{activeCourse.details}</p>
          <Link className="button button-primary" to="/courses">Learn more</Link>
        </div>
        <div className="carousel-image" style={{ backgroundImage: `url(${activeCourse.image})` }} />
      </div>

      <div className="carousel-controls">
        <button type="button" className="button-outline" onClick={handlePrev}>Previous</button>
        <span>{activeCourse.category}</span>
        <button type="button" className="button-outline" onClick={handleNext}>Next</button>
      </div>
    </section>
  );
}

export default Home;
