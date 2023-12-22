import path from 'path';
import { isWindows } from '../common';
import { pathToFileURL } from 'url';
import { readFileSync, readdirSync } from 'fs';

/** 获取docking文件中的配置 */
export async function getDockingFile(templatePath: string, dockingType: string) {
  if (dockingType.endsWith('/')) {
    const dockingPathList = readdirSync(path.resolve(templatePath, `./docking/features/`));
    const dockingFileList = [];
    for (let i = 0; i < dockingPathList.length; i++) {
      const dockingPath = path.resolve(templatePath, `./docking/${dockingType}/${dockingPathList[i]}`);
      const moduleProp = !!isWindows()
        ? await import(pathToFileURL(dockingPath).toString())
        : await import(dockingPath);
      dockingFileList.push({ ...moduleProp, name: dockingPathList[i] });
    }
    return dockingFileList;
  }

  const dockingPath = path.resolve(templatePath, `./docking/${dockingType}.mjs`);
  return !!isWindows() ? await import(pathToFileURL(dockingPath).toString()) : await import(dockingPath);
}
