import { BindingMode } from '..';
export interface MultiBindingOptions {
    propertyPath?: string;
    converter?(value: any): any;
    mode?: BindingMode;
    defaultValue?: any;
}
export declare function useMultiBidinig(source: any, options: MultiBindingOptions): any[];
