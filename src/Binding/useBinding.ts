import { useEffect, useState } from 'react';
import { useDataContext } from './useDataContext';

export enum BindingMode {
  oneWay,
  twoWay
}

export interface BindingOptions {
  source: any;
  propertyPath?: string;
  converter?(value: any): any;
  convertBack?(dataContext: any, value: any): any;
  mode?: BindingMode;
  defaultValue?: any;
}

export function useBidinig(options: BindingOptions = {} as BindingOptions) {
  let dataContext = useDataContext();
  let source = options.source || dataContext;
  const [bindingValue, setBindingValue] = useState(resolveValue());
  if (!validateBindingOptions) {
    return;
  }

  if (!source) {
    throw new Error('The source must be defined in options or by DataContext');
  }

  useEffect(() => {
    let newValue = resolveValue();
    setBindingValue(newValue);
  }, [source]);

  function resolveValue() {
    let value = source.value ? source.value : source;
    if (options.propertyPath) {
      let paths = options.propertyPath.split('.');
      for (let path of paths) {
        value = value[path];
      }
    }
    if (options.converter) {
      value = options.converter(value);
    }

    return value;
  }

  function updateBindingValue(bindingValue: any) {
    setBindingValue(bindingValue);
    if (options.mode == BindingMode.twoWay) {
      updateSource(bindingValue);
    }
  }

  function updateSource(bindingValue: any) {
    let value = bindingValue;
    if (options.convertBack) {
      value = options.convertBack(source.value, value);
    }
    let sourceValue = source.value;
    if (options.propertyPath) {
      sourceValue[options.propertyPath] = value;
    } else {
      sourceValue = value;
    }
    source.update(sourceValue);
  }

  let binding = {
    __type: 'binding',
    value: bindingValue,
    update: updateBindingValue
  };

  return binding;
}

function validateBindingOptions(source: any, options: BindingOptions) {
  if (options.mode && options.mode == BindingMode.twoWay) {
    if (!source.update) {
      throw new Error(`Mode twoWay only support source types of useBinding or useMultiBinding or useDataContext`);
    }
    if (!options.propertyPath && !options.convertBack) {
      throw new Error(`Mode twoWay is expected at least options of propertyPath or convertBack`);
    }
  }
  return true;
}
