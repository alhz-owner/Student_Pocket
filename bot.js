// =====================================================
// STUDENT POCKET - TELEGRAM BOT
// CommonJS Version
// =====================================================

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// =====================================================
// CONFIGURATION
// =====================================================

// 👇 এখানে তোমার নতুন BotFather Bot Token বসাও
const BOT_TOKEN = 'PASTE_YOUR_NEW_BOT_TOKEN_HERE';

// 👇 এখানে তোমার deployed Mini App URL বসাও
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
// EXPRESS APP
// =====================================================

const app = express();

const PORT = process.env.PORT || 3000;

// JSON support
app.use(express.json());

// Serve Mini App files
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

// =====================================================
// HOME ROUTE
// =====================================================

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
//
// Normal:
// /start
//
// Referral:
// /start REFERRAL_ID
//
// =====================================================

bot.onText(
    /^\/start(?:\s+(.+))?$/,
    async (msg, match) => {

        try {

            const chatId = msg.chat.id;

            // Get referral ID
            const referralId =
                match &&
                match[1]
                    ? match[1].trim()
                    : null;

            // =================================================
            // MINI APP URL
            // =================================================

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

            let message =
                `👋 Welcome to Student Pocket!\n\n` +

                `🎓 Student Earning Platform\n\n` +

                `এখানে বিভিন্ন শিক্ষামূলক কার্যক্রমের ` +
                `মাধ্যমে রিওয়ার্ড অর্জন করতে পারবেন।\n\n`;

            // Referral information
            if (referralId) {

                message +=
                    `👥 Referral ID: ${referralId}\n\n`;
            }

            message +=
                `👇 নিচের বাটনে ক্লিক করে Mini App ওপেন করুন।`;

            // =================================================
            // SEND WELCOME MESSAGE
            // =================================================

            await bot.sendMessage(
                chatId,
                message,
                {

                    reply_markup: {

                        inline_keyboard: [

                            [
                                {
                                    text:
                                        '🚀 Open Student Pocket',

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
                `🎓 Student Activities\n\n` +

                `🚀 Mini App খুলে আপনার available ` +
                `features ব্যবহার করুন।`;

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
// EXPRESS SERVER START
// =====================================================

app.listen(
    PORT,
    () => {

        console.log(
            `✅ Server running on port ${PORT}`
        );

        console.log(
            `🤖 Student Pocket Bot is running`
        );

        console.log(
            `🚀 Mini App URL: ${MINI_APP_URL}`
        );

    }
);    console.error('❌ MINI_APP_URL is not configured.');
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
