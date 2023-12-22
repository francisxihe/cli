import { PathLike, existsSync, readdirSync, rmdirSync, unlinkSync } from "fs";
import { traverseDirectory } from "./traverseDirectory";

export function isEmptyDirectory(dir: string) {
    if (!existsSync(dir)) {
      return true;
    }
  
    const files = readdirSync(dir);
    if (files.length === 0) {
      return true;
    }
    if (files.length === 1 && files[0] === '.git') {
      return true;
    }
  
    return false;
  }
  
  /** 清空文件夹 */
  export function emptyDir(dir: PathLike) {
    if (!existsSync(dir)) {
      return;
    }
  
    traverseDirectory(
      dir as string,
      (dir: PathLike) => rmdirSync(dir),
      (file: PathLike) => unlinkSync(file),
    );
  }