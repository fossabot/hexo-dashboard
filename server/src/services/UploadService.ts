import type Hexo from 'hexo';

import { basename, extname, join } from 'path';
import { writeFile } from 'hexo-fs';
import { UploadedFile } from 'express-fileupload';

export default class UploadService {
  constructor(
    private hexo: Hexo,
  ) {
  }

  async upload(file: UploadedFile) {
    const filename = file.name;
    const base = basename(filename), ext = extname(filename);
    const finalname = `${base}+${Date.now().toString(36)}${ext}`.replace(/_/g, '');
    const path = `assets/${finalname}`;
    await writeFile(join(this.hexo.source_dir, path), file.data);
    return encodeURI('/' + path);
  }
};
