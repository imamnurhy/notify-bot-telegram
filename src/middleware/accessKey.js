const { decodeWithSecretKey } = require("../utils/crypto");

const accessKey = async function (req, res, next) {
    const apiKey = req.header('x-api-key');

    if (!apiKey) res.status(401).json({ status: 0, message: 'Unauthorized' });

    try {
        const chatId = decodeWithSecretKey(apiKey);
        req.chatId = chatId;
        next();
    } catch (error) {
        res.status(401).json({ status: 0, message: 'Unauthorized' });
    }
}

module.exports = { accessKey };