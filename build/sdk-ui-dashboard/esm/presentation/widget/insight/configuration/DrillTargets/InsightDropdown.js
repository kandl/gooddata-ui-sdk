// (C) 2007-2022 GoodData Corporation
import React, { useMemo } from "react";
import { Dropdown, DropdownButton } from "@gooddata/sdk-ui-kit";
import { isInsight, insightVisualizationType } from "@gooddata/sdk-model";
import { useIntl } from "react-intl";
import { isDrillToInsightConfig } from "../../../../drill/types.js";
import { InsightList } from "../../../../insightList/index.js";
import { selectInsightsMap, useDashboardSelector } from "../../../../../model/index.js";
const DROPDOWN_ALIGN_POINTS = [
    {
        align: "bl tl",
        offset: {
            x: 0,
            y: 4,
        },
    },
    {
        align: "tl bl",
        offset: {
            x: 0,
            y: -4,
        },
    },
];
function getButtonValue(title, intl, ref) {
    if (!ref) {
        return intl.formatMessage({ id: "configurationPanel.drillConfig.selectInsight" });
    }
    return title || intl.formatMessage({ id: "loading" });
}
export const InsightDropdown = ({ insightConfig, onSelect }) => {
    var _a;
    const intl = useIntl();
    const { insight, insightType, insightRef } = useDrillToInsightData(insightConfig);
    const buttonText = getButtonValue((_a = insight === null || insight === void 0 ? void 0 : insight.insight.title) !== null && _a !== void 0 ? _a : "", intl, insightRef);
    return (React.createElement(Dropdown, { className: "s-report_select report-select", closeOnMouseDrag: true, closeOnParentScroll: true, alignPoints: DROPDOWN_ALIGN_POINTS, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(DropdownButton, { value: buttonText, onClick: toggleDropdown, isOpen: isOpen, isSmall: false, iconLeft: insightType ? `gd-vis-type-${insightType}` : undefined, className: "gd-button-small s-visualization-button-target-insight" })), renderBody: ({ closeDropdown }) => {
            return (React.createElement("div", { className: "open-visualizations s-open-visualizations" },
                React.createElement(InsightList, { selectedRef: isDrillToInsightConfig(insightConfig) ? insightConfig.insightRef : undefined, height: 300, width: 275, searchAutofocus: true, onSelect: (insight) => {
                        onSelect(insight);
                        closeDropdown();
                    } })));
        } }));
};
function useDrillToInsightData(insightConfig) {
    const insights = useDashboardSelector(selectInsightsMap);
    return useMemo(() => {
        if (isDrillToInsightConfig(insightConfig) && insightConfig.insightRef) {
            const insight = insights.get(insightConfig.insightRef);
            if (isInsight(insight)) {
                const insightType = insightVisualizationType(insight);
                return {
                    insight,
                    insightRef: insightConfig.insightRef,
                    insightType: insightType,
                };
            }
        }
        return {};
    }, [insightConfig, insights]);
}
//# sourceMappingURL=InsightDropdown.js.map