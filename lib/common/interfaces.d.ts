import { BindingMode } from '.';
export interface BindingOptions {
    source?: UpdatableValue;
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
    source: UpdatableValue;
    path?: string;
    convertBack?(dataContext: any, value: any): any;
}
export interface MultiBindingOptions {
    sources: UpdatableValue[];
    convert(values: any[]): any;
}
export interface UpdatableValue {
    value: any;
    setValue: (value: any) => void;
}
export interface DataContextProps {
    children: any;
    context: any;
    contextKey?: string;
}
