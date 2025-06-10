const express = require('express');
const authRouter = express.Router();
const authController = require('../Controllers/authControllers');

authRouter.post('/signup', authController.signup)


module.exports = authRouter;

