import { MonorepoConfig } from './monorepo';
import { RepoConfig } from './repo';

export enum EProjectType {
  tsc = 'typescript',
  monorepo = 'monorepo',
  repo = 'repo',
}

export type ProjectCommonConfig = {
  projectType: EProjectType;
  targetDir: string;
  forceOverwrite: boolean;
  projectName: string;
};

export type ProjectConfig = ProjectCommonConfig | MonorepoConfig | RepoConfig;
