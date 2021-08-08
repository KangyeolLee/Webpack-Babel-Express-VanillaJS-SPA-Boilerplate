import express, { Request, Response, NextFunction } from 'express';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
  app.set('port', config.port || 3000);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error('Not Found') as any;
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.status || 500).json({
      error: err.message,
    });
  });
};
