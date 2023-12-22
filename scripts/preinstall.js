/**
 * pnpm preinstall
 * 用于在安装时的前置检查，如果检查不通过，则不能继续安装
 * 当运行 npm 或 yarn 时，发生错误时，会自动退出，不会继续执行后续操作
 */

if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.log();
  console.warn(
    `\u001b[33m Please run \`pnpm install\` to install pnpm.\u001b[39m\n`
  );
  process.exit(1);
}
