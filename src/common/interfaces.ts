import { BindingMode } from '.';

export interface BindingOptions {
  source?: UpdatableSource;
  contextKey?: string;
  path?: string;
  convert?(value: any): any;
  convertBack?(dataContext: any, value: any): any;
  mode?: BindingMode;
}

export interface SoureToTargetOptions {
  source: any;
  path?: string;
  convert?(value: any): any;
}

export interface TargetToSoureOptions {
  source: UpdatableSource;
  path?: string;
  convertBack?(dataContext: any, value: any): any;
}

export interface MultiBindingOptions {
  sources: UpdatableSource[];
  convert(values: any[]): any;
}
export interface UpdatableSource {
  value: any;
  update: (value: any) => void;
}

export interface DataContextProps {
  children: any;
  initContext: any;
  contextKey?: string;
}
