import request from '@/request';
import type { Config } from '@/types';

export default {
  getConfig() {
    return request.get<Config, Config>('config', { params: { type: 'mainconfig' } });
  },

  updateConfig(config: string) {
    return request.post<void, void>('config', { config }, { params: { type: 'mainconfig' } });
  },
};
