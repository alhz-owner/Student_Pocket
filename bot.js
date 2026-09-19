const TelegramBot = require('node-telegram-bot-api').default || require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// ==========================================
// ১. আপনার Bot Token
// ==========================================
const BOT_TOKEN = '8116781152:AAFzQkOE9mv1NTLToGghKX0v6JHMefsVUV8';

// ==========================================
// ২. আপনার Mini App-এর Web URL (Render Link)
// ==========================================
const MINI_APP_URL = 'https://your-domain-or-vercel-link.com';

// বট ইনিশিয়ালাইজেশন
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// এক্সপ্রেস সার্ভার
const app = express();
const PORT = process.env.PORT || 3000;

// Static HTML File Serve করা (সঠিক লাইন)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// বটের কমান্ড ও লজিক
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
