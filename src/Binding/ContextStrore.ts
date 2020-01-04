import React, { Context } from 'react';
import { UpdatableSource } from '../common/interfaces';

export default class ContextStore {
  store: { [dataContextKey: string]: Context<UpdatableSource> } = {};

  createContext(dataContextKey: string, context: UpdatableSource) {
    if (this.store[dataContextKey]) {
      return this.getContext(dataContextKey);
    }
    this.store[dataContextKey] = React.createContext(context);
    console.log('Added context to Store');
    return this.store[dataContextKey];
  }

  getContext(dataContextKey: string) {
    if (!this.store[dataContextKey]) {
      console.log('Store: ' + JSON.stringify(this.store));
      throw new Error('Data context key not found');
    }
    return this.store[dataContextKey];
  }
}
