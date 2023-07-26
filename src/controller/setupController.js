const axios = require('axios');

const token = process.env.TELEGRAM_BOT_TOKEN;

const setupController = {
    updateWebhook: async (req, res) => {
        const { url } = req.body;
        try {
            const { data } = await axios.get(`https://api.telegram.org/bot${token}/setWebhook?url=${url}`);

            return res.status(200).json({
                status: 0,
                message: 'Setup webhook berhasil',
                data: data
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

module.exports = setupController;