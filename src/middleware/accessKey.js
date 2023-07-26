const accessKey = async function (req, res, next) {
    const apiKey = req.header('x-api-key');

    if (apiKey !== process.env.APP_KEY) res.status(401).json({ status: 0, message: 'Unauthorized' });

    next();
}

module.exports = { accessKey };