import { Router } from 'express';
import { createCategory, getCategorys } from '../controllers/categoryController';

const router = Router();

router.post('/', createCategory);
router.get('/', getCategorys);


export default router;