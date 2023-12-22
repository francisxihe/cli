let _props: any;

export function getMainProps() {
  return _props;
}

export function useMicroApp(render: any, instance: any) {
  async function bootstrap() {}

  async function mount(props: any) {
    _props = props;
    localStorage.setItem('token', props.token);
    render(props); // 从qiankun启动
  }

  // async function unmount(props: any) {
  //   try {
  //     instance.$destroy(); // 销毁子应用实例
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function update(props: any) {
    render(props); // 从qiankun启动
  }

  return {
    bootstrap,
    mount,
    // unmount,
    update,
  };
}
