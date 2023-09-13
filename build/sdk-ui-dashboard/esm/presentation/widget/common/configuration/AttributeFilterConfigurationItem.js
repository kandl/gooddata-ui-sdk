// (C) 2022 GoodData Corporation
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { ShortenedText } from "@gooddata/sdk-ui-kit";
import { areObjRefsEqual, isDashboardAttributeFilterReference, isInsightWidget, objRefToString, } from "@gooddata/sdk-model";
import { selectAttributeFilterDisplayFormsMap, useDashboardSelector } from "../../../../model/index.js";
import { useAttributeFilterConfigurationHandling } from "./useAttributeFilterConfigurationHandling.js";
import { useIsFilterNotApplied } from "./useIsFilterNotApplied.js";
const tooltipAlignPoints = [{ align: "cl cr", offset: { x: -20, y: 0 } }];
export const AttributeFilterConfigurationItem = (props) => {
    const { widget, displayFormRef, title } = props;
    const dfMap = useDashboardSelector(selectAttributeFilterDisplayFormsMap);
    const [isApplied, setIsApplied] = useState(() => !widget.ignoreDashboardFilters.some((reference) => {
        if (!isDashboardAttributeFilterReference(reference)) {
            return false;
        }
        const df = dfMap.get(reference.displayForm);
        return areObjRefsEqual(df === null || df === void 0 ? void 0 : df.ref, displayFormRef);
    }));
    const isFilterNotApplied = useIsFilterNotApplied(widget, displayFormRef);
    const { handleIgnoreChanged, status } = useAttributeFilterConfigurationHandling(widget, displayFormRef, setIsApplied);
    const isError = isApplied && (status === "error" || isFilterNotApplied);
    const isLoading = status === "loading";
    const classNames = cx("s-attribute-filter-by-item", `s-${stringUtils.simplifyText(title)}`, "input-checkbox-label", "filter-by-item", "attribute-filter-by-item", {
        "attribute-filter-error": isError,
    });
    const uniqueKey = objRefToString(displayFormRef);
    return (React.createElement("div", null,
        React.createElement("label", { className: classNames, htmlFor: uniqueKey },
            React.createElement("input", { id: uniqueKey, type: "checkbox", className: "input-checkbox", checked: isApplied, onChange: (e) => handleIgnoreChanged(e.target.checked) }),
            React.createElement("span", { className: "input-label-text" },
                React.createElement(ShortenedText, { tooltipAlignPoints: tooltipAlignPoints, tagName: "span", className: "title" }, title)),
            isLoading ? React.createElement("div", { className: "gd-spinner small" }) : null),
        !!isError && (React.createElement("div", { className: "gd-message error s-not-applied-attribute-filter" }, isInsightWidget(widget) ? (React.createElement(FormattedMessage, { id: "configurationPanel.vizCantBeFilteredByAttribute", values: { attributeName: title } })) : (React.createElement(FormattedMessage, { id: "configurationPanel.kpiCantBeFilteredByAttribute", values: { attributeName: title } }))))));
};
//# sourceMappingURL=AttributeFilterConfigurationItem.js.map