import { useEffect, useState } from "react";
import { useDataContext } from "./useDataContext";
import { BindingMode, BindingOptions, UpdatableValue } from "../common";

export function useBinding(
  options: BindingOptions = {} as BindingOptions
): UpdatableValue {
  let dataContext = useDataContext(options.contextKey);
  let mode = options.mode || BindingMode.oneWay;
  validateBindingConfiguration(dataContext, options);

  function resolveValue() {
    let value = dataContext.value;
    if (options.path) {
      let paths = options.path.split(".");
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
    if (mode != BindingMode.oneWay) {
      updateSource(bindingValue);
    }
  }

  function updateSource(bindingValue: any) {
    let value = bindingValue;
    if (options.convertBack) {
      value = options.convertBack(dataContext.value, value);
    }
    let updatedSourceValue = updateSourcePropertyPath(value);
    dataContext.setValue(updatedSourceValue);
  }

  function updateSourcePropertyPath(bindingValue: any) {
    let target = { ...dataContext.value };
    if (options.path) {
      target[options.path] = bindingValue;
    } else {
      target = bindingValue;
    }
    return target;
  }

  let binding: UpdatableValue = {
    value: resolveValue(),
    setValue: updateBindingValue,
    dataContext: dataContext,
  };

  return binding;
}

function validateBindingConfiguration(source: any, options: BindingOptions) {
  if (!source) {
    throw new Error("The source must be defined in options or by DataContext");
  }

  if (options.mode == BindingMode.twoWay) {
    if (!source.setValue) {
      throw new Error(
        `When use mode twoWay the source must be type of useBinding or useDataContext`
      );
    }
  }
}
