import React, { useState } from 'react';
import { UpdatableSource, DataContextProps } from '../common/interfaces';
import ContextStore from './ContextStrore';

export const DataContextStore = new ContextStore();

const initDataContext = {
  value: {} as any,
  update: (dataContext: any) => {}
} as UpdatableSource;

export const DataContext = React.createContext(initDataContext);

export function DataContextProvider(props: DataContextProps) {
  const updateDataContext = (dataContext: any) => {
    setContext(prev => {
      return { ...prev, dataContext };
    });
  };

  const initContext: UpdatableSource = {
    value: props.initContext,
    update: updateDataContext
  };
  const [context, setContext] = useState(initContext);

  if (props.contextKey) {
    let contex = DataContextStore.createContext(props.contextKey, initDataContext);
    return <contex.Provider value={context}>{props.children}></contex.Provider>;
  }
  return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>;
}
