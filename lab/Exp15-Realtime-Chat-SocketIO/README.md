# Exp 15 – Real-time Chat with Socket.IO

## Summary
A fully functional **real-time group chat application** using `socket.io` and Express. Demonstrates WebSocket-based bidirectional communication, user sessions, online user list, system notifications (join/leave), and a styled dark-themed chat UI.

## Concepts Covered
| Concept | Implementation |
|---|---|
| WebSocket via Socket.IO | `io.on('connection', ...)` |
| Broadcast to all clients | `io.emit('message', payload)` |
| Broadcast except sender | `socket.broadcast.emit(...)` |
| Room-less group chat | All sockets share one namespace |
| Online user tracking | `users` object keyed by `socket.id` |
| Disconnect cleanup | `socket.on('disconnect', ...)` |

## Files
```
Exp15-Realtime-Chat-SocketIO/
├── server.js           ← Socket.IO + Express server
├── package.json
└── public/
    └── index.html      ← Full chat UI (HTML + CSS + Socket.IO client)
```

## How to Run
```bash
cd Exp15-Realtime-Chat-SocketIO
npm install
npm run dev
```
Open **http://localhost:3015** in **two or more browser tabs** to see real-time messaging!

## How Socket.IO Works
```
Client A                Server               Client B
   |──── join("Satyam") ──►|                     |
   |                       |──── system msg ─────►|
   |──── message("Hello") ─►|                     |
   |                       |──── message ─────────►|
   |◄──────────────────────|──── message           |
```
