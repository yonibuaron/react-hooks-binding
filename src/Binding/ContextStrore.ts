import React, { Context } from 'react';
import { UpdatableValue } from '../common/interfaces';

export default class ContextStore {
  store: { [dataContextKey: string]: Context<UpdatableValue> } = {};

  createContext(dataContextKey: string, context: UpdatableValue) {
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
