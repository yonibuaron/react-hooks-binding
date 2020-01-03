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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
exports.DataContext = react_1.default.createContext({
    value: {},
    update: function (dataContext) { }
});
function DataContextProvider(props) {
    var updateDataContext = function (dataContext) {
        setState(function (prev) {
            return __assign(__assign({}, prev), { dataContext: dataContext });
        });
    };
    var initState = {
        value: props.initContext,
        update: updateDataContext
    };
    var _a = react_1.useState(initState), state = _a[0], setState = _a[1];
    return react_1.default.createElement(exports.DataContext.Provider, { value: state }, props.children);
}
exports.DataContextProvider = DataContextProvider;
//# sourceMappingURL=DataContext.js.map