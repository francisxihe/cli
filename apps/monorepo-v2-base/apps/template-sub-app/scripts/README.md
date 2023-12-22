# Scripts

> This is a collection of scripts that I use to automate my work.

## Verify-commit

> This script verifies that the commit message is valid.

**git commit 提交范例**

```bash
# type(<scope>): message

$ git commit -m "feat(<new-feature>): Add a new feature"
```

**type: 必须是以下之一**

- feat: 新功能
- fix: 修复 bug
- docs: 文档
- style: 格式
- refactor: 重构
- perf: 性能
- build: 编译及构建
- chore: 构建过程或辅助工具的变更
- test: 测试

**scope(可选)**

主要用于标记模块，说明 `commit` 影响的范围，视业务需求而定。

例如：`feat(<new-feature>): Add a new feature` 影响 `<new-feature>` 模块。 

**message(必须)**

提交信息，说明提交的内容。长度不能超过 72 个字符。

## preinstall

> This script preinstall the dependencies of the project.

避免使用 `npm` 或 `yarn` 来安装本仓库项目的依赖。
