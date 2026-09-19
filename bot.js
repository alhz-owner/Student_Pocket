const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// ==========================================
// ১. আপনার Bot Token এখানে বসান (BotFather থেকে প্রাপ্ত)
// ==========================================
const BOT_TOKEN = '8116781152:AAFzQkOE9mv1NTLToGghKX0v6JHMefsVUV8';

// ==========================================
// ২. আপনার Mini App-এর Web URL (যেমন: Vercel/Render/Netlify Link)
// যদি লোকালপিসিতে চালান তবে ngrok URL দিতে পারেন
// ==========================================
const MINI_APP_URL = 'https://your-domain-or-vercel-link.com';

// বট ইনিশিয়ালাইজেশন (Polling Mode)
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// এক্সপ্রেস সার্ভার (Mini App Host করার জন্য)
const app = express();
const PORT = process.env.PORT || 3000;

// Static HTML File Serve করা
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==========================================
// বটের কমান্ড ও লজিক (Telegram Bot Commands)
// ==========================================

// /start কমান্ড পাওয়ার পর মেসেজ ও মিনি অ্যাপের বাটন পাঠানো
bot.onText(/\/start(?:\s+(.+))?/, (msg, match) => {
    const chatId = msg.chat.id;
    const referralId = match[1]; // যদি কোনো রেফারেল লিংক দিয়ে জয়েন করে

    let appUrl = MINI_APP_URL;
    if (referralId) {
        appUrl += `?ref=${referralId}`;
    }

    const welcomeMessage = `হ্যালো ${msg.from.first_name}! 👋\n\n🎓 *Student_Pocket*-এ আপনাকে স্বাগতম!\nএখানে আপনি MCQ Quiz, Math & Grammar সলভ করে পয়েন্ট আয় করতে পারবেন।\n\nনিচের অ্যাপ বোতামে ক্লিক করে কাজ শুরু করুন:`;

    bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "🚀 Open Student_Pocket App",
                        web_app: { url: appUrl } // টেলিগ্রামের ভেতরে Mini App ওপেন হবে
                    }
                ],
                [
                    { text: "📢 Telegram Channel", url: "https://t.me/your_channel" },
                    { text: "💬 Support Group", url: "https://t.me/your_support" }
                ]
            ]
        }
    });
});

// /help কমান্ড
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, "যেকোনো সহায়তার জন্য আমাদের সাপোর্ট অ্যাকাউন্টে যোগাযোগ করুন।");
});

// এক্সপ্রেস সার্ভার চালু করা
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Student_Pocket Bot is active and running...');
});
