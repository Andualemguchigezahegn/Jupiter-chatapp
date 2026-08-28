<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🪐 Jupiter Chat</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"></script>

    <!-- Emoji Picker -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/emoji-picker-element@1.18.0/index.css" />
    <script type="module">
        import 'https://cdn.jsdelivr.net/npm/emoji-picker-element@1.18.0/index.js';
    </script>

    <style>
        /* ============================================================
           ALL STYLES (Combined from all CSS files)
           ============================================================ */

        /* ---------- Global Styles ---------- */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #0a0a0f;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image:
                radial-gradient(ellipse at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 50%, rgba(236, 72, 153, 0.10) 0%, transparent 60%),
                radial-gradient(ellipse at 50% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
        }

        ::-webkit-scrollbar {
            width: 4px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #4f46e5, #7c3aed);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #6366f1, #8b5cf6);
        }

        /* ---------- App Styles ---------- */
        .app {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .chat-container {
            width: 480px;
            max-width: 100%;
            height: 780px;
            max-height: 95vh;
            border-radius: 32px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
            background: rgba(16, 16, 28, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow:
                0 30px 80px rgba(0, 0, 0, 0.8),
                0 0 0 1px rgba(79, 70, 229, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .glass {
            background: rgba(16, 16, 28, 0.75);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }

        /* ---------- Loading Screen ---------- */
        .loading-screen {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #0a0a0f;
        }

        .loader {
            position: relative;
            width: 120px;
            height: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .loader-ring {
            position: absolute;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #4f46e5;
            animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        .loader-ring:nth-child(2) {
            width: 90px;
            height: 90px;
            border-top-color: #7c3aed;
            animation-delay: 0.2s;
        }
        .loader-ring:nth-child(3) {
            width: 60px;
            height: 60px;
            border-top-color: #ec4899;
            animation-delay: 0.4s;
        }

        .loader-text {
            position: absolute;
            color: #e5e7eb;
            font-weight: 700;
            font-size: 18px;
            letter-spacing: 2px;
            background: linear-gradient(135deg, #4f46e5, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes pulse {
            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.6;
                transform: scale(0.95);
            }
        }

        /* ---------- Login Styles ---------- */
        .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            background-image:
                radial-gradient(ellipse at 20% 50%, rgba(79, 70, 229, 0.2) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 60%);
        }

        .login-card {
            width: 440px;
            max-width: 100%;
            padding: 48px 40px;
            border-radius: 32px;
            background: rgba(16, 16, 28, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
        }

        .login-header {
            text-align: center;
            margin-bottom: 32px;
        }

        .login-icon {
            font-size: 56px;
            margin-bottom: 12px;
            display: inline-block;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%,
            100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        .login-title {
            font-size: 36px;
            font-weight: 800;
            background: linear-gradient(135deg, #818cf8, #7c3aed, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 6px;
        }

        .login-subtitle {
            color: #6b7280;
            font-size: 14px;
            font-weight: 400;
        }

        .login-features {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-bottom: 32px;
            flex-wrap: wrap;
        }

        .feature-badge {
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            background: rgba(79, 70, 229, 0.15);
            color: #818cf8;
            border: 1px solid rgba(79, 70, 229, 0.15);
        }

        .login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .input-label {
            color: #9ca3af;
            font-size: 13px;
            font-weight: 500;
        }

        .login-input {
            padding: 14px 18px;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.04);
            color: #e5e7eb;
            font-size: 16px;
            transition: all 0.3s;
            outline: none;
        }
        .login-input::placeholder {
            color: #4a4a5a;
        }
        .login-input:focus {
            border-color: #4f46e5;
            background: rgba(79, 70, 229, 0.06);
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .login-btn {
            padding: 14px;
            border-radius: 14px;
            border: none;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
        }
        .login-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(79, 70, 229, 0.4);
        }
        .login-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .btn-loader {
            width: 24px;
            height: 24px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        .login-footer {
            text-align: center;
            margin-top: 24px;
        }
        .guest-text {
            color: #4a4a5a;
            font-size: 13px;
        }

        /* ---------- Header Styles ---------- */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: rgba(26, 26, 42, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            flex-shrink: 0;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .avatar-container {
            position: relative;
        }

        .avatar {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid rgba(79, 70, 229, 0.3);
            transition: all 0.3s;
        }
        .avatar:hover {
            border-color: #4f46e5;
            transform: scale(1.05);
        }

        .status-dot {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid #13131a;
        }
        .status-dot.online {
            background: #4ade80;
            box-shadow: 0 0 12px rgba(74, 222, 128, 0.5);
            animation: pulse-dot 2s ease-in-out infinite;
        }
        .status-dot.offline {
            background: #6b7280;
        }

        @keyframes pulse-dot {
            0%,
            100% {
                box-shadow: 0 0 8px rgba(74, 222, 128, 0.3);
            }
            50% {
                box-shadow: 0 0 20px rgba(74, 222, 128, 0.6);
            }
        }

        .user-info {
            display: flex;
            flex-direction: column;
        }

        .username {
            color: #ffffff;
            font-weight: 700;
            font-size: 16px;
            letter-spacing: 0.3px;
        }

        .status-text {
            font-size: 12px;
            font-weight: 500;
        }
        .status-text.online {
            color: #4ade80;
        }
        .status-text.offline {
            color: #6b7280;
        }

        .header-right {
            display: flex;
            gap: 4px;
        }

        .icon-btn {
            background: transparent;
            border: none;
            color: #6b7280;
            font-size: 18px;
            cursor: pointer;
            padding: 8px 10px;
            border-radius: 10px;
            transition: all 0.25s;
            position: relative;
        }
        .icon-btn:hover {
            background: rgba(79, 70, 229, 0.12);
            color: #e5e7eb;
            transform: translateY(-1px);
        }
        .icon-btn:active {
            transform: scale(0.95);
        }

        .logout-btn:hover {
            background: rgba(239, 68, 68, 0.15);
            color: #f87171;
        }

        /* ---------- Chat Window Styles ---------- */
        .chat-window {
            flex: 1;
            overflow-y: auto;
            padding: 20px 20px 12px;
            background: transparent;
        }

        .messages-container {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        /* ---------- Typing Indicator ---------- */
        .typing-container {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 16px;
            background: rgba(26, 26, 42, 0.6);
            border-radius: 16px;
            align-self: flex-start;
            margin-top: 4px;
            border: 1px solid rgba(79, 70, 229, 0.08);
        }

        .typing-text {
            color: #9ca3af;
            font-size: 13px;
            font-weight: 500;
        }

        .typing-dots {
            display: flex;
            gap: 3px;
        }
        .typing-dots span {
            font-size: 20px;
            color: #818cf8;
            animation: type 1.4s infinite both;
        }
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes type {
            0%,
            60%,
            100% {
                opacity: 0.3;
                transform: translateY(0);
            }
            30% {
                opacity: 1;
                transform: translateY(-4px);
            }
        }

        /* ---------- Message Styles ---------- */
        .message-wrapper {
            display: flex;
            align-items: flex-end;
            gap: 10px;
            max-width: 88%;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(12px) scale(0.96);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .message-wrapper.sent {
            align-self: flex-end;
            flex-direction: row-reverse;
        }
        .message-wrapper.received {
            align-self: flex-start;
        }

        .msg-avatar {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
            border: 2px solid rgba(255, 255, 255, 0.04);
        }

        .message-content {
            display: flex;
            flex-direction: column;
            gap: 2px;
            max-width: 100%;
        }

        .msg-sender {
            font-size: 11px;
            color: #6b7280;
            padding-left: 4px;
            font-weight: 500;
        }

        .message-bubble {
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 100%;
            word-wrap: break-word;
            position: relative;
            transition: all 0.2s;
        }

        .message-bubble.sent {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: #ffffff;
            border-bottom-right-radius: 4px;
            box-shadow: 0 4px 16px rgba(79, 70, 229, 0.25);
        }

        .message-bubble.received {
            background: rgba(30, 30, 50, 0.8);
            backdrop-filter: blur(8px);
            color: #e5e7eb;
            border-bottom-left-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .message-text {
            font-size: 15px;
            line-height: 1.5;
            display: block;
        }

        .message-time {
            font-size: 10px;
            opacity: 0.5;
            margin-left: 10px;
            font-weight: 400;
        }

        .delivery-status {
            font-size: 10px;
            margin-left: 4px;
            opacity: 0.7;
            color: #a78bfa;
        }

        /* ---------- Message Input Styles ---------- */
        .message-input-container {
            padding: 12px 16px 16px;
            background: rgba(16, 16, 28, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-top: 1px solid rgba(255, 255, 255, 0.04);
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: relative;
            flex-shrink: 0;
        }

        .input-actions {
            display: flex;
            gap: 2px;
        }

        .action-btn {
            background: transparent;
            border: none;
            color: #4a4a5a;
            font-size: 20px;
            cursor: pointer;
            padding: 6px 10px;
            border-radius: 10px;
            transition: all 0.25s;
        }
        .action-btn:hover {
            background: rgba(79, 70, 229, 0.1);
            color: #e5e7eb;
            transform: translateY(-1px);
        }
        .action-btn.active {
            background: rgba(79, 70, 229, 0.15);
            color: #818cf8;
        }

        .input-wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.04);
            border-radius: 28px;
            padding: 4px 4px 4px 20px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            transition: all 0.3s;
        }
        .input-wrapper:focus-within {
            border-color: rgba(79, 70, 229, 0.3);
            background: rgba(79, 70, 229, 0.04);
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.05);
        }

        .message-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #e5e7eb;
            font-size: 15px;
            padding: 12px 0;
            font-family: 'Inter', sans-serif;
        }
        .message-input::placeholder {
            color: #4a4a5a;
            font-weight: 400;
        }

        .send-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.04);
            color: #4a4a5a;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .send-btn.active {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: #ffffff;
            box-shadow: 0 4px 16px rgba(79, 70, 229, 0.3);
        }
        .send-btn.active:hover {
            transform: scale(1.05) translateY(-2px);
            box-shadow: 0 8px 24px rgba(79, 70, 229, 0.5);
        }
        .send-btn:active {
            transform: scale(0.92);
        }

        .send-btn svg {
            width: 20px;
            height: 20px;
        }

        /* ---------- Emoji Picker ---------- */
        .emoji-picker-wrapper {
            position: absolute;
            bottom: 90px;
            left: 16px;
            right: 16px;
            z-index: 100;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.06);
            max-height: 350px;
        }

        /* ---------- Toast Notification ---------- */
        .toast-container {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
            width: 90%;
            max-width: 420px;
            pointer-events: none;
        }

        .toast {
            padding: 12px 24px;
            border-radius: 12px;
            background: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            color: #e5e7eb;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
            animation: toastIn 0.3s ease-out;
            pointer-events: auto;
            text-align: center;
            width: 100%;
        }

        .toast.success {
            border-color: rgba(74, 222, 128, 0.3);
        }
        .toast.error {
            border-color: rgba(248, 113, 113, 0.3);
        }

        @keyframes toastIn {
            from {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 520px) {
            .app {
                padding: 0;
            }
            .chat-container {
                width: 100%;
                height: 100vh;
                max-height: 100vh;
                border-radius: 0;
                border: none;
            }
            .login-card {
                padding: 32px 24px;
            }
            .emoji-picker-wrapper {
                bottom: 80px;
                left: 8px;
                right: 8px;
                max-height: 280px;
            }
        }

        @media (min-width: 768px) {
            .chat-container {
                width: 520px;
                height: 800px;
            }
        }

        @media (min-width: 1024px) {
            .chat-container {
                width: 580px;
                height: 850px;
            }
        }
    </style>
</head>

<body>
    <div id="root"></div>

    <script>
        // ============================================================
        // FIREBASE CONFIG (YOUR REAL KEYS)
        // ============================================================
        const firebaseConfig = {
            apiKey: "AIzaSyCsy1U6jXTYjJAC62duKkHGrclDRH5r9e8",
            authDomain: "jupiter-chat-cdd11.firebaseapp.com",
            projectId: "jupiter-chat-cdd11",
            storageBucket: "jupiter-chat-cdd11.firebasestorage.app",
            messagingSenderId: "703594234843",
            appId: "1:703594234843:web:0c0b2960dc2a72bfef9dfe"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const auth = firebase.auth();

        // ============================================================
        // TOAST SYSTEM
        // ============================================================
        let toastTimeout;

        function showToast(message, type = 'success') {
            const container = document.getElementById('toast-container') || createToastContainer();
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            container.appendChild(toast);

            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        function createToastContainer() {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
            return container;
        }

        // ============================================================
        // APP STATE
        // ============================================================
        let currentUser = null;
        let messages = [];
        let typingUsers = [];
        let messagesUnsubscribe = null;
        let typingUnsubscribe = null;
        let isLoading = true;

        // ============================================================
        // RENDER FUNCTIONS
        // ============================================================

        function renderApp() {
            if (isLoading) {
                renderLoading();
                return;
            }
            if (!currentUser) {
                renderLogin();
                return;
            }
            renderChat();
        }

        // ---------- Loading ----------
        function renderLoading() {
            document.getElementById('root').innerHTML = `
                <div class="loading-screen">
                    <div class="loader">
                        <div class="loader-ring"></div>
                        <div class="loader-ring"></div>
                        <div class="loader-ring"></div>
                        <span class="loader-text">Jupiter</span>
                    </div>
                </div>
            `;
        }

        // ---------- Login ----------
        function renderLogin() {
            document.getElementById('root').innerHTML = `
                <div class="login-container">
                    <div class="login-card glass">
                        <div class="login-header">
                            <div class="login-icon">🪐</div>
                            <h1 class="login-title">Jupiter</h1>
                            <p class="login-subtitle">Real-time Chat Experience</p>
                        </div>
                        <div class="login-features">
                            <span class="feature-badge">⚡ Real-time</span>
                            <span class="feature-badge">🔒 Encrypted</span>
                            <span class="feature-badge">🌐 Global</span>
                        </div>
                        <form class="login-form" id="login-form">
                            <div class="input-group">
                                <label class="input-label">Enter your name</label>
                                <input
                                    type="text"
                                    placeholder="Your name..."
                                    class="login-input"
                                    id="login-name"
                                    maxlength="20"
                                    autofocus
                                />
                            </div>
                            <button type="submit" class="login-btn" id="login-btn">
                                🚀 Join Chat
                            </button>
                        </form>
                        <div class="login-footer">
                            <span class="guest-text">✨ No account needed • Anonymous</span>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('login-form').addEventListener('submit', handleLogin);
            document.getElementById('login-name').focus();
        }

        // ---------- Chat ----------
        function renderChat() {
            const avatar = currentUser.photoURL || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;

            document.getElementById('root').innerHTML = `
                <div class="app">
                    <div class="chat-container glass">
                        <!-- Header -->
                        <div class="header">
                            <div class="header-left">
                                <div class="avatar-container">
                                    <img src="${avatar}" alt="User" class="avatar" />
                                    <span class="status-dot online"></span>
                                </div>
                                <div class="user-info">
                                    <span class="username">${currentUser.displayName || 'User'}</span>
                                    <span class="status-text online">🟢 Online</span>
                                </div>
                            </div>
                            <div class="header-right">
                                <button class="icon-btn" title="Search">🔍</button>
                                <button class="icon-btn" title="Call">📞</button>
                                <button class="icon-btn" title="Settings">⚙️</button>
                                <button class="icon-btn logout-btn" id="logout-btn" title="Logout">🚪</button>
                            </div>
                        </div>

                        <!-- Chat Window -->
                        <div class="chat-window" id="chat-window">
                            <div class="messages-container" id="messages-container">
                                ${messages.map(msg => renderMessage(msg)).join('')}
                                ${typingUsers.length > 0 ? renderTyping() : ''}
                                <div id="messages-end"></div>
                            </div>
                        </div>

                        <!-- Message Input -->
                        <div class="message-input-container" id="input-container">
                            <div class="input-actions">
                                <button class="action-btn" id="emoji-btn" title="Emoji">😊</button>
                                <button class="action-btn" title="Attach">📎</button>
                                <button class="action-btn" title="Image">📷</button>
                                <button class="action-btn" title="Voice">🎤</button>
                            </div>

                            <div class="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    class="message-input"
                                    id="message-input"
                                    autofocus
                                />
                                <button class="send-btn" id="send-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Setup event listeners
            document.getElementById('send-btn').addEventListener('click', handleSendMessage);
            document.getElementById('message-input').addEventListener('keydown', handleInputKeydown);
            document.getElementById('message-input').addEventListener('input', handleTyping);
            document.getElementById('logout-btn').addEventListener('click', handleLogout);
            document.getElementById('emoji-btn').addEventListener('click', toggleEmojiPicker);

            // Scroll to bottom
            scrollToBottom();

            // Focus input
            document.getElementById('message-input').focus();
        }

        // ---------- Render Single Message ----------
        function renderMessage(msg) {
            const isSent = msg.senderId === currentUser.uid;
            const senderClass = isSent ? 'sent' : 'received';
            const avatar = msg.avatar || 'https://i.pravatar.cc/150?img=12';
            const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                'Just now';
            const senderName = msg.senderName || 'User';

            return `
                <div class="message-wrapper ${senderClass}">
                    ${!isSent ? `<img src="${avatar}" alt="${senderName}" class="msg-avatar" />` : ''}
                    <div class="message-content">
                        ${!isSent ? `<span class="msg-sender">${senderName}</span>` : ''}
                        <div class="message-bubble ${senderClass}">
                            <span class="message-text">${escapeHtml(msg.text)}</span>
                            <span class="message-time">${time}</span>
                            ${isSent ? '<span class="delivery-status">✓✓</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        // ---------- Render Typing Indicator ----------
        function renderTyping() {
            const names = typingUsers.join(', ');
            const isPlural = typingUsers.length > 1;
            return `
                <div class="typing-container">
                    <span class="typing-text">${names} ${isPlural ? 'are' : 'is'} typing</span>
                    <span class="typing-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </span>
                </div>
            `;
        }

        // ============================================================
        // EVENT HANDLERS
        // ============================================================

        // ---------- Login ----------
        async function handleLogin(e) {
            e.preventDefault();
            const nameInput = document.getElementById('login-name');
            const btn = document.getElementById('login-btn');
            const name = nameInput.value.trim();

            if (!name) {
                showToast('Please enter your name', 'error');
                nameInput.focus();
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<span class="btn-loader"></span>';

            try {
                const result = await auth.signInAnonymously();
                await result.user.updateProfile({
                    displayName: name,
                    photoURL: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
                });
                showToast(`Welcome ${name}! 🚀`, 'success');
            } catch (error) {
                showToast('Login failed: ' + error.message, 'error');
                console.error(error);
                btn.disabled = false;
                btn.innerHTML = '🚀 Join Chat';
            }
        }

        // ---------- Logout ----------
        async function handleLogout() {
            try {
                await auth.signOut();
                showToast('Logged out 👋', 'success');
            } catch (error) {
                showToast('Logout failed', 'error');
            }
        }

        // ---------- Send Message ----------
        async function handleSendMessage() {
            const input = document.getElementById('message-input');
            const text = input.value.trim();

            if (!text || !currentUser) {
                if (!text) showToast('Message cannot be empty', 'error');
                return;
            }

            try {
                await db.collection('messages').add({
                    text: text,
                    senderId: currentUser.uid,
                    senderName: currentUser.displayName || 'Anonymous',
                    avatar: currentUser.photoURL || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                input.value = '';
                updateSendButton();
                closeEmojiPicker();
                // Reset typing
                await db.collection('typing').doc(currentUser.uid).set({ isTyping: false, name: currentUser.displayName });
            } catch (error) {
                showToast('Failed to send message', 'error');
                console.error(error);
            }
        }

        // ---------- Input Handlers ----------
        function handleInputKeydown(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        }

        let typingTimeout = null;

        async function handleTyping(e) {
            const value = e.target.value;
            updateSendButton();

            if (!currentUser) return;

            clearTimeout(typingTimeout);
            if (value.length > 0) {
                await db.collection('typing').doc(currentUser.uid).set({
                    isTyping: true,
                    name: currentUser.displayName || 'Anonymous'
                });
            }

            typingTimeout = setTimeout(async () => {
                await db.collection('typing').doc(currentUser.uid).set({
                    isTyping: false,
                    name: currentUser.displayName || 'Anonymous'
                });
            }, 1500);
        }

        function updateSendButton() {
            const input = document.getElementById('message-input');
            const btn = document.getElementById('send-btn');
            if (input && btn) {
                btn.className = `send-btn ${input.value.trim() ? 'active' : ''}`;
            }
        }

        // ---------- Emoji Picker ----------
        let emojiPickerOpen = false;
        let emojiPickerElement = null;

        function toggleEmojiPicker() {
            if (emojiPickerOpen) {
                closeEmojiPicker();
            } else {
                openEmojiPicker();
            }
        }

        function openEmojiPicker() {
            if (emojiPickerOpen) return;
            emojiPickerOpen = true;

            const container = document.getElementById('input-container');
            const wrapper = document.createElement('div');
            wrapper.className = 'emoji-picker-wrapper';
            wrapper.id = 'emoji-picker-wrapper';

            const picker = document.createElement('emoji-picker');
            picker.setAttribute('theme', 'dark');
            wrapper.appendChild(picker);
            container.appendChild(wrapper);

            picker.addEventListener('emoji-click', (event) => {
                const input = document.getElementById('message-input');
                input.value += event.detail.unicode;
                updateSendButton();
                closeEmojiPicker();
                input.focus();
            });

            // Close on outside click
            setTimeout(() => {
                document.addEventListener('click', closeEmojiPickerOnOutside);
            }, 100);

            document.getElementById('emoji-btn').classList.add('active');
        }

        function closeEmojiPicker() {
            const wrapper = document.getElementById('emoji-picker-wrapper');
            if (wrapper) wrapper.remove();
            emojiPickerOpen = false;
            const btn = document.getElementById('emoji-btn');
            if (btn) btn.classList.remove('active');
            document.removeEventListener('click', closeEmojiPickerOnOutside);
        }

        function closeEmojiPickerOnOutside(e) {
            const container = document.getElementById('input-container');
            if (container && !container.contains(e.target)) {
                closeEmojiPicker();
            }
        }

        // ---------- Scroll ----------
        function scrollToBottom() {
            const end = document.getElementById('messages-end');
            if (end) {
                end.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // ---------- Utility ----------
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // ============================================================
        // FIREBASE LISTENERS
        // ============================================================

        // ---------- Auth Listener ----------
        auth.onAuthStateChanged((user) => {
            currentUser = user;
            isLoading = false;

            if (user) {
                // Start listening to messages
                if (messagesUnsubscribe) messagesUnsubscribe();
                messagesUnsubscribe = db.collection('messages')
                    .orderBy('timestamp', 'asc')
                    .onSnapshot((snapshot) => {
                        messages = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                            timestamp: doc.data().timestamp?.toDate?.() || new Date()
                        }));
                        if (document.getElementById('messages-container')) {
                            updateMessages();
                        }
                    });

                // Start listening to typing
                if (typingUnsubscribe) typingUnsubscribe();
                typingUnsubscribe = db.collection('typing')
                    .onSnapshot((snapshot) => {
                        typingUsers = snapshot.docs
                            .filter(doc => doc.data().isTyping && doc.id !== user.uid)
                            .map(doc => doc.data().name || 'Someone');
                        if (document.getElementById('messages-container')) {
                            updateMessages();
                        }
                    });

                showToast(`Welcome ${user.displayName || 'User'}! 🚀`, 'success');
            } else {
                if (messagesUnsubscribe) {
                    messagesUnsubscribe();
                    messagesUnsubscribe = null;
                }
                if (typingUnsubscribe) {
                    typingUnsubscribe();
                    typingUnsubscribe = null;
                }
                messages = [];
                typingUsers = [];
            }

            renderApp();
        });

        // ---------- Update Messages in UI ----------
        function updateMessages() {
            const container = document.getElementById('messages-container');
            if (!container) return;

            const messagesHTML = messages.map(msg => renderMessage(msg)).join('');
            const typingHTML = typingUsers.length > 0 ? renderTyping() : '';

            container.innerHTML = messagesHTML + typingHTML + '<div id="messages-end"></div>';
            scrollToBottom();
        }

        // ============================================================
        // INITIAL RENDER
        // ============================================================

        renderApp();

        // Handle visibility change to re-focus input
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && currentUser) {
                const input = document.getElementById('message-input');
                if (input) setTimeout(() => input.focus(), 100);
            }
        });

        console.log('🪐 Jupiter Chat loaded successfully!');
        console.log('🔥 Firebase connected!');
        console.log('💬 Start chatting!');
    </script>
</body>
</html>
