const express = require('express');

const app = express();
const PORT = 4004;

// Simple in-memory TTL cache (simulating Redis behavior locally)
class TTLCache {
  constructor(defaultTtlMs = 30000) {
    this.store = new Map();
    this.defaultTtlMs = defaultTtlMs;
    this.hits = 0;
    this.misses = 0;
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) {
      this.misses += 1;
      return null;
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.misses += 1;
      return null;
    }
    this.hits += 1;
    return entry.value;
  }

  set(key, value, ttlMs = this.defaultTtlMs) {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  clear() {
    this.store.clear();
  }

  stats() {
    return { entries: this.store.size, hits: this.hits, misses: this.misses };
  }
}

const cache = new TTLCache(15000);

// Simulated third-party weather API call (with real fetch fallback)
async function fetchExternalWeather(city) {
  const start = Date.now();
  await new Promise((resolve) => setTimeout(resolve, 250)); // Simulated network latency
  return {
    city,
    temperatureC: city.toLowerCase() === 'dehradun' ? 22 : 28,
    condition: 'Clear Sky',
    fetchedAt: new Date().toISOString(),
    upstreamLatencyMs: Date.now() - start
  };
}

app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city.trim();
  const cacheKey = `weather:${city.toLowerCase()}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json({ source: 'cache', ...cached });
  }

  const freshData = await fetchExternalWeather(city);
  cache.set(cacheKey, freshData);
  res.setHeader('X-Cache', 'MISS');
  res.json({ source: 'upstream-api', ...freshData });
});

app.get('/api/cache/stats', (req, res) => {
  res.json(cache.stats());
});

app.delete('/api/cache', (req, res) => {
  cache.clear();
  res.json({ message: 'Cache invalidated' });
});

app.listen(PORT, () => {
  console.log(`Unit 3 Caching & Third-Party API server running on http://localhost:${PORT}`);
});
