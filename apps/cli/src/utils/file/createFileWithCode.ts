import fs from 'fs';
import path from 'path';
import { writeFileWithParentDir } from './writeFile';
import { FileRule } from './rule';
import $ from '@fl/transform-code';

/**
 * 生成文件
 */
export function createFileWithCode(
  sourceCode: string,
  target: string,
  options: Omit<Omit<FileRule, 'source'>, 'target'>,
) {
  if (options.transformers) {
    let AST = $(sourceCode, { parseOptions: { sourceType: 'module' } });

    options.transformers.forEach((transformer) => {
      AST = transformer(AST);
    });

    sourceCode = AST.generate();
  }

  writeFileWithParentDir(sourceCode, target);
}
