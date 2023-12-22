import { defineComponent } from 'vue';
import SvgIcon from '@/components/svg-icon/index.vue';

// BUG: 暂未使用，存在问题

const CustomMenu = defineComponent({
  components: {
    'svg-icon': SvgIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => {
      return (
        <div>
          {props.icon ? <svg-icon type={props.icon} style={'margin-right: 8px'} /> : null}
          <span slot="title">{props.title}</span>
        </div>
      );
    };
  },
});

export default CustomMenu;
