type APP_INFO = {
  pkg: {
    name: string;
    version: string;
  };
  lastBuildTime: string;
};

declare const __APP_INFO__: APP_INFO;
declare interface Window {
  __APP_INFO__: APP_INFO;
}

declare type Nullable<T> = T | null;
