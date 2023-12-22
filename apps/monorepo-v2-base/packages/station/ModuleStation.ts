import AppStation from './AppStation';

export type ModuleStation = {
  installed?: boolean;
  install(appStation: AppStation, option?: Record<string, any>): void;
} & Record<string, any>;
