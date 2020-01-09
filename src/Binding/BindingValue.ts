import { UpdatableValue } from '../common/interfaces';
export class BindingValue implements UpdatableValue {
  constructor(value: any, setValue: (value: any) => void) {
    this.value = value;
    this.setValue = setValue;
  }
  readonly value: any;
  readonly setValue: (value: any) => void;
}
