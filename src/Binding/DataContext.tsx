import React, { useState } from 'react';
import { UpdatableSource, DataContextProps } from '../common/interfaces';

export const DataContext = React.createContext({
  value: {} as any,
  update: (dataContext: any) => {}
} as UpdatableSource);

export function DataContextProvider(props: DataContextProps) {
  const updateDataContext = (dataContext: any) => {
    setState(prev => {
      return { ...prev, dataContext };
    });
  };

  const initState: UpdatableSource = {
    value: props.initContext,
    update: updateDataContext
  };
  const [state, setState] = useState(initState);

  return <DataContext.Provider value={state}>{props.children}</DataContext.Provider>;
}
