// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { widgetRef, } from "@gooddata/sdk-model";
import { changeKpiWidgetComparison, useDashboardDispatch } from "../../../../../model/index.js";
import { KpiComparisonTypeDropdown } from "./KpiComparisonTypeDropdown.js";
import { KpiComparisonDirectionDropdown } from "./KpiComparisonDirectionDropdown.js";
export const KpiComparison = (props) => {
    const { widget } = props;
    const ref = widgetRef(widget);
    const comparisonDirection = widget.kpi.comparisonDirection;
    const comparisonType = widget.kpi.comparisonType;
    const dispatch = useDashboardDispatch();
    const handleComparisonTypeChanged = useCallback((newComparisonType) => {
        dispatch(changeKpiWidgetComparison(ref, {
            comparisonDirection,
            comparisonType: newComparisonType,
        }));
    }, [dispatch, ref, comparisonDirection]);
    const handleComparisonDirectionChanged = useCallback((newComparisonDirection) => {
        dispatch(changeKpiWidgetComparison(ref, {
            comparisonType,
            comparisonDirection: newComparisonDirection,
        }));
    }, [dispatch, ref, comparisonType]);
    return (React.createElement("div", null,
        React.createElement(FormattedMessage, { id: "configurationPanel.compareWith", tagName: "label" }),
        React.createElement(KpiComparisonTypeDropdown, { comparisonType: comparisonType, onComparisonTypeChanged: handleComparisonTypeChanged }),
        !!comparisonDirection && (React.createElement(KpiComparisonDirectionDropdown, { comparisonDirection: comparisonDirection, onComparisonDirectionChanged: handleComparisonDirectionChanged }))));
};
//# sourceMappingURL=KpiComparison.js.map