import prompts from 'prompts';

export const getRouterPrompts = (): prompts.PromptObject => {
  return {
    type: 'multiselect',
    name: 'router',
    message: '路由衍生功能',
    choices: (prev: unknown, values: prompts.Answers<string>) => {
      return [
        {
          title: '页面进度条',
          selected: true,
          value: 'router-progress',
          description: '跳转页面时页面上方进度条',
        },
      ];
    },
  };
};
