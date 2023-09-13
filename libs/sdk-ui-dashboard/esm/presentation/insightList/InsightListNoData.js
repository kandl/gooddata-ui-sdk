// (C) 2022-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { Button } from "@gooddata/sdk-ui-kit";
export const InsightListNoData = ({ hasNoMatchingData, isUserInsights, showNoDataCreateButton, onCreateButtonClick, }) => {
    return (React.createElement("div", { className: cx("gd-visualizations-list-no-data", "gd-no-data", {
            "gd-visualization-list-not-found": hasNoMatchingData,
        }) }, hasNoMatchingData ? (React.createElement("span", { className: "s-visualization-list-no-data-message" },
        React.createElement(FormattedMessage, { id: "visualizationsList.noVisualizationsFound" }))) : (React.createElement(React.Fragment, null,
        React.createElement("span", { className: "s-visualization-list-no-data-message" }, isUserInsights ? (React.createElement(FormattedMessage, { id: "visualizationsList.noUserInsights" })) : (React.createElement(FormattedMessage, { id: "visualizationsList.noInsights" }))),
        " ",
        showNoDataCreateButton ? (React.createElement(Button, { className: "gd-button-link s-create-new-insight", tagName: "a", onClick: onCreateButtonClick, value: React.createElement(FormattedMessage, { id: "visualizationsList.create" }) })) : null))));
};
//# sourceMappingURL=InsightListNoData.js.map