import express from 'express';
import { login, logout, signup, userHistory } from '../controllers/userController.js';
import userMiddleware from '../middleware/userMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/history',userMiddleware, userHistory);

export default router;