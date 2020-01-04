import React, { Context } from 'react';
import { UpdatableSource } from '../common/interfaces';
export default class ContextStore {
    store: {
        [dataContextKey: string]: Context<UpdatableSource>;
    };
    createContext(dataContextKey: string, context: UpdatableSource): React.Context<UpdatableSource>;
    getContext(dataContextKey: string): React.Context<UpdatableSource>;
}
