"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useDataContext_1 = require("./useDataContext");
var common_1 = require("../common");
function useBidinig(options) {
    if (options === void 0) { options = {}; }
    var dataContext = useDataContext_1.useDataContext();
    var source = options.source || dataContext;
    var mode = options.mode || common_1.BindingMode.oneWay;
    var _a = react_1.useState(resolveValue()), bindingValue = _a[0], setBindingValue = _a[1];
    validateConfiguration();
    react_1.useEffect(function () {
        var newValue = resolveValue();
        setBindingValue(newValue);
    }, [source]);
    function resolveValue() {
        var value = source.value;
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
        if (mode == common_1.BindingMode.twoWay) {
            updateSource(bindingValue);
        }
    }
    function updateSource(bindingValue) {
        var value = bindingValue;
        if (options.convertBack) {
            value = options.convertBack(source.value, value);
        }
        var sourceValue = updateSourcePropertyPath(value);
        source.update(sourceValue);
    }
    function updateSourcePropertyPath(bindingValue) {
        var target = source.value;
        if (options.path) {
            var paths = options.path.split('.');
            for (var x = 0; x < paths.length; x++)
                if (x == paths.length - 1) {
                    target[paths[x]] = bindingValue;
                }
                else {
                    target = target[paths[x]];
                }
        }
        return target;
    }
    function validateConfiguration() {
        if (!source) {
            throw new Error('The source must be defined in options or by DataContext');
        }
        if (mode == common_1.BindingMode.twoWay) {
            if (!source.update) {
                throw new Error("Mode twoWay only support source types of useBinding or useMultiBinding or useDataContext");
            }
            if (!options.path && !options.convertBack) {
                throw new Error("Mode twoWay is expected at least options of propertyPath or convertBack");
            }
        }
    }
    var binding = {
        value: bindingValue,
        update: updateBindingValue
    };
    return binding;
}
exports.useBidinig = useBidinig;
//# sourceMappingURL=useBinding.js.map