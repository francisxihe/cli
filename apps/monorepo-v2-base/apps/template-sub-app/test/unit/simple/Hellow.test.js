import { shallowMount } from '@vue/test-utils';
import Hellow from './Hellow.vue';

describe('<Hellow/>', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Hellow);
    expect(wrapper.find('h1').text()).toEqual('Hello Jest');
  });
});
