// routes/eventRoutes.js
import express from 'express';
import { addEvent, getEvents, editEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/add', addEvent);
router.get('/', getEvents);
router.put('/edit/:id', editEvent);
router.delete('/delete/:id', deleteEvent);

export default router;
