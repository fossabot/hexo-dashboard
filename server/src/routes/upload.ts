import type Hexo from 'hexo';

import { Router } from 'express';
import UploadController from '../controllers/UploadController';

export default function uploadRoute(hexo: Hexo) {
  const router: Router = Router();
  const controller = new UploadController(hexo);

  router.post('/', controller.upload);
  return router;
}
