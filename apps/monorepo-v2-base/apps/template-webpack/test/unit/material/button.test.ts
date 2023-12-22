import { shallowMount } from '@vue/test-utils';
import { MaterialButton } from '@/packages/schema-material/index.ts';

describe('单个 schema 测试', () => {
  const wrapper = shallowMount(MaterialButton);

  it('schema 渲染', () => {
    const button = wrapper.find('button');
    expect(button.attributes('type')).toBe('button');
  });
});
