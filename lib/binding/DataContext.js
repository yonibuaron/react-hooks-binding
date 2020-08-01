"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ContextStrore_1 = __importDefault(require("./ContextStrore"));
exports.DataContextStore = new ContextStrore_1.default();
var initDataContext = {
    value: {},
    setValue: function (dataContext) { }
};
exports.DataContext = react_1.default.createContext(initDataContext);
function DataContextProvider(props) {
    var updateContext = function (context) {
        setContext(function (prev) {
            //TODO deap equal check to prevert rerender
            // if (prev.value == context) {
            //   return prev;
            // }
            return {
                value: props.context,
                setValue: updateContext
            };
        });
        //source is updatable value, propagation the value.
        if (props.context.setValue) {
            props.context.setValue(context);
        }
    };
    var _a = react_1.useState({
        value: props.context.value ? props.context.value : props.context,
        setValue: updateContext
    }), context = _a[0], setContext = _a[1];
    if (props.contextKey) {
        var contex = exports.DataContextStore.createContext(props.contextKey, initDataContext);
        return react_1.default.createElement(contex.Provider, { value: context }, props.children);
    }
    return react_1.default.createElement(exports.DataContext.Provider, { value: context }, props.children);
}
exports.DataContextProvider = DataContextProvider;
//# sourceMappingURL=DataContext.js.map