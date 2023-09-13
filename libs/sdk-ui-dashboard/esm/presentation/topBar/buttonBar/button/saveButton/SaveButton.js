// (C) 2021-2022 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../../../../dashboardContexts/index.js";
/**
 * @internal
 */
export const SaveButton = (props) => {
    const { SaveButtonComponent } = useDashboardComponentsContext();
    return React.createElement(SaveButtonComponent, Object.assign({}, props));
};
//# sourceMappingURL=SaveButton.js.map