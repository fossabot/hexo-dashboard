import type Hexo from 'hexo';

import { join } from 'path';
import { exists, readFile, writeFile } from 'hexo-fs';
import load_config from 'hexo/dist/hexo/load_config';
import load_theme_config from 'hexo/dist/hexo/load_theme_config';

export default class ConfigService {
  private hexo: Hexo;
  private paths: string[];
  private loadFunc: (hexo: Hexo) => Promise<void>;

  constructor(hexo: Hexo, type: 'mainconfig' | 'themeconfig') {
    this.hexo = hexo;
    switch (type) {
      case 'mainconfig':
        this.paths = [hexo.config_path];
        this.loadFunc = async (hexo: Hexo) => {
          return load_config(hexo);
        };
        break;
      case 'themeconfig':
        this.paths = [
          join(hexo.base_dir, `_config.${hexo.config.theme}.yml`),
          join(hexo.theme_dir, '_config.yml'),
        ];
        this.loadFunc = async (hexo: Hexo) => {
          return load_theme_config(hexo);
        };
        break;
      default:
        this.paths = [];
        this.loadFunc = async () => {};
    }
  }

  async getConfig(): Promise<string | undefined> {
    for (const path of this.paths) {
      if (await exists(path)) {
        return readFile(path);
      }
    }

    return undefined;
  }

  async updateConfig(data: string) {
    for (const path of this.paths) {
      if (await exists(path)) {
        await writeFile(path, data);
      }
    }

    await this.loadFunc(this.hexo);
    await this.hexo.load();
  }
};
