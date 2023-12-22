/** 提取插槽内的代码 */
export function extractSlotCode(code: string) {
  const regex = /\/\*\* #slot (.*?) \*\/(.*?)\/\*\* #endslot \1 \*\//gs;
  const matches = [];
  let match;
  while ((match = regex.exec(code)) !== null) {
    const slotName = match[1];
    const slotContent = match[2].trim();
    matches.push({ slotName, slotContent });
  }

  return matches.reduce((tempCodeObj: Record<string, string>, { slotName, slotContent }) => {
    if (tempCodeObj[slotName] !== undefined) {
      console.error('插槽命名唯一');
    }
    tempCodeObj[slotName] = slotContent;
    return tempCodeObj;
  }, {});
}

/** 删除所有插槽内的代码 */
export function removeAllSlotsCode(code: string, options?: { clearComments?: boolean }) {
  const regex = /\/\*\* #slot (.*?) \*\/(.*?)\/\*\* #endslot \1 \*\//gs;

  return code.replace(regex, (match) => {
    const lines = match.split('\n');

    if (options?.clearComments === true) {
      return '';
    }

    const slotReg = /\/\*\* #slot (.*?) \*\//g;
    const endslotReg = /\/\*\* #endslot (.*?) \*\//g;
    return lines.filter((line) => slotReg.test(line) || endslotReg.test(line)).join('\n') + '\n';
  });
}

/** 替换指定插槽内的代码 */
export function replaceSlotCode(
  sourceCode: string,
  replaceCode: string,
  options: {
    slotName: string;
    clearComments?: boolean;
  },
) {
  const { slotName } = options;
  const regex = new RegExp(`\\/\\*\\* #slot ${slotName} \\*\\/(.*?)\\/\\*\\* #endslot ${slotName} \\*\\/`, 'gs');

  if (options?.clearComments === true) {
    return sourceCode.replace(regex, replaceCode);
  }
  return sourceCode.replace(regex, `/** #slot ${slotName} */\n${replaceCode}\n/** #endslot ${slotName} */`);
}

/** 添加代码到指定插槽内 */
export function addSlotCode(
  sourceCode: string,
  addCode: string,
  options: {
    slotName: string;
  },
) {
  const { slotName } = options;
  const regex = new RegExp(`\\/\\*\\* #slot ${slotName} \\*\\/(.*?)\\/\\*\\* #endslot ${slotName} \\*\\/`, 'gs');

  const replaceCode = extractSlotCode(sourceCode)[slotName];

  return sourceCode.replace(regex, `/** #slot ${slotName} */\n${replaceCode}\n${addCode}\n/** #endslot ${slotName} */`);
}
