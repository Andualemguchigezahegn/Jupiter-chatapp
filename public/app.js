const socket = io();

const messagesEl = document.getElementById('messages');
const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message');
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('join-btn');
const userListEl = document.getElementById('user-list');

let username = '';

function addMessage({ text, username: sender, time, type = 'normal' }) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${type}`;

  if (type === 'system') {
    messageEl.textContent = text;
  } else {
    messageEl.innerHTML = `
      <span class="meta">${sender} • ${time}</span>
      <span>${text}</span>
    `;
    if (sender === username) {
      messageEl.classList.add('mine');
    }
  }

  messagesEl.appendChild(messageEl);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function setUserList(users) {
  userListEl.innerHTML = '';
  users.forEach((user) => {
    const item = document.createElement('li');
    item.textContent = user;
    userListEl.appendChild(item);
  });
}

joinBtn.addEventListener('click', () => {
  const nextUser = usernameInput.value.trim();
  if (!nextUser) {
    usernameInput.focus();
    return;
  }

  username = nextUser;
  socket.emit('join', { username });
  usernameInput.disabled = true;
  joinBtn.disabled = true;
  messageInput.focus();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = messageInput.value.trim();
  if (!text) {
    return;
  }

  if (!username) {
    const enteredName = usernameInput.value.trim();
    if (!enteredName) {
      usernameInput.focus();
      return;
    }

    username = enteredName;
    socket.emit('join', { username });
    usernameInput.disabled = true;
    joinBtn.disabled = true;
  }

  socket.emit('chat-message', text);
  messageInput.value = '';
  messageInput.focus();
});

socket.on('welcome-message', ({ text }) => {
  addMessage({ text, type: 'system' });
});

socket.on('system-message', ({ text }) => {
  addMessage({ text, type: 'system' });
});

socket.on('chat-message', ({ username: sender, text, time }) => {
  addMessage({ text, username: sender, time });
});

socket.on('user-list', (users) => {
  setUserList(users);
});
