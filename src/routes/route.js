const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Welcome to Notify API').status(200);
});

router.use('/message', require('./message'))

module.exports = router;

