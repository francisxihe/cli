# 分页使用文档

## 传入字段

CurrentPage
类型： Object
属性：  
size: number;      一页几条
page: number;      页码
total: number;     总数

## 点击分页按钮（方法）

paginationClick 传出状态和修改分页页码数
const paginationClick = (type: string, val: any) => {
  console.log(type, val);
};

返回两个type ：
page 修改页码
size修改页数
