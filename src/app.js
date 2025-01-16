const express = require('express');
const cors = require('cors')
const app = express();
const router = require('./routes');
const bot = require('./utils/telegramBotConfig');
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

// Webhook URL
bot.setWebHook(`${process.env.APP_URL}/api/webhook`);

// Default Timezone
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(process.env.TIMEZONE || 'Asia/Jakarta');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Selamat data di Tebot Apis').status(200);
});

app.use('/api', router);

module.exports = app;
