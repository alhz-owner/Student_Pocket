// =====================================================
// STUDENT POCKET — TELEGRAM BOT
// =====================================================

import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// =====================================================
// CONFIGURATION
// =====================================================

// 👇 এখানে তোমার NEW BotFather Token বসাও
const BOT_TOKEN = '8116781152:AAHScZRfT3jhd85ZWIu2Ir8FBlPvDhqXgTo';

// 👇 এখানে তোমার deployed Mini App URL বসাও
const MINI_APP_URL = 'https://your-mini-app-url.com';

// =====================================================
// DIRECTORY SETUP
// =====================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================================================
// VALIDATION
// =====================================================

if (!BOT_TOKEN || BOT_TOKEN === 'PASTE_YOUR_NEW_BOT_TOKEN_HERE') {
    console.error('❌ BOT_TOKEN is not configured.');
    process.exit(1);
}

if (!MINI_APP_URL || MINI_APP_URL === 'https://your-mini-app-url.com') {
    console.error('❌ MINI_APP_URL is not configured.');
    process.exit(1);
}

// =====================================================
// TELEGRAM BOT
// =====================================================

const bot = new TelegramBot(BOT_TOKEN, {
    polling: true
});

// =====================================================
// EXPRESS SERVER
// =====================================================

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// =====================================================
// HOME ROUTE
// =====================================================

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});

// =====================================================
// /START COMMAND
// =====================================================
//
// Supports:
//
// /start
// /start REFERRAL_ID
//
// =====================================================

bot.onText(/^\/start(?:\s+(.+))?$/, async (msg, match) => {

    try {

        const chatId = msg.chat.id;

        // Referral ID
        const referralId = match?.[1]?.trim() || null;

        // Mini App URL
        let appUrl = MINI_APP_URL;

        // Add Telegram Mini App referral parameter
        if (referralId) {

            const separator = appUrl.includes('?')
                ? '&'
                : '?';

            appUrl =
                `${appUrl}${separator}startapp=${encodeURIComponent(referralId)}`;
        }

        // =================================================
        // WELCOME MESSAGE
        // =================================================

        let welcomeMessage =
            `👋 Welcome to Student Pocket!\n\n` +
            `🎓 Student Earning Platform\n\n` +
            `এখানে আপনি বিভিন্ন শিক্ষামূলক কার্যক্রমের মাধ্যমে ` +
            `রিওয়ার্ড অর্জন করতে পারবেন।\n\n`;

        // Referral information
        if (referralId) {

            welcomeMessage +=
                `🔗 Referral ID: ${referralId}\n\n`;

        }

        welcomeMessage +=
            `👇 নিচের বাটনে ক্লিক করে Mini App ওপেন করুন।`;

        // =================================================
        // SEND MESSAGE
        // =================================================

        await bot.sendMessage(chatId, welcomeMessage, {

            reply_markup: {

                inline_keyboard: [

                    [
                        {
                            text: '🚀 Open Student Pocket',
                            web_app: {
                                url: appUrl
                            }
                        }
                    ]

                ]

            }

        });

    } catch (error) {

        console.error(
            '❌ /start command error:',
            error
        );

    }

});

// =====================================================
// /HELP COMMAND
// =====================================================

bot.onText(/^\/help$/, async (msg) => {

    try {

        const helpMessage =
            `📚 Student Pocket Help\n\n` +

            `🎯 Available Features:\n\n` +

            `📝 MCQ Quiz\n` +
            `➗ Math Solver\n` +
            `📖 Grammar Solver\n` +
            `👥 Referral System\n` +
            `💰 Earnings\n` +
            `💸 Withdrawal\n` +
            `👤 Profile\n` +
            `🔔 Notifications\n` +
            `🎓 Student Learning Activities\n\n` +

            `🚀 Mini App খুলে আপনার available features ` +
            `ব্যবহার করুন।`;

        await bot.sendMessage(
            msg.chat.id,
            helpMessage
        );

    } catch (error) {

        console.error(
            '❌ /help command error:',
            error
        );

    }

});

// =====================================================
// TELEGRAM POLLING ERROR
// =====================================================

bot.on('polling_error', (error) => {

    console.error(
        '❌ Telegram polling error:',
        error.message
    );

});

// =====================================================
// EXPRESS SERVER
// =====================================================

app.listen(PORT, () => {

    console.log(
        `✅ Server running on port ${PORT}`
    );

    console.log(
        `🤖 Student Pocket Telegram Bot is running`
    );

    console.log(
        `🚀 Mini App: ${MINI_APP_URL}`
    );

});