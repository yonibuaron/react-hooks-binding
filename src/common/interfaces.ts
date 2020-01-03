import { BindingMode } from '.';

export interface BindingOptions {
  source?: UpdatableSource;
  sourceKey?: string;
  path?: string;
  converter?(value: any): any;
  convertBack?(dataContext: any, value: any): any;
  mode?: BindingMode;
}

export interface MultiBindingOptions {
  sources: UpdatableSource[];
  converter(values: any[]): any;
}
export interface UpdatableSource {
  value: any;
  update: (value: any) => void;
}

export interface DataContextProps {
  children: any;
  initContext: any;
  key?: string;
}
