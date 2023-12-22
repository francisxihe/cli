import fs from 'fs';
import path from 'path';

export function traverseDirectory(dir: string, dirCallback: any, fileCallback: any) {
  for (const filename of fs.readdirSync(dir)) {
    if (filename === '.git') {
      continue;
    }
    const fullpath = path.resolve(dir, filename);
    if (fs.lstatSync(fullpath).isDirectory()) {
      traverseDirectory(fullpath, dirCallback, fileCallback);
      dirCallback(fullpath);
      continue;
    }
    fileCallback(fullpath);
  }
}
