const { validationResult } = require('express-validator');

// Fungsi middleware untuk menangani kesalahan validasi
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Tanggapi dengan status 400 dan daftar pesan kesalahan
        return res.status(400).json({ errors: errors.array() });
    }

    // Lanjutkan ke middleware atau kontroller berikutnya
    next();
};

module.exports = {
    handleValidationErrors,
};
