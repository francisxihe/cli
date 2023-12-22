import { Message } from 'element-ui';
import { CoreRequest, createAxios } from 'request';

export const request: CoreRequest = createAxios({ Message });
