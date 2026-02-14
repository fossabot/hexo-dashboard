import type Hexo from 'hexo';

import { Router } from 'express';
import UploadController from '../controllers/UploadController';

export default function (hexo: Hexo) {
  const router = Router();
  const controller = new UploadController(hexo);

  router.post('/', controller.upload);
  return router;
}
