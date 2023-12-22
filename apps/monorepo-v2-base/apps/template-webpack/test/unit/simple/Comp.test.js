import { shallowMount } from '@vue/test-utils';
import { CompTest } from '@/packages/schema-material/comp-test.tsx';
import { EMaterialType, MaterialController } from '@/packages';
import { createMaterial } from '@/packages/create-material';
import { defineComponent } from 'vue';

describe('CompTest', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = shallowMount(CompTest);

  // 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
  // const vm = wrapper.vm;

  // HTML 文本
  it('渲染正确的DOM文本', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>');
  });

  // 查找元素
  it('有按钮', () => {
    expect(wrapper.find('button')).toEqual({ selector: 'button' });
  });

  // 模拟用户行为
  it('模拟点击', async () => {
    expect(wrapper.text()).toContain('0');
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.text()).toContain('1'); // HTML 文本变为 1
    expect(wrapper.vm.count).toBe(1); // 变量变为 1
  });
});

describe('单个 schema 测试', () => {
  const wrapper = shallowMount(
    defineComponent({
      components: {},
      setup() {
        const InputComp = createMaterial(
          new MaterialController({
            type: EMaterialType.Input,
            props: { placeholder: '请输入' },
          }),
        );
        return {
          InputComp,
        };
      },
      render() {
        return <div id="input-comp">{this.InputComp}</div>;
      },
    }),
  );

  it('schema 渲染', () => {
    const inputComp = wrapper.find('#input-comp');
    expect(inputComp.attributes('id')).toBe('input-comp');
  });
});
