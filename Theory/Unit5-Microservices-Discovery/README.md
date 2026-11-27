# Unit 5: Microservices Communication and Service Discovery

This module implements Unit 5 distributed architecture patterns (Lectures L49 and L52), demonstrating a dynamic service registry alongside synchronous REST lookups and asynchronous event-driven messaging.

- [Open Live Microservices Topology Demo](demo.html)
- [View Source Code on Webpage](demo.html#source)
- [Back to Theory Index](../)

---

## Architecture Overview

1. **Service Registry:** Tracks active microservice names, instance URLs, and heartbeat timestamps.
2. **Synchronous REST Verification:** `POST /orders` queries the registry for `user-service` before accepting the request, returning HTTP 503 if unavailable.
3. **Asynchronous Event Bus:** Emits an `order.created` event that downstream listeners process independently without blocking the HTTP response.

---

## Running Locally

```bash
cd Theory/Unit5-Microservices-Discovery
npm install
node server.js
```

The service listens on port `4006`.
