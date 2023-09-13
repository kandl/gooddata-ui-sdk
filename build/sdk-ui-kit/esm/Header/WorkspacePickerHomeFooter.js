// (C) 2020-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { withTheme } from "@gooddata/sdk-ui-theme-provider";
import { Icon } from "../Icon/index.js";
const WorkspacePickerHomeFooterComponent = ({ children, className, href, onClick, theme, }) => {
    var _a, _b;
    const mergedClassNames = cx("gd-workspace-picker-home-footer", className);
    return (React.createElement("a", { role: "icon-home", className: mergedClassNames, href: href, onClick: onClick },
        React.createElement(Icon.Home, { className: "gd-icon-home", width: 20, height: 20, color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c7 }),
        children));
};
/**
 * @internal
 */
export const WorkspacePickerHomeFooter = withTheme(WorkspacePickerHomeFooterComponent);
//# sourceMappingURL=WorkspacePickerHomeFooter.js.map