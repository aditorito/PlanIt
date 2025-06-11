const express = require('express');
const authMiddlewar = require('../middleware/middleware');
const planRouter = express.Router();
const planController = require('../Controllers/planControllers');

planRouter.get('/', authMiddlewar, planController.getCreatedplans);
planRouter.post('/create', authMiddlewar, planController.createplan);

module.exports = planRouter;

