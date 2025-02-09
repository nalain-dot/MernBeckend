import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// Unified login route for admin and teacher
router.post('/login', login);

export default router;
