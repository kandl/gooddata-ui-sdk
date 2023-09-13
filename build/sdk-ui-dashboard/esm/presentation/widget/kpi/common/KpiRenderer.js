// (C) 2020-2022 GoodData Corporation
import React, { useCallback } from "react";
import { KpiContent } from "./KpiContent/index.js";
import { useDashboardSelector, selectIsInEditMode } from "../../../../model/index.js";
/**
 * @internal
 */
export const KpiRenderer = ({ disableDrillUnderline, onDrill, isDrillable, isKpiValueClickDisabled, kpi, kpiResult, filters, separators, enableCompactSize, error, errorHelp, isLoading, }) => {
    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const onPrimaryValueClick = useCallback(() => {
        var _a;
        if (!isDrillable || !onDrill) {
            return;
        }
        return onDrill({
            type: "headline",
            element: "primaryValue",
            value: (_a = kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureResult) === null || _a === void 0 ? void 0 : _a.toString(),
            intersection: (kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureDescriptor)
                ? [
                    {
                        header: kpiResult.measureDescriptor,
                    },
                ]
                : [],
        });
    }, [kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureResult, kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureDescriptor, isDrillable, onDrill]);
    return (React.createElement(KpiContent, { isLoading: !!isLoading, kpi: kpi, kpiResult: kpiResult, isKpiUnderlineHiddenWhenClickable: disableDrillUnderline, onKpiValueClick: isDrillable && onDrill ? onPrimaryValueClick : undefined, isKpiValueClickDisabled: isKpiValueClickDisabled, filters: filters, separators: separators, enableCompactSize: enableCompactSize, error: error, errorHelp: errorHelp, isInEditMode: isInEditMode }));
};
//# sourceMappingURL=KpiRenderer.js.map