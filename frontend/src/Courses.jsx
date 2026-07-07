function Courses({ courses }) {
  return (
    <section className="section-block">
      <div className="section-title">
        <span className="eyebrow">Course Pathways</span>
        <h2>Comprehensive courses built for modern teams and creative careers.</h2>
        <p>
          Choose the pathway that matches your goals and enjoy hands-on learning with mentorship, practice builds, and industry-aligned guidance.
        </p>
      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <article className="course-card" key={course.id}>
            <div className="course-image" style={{ backgroundImage: `url(${course.image})` }} />
            <div className="course-info">
              <p className="course-tag">{course.category}</p>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p className="course-detail-text">{course.details}</p>
              <a className="learn-more" href="/courses">Learn more</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Courses;
