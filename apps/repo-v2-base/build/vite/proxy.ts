/**
 * vite代理
 */
export function createProxy() {
  return {
    '/temp': 'http://172.16.21.147:8298',
  };
}
