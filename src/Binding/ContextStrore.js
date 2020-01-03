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
    ContextStore.prototype.createContext = function (contextKey, context) {
        if (this.store[contextKey]) {
            throw new Error('Data context already in used');
        }
        this.store[contextKey] = react_1.default.createContext(context);
        return this.store[contextKey];
    };
    ContextStore.prototype.getContext = function (contextKey) {
        if (!this.store[contextKey]) {
            throw new Error('Data context key not found');
        }
        return this.store[contextKey];
    };
    return ContextStore;
}());
exports.default = ContextStore;
//# sourceMappingURL=ContextStrore.js.map