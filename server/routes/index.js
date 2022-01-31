const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/category', require('./caterory.routes'));
router.use('/product', require('./product.routes'));

module.exports = router;
