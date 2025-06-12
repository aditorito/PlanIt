const express = require('express');
const authMiddlewar = require('../middleware/middleware');
const planRouter = express.Router();
const planController = require('../Controllers/planControllers');
const taskController = require('../Controllers/taskControllers')

planRouter.get('/', authMiddlewar, planController.getCreatedplans);
planRouter.get('/one', authMiddlewar, planController.getSpecificPlan);
planRouter.get('/partipant', authMiddlewar, planController.getPlanasparticipants);
planRouter.put('/update', authMiddlewar, planController.updateplan);
planRouter.delete('/delete', authMiddlewar, planController.deletePlan);
planRouter.post('/create', authMiddlewar, planController.createplan);
planRouter.post('/task/add', authMiddlewar, taskController.addnewtask);
planRouter.put('/task/update', authMiddlewar, taskController.updatetask);
planRouter.delete('/task/delete', authMiddlewar, taskController.deletetask);



module.exports = planRouter;

