import { GoGoAST } from 'gogocode';
import { combineImportsAst, getAllImportCode, removeAllImportCode } from '@/utils/ast';

export function transformVue2(sourceAst: GoGoAST, targetAst: GoGoAST) {
  const sourceDomAst = sourceAst.find(`<template></template>`);
  const targetDomAst = targetAst.find(`<template></template>`);
  const domCode = transformDomCode(sourceDomAst, targetDomAst);
  
  targetAst.find(`<template></template>`).empty().after(domCode);

  let sourceJsAst = sourceAst.find(`<script $$$ setup></script>`);
  let targetJsAst = targetAst.find(`<script $$$ setup></script>`);
  const importCode = transformImportCode(sourceJsAst, targetJsAst);
  const setupCode = transformSetupCode(sourceJsAst, targetJsAst);
  targetAst.find(`<script $$$ setup></script>`).empty().after(importCode).after(setupCode);

  return targetAst;
}

function transformDomCode(sourceAst: GoGoAST, targetAst: GoGoAST) {
  return targetAst.after(sourceAst.generate()).generate();
}

function transformImportCode(sourceAst: GoGoAST, targetAst: GoGoAST) {
  targetAst = combineImportsAst(targetAst, sourceAst);
  return getAllImportCode(targetAst);
}

function transformSetupCode(sourceAst: GoGoAST, targetAst: GoGoAST) {
  sourceAst = removeAllImportCode(sourceAst);
  targetAst = removeAllImportCode(targetAst);

  targetAst.after(sourceAst.generate());
  return targetAst.generate();
}
