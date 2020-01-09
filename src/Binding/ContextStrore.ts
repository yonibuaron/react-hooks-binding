import React, { Context } from 'react';
import { UpdatableSource } from '../common/interfaces';

export default class ContextStore {
  store: { [dataContextKey: string]: Context<UpdatableSource> } = {};

  createContext(dataContextKey: string, context: UpdatableSource) {
    if (this.store[dataContextKey]) {
      return this.getContext(dataContextKey);
    }
    this.store[dataContextKey] = React.createContext(context);
    return this.store[dataContextKey];
  }

  getContext(dataContextKey: string) {
    if (!this.store[dataContextKey]) {
      throw new Error('Data context key not found');
    }
    return this.store[dataContextKey];
  }
}
