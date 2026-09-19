// =====================================================
// STUDENT POCKET - TELEGRAM BOT
// CommonJS Version - Render Ready
// =====================================================

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// =====================================================
// CONFIGURATION
// =====================================================

// এখানে তোমার নতুন BotFather Token বসাও
const BOT_TOKEN = '8116781152:AAHScZRfT3jhd85ZWIu2Ir8FBlPvDhqXgTo';

// এখানে তোমার deployed Mini App URL বসাও
const MINI_APP_URL = 'https://your-mini-app-url.com';

// =====================================================
// VALIDATION
// =====================================================

if (
    !BOT_TOKEN ||
    BOT_TOKEN === 'PASTE_YOUR_NEW_BOT_TOKEN_HERE'
) {
    console.error('❌ BOT_TOKEN is not configured.');
    process.exit(1);
}

if (
    !MINI_APP_URL ||
    MINI_APP_URL === 'https://your-mini-app-url.com'
) {
    console.error('❌ MINI_APP_URL is not configured.');
    process.exit(1);
}

// =====================================================
// EXPRESS SERVER
// =====================================================

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve Mini App
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

// Home Route
app.get('/', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'public',
            'index.html'
        )
    );
});

// =====================================================
// TELEGRAM BOT
// =====================================================

const bot = new TelegramBot(
    BOT_TOKEN,
    {
        polling: true
    }
);

// =====================================================
// /START
// =====================================================

bot.onText(
    /^\/start(?:\s+(.+))?$/,
    async (msg, match) => {

        try {

            const chatId = msg.chat.id;

            // Referral ID
            const referralId =
                match &&
                match[1]
                    ? match[1].trim()
                    : null;

            // Mini App URL
            let appUrl = MINI_APP_URL;

            // Add referral information
            if (referralId) {

                const separator =
                    appUrl.includes('?')
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

            await bot.sendMessage(
                chatId,
                welcomeMessage,
                {
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
                }
            );

        } catch (error) {

            console.error(
                '❌ /start error:',
                error
            );

        }

    }
);

// =====================================================
// /HELP
// =====================================================

bot.onText(
    /^\/help$/,
    async (msg) => {

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
                '❌ /help error:',
                error
            );

        }

    }
);

// =====================================================
// TELEGRAM POLLING ERROR
// =====================================================

bot.on(
    'polling_error',
    (error) => {

        console.error(
            '❌ Telegram polling error:',
            error.message
        );

    }
);

// =====================================================
// START EXPRESS SERVER
// =====================================================

app.listen(
    PORT,
    () => {

        console.log(
            `✅ Server running on port ${PORT}`
        );

        console.log(
            `🤖 Student Pocket Telegram Bot is running`
        );

        console.log(
            `🚀 Mini App URL: ${MINI_APP_URL}`
        );

    }
);Message(
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
