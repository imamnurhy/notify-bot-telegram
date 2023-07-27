const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

bot.on('polling_error', (error) => {
    console.error('Polling Error:', error);
});

module.exports = bot;
