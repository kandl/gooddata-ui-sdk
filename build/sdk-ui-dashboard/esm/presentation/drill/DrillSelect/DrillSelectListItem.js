// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import compact from "lodash/compact.js";
import { Icon } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { DrillType } from "./types.js";
const DRILL_ICON_NAME = {
    [DrillType.DRILL_TO_DASHBOARD]: "DrillToDashboard",
    [DrillType.DRILL_TO_INSIGHT]: "DrillToInsight",
    [DrillType.DRILL_TO_URL]: "Hyperlink",
    [DrillType.DRILL_DOWN]: "DrillDown",
};
export const DrillSelectListItem = (props) => {
    var _a, _b;
    const theme = useTheme(props.theme);
    const { item: { name, type, drillDefinition, attributeValue }, } = props;
    const onClick = (e) => {
        e.preventDefault();
        props.onClick(drillDefinition);
    };
    const renderLoading = () => {
        return (React.createElement("div", { className: "gd-drill-to-url-modal-picker s-drill-to-url-modal-picker" },
            React.createElement("div", { className: "gd-spinner small" })));
    };
    const itemClassName = cx("gd-drill-modal-picker-list-item", "s-gd-drill-modal-picker-item", `s-${type}`);
    const IconComponent = Icon[DRILL_ICON_NAME[type]];
    const attributeLabel = attributeValue ? `(${attributeValue})` : "";
    // make sure there is no trailing space in case attributeLabel is empty
    const title = compact([name, attributeLabel]).join(" ");
    return (React.createElement("a", { onClick: onClick, className: itemClassName, title: title },
        React.createElement("div", { className: "gd-drill-modal-picker-icon-wrapper" },
            React.createElement(IconComponent, { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c5 })),
        !name ? (renderLoading()) : (React.createElement("p", null,
            name,
            attributeValue ? React.createElement("span", null,
                "\u00A0(",
                attributeValue,
                ")") : null))));
};
//# sourceMappingURL=DrillSelectListItem.js.map