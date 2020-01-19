import { useContext } from 'react';
import { InternalContext, DataContextStore } from './DataContext';
import { UpdatableValue } from '../common/interfaces';

export function useDataContext(dataContextKey?: string): UpdatableValue {
  let context;
  if (dataContextKey) {
    context = DataContextStore.getContext(dataContextKey);
  } else {
    context = InternalContext;
  }
  return useContext(context);
}
