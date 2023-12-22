import { GoGoAST } from 'gogocode';

export interface importItem {
  type: 'ImportDefaultSpecifier' | 'ImportSpecifier';
  variable: string;
  filename: string;
}

/** 获取所有的引用 */
export function getImportList(ast: GoGoAST) {
  const importList: importItem[] = [];
  ast.find([`import $$$ from '$_$'`, `import {$$$} from '$_$'`]).each((node, index: number) => {
    node.match['$$$$'].forEach((item: any) => {
      importList.push({
        type: item.type,
        variable: item.local.name,
        filename: node.match['0'][0].value,
      });
    });
  });

  return importList;
}

/** 获取所有的引用代码 */
export function getAllImportCode(ast: GoGoAST) {
  let code = '';
  ast
    .find([`import $_$1 from '$_$2'`, `import {$$$} from '$_$'`, `import $_$1,{$$$} from '$_$2'`])
    .each((node, index: number) => {
      code += `${node.generate()}\n`;
    });
  return code;
}

/** 去除所有的引用 */
export function removeAllImportCode(ast: GoGoAST) {
  ast.find([`import $_$1 from '$_$2'`, `import {$$$} from '$_$'`, `import $_$1,{$$$} from '$_$2'`]).remove();
  return ast;
}

/** 获取重复的引用 */
export function getDuplicateImports(imports: importItem[], compareImports: importItem[]) {
  return imports.filter((item) => {
    return (
      compareImports.findIndex(
        (compareImport) =>
          compareImport.type === item.type &&
          compareImport.variable === item.variable &&
          compareImport.filename === item.filename,
      ) >= 0
    );
  });
}

/** 获取不重复的引用 */
export function getNonDuplicateImports(imports: importItem[], compareImports: importItem[]) {
  return imports.filter((item) => {
    return (
      compareImports.findIndex(
        (compareImport) =>
          compareImport.type === item.type &&
          compareImport.variable === item.variable &&
          compareImport.filename === item.filename,
      ) < 0
    );
  });
}

/** 获取指定资源的默认导入的引用 */
export function getDefaultSpecifierImport(imports: importItem[], filename: string) {
  return imports.filter((item) => item.type === 'ImportDefaultSpecifier' && item.filename === filename);
}

/** 获取指定资源的命名导入的引用 */
export function getSpecifierImport(imports: importItem[], filename: string) {
  return imports.filter((item) => item.type === 'ImportSpecifier' && item.filename === filename);
}

/** 插入引用 */
export function insertImportList(ast: GoGoAST, code: string) {
  ast.find([`import $$$ from '$_$'`, `import {$$$} from '$_$'`]).after(code);

  return ast;
}

/** 去除重复的引用 */
export function removeDuplicateImportsAst(ast: GoGoAST, compareAst: GoGoAST) {
  const importList = getImportList(ast);
  const compareImportList = getImportList(compareAst);

  const duplicateImports = getDuplicateImports(importList, compareImportList);
  const nonDuplicateImports = getNonDuplicateImports(importList, compareImportList);

  duplicateImports.forEach((item) => {
    if (item.type === 'ImportDefaultSpecifier') {
      if (getSpecifierImport(nonDuplicateImports, item.filename).length > 0) {
        ast.replace(`import ${item.variable},{$$$} from '${item.filename}'`, `import {$$$} from '${item.filename}';\n`);
      } else {
        ast.replace(`import ${item.variable} from '${item.filename}'`, '');
      }
    }
    if (item.type === 'ImportSpecifier') {
      if (
        getDefaultSpecifierImport(nonDuplicateImports, item.filename).length > 0 &&
        getSpecifierImport(nonDuplicateImports, item.filename).length > 0
      ) {
        ast.replace(
          `import $_$,{${item.variable},$$$} from '${item.filename}'`,
          `import $_$,{$$$} from '${item.filename}';\n`,
        );
      } else if (getSpecifierImport(nonDuplicateImports, item.filename).length > 0) {
        ast.replace(`import {${item.variable},$$$} from '${item.filename}'`, `import {$$$} from '${item.filename}';\n`);
      } else {
        ast.replace(`import {${item.variable}} from '${item.filename}'`, '');
      }
    }
  });

  return ast;
}

/** 合并引用 */
export function combineImportsAst(targetAst: GoGoAST, ast: GoGoAST) {
  ast = removeDuplicateImportsAst(ast, targetAst);
  const importList = getImportList(ast);

  importList.forEach((item) => {
    if (item.type === 'ImportDefaultSpecifier') {
      if (getSpecifierImport(getImportList(targetAst), item.filename).length > 0) {
        targetAst.replace(
          `import {$$$} from '${item.filename}'`,
          `import ${item.variable},{$$$} from '${item.filename}';\n`,
        );
      } else {
        insertImportList(targetAst, `import ${item.variable} from '${item.filename}';\n`);
      }
    }
    if (item.type === 'ImportSpecifier') {
      if (
        getDefaultSpecifierImport(getImportList(targetAst), item.filename).length > 0 &&
        getSpecifierImport(getImportList(targetAst), item.filename).length > 0
      ) {
        targetAst.replace(
          `import $_$,{$$$} from '${item.filename}'`,
          `import $_$,{${item.variable},$$$} from '${item.filename}';\n`,
        );
        return;
      }
      if (getSpecifierImport(getImportList(targetAst), item.filename).length > 0) {
        targetAst.replace(
          `import {$$$} from '${item.filename}'`,
          `import {${item.variable},$$$} from '${item.filename}';\n`,
        );
        return;
      }
      if (getDefaultSpecifierImport(getImportList(targetAst), item.filename).length > 0) {
        targetAst.replace(
          `import $_$ from '${item.filename}'`,
          `import $_$,{${item.variable}} from '${item.filename}';\n`,
        );
        return;
      }
      insertImportList(targetAst, `import ${item.variable} from '${item.filename}'`);
    }
  });

  return targetAst;
}
