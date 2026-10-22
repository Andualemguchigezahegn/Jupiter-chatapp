const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const users = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join', ({ username }) => {
    if (!username || !username.trim()) {
      return;
    }

    const cleanName = username.trim();
    users.set(socket.id, cleanName);
    socket.username = cleanName;

    socket.broadcast.emit('system-message', {
      text: `${cleanName} joined the chat.`
    });

    socket.emit('welcome-message', {
      text: `Welcome, ${cleanName}! You are now connected.`
    });

    io.emit('user-list', [...new Set([...users.values()])]);
  });

  socket.on('chat-message', (message) => {
    const username = users.get(socket.id) || 'Anonymous';
    const cleanMessage = (message || '').trim();

    if (!cleanMessage) {
      return;
    }

    io.emit('chat-message', {
      username,
      text: cleanMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    });
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    if (username) {
      socket.broadcast.emit('system-message', {
        text: `${username} left the chat.`
      });
      users.delete(socket.id);
      io.emit('user-list', [...new Set([...users.values()])]);
    }
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Chat server is running.' });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
