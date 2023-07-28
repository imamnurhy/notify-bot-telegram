const bot = require("../utils/telegramBotConfig");

const MessageController = {
    sendMessage: async (req, res) => {
        const { message, code, title, detail } = req.body;

        const currentDate = new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const currentTime = new Date().toLocaleTimeString('id-ID', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });

        const lineSeparator = '-'.repeat(50);

        var text = '';
        text = `<b>${title.toUpperCase()}</b>\n`;
        if (detail) {
            text += `${detail}\n`;
        } else {
            text += `${message} \n`;
        }
        text += `${lineSeparator}\n`;

        text += `🗓: ${currentDate}\n`;
        text += `⏱: ${currentTime}\n`;

        if (code) {
            var emoticon = '❤️';
            if (code >= 200 && code <= 226) emoticon = '✅';
            if (code >= 400 && code <= 511) emoticon = '❗';
            text += `${emoticon}: <pre>${code}</pre>\n`;
        }

        if (detail) text += `🙊: ${message} `;

        try {
            const chatId = req.chatId;
            await bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
            return res.status(200).json({
                status: 0,
                message: 'Pesan terkirim',
            });
        } catch (error) {
            return res.status(500).json({
                status: 1,
                message: 'Terjadi kesalahan',
                error: error
            });
        }
    }
}

module.exports = MessageController;