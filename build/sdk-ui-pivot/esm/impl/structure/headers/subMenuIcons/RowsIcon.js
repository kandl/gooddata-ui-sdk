// (C) 2023 GoodData Corporation
import React from "react";
import { Icon } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
export const RowsHeaderIcon = () => {
    var _a, _b, _c, _d;
    const theme = useTheme();
    return (React.createElement("div", { className: "gd-aggregation-submenu-header-icon" },
        React.createElement(Icon.Rows, { width: 12, height: 11, colorPalette: {
                normalRow: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c7,
                totalRow: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c4,
            } })));
};
//# sourceMappingURL=RowsIcon.js.map