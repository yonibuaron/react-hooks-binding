export declare enum BindingMode {
    oneWay = 0,
    twoWay = 1
}
export interface BindingOptions {
    source?: any;
    path?: string;
    converter?(value: any): any;
    convertBack?(dataContext: any, value: any): any;
    mode?: BindingMode;
    defaultValue?: any;
}
export interface UpdatableValue {
    __type: string;
    value: any;
    update: (value: any) => void;
}
export declare function useBidinig(options?: BindingOptions): UpdatableValue;
