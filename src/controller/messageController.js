const dayjs = require("dayjs");
const bot = require("../utils/telegramBotConfig");
const httpStatus = require('http-status-codes');

const MessageController = {
    sendMessage: async (req, res) => {
        const { message, code, title, detail, datetime } = req.body;


        var text = '';
        text = `<b>${title.toUpperCase()}</b>`;
        text += ' | ';
        text += httpStatus.getReasonPhrase(code) + '\n\n';

        // if (code) {
        //     var emoticon = '❤️';
        //     if (code >= 200 && code <= 226) emoticon = '🟢';
        //     if (code >= 400 && code <= 511) emoticon = '❗';
        //     text += `Status ${code + ' ' + emoticon} \n`;
        // }

        // text += `${lineSeparator}\n`;

        if (detail) {
            text += `${detail}\n`;
        } else {
            text += `${message}\n`;
        }

        text += '\nKet:\n';

        if (datetime) {
            text += 'Tanggal ' + dayjs(datetime).format('DD MMMM YYYY') + '\n';
            text += 'Waktu ' + dayjs(datetime).format('HH:mm:ss') + '\n';
            text += 'Status ' + `${code}`;
        }

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