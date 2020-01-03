"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var __1 = require("..");
function useMultiBidinig(source, options) {
    var _a = react_1.useState(options.defaultValue || null), bindingValue = _a[0], setBindingValue = _a[1];
    react_1.useEffect(function () {
        var newValue = resolveValue(source);
        setBindingValue(newValue);
    }, [source]);
    function resolveValue(source) {
        var value = source;
        if (options.propertyPath) {
            var paths = options.propertyPath.split('.');
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var path = paths_1[_i];
                value = value[path];
            }
        }
        if (options.converter) {
            value = options.converter(value);
        }
        return value;
    }
    function updateValue(value) {
        setBindingValue(value);
        if (options.mode == __1.BindingMode.twoWay) {
            //TODO update source
        }
    }
    return [bindingValue, setBindingValue];
}
exports.useMultiBidinig = useMultiBidinig;
function validateBindingOptions(source, options) {
    if (options.mode && options.mode == __1.BindingMode.twoWay) {
        if (source instanceof useMultiBidinig) {
            return true;
        }
        throw new Error("Mode twoWay only support source types of useBinding or useMultiBinding or useDataContext");
    }
}
//# sourceMappingURL=useMultiBindng.js.map