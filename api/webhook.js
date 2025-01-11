// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';

const { encodeWithSecretKey, decodeWithSecretKey } = require('../src/utils/crypto');
const bot = require('../src/utils/telegramBotConfig');

const subscribeMessage = async (id) => {
    let textMessage = '🎉 Hallo selamat datang di Api Telegram Bot! 🤖';
    await bot.sendMessage(id, textMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Request Kode', callback_data: 'request' },
                ],
            ]
        }
    });
}

module.exports = async (request, response) => {
    try {
        const { body } = request;

        if (body.message) {
            const { chat: { id }, text } = body.message;

            const startCommand = (command) => /\/start/.test(command);
            const match = text.match(/\/start (.+)/);
            if (startCommand(text)) {
                if (match && match[1].toLowerCase() === 'subscribe') {
                    await subscribeMessage(id);
                } else {
                    await bot.sendMessage(id, "Hola 👋🏻");
                }
            }

            const subscribeCommand = (command) => /\/subscribe/.test(command);
            if (subscribeCommand(text)) {
                await subscribeMessage(id);
            }

        }

        if (body.callback_query) {
            const { message: { chat: { id }, message_id }, data } = body.callback_query;

            switch (data) {
                case 'request':
                    let textMessage = '✅ Berhasil membuat kode akses: ';
                    var accessKey = encodeWithSecretKey(id);

                    textMessage += `<pre>${accessKey}</pre>`;

                    await bot.sendMessage(id, textMessage, {
                        parse_mode: 'HTML'
                    }).then(async (sentMessage) => {
                        await bot.deleteMessage(sentMessage.chat.id, message_id);
                    }).catch(error => {
                        console.error('Error:', error);
                    });
                    break;
            }
        }
    }
    catch (error) {
        console.info('Error sending message:');
        console.error(error.toString());
    }
    response.send('OK');
}