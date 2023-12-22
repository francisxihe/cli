import prompts from 'prompts';

export const getLayoutPrompts = (): prompts.PromptObject => {
  return {
    type: 'select',
    name: 'layout',
    message: '界面类型',
    choices: [
      { title: '后台管理', selected: true, value: 'manage', description: '' },
      { title: '门户主页', selected: false, value: 'homePage', description: '' },
    ],
  };
};
