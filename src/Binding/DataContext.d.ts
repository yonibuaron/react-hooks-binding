import React from 'react';
import { UpdatableSource, DataContextProps } from '../common/interfaces';
import ContextStore from './ContextStrore';
export declare const DataContextStore: ContextStore;
export declare const DataContext: React.Context<UpdatableSource>;
export declare function DataContextProvider(props: DataContextProps): JSX.Element;
