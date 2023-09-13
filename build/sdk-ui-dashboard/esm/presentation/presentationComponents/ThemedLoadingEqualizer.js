// (C) 2021 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { LoadingSpinner } from "@gooddata/sdk-ui-kit";
export const ThemedLoadingEqualizer = () => {
    var _a, _b;
    const theme = useTheme();
    return (React.createElement("div", { className: "gd-loading-equalizer-wrap" },
        React.createElement("div", { className: "gd-loading-equalizer gd-loading-equalizer-fade" },
            React.createElement(LoadingSpinner, { className: "large gd-loading-equalizer-spinner", color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c9 }),
            React.createElement(FormattedMessage, { id: "loading" }))));
};
//# sourceMappingURL=ThemedLoadingEqualizer.js.map