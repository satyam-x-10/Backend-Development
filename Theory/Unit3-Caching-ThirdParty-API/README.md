# Unit 3: Third-Party API Integration and Caching

This module demonstrates Unit 3 application-layer concepts (Lectures L25, L28, and L31), combining Express routing with an in-memory Cache-Aside layer that stores upstream API responses with a Time-To-Live (TTL) expiration policy.

- [Open Live Interactive Cache Simulator](demo.html)
- [View Source Code on Webpage](demo.html#source)
- [Back to Theory Index](../)

---

## Caching Pattern

1. On receiving `GET /api/weather/:city`, the server checks the in-memory `TTLCache`.
2. If a non-expired entry exists, it returns immediately with `X-Cache: HIT`.
3. Otherwise, it queries the upstream API, caches the payload for 15 seconds, and returns `X-Cache: MISS`.
4. Cache entries can be manually cleared via `DELETE /api/cache`, and metrics are exposed at `GET /api/cache/stats`.

---

## Running Locally

```bash
cd Theory/Unit3-Caching-ThirdParty-API
npm install
node server.js
```

The server listens on port `4004`.
