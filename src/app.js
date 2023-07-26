const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bot = require('./utils/telegramBotConfig');
const router = require('./routes/route');
const { encodeWithSecretKey } = require('./utils/crypto');

bot.onText(/\/start/, (msg) => {
    let message = `Hallo selamat datang di Api Telegram Bot!`;
    bot.sendMessage(msg.chat.id, message);
});

bot.onText(/\/subscribe/, async (msg) => {
    const firstName = msg.chat.first_name;
    const lastName = msg.chat.last_name;
    let message = 'Selamat datang';
    if (firstName != undefined) message += firstName + ' ';
    if (lastName != undefined) message += lastName;
    bot.sendMessage(msg.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Dapatkan Kode', callback_data: 'request' },
                ],
            ]
        }
    });

});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const action = query.data;

    switch (action) {
        case 'request':
            let message = 'Berhasil membuat kode akses: ';
            var accessKey = encodeWithSecretKey(chatId);
            message += `<pre>${accessKey}</pre>`;

            bot.sendMessage(chatId, message, {
                parse_mode: 'HTML'
            }).then((sentMessage) => {
                bot.deleteMessage(sentMessage.chat.id, messageId);
            }).catch(error => {
                console.log('Error:', error);
            });
            break;
    }

    // Hapus callback query
    bot.answerCallbackQuery(query.id);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
