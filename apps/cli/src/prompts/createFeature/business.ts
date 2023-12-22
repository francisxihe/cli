import prompts from 'prompts';

export const getBusiness = (): prompts.PromptObject => {
  return {
    type: 'multiselect',
    name: 'business',
    message: '业务功能',
    choices: [
      { title: '用户权限', selected: true, value: 'permission', description: '用户权限' },
      { title: '系统管理', selected: true, value: 'systemManage', description: '系统管理' },
    ],
  };
};
