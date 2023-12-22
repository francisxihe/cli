/**
 * @description 8位随机id
 * @returns
 */
export function uniqueId() {
  return Math.random().toString(36).slice(2, 10);
}
