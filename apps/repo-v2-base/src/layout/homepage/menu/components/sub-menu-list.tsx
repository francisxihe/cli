import { useRoute } from 'vue-router/composables';
import { defineComponent, ref, watch } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import AppLink from './app-link.vue';

export default defineComponent({
  name: 'SubMenuList',
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
    const route = useRoute();
    const menuObj = ref({});
    watch(
      () => props.menu,
      val => {
        menuObj.value = { ...val };
      },
      {
        immediate: true,
      },
    );

    const renderChildren = (children: any) => {
      return children.map((row: any) => {
        if (row?.children?.length > 1) return renderSubMenu(row);
        return renderMenuItem(row);
      });
    };

    function renderMenuItem(row: any) {
      return (
        <app-link to={row.path}>
          <el-menu-item index={row.path} style={route.path === row.path ? `color:#409EFF` : ''}>
            {row.meta.icon ? <svg-icon type={row.meta.icon} style={'margin-right: 8px'} /> : null}
            <span slot="title">{row.meta.title}</span>
          </el-menu-item>
        </app-link>
      );
    }

    function renderSubMenu(menu: any) {
      return (
        <div>
          <el-submenu index={menu.path} popper-append-to-body={true}>
            <template slot="title">
              {menu.meta.icon ? <svg-icon type={menu.meta.icon} style={'margin-right: 8px'} /> : null}
              <span slot="title">{menu.meta.title}</span>
            </template>
            {renderChildren(menu.children)}
          </el-submenu>
        </div>
      );
    }

    const renderMenu = (menu: any) => {
      return (
        // <el-menu default-openeds={handleOpenSubMenu()}>
        <el-menu>
          {menu.children.map((row: any) => {
            if (row?.children?.length > 1) return renderSubMenu(row);
            return renderMenuItem(row);
          })}
        </el-menu>
      );
    };

    // TODO: 处理展开的子菜单
    // const handleOpenSubMenu = () => {
    //   console.log(route);
    //   return ['/center/info/menu1/menu1-1'];
    // };

    return () => renderMenu(menuObj.value);
  },
});
