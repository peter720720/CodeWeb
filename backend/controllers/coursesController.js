const COURSES = [
  { id: 'frontend', title: 'Frontend Development', description: 'Learn HTML, CSS, JavaScript and modern frameworks.' },
  { id: 'backend', title: 'Backend Development', description: 'Build scalable APIs and server-side systems.' },
  { id: 'fullstack', title: 'Full-Stack Development', description: 'Frontend + Backend workflows for production.' }
];

export function getCourses(req, res) {
  res.status(200).json(COURSES);
}

export function getCourseById(req, res) {
  const { id } = req.params;
  const course = COURSES.find(c => c.id === id);
  if (!course) return res.status(404).json({ message: 'Course not found.' });
  res.status(200).json(course);
}
