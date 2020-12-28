"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultiBinding = void 0;
var react_1 = require("react");
function useMultiBinding(options) {
    if (options === void 0) { options = {}; }
    var sources = options.sources;
    validateConfiguration();
    var _a = react_1.useState(resolveValue()), multiBindingValue = _a[0], setMultiBindingValue = _a[1];
    react_1.useEffect(function () {
        setMultiBindingValue(resolveValue());
    }, __spreadArrays(sources));
    function resolveValue() {
        var value = options.convert(sources.map(function (s) { return s.value; }));
        return value;
    }
    function validateConfiguration() {
        if (!sources || sources.length < 1) {
            throw new Error('The sources must contain at least one source');
        }
    }
    var multiBinding = {
        value: multiBindingValue,
        setValue: function () { }
    };
    return multiBinding;
}
exports.useMultiBinding = useMultiBinding;
//# sourceMappingURL=useMultiBinding.js.map