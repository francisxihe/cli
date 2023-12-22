import { ComponentItem } from '@/api';
import prompts from 'prompts';

// 组件层级关系
const componentList = [
  {
    name: 'modal',
    children: [
      // {
      //   name: 'list',
      // },
      // { name: 'form' },
      { name: 'confirm' },
      { name: 'cancel' },
    ],
  },
  // {
  //   name: 'list',
  //   children: [
  //     {
  //       name: 'searchForm',
  //     },
  //     { name: 'pagination' },
  //     { name: 'table' },
  //   ],
  // },
  // { name: 'form' },
  // { name: 'searchForm' },
  // { name: 'table' },
  // { name: 'pagination' },
  { name: 'confirm' },
  { name: 'cancel' },
];

export const getComponentPrompts = (componentList: ComponentItem[]): prompts.PromptObject<string>[] => {
  return [
    {
      type: 'select',
      name: 'componentId',
      message: '选择组件类型',
      choices: componentList.map((item) => ({
        title: item.name,
        value: item.id,
      })),
    },
  ];
};
