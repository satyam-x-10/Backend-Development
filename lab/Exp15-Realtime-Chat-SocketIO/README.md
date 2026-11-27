# Exp 15 – Real-time Chat with Socket.IO

## Summary
A functional group chat application demonstrating full-duplex, event-driven communication using Socket.IO and Express. The project covers client connection lifecycles, real-time message broadcasting, room-less public discussions, and active user presence tracking.

## Technical Concepts
| Concept | Implementation Details |
|---|---|
| WebSocket Connection | Managed through `io.on('connection', socket => ...)` |
| Broadcast to All | Emitted using `io.emit('message', payload)` |
| Broadcast to Others | Emitted using `socket.broadcast.emit(...)` |
| Client State | Tracked via an in-memory `users` dictionary indexed by `socket.id` |
| Disconnect Cleanup | Triggered on socket disconnection to notify peers and update the user list |

## Directory Structure
```
Exp15-Realtime-Chat-SocketIO/
├── server.js           # Express and Socket.IO server implementation
├── package.json        # Dependencies
└── public/
    └── index.html      # Responsive chat interface with Socket.IO client library
```

## How to Run
```bash
cd Exp15-Realtime-Chat-SocketIO
npm install
npm run dev
```
Open **http://localhost:3015** in two or more browser windows to test real-time chat communication.

## output preview 
<img width="1705" height="1010" alt="Screenshot 2026-11-27 232734" src="https://github.com/user-attachments/assets/e7114430-c17f-493e-92af-5f9c59a3e89e" />
<img width="1707" height="993" alt="Screenshot 2026-11-27 232751" src="https://github.com/user-attachments/assets/8e8a9455-10d3-4897-96a7-6035a42fccbc" />
<img width="1677" height="1003" alt="Screenshot 2026-11-27 232838" src="https://github.com/user-attachments/assets/3e18387d-f556-4070-8488-13c82ce716da" />




