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
  { userId: 2, department: 'RRHH', assigned: 1000.0, used: 250.0, lastUpdated: '2025-03-28' },
];

const budgetsTransactions = [
  { userId: 2, operation: 500.0, date: '2024-11-22T19:42:52', by: 'ACME Corp.', for: 'YOU' },
  { userId: 2, operation: -80.0, date: '2024-11-25T09:12:18', by: 'YOU', for: 'Taller Mecánico Rápido' },
  { userId: 2, operation: 300.0, date: '2024-11-29T10:15:22', by: 'Secure Contact', for: 'YOU' },
  { userId: 2, operation: 200.0, date: '2024-12-05T08:30:45', by: 'ACME Corp.', for: 'YOU' },
  { userId: 2, operation: -65.0, date: '2024-12-18T16:30:45', by: 'YOU', for: 'Hospital Central' },
  { userId: 2, operation: 150.0, date: '2025-01-15T14:20:10', by: 'Secure Contact', for: 'YOU' },
  { userId: 2, operation: -45.0, date: '2025-01-22T13:15:22', by: 'YOU', for: 'Farmacia Salud' },
  { userId: 2, operation: 100.0, date: '2025-02-22T11:45:33', by: 'ACME Corp.', for: 'YOU' },
  { userId: 2, operation: -35.0, date: '2025-02-28T10:45:10', by: 'YOU', for: 'Constructora Progreso' },
  { userId: 2, operation: -25.0, date: '2025-03-28T12:20:30', by: 'YOU', for: 'Taller Eléctrico Automotriz' },
];

const securityContacts = [
  { userId: 1, contacts: [{ name: 'Mamá', phone: '+584141234567' }, { name: 'Jose', phone: '+584141234567' }, { name: 'Pedro', phone: '+584141234567' }] },
];

// --- Routes --- //

// Auth
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
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
  var budget = budgets.find(b => b.userId === parseInt(req.params.userId));
  if (!budget) return res.status(404).json({ message: 'Sin presupuesto asignado' });
  const history = budgetsTransactions
  .filter(t => t.userId === parseInt(req.params.userId))
  .map(t => ({
    ...t, // Spread operator para copiar todas las propiedades
    date: new Date(t.date).toLocaleString('es-VE', { 
      timeZone: 'America/Caracas' 
    })
  }));
  res.json({
    ...budget,
    history
  });
});

// --- Run Server --- //
app.listen(PORT, () => {
  console.log(`🚗 DriveOn mock API running at http://localhost:${PORT}`);
});

