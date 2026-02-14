import type Hexo from 'hexo';
import type { RequestHandler } from 'express';

import UploadService from '../services/UploadService';
import BadRequestError from '../errors/BadRequestError';

export default class UploadController {
  private readonly service: UploadService;

  constructor(hexo: Hexo) {
    this.service = new UploadService(hexo);
  }

  upload: RequestHandler = async (req, res) => {
    let file = req.files?.file;
    if (Array.isArray(file)) file = file[0];
    if (!file) {
      throw new BadRequestError('No file uploaded!');
    }

    const url = await this.service.upload(file);
    res.json({ url });
  };
}
