import React, { useState } from 'react';
import { UpdatableValue, DataContextProps } from '../common/interfaces';
import ContextStore from './ContextStrore';

export const DataContextStore = new ContextStore();

const initDataContext = {
  value: {} as any,
  setValue: (dataContext: any) => {}
} as UpdatableValue;

export const DataContext = React.createContext(initDataContext);

export function DataContextProvider(props: DataContextProps) {
  const updateContext = (context: any) => {
    setContext(prev => {
      //TODO deap equal check to prevert rerender
      // if (prev.value == context) {
      //   return prev;
      // }
      return {
        value: props.context,
        setValue: updateContext
      };
    });
    //source is updatable value, propagation the value.
    if (props.context.setValue) {
      props.context.setValue(context);
    }
  };

  const [context, setContext] = useState({
    value: props.context.value ? props.context.value : props.context,
    setValue: updateContext
  });

  if (props.contextKey) {
    let contex = DataContextStore.createContext(props.contextKey, initDataContext);
    return <contex.Provider value={context}>{props.children}></contex.Provider>;
  }
  return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>;
}
