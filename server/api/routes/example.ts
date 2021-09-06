import { Router } from 'express';
import { middlewareText } from '../middlewares/middleware';

const router = Router();

export default (app: Router) => {
  app.use('/example', router);

  router.get('/', middlewareText);
};
