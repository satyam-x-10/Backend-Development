# Exp 09, 10 & 11 – Security, Rate Limiting and Deployment

This project brings together three production-oriented backend concepts into a single Express application.

## Summary

| Experiment | Area | Implementation |
|---|---|---|
| **Exp 09** | Configuration and Security | Environment loading via dotenv, Helmet security headers, CORS origin filtering |
| **Exp 10** | Traffic Management | Request rate limiting with express-rate-limit (global and auth tiers) |
| **Exp 11** | Containerized Deployment | Production Dockerfile, Docker Compose multi-container setup, `/health` endpoint |

## Directory Structure
```
Exp09-11-Security-RateLimit-Deploy/
├── server.js           # Express application with security and rate-limiting rules
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variable template
├── Dockerfile          # Multi-stage production container image definition
└── docker-compose.yml  # Compose file managing the API and MongoDB services
```

## Running Locally
```bash
cd Exp09-11-Security-RateLimit-Deploy
cp .env.example .env
npm install
npm run dev
```
The server will run on **http://localhost:3009**.

## Running via Docker
```bash
# Build images and start all containers
docker compose up --build

# Stop active containers
docker compose down
```
## Output Preview
## VIA DOCKER 
<img width="1471" height="215" alt="Screenshot 2026-11-27 225429" src="https://github.com/user-attachments/assets/6c939e62-3fe6-4e01-874e-5c01421a0dbe" />
## exp 9 
<img width="1677" height="841" alt="Screenshot 2026-11-27 225415" src="https://github.com/user-attachments/assets/35eec4f3-12b7-4ae8-a5c9-2185216ee2e2" />
<img width="886" height="982" alt="Screenshot 2026-11-27 224935" src="https://github.com/user-attachments/assets/caffc874-7768-40fc-b56f-54a87186a83c" />

## exp 10
<img width="1517" height="973" alt="Screenshot 2026-11-27 231525" src="https://github.com/user-attachments/assets/c4132f99-96c5-41c3-a083-0e723a038fa5" />
<img width="1742" height="990" alt="Screenshot 2026-11-27 231539" src="https://github.com/user-attachments/assets/ee170873-db95-496c-8943-db2520ef886e" />
<img width="1592" height="965" alt="Screenshot 2026-11-27 231553" src="https://github.com/user-attachments/assets/f4615a9d-697d-4c39-b096-74efcda495a1" />

## exp 11
<img width="1207" height="802" alt="Screenshot 2026-11-27 230522" src="https://github.com/user-attachments/assets/1070d952-6024-498e-9870-8d6ca43718ae" />
<img width="1462" height="825" alt="Screenshot 2026-11-27 231844" src="https://github.com/user-attachments/assets/298b20f7-88c4-4d14-8a44-4f7bf477c87d" />
<img width="1347" height="945" alt="Screenshot 2026-11-27 231953" src="https://github.com/user-attachments/assets/f0f10ea5-b6f1-4e7d-bb56-ab2877ec66ce" />







## Route Endpoints
| Method | Route | Description |
|---|---|---|
| GET | `/` | Service overview and configured feature set |
| GET | `/health` | Health check endpoint returning uptime and environment status |
| GET | `/headers` | Returns active response headers applied by Helmet |
| POST | `/auth/login` | Rate-limited login route (maximum 5 attempts per 15 minutes) |
