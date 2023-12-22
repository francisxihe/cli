export enum ProjectEnv {
  vue2 = 'vue2',
  vue3 = 'vue3',
}

// create: 创建项目 addPage：添加页面 addComponent：添加组件
export enum CommandType {
  create = 'create',
  addFeature = 'addFeature',
  addPage = 'addPage',
  addComponent = 'addComponent',
}

// 组件所在业务层级
export enum ComponentLevel {
  router = 'router',
  component = 'component',
  page = 'page',
}

export enum AddPageError {
  missPath = '请输入页面地址',
  formatError = '输入的页面地址格式错误(正确格式：/xxx/xxx...)',
  alreadyExisting = '页面已存在',
}

export enum AddComponentError {
  missPathAndName = '请输入需要生成的组件地址和名称',
  missName = '请输入组件名',
  pathNonexistent = '输入的地址不存在',
  formatError = '输入的地址格式错误',
  alreadyExisting = '组件已存在',
}
