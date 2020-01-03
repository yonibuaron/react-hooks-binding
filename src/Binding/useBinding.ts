import { useEffect, useState } from 'react';
import { useDataContext } from './useDataContext';
import { BindingMode, BindingOptions, UpdatableSource } from '../common';

export function useBidinig(options: BindingOptions = {} as BindingOptions): UpdatableSource {
  let dataContext = useDataContext(options.sourceKey);
  let source = options.source || dataContext;
  let mode = options.mode || BindingMode.oneWay;
  const [bindingValue, setBindingValue] = useState(resolveValue());

  validateConfiguration();

  useEffect(() => {
    let newValue = resolveValue();
    setBindingValue(newValue);
  }, [source]);

  function resolveValue() {
    let value = source.value;
    if (options.path) {
      let paths = options.path.split('.');
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
    if (mode == BindingMode.twoWay) {
      updateSource(bindingValue);
    }
  }

  function updateSource(bindingValue: any) {
    let value = bindingValue;
    if (options.convertBack) {
      value = options.convertBack(source.value, value);
    }
    let sourceValue = updateSourcePropertyPath(value);
    source.update(sourceValue);
  }

  function updateSourcePropertyPath(bindingValue: any) {
    let target = source.value;
    if (options.path) {
      let paths = options.path.split('.');
      for (let x = 0; x < paths.length; x++)
        if (x == paths.length - 1) {
          target[paths[x]] = bindingValue;
        } else {
          target = target[paths[x]];
        }
    }
    return target;
  }

  function validateConfiguration() {
    if (!source) {
      throw new Error('The source must be defined in options or by DataContext');
    }

    if (mode == BindingMode.twoWay) {
      if (!source.update) {
        throw new Error(`Mode twoWay only support source types of useBinding or useMultiBinding or useDataContext`);
      }
      if (!options.path && !options.convertBack) {
        throw new Error(`Mode twoWay is expected at least options of propertyPath or convertBack`);
      }
    }
  }

  let binding: UpdatableSource = {
    value: bindingValue,
    update: updateBindingValue
  };

  return binding;
}
