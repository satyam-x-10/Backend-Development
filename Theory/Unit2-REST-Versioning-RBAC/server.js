const express = require('express');

const app = express();
const PORT = 4003;

app.use(express.json());

const records = [
  { id: 1, name: 'Satyam Koranga', role: 'student', department: 'CSE', cgpa: 8.9 },
  { id: 2, name: 'Dr. Prateek Raj', role: 'faculty', department: 'SoCS', cgpa: null },
  { id: 3, name: 'Ayush Yadav', role: 'student', department: 'CSE', cgpa: 8.6 }
];

// Simulated authentication middleware via header: x-user-role
function authenticate(req, res, next) {
  const role = req.headers['x-user-role'];
  if (!role) {
    return res.status(401).json({ success: false, error: 'Authentication header x-user-role is missing' });
  }
  req.user = { role: role.toLowerCase() };
  next();
}

// Role-Based Access Control (RBAC) authorization middleware
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: role '${req.user.role}' cannot access this endpoint. Required: ${allowedRoles.join(' or ')}`
      });
    }
    next();
  };
}

// API v1: Flat array response
app.get('/api/v1/users', authenticate, authorize('student', 'faculty', 'admin'), (req, res) => {
  res.json(records.map(({ id, name, role }) => ({ id, name, role })));
});

// API v2: Enveloped response with metadata, filtering, and deprecation header on v1
app.get('/api/v2/users', authenticate, authorize('student', 'faculty', 'admin'), (req, res) => {
  const { role } = req.query;
  const filtered = role ? records.filter((r) => r.role === role) : records;
  res.json({
    success: true,
    apiVersion: 'v2',
    meta: { count: filtered.length, timestamp: new Date().toISOString() },
    data: filtered
  });
});

// Protected create route (faculty or admin only)
app.post('/api/v2/users', authenticate, authorize('faculty', 'admin'), (req, res) => {
  const { name, role, department } = req.body;
  if (!name || !role) {
    return res.status(400).json({ success: false, error: 'Fields name and role are required' });
  }
  const created = { id: records.length + 1, name, role, department: department || 'CSE', cgpa: null };
  records.push(created);
  res.status(201).json({ success: true, apiVersion: 'v2', data: created });
});

// Admin-only delete route
app.delete('/api/v2/users/:id', authenticate, authorize('admin'), (req, res) => {
  const idx = records.findIndex((r) => r.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, error: 'User not found' });
  const [removed] = records.splice(idx, 1);
  res.json({ success: true, deleted: removed });
});

app.listen(PORT, () => {
  console.log(`Unit 2 REST Versioning & RBAC API running on http://localhost:${PORT}`);
});
