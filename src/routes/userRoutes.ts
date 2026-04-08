import { Router } from 'express';
import { createUser, getUsers, auth } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/auth', auth);
router.get('/', getUsers);


export default router;