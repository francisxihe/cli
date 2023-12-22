## 目录结构
> test
  > unit - 所有的测试用例放在这里, 必须以 .spec.js/.test.js 结尾
  > jest.conf.js - jest 配置文件
  > setup.js 入口文件

## 使用说明
1. 已经配置别名 ‘@’ 为 根目录的 'src'
2. 可以成功测试 .js/.ts/.tsx 文件

##  一些坑
1. 必须在 babel.config.js 的预处理上加下面的插件和配置, 保证能正确区分 ts 和 jsx 的 '<' 符号

```js
['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
```
