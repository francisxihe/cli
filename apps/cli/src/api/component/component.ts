import { request } from '@/plugins/request';

/** 获取当前组件列表 */
export type ComponentItem = {
  name: string;
  id: number;
};
export const getComponentList = (): Promise<{ data: ComponentItem[] }> => {
  return request.get({ url: '/component/list' });
};

export type ComponentDetail = {
  name: string;
  id: number;
  code: string;
  repo_env: 'vue2' | 'vue3';
  ref_code: string;
};
export const getComponentDetail = (componentId: number): Promise<{ data: ComponentDetail }> => {
  return request.get({
    url: '/component/detail',
    params: {
      componentId,
    },
  });
};
