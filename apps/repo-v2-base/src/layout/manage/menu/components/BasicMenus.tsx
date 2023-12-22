import { defineComponent } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import AppLink from './AppLink.vue';

const BasicMenus = defineComponent({
  components: {
    'app-link': AppLink,
    'svg-icon': SvgIcon,
  },
  props: {
    menu: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    function renderSubMenu(menu: any) {
      return (
        <el-submenu index={menu.path} popper-append-to-body={true}>
          <template slot="title">
            {menu.icon ? <svg-icon type={menu.icon} style={'margin-right: 8px'} /> : null}
            <span slot="title">{menu.title}</span>
          </template>
          {renderMenuItem(menu.children)}
        </el-submenu>
      );
    }

    function renderMenu(menu: any) {
      return (
        <app-link to={menu.path}>
          <el-menu-item index={menu.path}>
            <template slot="title">
              {menu.icon ? <svg-icon type={menu.icon} style={'margin-right: 8px'} /> : <div class="title-icon"></div>}
              <span slot="title">{menu.title}</span>
            </template>
          </el-menu-item>
        </app-link>
      );
    }

    function renderMenuItem(children: any) {
      return children.map((row: any) => {
        if (row?.children?.length >= 1) return renderSubMenu(row);
        return renderMenu(row);
      });
    }

    return () => {
      if (props?.menu?.children?.length >= 1) return renderSubMenu(props.menu);
      return renderMenu(props.menu);
    };
  },
});

export default BasicMenus;
