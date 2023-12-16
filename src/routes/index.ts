import express from 'express';
import { SampleController } from '../controllers/SampleController';

const router = express.Router();

router.get('/', SampleController.getSample);

export default router;
