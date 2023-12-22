// TODO use name prop in script tag to set component name
import MagicString from 'magic-string';
import type { Plugin } from 'vite';
import { compileScript, parse } from 'vue/compiler-sfc';

/**
 *
 * @description use complier to add another script tag after setup script tag to set component name
 * @credit vben-admin
 */
export function setupName(): Plugin {
  return {
    name: 'vite:vue2-setup-name',
    enforce: 'pre',
    async transform(code, id) {
      // 过滤非*.vue
      if (!/\.vue$/.test(id)) {
        return null;
      }
      return parserTemplate.call(this, code, id);
    },
  };
}

function parserTemplate(code: any, id: any) {
  const str = new MagicString(code);
  const { script, scriptSetup } = parse({ source: code }) || {};

  if (!script && scriptSetup) {
    const result = compileScript(parse({ source: code }), { id });

    const name = result.attrs.name;
    const lang = result.attrs.lang;
    if (name) {
      str.appendLeft(
        0,
        `<script ${lang ? `lang="${lang}"` : ''}>
            export default {
                name: "${name}"
            }
            </script>
            `,
      );

      return {
        map: str.generateDecodedMap(),
        code: str.toString(),
      };
    }
  } else {
    return null;
  }
}
