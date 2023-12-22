import { ModuleStation } from './ModuleStation';
import VueRouter from 'vue-router';
import { Pinia } from 'pinia';

export default class AppStation {
  name: string;

  getRouter: () => VueRouter;

  getStore: () => Pinia;

  plugins: Record<string, any> = {};

  modules: Record<string, Map<string, any>> = {};

  packages: Record<string, any> = {};

  constructor({ name, getRouter, getStore }: { name: string; getRouter: () => VueRouter; getStore: () => Pinia }) {
    this.name = name;
    this.getRouter = getRouter;
    this.getStore = getStore;
  }

  registerPlugins(plugins: Record<string, any>) {
    Object.keys(plugins).forEach((key) => {
      this.plugins[key] = plugins[key];
    });
  }

  useModule = (module: ModuleStation, options?: Record<string, any>) => {
    // 避免重复安装插件
    if (module.installed) {
      return;
    }

    // 如果插件包含 install 方法，则调用该方法
    if (typeof module.install === 'function') {
      module.install(this, options);
    }

    // 标记该插件已经安装过
    module.installed = true;
  };

  usePackage = (pkg: ModuleStation, options?: Record<string, any>) => {
    // 避免重复安装插件
    if (pkg.installed) {
      return;
    }

    // 如果插件包含 install 方法，则调用该方法
    if (typeof pkg.install === 'function') {
      pkg.install(this, options);
    }

    // 标记该插件已经安装过
    pkg.installed = true;
  };

  registerModuleComponent(moduleName: string, component: Record<string, any>) {
    if (this.modules[moduleName]) {
      console.error(`${moduleName}存在重名Module`);
      return;
    }

    const map = new Map();
    Object.keys(component).forEach((key) => {
      map.set(key, component[key]);
    });
    this.modules[moduleName] = map;
  }

  getModuleComponent(moduleName: string, componentName: string) {
    if (!this.modules[moduleName]) {
      console.error(`Module ${moduleName}不存在`);
      return;
    }

    return this.modules[moduleName].get(componentName) || console.error(`Module ${moduleName}中不存在${componentName}`);
  }
}
