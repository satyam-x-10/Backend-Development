# Unit 4: Containerization, CI/CD Testing and Health Monitoring

This module implements Unit 4 DevOps and deployment practices (Lectures L37 to L45), featuring telemetry endpoints, automated Node.js integration tests, a Docker container specification with health checks, and a GitHub Actions CI workflow.

- [Open Live DevOps & Monitoring Demo](demo.html)
- [View Dockerfile and CI YAML on Webpage](demo.html#source)
- [Back to Theory Index](../)

---

## Included Artifacts

| File | Purpose |
|---|---|
| `server.js` | Express application exposing `/health`, `/metrics`, and `/api/status` |
| `server.test.js` | Automated HTTP assertion tests using `node:test` and `node:assert` |
| `Dockerfile` | Lightweight Alpine Linux image with built-in `HEALTHCHECK` |
| `ci-workflow.yml` | GitHub Actions pipeline automating testing and container builds |

---

## Running Tests and Container Locally

```bash
cd Theory/Unit4-Docker-CICD-Monitoring
npm install
npm test
node server.js
```
