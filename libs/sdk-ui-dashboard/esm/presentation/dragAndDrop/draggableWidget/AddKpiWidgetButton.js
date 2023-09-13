// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
export const AddKpiWidgetButton = ({ disabled }) => {
    return (React.createElement("div", { className: cx("add-item-placeholder", "add-kpi-placeholder", "s-add-kpi", { disabled }) },
        React.createElement(FormattedMessage, { id: "addPanel.kpi" })));
};
//# sourceMappingURL=AddKpiWidgetButton.js.map