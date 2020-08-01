import React from 'react';
import { UpdatableValue, DataContextProps } from '../common/interfaces';
import ContextStore from './ContextStrore';
export declare const DataContextStore: ContextStore;
export declare const DataContext: React.Context<UpdatableValue>;
export declare function DataContextProvider(props: DataContextProps): JSX.Element;
