import loading from './loading';

export default {
  install(Vue: any) {
    Vue.directive('loading', loading);
  },
};
