const express = require('express');

const { handleValidationErrors } = require('../utils/validation');
const MessageController = require('../controller/messageController');
const { body, param } = require('express-validator');
const { accessKey } = require('../middleware/accessKey');
const router = express.Router();


router.use(accessKey); // Middleware Access Key

router.post('/:id/send', [
    param('id').notEmpty().withMessage('Parameter id harus diisi.'),
    body('title').optional().notEmpty().withMessage('Field title dalam data tidak boleh kosong.'),

    body('detail').optional().notEmpty().withMessage('Field detail dalam data tidak boleh kosong.'),

    body('code').optional().isNumeric().withMessage('Field code dalam data harus berupa angka.'),

    body('message').notEmpty().withMessage('Field message dalam data tidak boleh kosong.'),
], handleValidationErrors, MessageController.sendMessage);

module.exports = router;
