import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const root = new URL(import.meta.env.BASE_URL, location.origin);
const service = axios.create({ 'baseURL': `${new URL('api', root).href}`, 'timeout': 10000 });

service.interceptors.response.use(
  response => response.data,
  error => {
    const response = error.response;
    if (response) {
      const data = response.data;
      const code = data.code;
      const message = data.msg;
      if (code === 401) {
        unauthorized.value = true;
      } else if (response.status === code) {
        ElMessage.error(message ?? `Response code ${code}`);
      }
    }

    return Promise.reject(error);
  },
);

export default service;
export const unauthorized = ref(false);
