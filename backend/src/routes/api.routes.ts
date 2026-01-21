import { Router } from 'express';
import { tncController } from '../controllers/tnc.controller';

const router = Router();

router.post('/summarize-tnc', tncController.summarize);
router.post('/analyze-cookie', tncController.analyzeCookie);

export default router;
