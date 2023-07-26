const express = require('express');

const { handleValidationErrors } = require('../utils/validation');
const { body } = require('express-validator');
const setupController = require('../controller/setupController');
const router = express.Router();

router.post('/', [
    body('url').optional().notEmpty().withMessage('Field url dalam data tidak boleh kosong.'),
], handleValidationErrors, setupController.updateWebhook);

module.exports = router;
