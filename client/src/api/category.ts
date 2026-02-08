import request from '@/request';
import type { TaxonomyList } from '@/types';


export default {
  getCategories() {
    return request.get<TaxonomyList, TaxonomyList>('taxonomies', { params: { type: 'category' } });
  },
};
