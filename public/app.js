const socket = io();

const authCard = document.getElementById('auth-card');
const chatApp = document.getElementById('chat-app');
const joinForm = document.getElementById('join-form');
const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const roomNameEl = document.getElementById('room-name');
const chatTitleEl = document.getElementById('chat-title');
const userListEl = document.getElementById('user-list');
const messagesEl = document.getElementById('messages');
const typingIndicator = document.getElementById('typing-indicator');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');
const leaveRoomBtn = document.getElementById('leave-room');

let currentUsername = '';
let currentRoom = 'general';
let typingTimeout = null;

function addMessage({ text, username, time, type = 'normal' }) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${type}`;

  if (type === 'system') {
    messageEl.textContent = text;
  } else {
    const header = document.createElement('span');
    header.className = 'message-header';
    header.textContent = `${username} • ${time}`;

    const body = document.createElement('div');
    body.textContent = text;

    messageEl.appendChild(header);
    messageEl.appendChild(body);

    if (username === currentUsername) {
      messageEl.classList.add('me');
    }
  }

  messagesEl.appendChild(messageEl);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function setUserList(users) {
  userListEl.innerHTML = '';

  if (!users || users.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'No users yet';
    userListEl.appendChild(emptyItem);
    return;
  }

  users.forEach((user) => {
    const item = document.createElement('li');
    item.textContent = user;
    userListEl.appendChild(item);
  });
}

function showChatRoom(room) {
  currentRoom = room;
  roomNameEl.textContent = `#${room}`;
  chatTitleEl.textContent = `${room} room`;
  authCard.classList.add('hidden');
  chatApp.classList.remove('hidden');
}

function resetChatApp() {
  currentUsername = '';
  currentRoom = 'general';
  chatApp.classList.add('hidden');
  authCard.classList.remove('hidden');
  usernameInput.value = '';
  roomInput.value = 'general';
  usernameInput.focus();
  messagesEl.innerHTML = '';
  setUserList([]);
  typingIndicator.classList.add('hidden');
  typingIndicator.textContent = 'Someone is typing...';
}

joinForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const room = roomInput.value.trim() || 'general';

  if (!username) {
    usernameInput.focus();
    return;
  }

  currentUsername = username;
  socket.emit('join-room', { username, room });
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = messageInput.value.trim();
  if (!text || !currentUsername) return;

  socket.emit('chat-message', text);
  messageInput.value = '';
  typingIndicator.classList.add('hidden');
});

messageInput.addEventListener('input', () => {
  if (!currentRoom) return;
  const isTyping = messageInput.value.trim().length > 0;
  socket.emit('typing', { isTyping });

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit('typing', { isTyping: false });
  }, 700);
});

leaveRoomBtn.addEventListener('click', () => {
  socket.emit('leave-room', { room: currentRoom });
  resetChatApp();
});

socket.on('join-error', ({ message }) => {
  alert(message);
});

socket.on('joined-room', ({ room, username, message }) => {
  currentUsername = username;
  showChatRoom(room);
  addMessage({
    text: message,
    type: 'system'
  });
});

socket.on('system-message', ({ text }) => {
  addMessage({ text, type: 'system' });
});

socket.on('chat-message', ({ username, text, time }) => {
  addMessage({ text, username, time });
});

socket.on('user-list', (users) => {
  setUserList(users);
});

socket.on('typing', ({ username, isTyping }) => {
  if (!isTyping) {
    typingIndicator.classList.add('hidden');
    typingIndicator.textContent = 'Someone is typing...';
    return;
  }

  typingIndicator.textContent = `${username} is typing...`;
  typingIndicator.classList.remove('hidden');
});

window.addEventListener('beforeunload', () => {
  if (currentRoom) {
    socket.emit('leave-room', { room: currentRoom });
  }
});

setUserList([]);
