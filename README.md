# Jupiter Chat App

A simple real-time online chat application built with Node.js, Express, and Socket.IO.

## Features
- Real-time messaging between all connected users
- Live online user list
- Simple and responsive chat UI
- Works in the browser without a database

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm start
   ```

3. Open in your browser:
   ```bash
   http://localhost:3000
   ```

## Development mode

```bash
npm run dev
```

## Project structure

- `server.js` – Node server and Socket.IO event handling
- `public/index.html` – Chat page layout
- `public/styles.css` – Styling
- `public/app.js` – Client-side chat logic

## Notes
This is a lightweight chat app for local development and learning. For production, you would usually add authentication, persistence, rooms, and a database.
