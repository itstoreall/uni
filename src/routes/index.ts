import express from 'express';
import testRouter from './test.router';

const router = express.Router();

router.use('/test', testRouter);

export default router;
