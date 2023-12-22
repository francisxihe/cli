<!--
 * @Author: shill shill@fline88.com
 * @Date: 2022-09-27 17:02:57
 * @LastEditors: shill
 * @LastEditTime: 2022-10-20 15:55:08
 * @FilePath: \hljga-items-pages\src\components\ApprovalPagination\README.md
 * @Description: 
-->
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
const paginationClick = (page: any) => {
  console.log(page);
};

返回两个type ：
page 修改页码
size修改页数
