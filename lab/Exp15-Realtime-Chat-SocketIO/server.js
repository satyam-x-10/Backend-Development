// Exp15 – Advanced Feature: Real-time Chat using Socket.IO
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);
const PORT   = 3015;

// Track connected users
const users = {};

// Serve static HTML chat page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Socket.IO Events ─────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] New connection: ${socket.id}`);

  // User joins with a username
  socket.on('join', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('system', `${username} joined the chat`);
    io.emit('userList', Object.values(users));
    console.log(`User "${username}" joined`);
  });

  // User sends a message
  socket.on('message', (msg) => {
    const username = users[socket.id] || 'Anonymous';
    const payload = { username, message: msg, time: new Date().toLocaleTimeString() };
    io.emit('message', payload);  // broadcast to ALL clients
    console.log(`[${payload.time}] ${username}: ${msg}`);
  });

  // User disconnects
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
      socket.broadcast.emit('system', `${username} left the chat`);
      io.emit('userList', Object.values(users));
      console.log(`[-] "${username}" disconnected`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Exp15-Chat running at http://localhost:${PORT}`);
  console.log('Open two browser tabs to test real-time messaging!');
});
