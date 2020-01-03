import { useEffect, useState } from 'react';
import { BindingMode } from '..';

export interface MultiBindingOptions {
  propertyPath?: string;
  converter?(value: any): any;
  mode?: BindingMode;
  defaultValue?: any;
}

export function useMultiBidinig(source: any, options: MultiBindingOptions) {
  const [bindingValue, setBindingValue] = useState(options.defaultValue || null);
  useEffect(() => {
    let newValue = resolveValue(source);
    setBindingValue(newValue);
  }, [source]);

  function resolveValue(source: any) {
    let value = source;
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

  function updateValue(value: any) {
    setBindingValue(value);
    if (options.mode == BindingMode.twoWay) {
      //TODO update source
    }
  }

  return [bindingValue, setBindingValue];
}

function validateBindingOptions(source: any, options: MultiBindingOptions) {
  if (options.mode && options.mode == BindingMode.twoWay) {
    if (source instanceof useMultiBidinig) {
      return true;
    }
    throw new Error(`Mode twoWay only support source types of useBinding or useMultiBinding or useDataContext`);
  }
}
