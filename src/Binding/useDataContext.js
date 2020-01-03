"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DataContext_1 = require("./DataContext");
function useDataContext() {
    var dataContext = react_1.useContext(DataContext_1.DataContext);
    return dataContext;
}
exports.useDataContext = useDataContext;
//# sourceMappingURL=useDataContext.js.map