"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DataContext_1 = require("./DataContext");
function useDataContext(dataContextKey) {
    var context;
    if (dataContextKey) {
        console.log('useDataContext The key:' + dataContextKey);
        context = DataContext_1.DataContextStore.getContext(dataContextKey);
    }
    else {
        context = DataContext_1.DataContext;
    }
    return react_1.useContext(context);
}
exports.useDataContext = useDataContext;
//# sourceMappingURL=useDataContext.js.map