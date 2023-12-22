import { Message } from 'element-ui';
import { CoreRequest, createAxios, uploadAxios } from 'request';

export const request: CoreRequest = createAxios({ Message, apiPrefix: import.meta.env.VITE_API_URL });
export const uploadFile: CoreRequest = uploadAxios({ Message, apiPrefix: import.meta.env.VITE_API_URL });
