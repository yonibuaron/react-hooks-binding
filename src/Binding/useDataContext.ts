import { useContext } from 'react';
import { DataContext, DataContextStore } from './DataContext';
import { UpdatableSource } from '../common/interfaces';

export function useDataContext(key?: string): UpdatableSource {
  let context = DataContext;
  if (key) {
    context = DataContextStore.getContext(key);
  }
  return useContext(context);
}
