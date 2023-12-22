import fs from 'fs';
import path from 'path';
import { writeFileWithParentDir } from './writeFile';
import { FileRule } from './rule';
import $ from '@fl/transform-code';

/**
 * 生成文件
 */
export function createFile(source: string, target: string, options: Omit<Omit<FileRule, 'source'>, 'target'>) {
  const stats = fs.statSync(source);

  if (stats.isDirectory()) {
    // 跳过node_module
    if (path.basename(source) === 'node_modules') {
      return;
    }
    fs.mkdirSync(target, { recursive: true });
    const { recursive } = options;
    // 如果是文件夹，且设置不递归
    if (recursive === false) {
      return;
    }
    for (const filename of fs.readdirSync(source)) {
      const sourcePath = path.resolve(source, filename);
      const targetPath = path.resolve(target, filename);
      createFile(sourcePath, targetPath, options);
    }
    return;
  }

  let sourceFile = fs.readFileSync(source, 'utf8');

  if (options.transformers) {
    let AST = $(sourceFile, { parseOptions: { sourceType: 'module' } });

    options.transformers.forEach((transformer) => {
      AST = transformer(AST);
    });

    sourceFile = AST.generate();
  }

  // if (options.slotRules) {
  //   // 数组逐条转换代码
  //   if (is.array(options.slotRules)) {
  //     options.slotRules.forEach((item: SlotRuleItem) => {
  //       let tempRule = formatSlotRule(item);

  //       sourceFile = replaceSlotCode(sourceFile, '', {
  //         slotName: tempRule.sourceSlot,
  //       });
  //     });
  //   }
  //   // 全量转换代码
  //   else {
  //     if (options.slotRules.clearSlot) {
  //       sourceFile = removeAllSlotsCode(sourceFile, {
  //         clearComments: options.slotRules.clearComments,
  //       });
  //     }
  //   }
  // }
  // sourceFile = removeAllSlotsCode(sourceFile);

  writeFileWithParentDir(sourceFile, target);
}
