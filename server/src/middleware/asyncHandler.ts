import { NextFunction, Request, Response } from 'express';

type fn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default function asyncHandler(fn: fn) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
