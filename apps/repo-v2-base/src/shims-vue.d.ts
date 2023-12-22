declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare type Recordable<T = any> = Record<string, T>;
