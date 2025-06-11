const express = require('express');
const authMiddlewar = require('../middleware/middleware');
const planRouter = express.Router();
const planController = require('../Controllers/planControllers');

planRouter.get('/', authMiddlewar, planController.getCreatedplans);
planRouter.get('/one', authMiddlewar, planController.getSpecificPlan);
planRouter.get('/partipant', authMiddlewar, planController.getPlanasparticipants);
planRouter.put('/update', authMiddlewar, planController.updateplan);
planRouter.delete('/delete', authMiddlewar, planController.deletePlan);
planRouter.post('/create', authMiddlewar, planController.createplan);

module.exports = planRouter;

