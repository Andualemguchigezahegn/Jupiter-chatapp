const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const PORT = Number(process.env.PORT) || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const roomUsers = new Map();

function sanitizeText(value, maxLength = 500) {
  return String(value || '').trim().slice(0, maxLength);
}

function getRoomUsers(room) {
  const roomMembers = io.sockets.adapter.rooms.get(room)?.members;
  if (!roomMembers) return [];

  const users = [];
  for (const socketId of roomMembers) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket && socket.username) {
      users.push(socket.username);
    }
  }
  return [...new Set(users)];
}

function broadcastRoomUsers(room) {
  io.to(room).emit('user-list', getRoomUsers(room));
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ username, room }) => {
    const safeUsername = sanitizeText(username, 20);
    const safeRoom = sanitizeText(room, 30) || 'general';

    if (!safeUsername) {
      socket.emit('join-error', { message: 'Please enter a valid username.' });
      return;
    }

    if (socket.room) {
      socket.leave(socket.room);
    }

    socket.username = safeUsername;
    socket.room = safeRoom;
    socket.join(safeRoom);

    socket.emit('joined-room', {
      room: safeRoom,
      username: safeUsername,
      message: `You joined #${safeRoom}`
    });

    socket.to(safeRoom).emit('system-message', {
      text: `${safeUsername} joined the room.`
    });

    broadcastRoomUsers(safeRoom);
  });

  socket.on('chat-message', (message) => {
    const room = socket.room;
    const text = sanitizeText(message, 500);

    if (!room || !text) {
      return;
    }

    const payload = {
      username: socket.username || 'Anonymous',
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    io.to(room).emit('chat-message', payload);
  });

  socket.on('typing', ({ isTyping }) => {
    const room = socket.room;
    if (!room) return;

    socket.to(room).emit('typing', {
      username: socket.username || 'Someone',
      isTyping: Boolean(isTyping)
    });
  });

  socket.on('disconnect', () => {
    const room = socket.room;
    const username = socket.username;

    if (room && username) {
      socket.to(room).emit('system-message', {
        text: `${username} left the room.`
      });
      broadcastRoomUsers(room);
    }

    if (room) {
      socket.leave(room);
    }

    console.log('User disconnected:', socket.id);
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Jupiter chat server is running.' });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
