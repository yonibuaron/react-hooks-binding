"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DataContext_1 = require("./DataContext");
function useDataContext(key) {
    var context = DataContext_1.DataContext;
    if (key) {
        context = DataContext_1.DataContextStore.getContext(key);
    }
    return react_1.useContext(context);
}
exports.useDataContext = useDataContext;
//# sourceMappingURL=useDataContext.js.map