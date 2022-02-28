'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controllers')

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
