import { Request as Req, Response as Res, NextFunction as Next } from 'express';

const test = async (req: Req, res: Res, next: Next) => {
  console.log(' * GET generateImage');
  try {
    console.log(' * RES test:');
    res.status(200).json('test');
  } catch (e) {
    console.log(' * ERROR in test:', e);
    next(e);
  }
};

export default { test };
