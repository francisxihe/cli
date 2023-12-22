import fs from 'fs';
import path from 'path';
import { writeFileWithParentDir } from './writeFile';
import { FileRule } from './rule';
import $ from '@fl/transform-code';
import { ProjectEnv } from '@/enum';

/**
 * 生成文件
 */
export function updateFile(source: string, target: string, options: Omit<Omit<FileRule, 'source'>, 'target'>) {
  const stats = fs.statSync(source);

  if (stats.isDirectory()) {
    // 跳过node_module
    if (path.basename(source) === 'node_modules') {
      return;
    }

    const { recursive } = options;
    // 如果是文件夹，且设置不递归
    if (recursive === false) {
      return;
    }

    // 如果是文件夹，需要递归
    fs.mkdirSync(target, { recursive: true });
    for (const filename of fs.readdirSync(source)) {
      const sourcePath = path.resolve(source, filename);
      const targetPath = path.resolve(target, filename);
      updateFile(sourcePath, targetPath, options);
    }
    return;
  }

  let sourceFile = fs.readFileSync(source, 'utf8');
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
    const sourceAST = $(sourceFile, { parseOptions });
    let targetAST = $(file, { parseOptions });

    options.transformers.forEach((transformer) => {
      targetAST = transformer(sourceAST, targetAST);
    });

    file = targetAST.generate();
  }

  // if (options.slotRules) {
  //   // 数组逐条转换代码
  //   if (is.array(options.slotRules)) {
  //     const slotCodeObj = extractSlotCode(sourceFile);

  //     options.slotRules.forEach((item: SlotRuleItem) => {
  //       let tempRule = formatSlotRule(item);

  //       file = addSlotCode(file, slotCodeObj[tempRule.sourceSlot], {
  //         slotName: tempRule.targetSlot,
  //       });
  //     });
  //   }
  // }

  writeFileWithParentDir(file, target);
}
