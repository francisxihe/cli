import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';

/** 写文件 */
export function writeFileWithParentDir(data: string, target: string) {
  const parentDir = path.dirname(target);

  // 递归创建父目录
  mkdirSync(parentDir, { recursive: true });

  // 创建文件并写入内容
  writeFileSync(target, data);
}
