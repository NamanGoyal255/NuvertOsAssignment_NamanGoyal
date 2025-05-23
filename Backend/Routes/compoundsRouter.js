const express = require('express');
const router = express.Router();
const controller = require('../Controllers/compoundController');
const authMiddleware=require('../Middlewares/authMiddleware');
router.get('/',authMiddleware, controller.getAll);
router.get('/:id',authMiddleware, controller.getOne);
router.put('/:id',authMiddleware, controller.update);
router.post('/',authMiddleware,controller.create);

module.exports = router;