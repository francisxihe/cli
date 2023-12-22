import fs from 'fs';
import { writeFileWithParentDir } from './writeFile';
import { UpdateFileRule } from './rule';
import $ from '@fl/transform-code';

/**
 * 生成文件
 */
export function updateFileWithCode(
  sourceCode: string,
  target: string,
  options: Omit<Omit<UpdateFileRule, 'source'>, 'target'>,
) {
  let targetFile = fs.readFileSync(target, 'utf8');
  let file = targetFile;

  if (options.transformers) {
    const parseOptions: Record<string, any> = {};

    // 匹配vue文件操作
    if (options.fileType === 'vue2') {
      parseOptions.language = 'vue';
    } else {
      parseOptions.sourceType = 'module';
    }
    const sourceAST = $(sourceCode, { parseOptions });
    let targetAST = $(file, { parseOptions });

    options.transformers.forEach((transformer) => {
      targetAST = transformer(sourceAST, targetAST);
    });

    file = targetAST.generate();
  }

  writeFileWithParentDir(file, target);
}
