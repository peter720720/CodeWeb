import { useState } from 'react';

const initialState = { fullName: '', email: '', password: '', course: 'frontend' };

function Auth({ courses }) {
  const [form, setForm] = useState(initialState);
  const [mode, setMode] = useState('signup');
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const route = mode === 'signup' ? '/api/auth/register' : '/api/auth/login';
    setStatus('submitting');

    const payload = mode === 'signup'
      ? { fullName: form.fullName, email: form.email, password: form.password, selectedCourse: form.course }
      : { email: form.email, password: form.password };

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3500';
      const response = await fetch(`${API_BASE}${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      setStatus(response.ok ? (mode === 'signup' ? 'Account created successfully.' : 'Signed in successfully.') : result.message || 'Error occurred.');
    } catch (error) {
      setStatus('Unable to reach the server.');
    }
  };

  return (
    <section className="section-block enroll-page">
      <div className="section-title">
        <span className="eyebrow">Enroll & Sign In</span>
        <h2>{mode === 'signup' ? 'Create your learning account' : 'Sign in to your CodeWeb account'}</h2>
        <p>{mode === 'signup'
          ? 'Quickly register and secure your seat in the coding path you want.'
          : 'Use your email and password to access past enrollment details and progress.'}
        </p>
      </div>

      <div className="auth-panel">
        <div className="auth-switch">
          <button type="button" className={mode === 'signup' ? 'button button-primary' : 'button button-outline'} onClick={() => setMode('signup')}>Sign up</button>
          <button type="button" className={mode === 'signin' ? 'button button-primary' : 'button button-outline'} onClick={() => setMode('signin')}>Sign in</button>
        </div>

        <form className="enroll-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label>
              Full name
              <input name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
          )}

          <label>
            Email address
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>

          {mode === 'signup' && (
            <label>
              Select course
              <select name="course" value={form.course} onChange={handleChange}>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </label>
          )}

          <button className="button button-primary" type="submit">
            {mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>

          {status && (
            <div className={`form-status ${status.includes('success') ? 'success' : 'error'}`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Auth;
