const express = require('express');

const app = express();
const PORT = process.env.PORT || 4005;

const metrics = {
  totalRequests: 0,
  totalErrors: 0,
  totalLatencyMs: 0,
  startedAt: new Date().toISOString()
};

// Request timing and telemetry middleware
app.use((req, res, next) => {
  const start = performance.now();
  metrics.totalRequests += 1;
  res.on('finish', () => {
    metrics.totalLatencyMs += performance.now() - start;
    if (res.statusCode >= 500) metrics.totalErrors += 1;
  });
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptimeSec: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get('/metrics', (req, res) => {
  const mem = process.memoryUsage();
  const avgLatencyMs = metrics.totalRequests
    ? Number((metrics.totalLatencyMs / metrics.totalRequests).toFixed(3))
    : 0;

  res.json({
    uptimeSec: Math.floor(process.uptime()),
    totalRequests: metrics.totalRequests,
    totalErrors: metrics.totalErrors,
    avgLatencyMs,
    memoryMB: {
      rss: Number((mem.rss / 1024 / 1024).toFixed(2)),
      heapUsed: Number((mem.heapUsed / 1024 / 1024).toFixed(2))
    }
  });
});

app.get('/api/status', (req, res) => {
  res.json({ service: 'unit4-backend', version: '1.0.0', environment: process.env.NODE_ENV || 'development' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Unit 4 service running on http://localhost:${PORT}`);
  });
}

module.exports = app;
