const dayjs = require("dayjs");
const bot = require("../utils/telegramBotConfig");
const httpStatus = require('http-status-codes');

const MessageController = {
    sendMessage: async (req, res) => {
        const { message, code, title, detail, datetime } = req.body;

        var text = '';
        text = `<b>${title.toUpperCase()}`;

        // if (code) {
        //     text += ' | ';
        //     text += httpStatus.getReasonPhrase(code) + '</b>\n\n';
        // }

        if (detail) {
            text += `${message}\n\n`;
            text += `<b>Detail</b>↓\n`;
            text += `<pre><code class="language-json">${detail}</code></pre>\n`;
        } else {
            text += `${message}\n`;
        }

        // text += '\n<b>Keterangan</b>\n';

        // if (datetime) {
        //     text += '・Tanggal ' + dayjs(datetime).format('DD MMMM YYYY') + '\n';
        //     text += '・Waktu ' + dayjs(datetime).format('HH:mm:ss') + '\n';
        // }

        // if (code) {
        //     var emoticon = '';
        //     if (code >= 400 && code <= 511) emoticon = '❗';
        //     text += '・Status ' + `${code}` + `${emoticon}`;
        // }

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