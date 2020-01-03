import { useContext } from 'react';
import { DataContext } from './DataContext';
import { UpdatableSource } from '../common/interfaces';

export function useDataContext(): UpdatableSource {
  return useContext(DataContext);
}
