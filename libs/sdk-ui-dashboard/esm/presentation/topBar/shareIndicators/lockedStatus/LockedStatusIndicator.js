// (C) 2021-2022 GoodData Corporation
import React from "react";
import { BubbleHoverTrigger, Bubble, Icon } from "@gooddata/sdk-ui-kit";
import { FormattedMessage } from "react-intl";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { gdColorStateBlank } from "../../../constants/colors.js";
/**
 * @alpha
 */
export const LockedStatusIndicator = (props) => {
    var _a, _b, _c;
    const theme = useTheme();
    if (!props.isLocked) {
        return null;
    }
    return (React.createElement("div", { className: "s-locked-status gd-locked-status" },
        React.createElement(BubbleHoverTrigger, null,
            React.createElement(Icon.Lock, { className: "gd-icon-locked", width: 25, height: 24, color: (_c = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c6) !== null && _c !== void 0 ? _c : gdColorStateBlank }),
            React.createElement(Bubble, { alignPoints: [{ align: "bc tl" }], alignTo: `.gd-icon-locked` },
                React.createElement(FormattedMessage, { id: "header.lockStatus.tooltip", values: { b: (chunks) => React.createElement("b", null, chunks) } })))));
};
//# sourceMappingURL=LockedStatusIndicator.js.map