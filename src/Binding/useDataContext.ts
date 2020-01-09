import { useContext } from 'react';
import { DataContext, DataContextStore } from './DataContext';
import { UpdatableValue } from '../common/interfaces';

export function useDataContext(dataContextKey?: string): UpdatableValue {
  let context;
  if (dataContextKey) {
    context = DataContextStore.getContext(dataContextKey);
  } else {
    context = DataContext;
  }
  return useContext(context);
}
