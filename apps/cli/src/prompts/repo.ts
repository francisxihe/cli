import prompts, { PromptType } from 'prompts';
import { getLayoutPrompts, getRouterPrompts } from './createFeature';
import { getBusiness } from './createFeature/business';

/** 获取初始化类型 */
function getInitialType(type: PromptType) {
  // 根据前文控制是否展示repo的设置
  return (prev: unknown, values: prompts.Answers<string>) => {
    if (values.projectType === 'repo') return type;
    return null;
  };
}

/** 获取衍生功能选项类型 */
function getAdditionalChoices(initial: string[]): prompts.Choice[] {
  const choices = [];
  if (initial.includes('api') && initial.includes('pinia') && initial.includes('router')) {
    choices.push({ title: 'layout', value: 'layout' });
    choices.push({ title: 'business', value: 'business', description: '业务功能' });
  }
  return choices;
}

export const repoPrompts: Array<prompts.PromptObject> = [
  {
    type: getInitialType('multiselect'),
    name: 'initial',
    message: '初始化功能',
    choices: () => {
      return [
        { title: 'router', value: 'router', selected: true },
        { title: 'pinia', value: 'pinia', selected: true },
        { title: 'api', value: 'api', selected: true, description: '接口调用' },
        { title: 'element-ui', value: 'element-ui', selected: true },
        { title: 'lodash', value: 'lodash' },
        { title: 'windicss', value: 'windicss' },
        { title: 'vueuse', value: 'vueuse' },
      ];
    },
  },
  {
    type: (prev: unknown, values: prompts.Answers<string>) => {
      if (getAdditionalChoices(values.initial).length > 0) return 'multiselect';
      return null;
    },
    name: 'additional',
    message: '衍生功能',
    choices: (prev: unknown, values: prompts.Answers<string>) => {
      return getAdditionalChoices(values.initial);
    },
  },
  {
    ...getRouterPrompts(),
    type: (prev: unknown, values: prompts.Answers<string>) =>
      values.initial.includes('router') ? 'multiselect' : null,
  },
  {
    ...getLayoutPrompts(),
    type: (prev: unknown, values: prompts.Answers<string>) =>
      values.additional.includes('layout') ? 'multiselect' : null,
  },
  {
    ...getBusiness(),
    type: (prev: unknown, values: prompts.Answers<string>) =>
      values.additional.includes('business') ? 'multiselect' : null,
  },
];
