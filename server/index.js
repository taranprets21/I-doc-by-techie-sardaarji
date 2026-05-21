import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const AUTH_TOKEN = 'demo-token';
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password',
    name: 'Techie Sardaarji'
  }
];

const reports = [];

const createDiagnosticReport = ({ imei, brand, model, type }) => {
  const score = 92 + Math.floor(Math.random() * 7);
  return {
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    imei,
    brand,
    model,
    type,
    score,
    status: score > 90 ? 'Passed' : 'Attention required',
    nonOriginalParts: Math.random() > 0.7 ? 'Detected' : 'Not detected',
    batteryHealth: `${86 + Math.floor(Math.random() * 12)}%`,
    processorTest: 'Passed',
    cameraTest: 'Passed',
    screenTest: 'Passed',
    connectivityTest: 'Passed',
    reportDate: new Date().toISOString(),
    inspector: 'I-doc Automated Diagnostics'
  };
};

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((item) => item.username === username && item.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  return res.json({ token: AUTH_TOKEN, user: { id: user.id, name: user.name, username: user.username } });
});

app.get('/auth/profile', (req, res) => {
  const auth = req.header('authorization');
  if (auth !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = users[0];
  return res.json({ user: { id: user.id, name: user.name, username: user.username } });
});

app.get('/devices', (req, res) => {
  return res.json({
    devices: [
      { id: 1, type: 'Smartphone', brand: 'Apple', model: 'iPhone 14', platform: 'iOS' },
      { id: 2, type: 'Smartphone', brand: 'Samsung', model: 'Galaxy S23', platform: 'Android' },
      { id: 3, type: 'Tablet', brand: 'Apple', model: 'iPad Air', platform: 'iOS' },
      { id: 4, type: 'Wearable', brand: 'Apple', model: 'Apple Watch Ultra', platform: 'watchOS' }
    ]
  });
});

app.post('/devices/diagnose', (req, res) => {
  const { imei, brand, model, type } = req.body;

  if (!imei || !brand || !model || !type) {
    return res.status(400).json({ message: 'Device type, brand, model, and IMEI are required.' });
  }

  const report = createDiagnosticReport({ imei, brand, model, type });
  reports.unshift(report);

  return res.json({ report });
});

app.get('/reports', (req, res) => {
  return res.json({ reports });
});

app.get('/reports/:id', (req, res) => {
  const report = reports.find((entry) => entry.id === req.params.id);
  if (!report) {
    return res.status(404).json({ message: 'Report not found.' });
  }
  return res.json({ report });
});

app.listen(4000, () => {
  console.log('I-doc API listening on http://localhost:4000');
});
