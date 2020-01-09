import { useEffect, useState } from 'react';
import { MultiBindingOptions, UpdatableValue } from '../common';

export function useMultiBidinig(options: MultiBindingOptions = {} as MultiBindingOptions): UpdatableValue {
  let sources = options.sources;
  validateConfiguration();

  const [multiBindingValue, setMultiBindingValue] = useState(resolveValue());

  useEffect(() => {
    let newValue = resolveValue();
    setMultiBindingValue(newValue);
  }, [...sources]);

  function resolveValue() {
    let value = options.convert(sources.map(s => s.value));
    return value;
  }

  function validateConfiguration() {
    if (!sources || sources.length < 1) {
      throw new Error('The sources must contain at least one source');
    }
  }

  let multiBinding: UpdatableValue = {
    value: multiBindingValue,
    setValue: () => {}
  };

  return multiBinding;
}
