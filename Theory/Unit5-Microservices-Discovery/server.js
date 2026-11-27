const express = require('express');
const EventEmitter = require('events');

const app = express();
app.use(express.json());
const PORT = 4006;

// In-memory Service Registry & Async Event Bus
const serviceRegistry = new Map();
const eventBus = new EventEmitter();
const eventLog = [];

// Async subscriber (Notification Microservice)
eventBus.on('order.created', (order) => {
  const entry = `[Async Event] Notification sent to ${order.student} for ${order.item} (Order #${order.orderId})`;
  eventLog.push(entry);
  console.log(entry);
});

// 1. Service Discovery Registration & Heartbeat
app.post('/registry/register', (req, res) => {
  const { name, url } = req.body;
  if (!name || !url) return res.status(400).json({ error: 'name and url are required' });
  serviceRegistry.set(name, { name, url, status: 'UP', lastHeartbeat: new Date().toISOString() });
  res.status(201).json({ message: 'Service registered', service: serviceRegistry.get(name) });
});

app.get('/registry/discover/:name', (req, res) => {
  const svc = serviceRegistry.get(req.params.name);
  if (!svc) return res.status(404).json({ error: `Service '${req.params.name}' not found` });
  res.json(svc);
});

app.get('/registry/services', (req, res) => {
  res.json(Array.from(serviceRegistry.values()));
});

// 2. Synchronous REST + Asynchronous Messaging Order Flow
app.post('/orders', (req, res) => {
  const { student, item } = req.body;
  const userService = serviceRegistry.get('user-service');
  if (!userService) {
    return res.status(503).json({ error: 'Service Discovery failed: user-service unavailable' });
  }

  const order = {
    orderId: Math.floor(1000 + Math.random() * 9000),
    student: student || 'Satyam Koranga',
    item: item || 'Cloud Textbook',
    verifiedVia: userService.url,
    createdAt: new Date().toISOString()
  };

  // Emit asynchronous event for decoupled consumers
  eventBus.emit('order.created', order);

  res.status(201).json({ order, asyncEventsCount: eventLog.length });
});

app.get('/events', (req, res) => res.json({ events: eventLog }));

// Pre-register default services on startup
serviceRegistry.set('user-service', { name: 'user-service', url: 'http://localhost:4101', status: 'UP', lastHeartbeat: new Date().toISOString() });
serviceRegistry.set('order-service', { name: 'order-service', url: 'http://localhost:4102', status: 'UP', lastHeartbeat: new Date().toISOString() });

app.listen(PORT, () => {
  console.log(`Unit 5 Microservices & Service Discovery running on http://localhost:${PORT}`);
});
