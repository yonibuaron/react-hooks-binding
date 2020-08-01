import { UpdatableValue } from '../common/interfaces';
export declare class BindingValue implements UpdatableValue {
    constructor(value: any, setValue: (value: any) => void);
    readonly value: any;
    readonly setValue: (value: any) => void;
}
