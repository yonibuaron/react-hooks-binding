import React, { useState } from 'react';

export const DataContext = React.createContext({
  value: {} as any,
  update: (dataContext: any) => {}
});

interface DataContextProps {
  children: any;
  initContext: any;
}

export function DataContextProvider(props: DataContextProps) {
  const updateDataContext = (dataContext: any) => {
    setState(prev => {
      return { ...prev, dataContext };
    });
  };

  const initState = {
    __type: 'dataContext',
    value: props.initContext,
    update: updateDataContext
  };
  const [state, setState] = useState(initState);

  return <DataContext.Provider value={state}>{props.children}</DataContext.Provider>;
}