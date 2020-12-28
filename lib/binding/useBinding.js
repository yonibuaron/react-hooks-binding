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
Object.defineProperty(exports, "__esModule", { value: true });
var useDataContext_1 = require("./useDataContext");
var common_1 = require("../common");
function useBinding(options) {
    if (options === void 0) { options = {}; }
    var dataContext = useDataContext_1.useDataContext(options.contextKey);
    var source = options.source || dataContext;
    var mode = options.mode || common_1.BindingMode.oneWay;
    validateBindingConfiguration(source, options);
    function resolveValue() {
        var value = source.value;
        if (options.path) {
            var paths = options.path.split('.');
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var path = paths_1[_i];
                value = value[path];
            }
        }
        if (options.convert) {
            value = options.convert(value);
        }
        return value;
    }
    function updateBindingValue(bindingValue) {
        if (mode != common_1.BindingMode.oneWay) {
            updateSource(bindingValue);
        }
    }
    function updateSource(bindingValue) {
        var value = bindingValue;
        if (options.convertBack) {
            value = options.convertBack(source.value, value);
        }
        var updatedSourceValue = updateSourcePropertyPath(value);
        source.setValue(updatedSourceValue);
    }
    function updateSourcePropertyPath(bindingValue) {
        var target = __assign({}, source.value);
        if (options.path) {
            target[options.path] = bindingValue;
        }
        else {
            target = bindingValue;
        }
        return target;
    }
    var binding = {
        value: resolveValue(),
        setValue: updateBindingValue,
        dataContext: source,
    };
    return binding;
}
exports.useBinding = useBinding;
function validateBindingConfiguration(source, options) {
    if (!source) {
        throw new Error('The source must be defined in options or by DataContext');
    }
    if (options.mode == common_1.BindingMode.twoWay) {
        if (!source.setValue) {
            throw new Error("When use mode twoWay the source must be type of useBinding or useDataContext");
        }
    }
}
//# sourceMappingURL=useBinding.js.map