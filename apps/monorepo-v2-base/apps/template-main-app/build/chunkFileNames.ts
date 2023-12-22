export default function chunkFileNames(chunk) {
  if (!/^(\.\.\/)/.test(chunk.name)) {
    return 'assets/js/[name]-[hash].js';
  } else {
    return `assets/js/${chunk.name.replace('../../', '')}-[hash].js`;
  }
}
