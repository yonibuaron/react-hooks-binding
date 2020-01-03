"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useDataContext_1 = require("./useDataContext");
var BindingMode;
(function (BindingMode) {
    BindingMode[BindingMode["oneWay"] = 0] = "oneWay";
    BindingMode[BindingMode["twoWay"] = 1] = "twoWay";
})(BindingMode = exports.BindingMode || (exports.BindingMode = {}));
function useBidinig(options) {
    if (options === void 0) { options = {}; }
    var dataContext = useDataContext_1.useDataContext();
    var source = options.source || dataContext;
    var _a = react_1.useState(resolveValue()), bindingValue = _a[0], setBindingValue = _a[1];
    validateBindingOptions(source, options);
    if (!source) {
        throw new Error('The source must be defined in options or by DataContext');
    }
    react_1.useEffect(function () {
        var newValue = resolveValue();
        setBindingValue(newValue);
    }, [source]);
    function resolveValue() {
        var value = source.value ? source.value : source;
        if (options.path) {
            var paths = options.path.split('.');
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
    function updateBindingValue(bindingValue) {
        setBindingValue(bindingValue);
        if (options.mode == BindingMode.twoWay) {
            updateSource(bindingValue);
        }
    }
    function updateSource(bindingValue) {
        var value = bindingValue;
        if (options.convertBack) {
            value = options.convertBack(source.value, value);
        }
        var sourceValue = source.value;
        if (options.path) {
            sourceValue[options.path] = value;
        }
        else {
            sourceValue = value;
        }
        source.update(sourceValue);
    }
    var binding = {
        __type: 'binding',
        value: bindingValue,
        update: updateBindingValue
    };
    return binding;
}
exports.useBidinig = useBidinig;
function validateBindingOptions(source, options) {
    if (options.mode && options.mode == BindingMode.twoWay) {
        if (!source.update) {
            throw new Error("Mode twoWay only support source types of useBinding or useMultiBinding or useDataContext");
        }
        if (!options.path && !options.convertBack) {
            throw new Error("Mode twoWay is expected at least options of propertyPath or convertBack");
        }
    }
}
//# sourceMappingURL=useBinding.js.map