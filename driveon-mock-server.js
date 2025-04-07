// backend/driveon-mock-server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// --- Mock Data --- //
const users = [
  { id: 1, email: 'user@driveon.com', password: 'password123', name: 'Juan Pérez', type: 'personal' },
  { id: 2, email: 'empresa@driveon.com', password: 'password123', name: 'ACME Corp.', type: 'corporate', department: 'RRHH' },
];

const budgets = [
  { userId: 2, department: 'RRHH', assigned: 1000, used: 250, lastUpdated: '2025-03-28' },
];

const securityContacts = [
  { userId: 1, contacts: [{ name: 'Mamá', phone: '+584141234567' }, { name: 'Jose', phone: '+584141234567' }, { name: 'Pedro', phone: '+584141234567' }] },
];

// --- Routes --- //

// Auth
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt with email: %s', email);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
  res.json({ message: 'Login exitoso', user });
});

// Perfil
app.get('/profile/:userId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

// Contactos de Seguridad
app.get('/security-contacts/:userId', (req, res) => {
  const entry = securityContacts.find(sc => sc.userId === parseInt(req.params.userId));
  res.json(entry ? entry.contacts : []);
});

app.post('/security-contacts/:userId', (req, res) => {
  const { contacts } = req.body;
  const index = securityContacts.findIndex(sc => sc.userId === parseInt(req.params.userId));
  if (index >= 0) securityContacts[index].contacts = contacts;
  else securityContacts.push({ userId: parseInt(req.params.userId), contacts });
  res.json({ message: 'Contactos actualizados' });
});

// Presupuesto
app.get('/budget/:userId', (req, res) => {
  const budget = budgets.find(b => b.userId === parseInt(req.params.userId));
  if (!budget) return res.status(404).json({ message: 'Sin presupuesto asignado' });
  res.json(budget);
});

// --- Run Server --- //
app.listen(PORT, () => {
  console.log(`🚗 DriveOn mock API running at http://localhost:${PORT}`);
});

