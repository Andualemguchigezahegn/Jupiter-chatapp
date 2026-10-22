# Jupiter Chat App

A modern real-time online chat application built with Node.js, Express, and Socket.IO.

## Features
- Real-time messaging in shared rooms
- Login screen with username and room selection
- Live online user list
- Typing indicator
- Message timestamps
- Modern glassmorphism-inspired interface

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

## Deploying to a hosting service

GitHub Pages is not suitable for a live Socket.IO chat backend because it only serves static files. For a real-time chat app, deploy the Express server to a Node hosting provider such as Render or Railway.

### Example: Render

1. Push this repo to GitHub.
2. In Render, create a new Web Service and connect the repository.
3. Set the build command:
   ```bash
   npm install
   ```
4. Set the start command:
   ```bash
   npm start
   ```
5. Render will expose the app publicly with a live URL.

### Example: Railway

1. Create a new project and connect the repo.
2. Use the default Node build/start settings.
3. Deploy and use the generated public URL.

## Project structure

- `server.js` – Express and Socket.IO server
- `public/index.html` – login and chat layout
- `public/styles.css` – design and responsive styling
- `public/app.js` – client-side chat logic

## Notes
This is a lightweight chat app designed for learning and small-team communication. For production, you would usually add authentication, persistent message storage, moderation, and room management.
