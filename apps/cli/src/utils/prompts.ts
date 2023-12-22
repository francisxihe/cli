import prompts, { PromptObject } from 'prompts';

export const initPrompts = (prompt: PromptObject<string>[]) => {
  try {
    return prompts([...prompt], {
      onCancel: () => {
        throw new Error('用户取消');
      },
    });
  } catch (e: any) {
    console.log(e.message);
    process.exit(1);
  }
};
