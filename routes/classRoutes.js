// routes/classRoutes.js
import { Router } from 'express';
import {
  addClass,
  getClasses,
  editClass,
  deleteClass,
} from '../controllers/classController.js';

const router = Router();

router.post('/add', addClass);
router.get('/', getClasses);
router.put('/edit/:id', editClass);
router.delete('/delete/:id', deleteClass);

export default router;
