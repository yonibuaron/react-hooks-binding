import React, { useEffect, useState } from 'react';
import { UpdatableValue, DataContextProps } from '../common/interfaces';
import ContextStore from './ContextStrore';

export const DataContextStore = new ContextStore();

const initDataContext = {
  value: {} as any,
  setValue: (dataContext: any) => {},
} as UpdatableValue;

export const DataContext = React.createContext(initDataContext);

export function DataContextProvider(props: DataContextProps) {
  const [context, setContext] = useState(props.context);

  useEffect(() => {
    updateContext(props.context);
  }, [props.context]);

  const updateContext = (value: any) => {
    setContext(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };

  if (props.contextKey) {
    let contex = DataContextStore.createContext(props.contextKey, initDataContext);

    return <contex.Provider value={{ value: context, setValue: updateContext }}>{props.children}</contex.Provider>;
  }
  return (
    <DataContext.Provider value={{ value: context, setValue: updateContext }}>{props.children}</DataContext.Provider>
  );
}
