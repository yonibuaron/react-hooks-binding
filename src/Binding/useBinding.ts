import { useEffect, useState } from 'react';
import { useDataContext } from './useDataContext';
import { BindingMode, BindingOptions, UpdatableValue } from '../common';

export function useBinding(options: BindingOptions = {} as BindingOptions): UpdatableValue {
  let dataContext = useDataContext(options.contextKey);
  let source = options.source || dataContext;
  let mode = options.mode || BindingMode.oneWay;
  const [bindingValue, setBindingValue] = useState(resolveValue());

  validateBindingConfiguration(source, options);

  if (mode != BindingMode.oneWayToSource) {
    useEffect(() => {
      let newValue = resolveValue();
      setBindingValue(newValue);
    }, [source]);
  }

  function resolveValue() {
    let value = source.value;
    if (options.path) {
      let paths = options.path.split('.');
      for (let path of paths) {
        value = value[path];
      }
    }
    if (options.convert) {
      value = options.convert(value);
    }
    return value;
  }

  function updateBindingValue(bindingValue: any) {
    setBindingValue(bindingValue);
    if (mode != BindingMode.oneWay) {
      updateSource(bindingValue);
    }
  }

  function updateSource(bindingValue: any) {
    let value = bindingValue;
    if (options.convertBack) {
      value = options.convertBack(source.value, value);
    }
    let updatedSourceValue = updateSourcePropertyPath(value);
    source.setValue(updatedSourceValue);
  }

  function updateSourcePropertyPath(bindingValue: any) {
    let target = { ...source.value };
    if (options.path) {
      target[options.path] = bindingValue;
      // let paths = options.path.split('.');
      // for (let x = 0; x < paths.length; x++)
      //   if (x == paths.length - 1) {
      //   } else {
      //     target = target[paths[x]];
      //   }
    }
    return target;
  }

  let binding: UpdatableValue = {
    value: bindingValue,
    setValue: updateBindingValue,
  };

  return binding;
}

function validateBindingConfiguration(source: any, options: BindingOptions) {
  if (!source) {
    throw new Error('The source must be defined in options or by DataContext');
  }

  if (options.mode == BindingMode.twoWay) {
    if (!source.setValue) {
      throw new Error(`When use mode twoWay the source must be type of useBinding or useDataContext`);
    }
  }
}
