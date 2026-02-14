import request from '@/request';
import type { UploadResult } from '@/types';

export default {
  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return request.post<UploadResult, UploadResult>('upload', formData);
  },
};
