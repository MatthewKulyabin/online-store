const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/category', require('./caterory.routes'));
router.use('/product', require('./product.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;
