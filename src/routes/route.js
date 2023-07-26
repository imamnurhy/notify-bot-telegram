const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Selamat data di Telegram Api').status(200);
});

router.use('/message', require('./message'))

module.exports = router;

