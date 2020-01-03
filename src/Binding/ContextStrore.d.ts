import React, { Context } from 'react';
import { UpdatableSource } from '../common/interfaces';
export default class ContextStore {
    store: {
        [key: string]: Context<UpdatableSource>;
    };
    createContext(contextKey: string, context: UpdatableSource): React.Context<UpdatableSource>;
    getContext(contextKey: string): React.Context<UpdatableSource>;
}
