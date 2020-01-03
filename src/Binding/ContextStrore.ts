import React, { Context } from 'react';
import { UpdatableSource } from '../common/interfaces';

export default class ContextStore {
  store: { [key: string]: Context<UpdatableSource> } = {};

  createContext(contextKey: string, context: UpdatableSource) {
    if (this.store[contextKey]) {
      throw new Error('Data context already in used');
    }
    this.store[contextKey] = React.createContext(context);
    return this.store[contextKey];
  }

  getContext(contextKey: string) {
    if (!this.store[contextKey]) {
      throw new Error('Data context key not found');
    }
    return this.store[contextKey];
  }
}
