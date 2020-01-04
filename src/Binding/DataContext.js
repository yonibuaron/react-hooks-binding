"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    update: function (dataContext) { }
};
exports.DataContext = react_1.default.createContext(initDataContext);
function DataContextProvider(props) {
    var updateDataContext = function (dataContext) {
        setContext(function (prev) {
            return __assign(__assign({}, prev), { dataContext: dataContext });
        });
    };
    var initContext = {
        value: props.initContext,
        update: updateDataContext
    };
    var _a = react_1.useState(initContext), context = _a[0], setContext = _a[1];
    if (props.dataContextKey) {
        console.log('The key:' + props.dataContextKey);
        var contex = exports.DataContextStore.createContext(props.dataContextKey, initDataContext);
        return react_1.default.createElement(contex.Provider, { value: context },
            props.children,
            ">");
    }
    return react_1.default.createElement(exports.DataContext.Provider, { value: context }, props.children);
}
exports.DataContextProvider = DataContextProvider;
//# sourceMappingURL=DataContext.js.map