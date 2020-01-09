import { useEffect, useState } from 'react';
import { useDataContext } from './useDataContext';
import { BindingMode, BindingOptions, UpdatableSource, SoureToTargetOptions } from '../common';
import { TargetToSoureOptions } from '../common/interfaces';

export function useBidinig(options: BindingOptions = {} as BindingOptions): UpdatableSource {
  let dataContext = useDataContext(options.contextKey);
  let source = options.source || dataContext;
  let mode = options.mode || BindingMode.oneWay;
  validateBindingConfiguration(source, options);

  let binding: UpdatableSource = {
    value: undefined,
    update: () => {}
  };

  if (mode != BindingMode.oneWayToSource) {
    binding.value = useBindingSourceToTarget({
      source: source,
      convert: options.convert,
      path: options.path
    });
  }

  if (mode != BindingMode.oneWay) {
    binding.update = useBindingTragetToSource({
      source: source,
      convertBack: options.convertBack,
      path: options.path
    });
  }

  return binding;
}

function useBindingSourceToTarget(options: SoureToTargetOptions) {
  let source = options.source;
  const [bindingValue, setBindingValue] = useState(resolveValue());

  useEffect(() => {
    let newValue = resolveValue();
    setBindingValue(newValue);
  }, [source]);

  function resolveValue() {
    let value = source.value || source;
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

  return bindingValue;
}

function useBindingTragetToSource(options: TargetToSoureOptions) {
  let source = options.source;
  const [bindingValue, setBindingValue] = useState();

  useEffect(() => {
    updateSource(bindingValue);
  }, [bindingValue]);

  function updateBindingValue(bindingValue: any) {
    setBindingValue(bindingValue);
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
  return updateBindingValue;
}

function validateBindingConfiguration(source: any, options: BindingOptions) {
  if (!source) {
    throw new Error('The source must be defined in options or by DataContext');
  }

  if (options.mode == BindingMode.twoWay) {
    if (!source.update) {
      throw new Error(`When use mode twoWay the source must be type of useBinding or useDataContext`);
    }
  }
}
