"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ContextStore = /** @class */ (function () {
    function ContextStore() {
        this.store = {};
    }
    ContextStore.prototype.createContext = function (dataContextKey, context) {
        if (this.store[dataContextKey]) {
            return this.getContext(dataContextKey);
        }
        this.store[dataContextKey] = react_1.default.createContext(context);
        console.log('Added context to Store');
        return this.store[dataContextKey];
    };
    ContextStore.prototype.getContext = function (dataContextKey) {
        if (!this.store[dataContextKey]) {
            console.log('Store: ' + JSON.stringify(this.store));
            throw new Error('Data context key not found');
        }
        return this.store[dataContextKey];
    };
    return ContextStore;
}());
exports.default = ContextStore;
//# sourceMappingURL=ContextStrore.js.map