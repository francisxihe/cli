开发

### 1.文件后缀规则
1. .handlebars 文件生成后后去掉.handlebars
    如a.ts.handlebars 生成文件 a.ts
2. 所有内容文件默认ts，支持非TS的情况需要有对应的js文件，二者为or的关系，
   如果isTypeScript为true，生成ts文件，为false，生成js文件
3. 生成的配置文件(不需要handlebars转换的)，如一律_打头，如.gitignore模版应该是_gitignore