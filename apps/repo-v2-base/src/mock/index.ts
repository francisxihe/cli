import Mock from 'mockjs';
import { JSONSchemaFaker as jsf } from 'json-schema-faker';

const getData = (url: string) => {
  const modules: Record<string, any> = import.meta.glob('./**/*.json', { eager: true });
  const module = Object.keys(modules).find(item => item.includes(url.split('/').slice(2).join('/')));
  if (module) {
    return jsf.generate(modules[module].default);
  }
};

Mock.mock(/\/mock\/.{1,}/, 'get', (options: any) => {
  const { url } = options;
  const data = getData(url);

  if (!data) {
    return {
      code: 404,
      message: '本地资源不存在！',
      data: null,
    };
  }

  return {
    ...options,
    code: 200,
    data,
  };
});

Mock.mock(/\/mock\/.{1,}/, 'post', (options: any) => {
  const { url } = options;
  const data = getData(url);

  if (!data) {
    return {
      code: 404,
      message: '本地资源不存在！',
      data: null,
    };
  }

  return {
    ...options,
    code: 200,
    data,
  };
});
