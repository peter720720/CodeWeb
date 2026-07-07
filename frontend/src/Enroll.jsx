import { useState } from 'react';

function Enroll({ courses }) {
  const [form, setForm] = useState({ fullName: '', email: '', course: courses[0]?.id || '' });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('http://localhost:3500/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, selectedCourse: form.course })
      });

      const result = await response.json();
      setStatus(response.ok ? 'success' : result.message || 'Something went wrong.');
    } catch (error) {
      setStatus('Network failed. Please check the backend or your connection.');
    }
  };

  return (
    <section className="section-block enroll-page">
      <div className="section-title">
        <span className="eyebrow">Enroll Today</span>
        <h2>Reserve your spot in the CodeWeb course that fits your goals.</h2>
        <p>Complete the form below and we’ll confirm your enrollment with next steps.</p>
      </div>

      <form className="enroll-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>

        <label>
          Email address
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Select course
          <select name="course" value={form.course} onChange={handleChange}>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </label>

        <button className="button button-primary" type="submit">Submit Enrollment</button>

        {status && (
          <div className={`form-status ${status === 'success' ? 'success' : 'error'}`}>
            {status === 'submitting' ? 'Sending enrollment...' : status}
          </div>
        )}
      </form>
    </section>
  );
}

export default Enroll;
