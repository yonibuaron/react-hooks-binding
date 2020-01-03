import { useContext } from 'react';
import { DataContext } from './DataContext';

export function useDataContext() {
  let dataContext = useContext(DataContext);
  return dataContext;
}
