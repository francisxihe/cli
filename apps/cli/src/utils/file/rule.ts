import { ProjectEnv } from '@/enum';
import { GoGoAST, Replacer, Selector } from 'gogocode';

// export type SlotRuleItem = {
//   slotName?: string;
//   sourceSlot?: string;
//   targetSlot?: string;
//   // 需要先清除的源文件内的slot, true为清除，默认不清除
//   clearSlot?: boolean;
//   // 是否保留slot注释, true为清除，默认不清除
//   clearComments?: boolean;
//   // 是否替换目标插槽内的代码
//   rewrite?: boolean;
// };

// export type SlotRule =
//   | SlotRuleItem[]
//   | {
//       // 清除源文件内的slot, true为清除，默认不清除
//       clearSlot?: boolean;
//       // 是否保留slot注释, true为清除，默认不清除
//       clearComments?: boolean;
//     };

// export function validSlotRule(rule: SlotRuleItem) {
//   return rule.slotName !== undefined || (rule.sourceSlot !== undefined && rule.targetSlot !== undefined);
// }

// export type FormatSlotRule = {
//   sourceSlot: string;
//   targetSlot: string;
//   clearSlot?: SlotRuleItem['clearSlot'];
//   clearComments?: SlotRuleItem['clearComments'];
//   rewrite?: SlotRuleItem['rewrite'];
// };

// export function formatSlotRule(rule: SlotRuleItem): FormatSlotRule {
//   if (!validSlotRule(rule)) {
//     throw new Error('rule格式不正确');
//   }
//   return {
//     ...rule,
//     sourceSlot: (rule.sourceSlot === undefined ? rule.slotName : rule.sourceSlot) as string,
//     targetSlot: (rule.targetSlot === undefined ? rule.slotName : rule.targetSlot) as string,
//   };
// }

export type FileRule = {
  source: string;
  target: string;
  transformers?: ((sourceAst: GoGoAST, targetAst?: GoGoAST) => GoGoAST)[];
  /** 如果source是文件夹，是否递归复制下面的文件，true复制，false不复制，默认复制 */
  recursive?: boolean;
  fileType?: 'vue2' | 'vue3' | 'js' | 'jsx';
};

export type UpdateFileRule = {
  source: string;
  target: string;
  transformers?: ((sourceAst: GoGoAST, targetAst: GoGoAST) => GoGoAST)[];
  /** 如果source是文件夹，是否递归复制下面的文件，true复制，false不复制，默认复制 */
  recursive?: boolean;
  fileType?: 'vue2' | 'vue3' | 'js' | 'jsx';
};
