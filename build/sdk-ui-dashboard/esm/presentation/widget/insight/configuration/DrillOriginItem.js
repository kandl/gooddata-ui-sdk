// (C) 2019-2022 GoodData Corporation
import React from "react";
import { Button } from "@gooddata/sdk-ui-kit";
import { selectEnableRenamingMeasureToMetric, useDashboardSelector } from "../../../../model/index.js";
export const DrillOriginItem = ({ localIdentifier, onDelete, title, type, isDateAttribute, }) => {
    const onClick = () => {
        onDelete(localIdentifier);
    };
    const shouldRenameMeasureToMetric = useDashboardSelector(selectEnableRenamingMeasureToMetric);
    const iconType = isDateAttribute
        ? "date"
        : shouldRenameMeasureToMetric && type === "measure"
            ? "metric"
            : type;
    const iconClassName = `dm-button-icon dm-button-icon-${iconType}`;
    return (React.createElement("div", { className: "gd-drill-config-measure-item" },
        React.createElement("div", { className: iconClassName }),
        React.createElement("div", { className: "dm-button-title s-drill-config-item-title", title: title }, title),
        React.createElement("div", { className: "dm-button-delete-wrapper" },
            React.createElement(Button, { className: "drill-config-item-delete gd-button-link gd-button-icon-only gd-icon-cross s-drill-config-item-delete", onClick: onClick }))));
};
//# sourceMappingURL=DrillOriginItem.js.map