import React, { Context } from 'react';
import { UpdatableValue } from '../common/interfaces';
export default class ContextStore {
    store: {
        [dataContextKey: string]: Context<UpdatableValue>;
    };
    createContext(dataContextKey: string, context: UpdatableValue): React.Context<UpdatableValue>;
    getContext(dataContextKey: string): React.Context<UpdatableValue>;
}
