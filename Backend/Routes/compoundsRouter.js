const express = require('express');
const router = express.Router();
const controller = require('../Controllers/compoundController');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.post('/',controller.create);

module.exports = router;