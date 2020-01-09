import { useContext } from 'react';
import { DataContext, DataContextStore } from './DataContext';
import { UpdatableSource } from '../common/interfaces';

export function useDataContext(dataContextKey?: string): UpdatableSource {
  let context;
  if (dataContextKey) {
    context = DataContextStore.getContext(dataContextKey);
  } else {
    context = DataContext;
  }
  return useContext(context);
}
