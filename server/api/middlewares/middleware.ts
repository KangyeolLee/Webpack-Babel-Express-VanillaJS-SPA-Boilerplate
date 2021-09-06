import { Request, Response, NextFunction } from 'express';

export const middlewareText = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('hello world');
  return next();
};
