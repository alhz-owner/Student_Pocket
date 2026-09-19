const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

const BOT_TOKEN = '8116781152:AAFzQkOE9mv1NTLTvGghKXOv6JHMefsUUV8';
const MINI_APP_URL = 'https://your-domain-or-vercel-link.com';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

bot.onText(/\/start(?:\s+(.+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const referralId = match[1];

    let appUrl = MINI_APP_URL;
    if (referralId) {
        appUrl += `?startapp=${referralId}`;
    }

    bot.sendMessage(chatId, 'Welcome to Student Pocket Mini App!', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open App', web_app: { url: appUrl } }]
            ]
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
