import { defineComponent } from 'vue';
import AppLink from './app-link.vue';
import { getPath } from 'utils';
import SvgIcon from '@/components/svg-icon/index.vue';

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
    const renderMenuItem = (children: any) => {
      return children.map((row: any) => {
        if (row?.children?.length > 1) return renderSubMenu(row);
        return renderMenu(row);
      });
    };

    const renderSubMenu = (menu: any) => {
      return (
        <div>
          <el-submenu index={getPath(menu)} popper-append-to-body={true}>
            <template slot="title">
              {menu.meta.icon ? <svg-icon type={menu.meta.icon} style={'margin-right: 8px'} /> : null}
              <span slot="title">{menu.meta.title}</span>
            </template>
            {renderMenuItem(menu.children)}
          </el-submenu>
        </div>
      );
    };

    const renderMenu = (menu: any) => {
      return (
        <app-link to={getPath(menu)}>
          <el-menu-item index={getPath(menu)}>
            {menu.meta.icon ? <svg-icon type={menu.meta.icon} style={'margin-right: 8px'} /> : null}
            <span slot="title">{menu.meta.title}</span>
          </el-menu-item>
        </app-link>
      );
    };

    return () => {
      if (props?.menu?.children?.length > 1) return renderSubMenu(props.menu);
      return renderMenu(props.menu);
    };
  },
});

export default BasicMenus;
