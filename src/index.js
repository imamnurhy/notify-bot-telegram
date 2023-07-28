const app = require('../api/index');
const bot = require('./utils/telegramBotConfig');
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await bot.sendMessage(id, "Hola 👋🏻 I'm Alive! 🤖");
    console.info(`Server is up and Running at PORT : ${port}`)
});