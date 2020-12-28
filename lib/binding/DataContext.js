"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataContextProvider = exports.DataContext = exports.DataContextStore = void 0;
var react_1 = __importStar(require("react"));
var ContextStrore_1 = __importDefault(require("./ContextStrore"));
exports.DataContextStore = new ContextStrore_1.default();
var initDataContext = {
    value: {},
    setValue: function (dataContext) { },
};
exports.DataContext = react_1.default.createContext(initDataContext);
function DataContextProvider(props) {
    var _a = react_1.useState(props.context), context = _a[0], setContext = _a[1];
    var updateContext = function (value) {
        setContext(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };
    if (props.contextKey) {
        var contex = exports.DataContextStore.createContext(props.contextKey, initDataContext);
        return (react_1.default.createElement(contex.Provider, { value: { value: context, setValue: updateContext } }, props.children));
    }
    return (react_1.default.createElement(exports.DataContext.Provider, { value: { value: context, setValue: updateContext } }, props.children));
}
exports.DataContextProvider = DataContextProvider;
//# sourceMappingURL=DataContext.js.map