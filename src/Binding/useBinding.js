import React, { useEffect, useState } from 'react';

export default function useBidinig(source, propertyPath, defaultValue) {
  const [bindingValue, setBindingValue] = useState(defaultValue);
  useEffect(() => {
    let newValue = resolveValue(source);
    setBindingValue(newValue);
  }, [source]);

  function resolveValue(source) {
    return source[propertyPath];
  }

  return [bindingValue, setBindingValue];
}
