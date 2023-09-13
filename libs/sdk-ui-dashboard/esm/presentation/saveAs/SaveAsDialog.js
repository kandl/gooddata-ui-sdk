// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../dashboardContexts/index.js";
/**
 * @internal
 */
export const SaveAsDialog = (props) => {
    const { SaveAsDialogComponent } = useDashboardComponentsContext();
    return React.createElement(SaveAsDialogComponent, Object.assign({}, props));
};
//# sourceMappingURL=SaveAsDialog.js.map