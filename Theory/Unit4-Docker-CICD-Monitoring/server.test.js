const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('./server');

function request(server, path) {
  return new Promise((resolve, reject) => {
    const port = server.address().port;
    http.get(`http://127.0.0.1:${port}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    }).on('error', reject);
  });
}

test('GET /health returns 200 and healthy status', async () => {
  const server = app.listen(0);
  try {
    const res = await request(server, '/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'healthy');
  } finally {
    server.close();
  }
});

test('GET /metrics exposes telemetry counters', async () => {
  const server = app.listen(0);
  try {
    await request(server, '/api/status');
    const res = await request(server, '/metrics');
    assert.equal(res.status, 200);
    assert.ok(res.body.totalRequests >= 1);
    assert.ok(res.body.memoryMB.rss > 0);
  } finally {
    server.close();
  }
});
