import { Router } from 'express';
import { createTask, getTasks, updateStatus } from '../controllers/taskController';

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.post('/status', updateStatus)


export default router;