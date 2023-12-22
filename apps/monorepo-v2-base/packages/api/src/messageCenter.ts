import { getRequest } from '../';

// 消息列表
export const getMessageList = (userId: string) => {
  const request = getRequest();
  return request.get({ url: 'credit-union/biz/notice/lists/' + userId });
};
