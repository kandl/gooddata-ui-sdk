// (C) 2020-2022 GoodData Corporation
import React from "react";
import { idRef, } from "@gooddata/sdk-model";
import { DRILL_TARGET_TYPE, isDrillToDashboardConfig, isDrillToUrlConfig, isDrillToCustomUrlConfig, isDrillToAttributeUrlConfig, } from "../../../../drill/types.js";
import { DrillTargetInsightItem } from "./DrillTargetInsightItem.js";
import { DrillTargetUrlItem } from "./DrillTargetUrlItem.js";
import { DrillTargetDashboardItem } from "./DrillTargetDashboardItem.js";
export const DrillTargets = (props) => {
    const { item } = props;
    const onInsightTargetSelect = (targetItem) => {
        const drillConfigItem = {
            transition: "pop-up",
            origin: getOrigin(item),
            type: "drillToInsight",
            target: targetItem.insight.ref,
        };
        props.onSetup(drillConfigItem, Object.assign(Object.assign({}, item), { insightRef: targetItem.insight.ref }));
    };
    const onDashboardTargetSelect = (targetItem) => {
        const dashboard = idRef(targetItem.identifier, "analyticalDashboard");
        const drillConfigItem = {
            transition: "in-place",
            origin: getOrigin(item),
            type: "drillToDashboard",
            target: dashboard,
        };
        props.onSetup(drillConfigItem, Object.assign(Object.assign({}, item), { dashboard }));
    };
    const onCustomUrlTargetSelect = (urlDrillTarget) => {
        if (isDrillToCustomUrlConfig(urlDrillTarget)) {
            const drillConfigItem = {
                transition: "new-window",
                origin: getOrigin(item),
                type: "drillToCustomUrl",
                target: {
                    url: urlDrillTarget.customUrl,
                },
            };
            props.onSetup(drillConfigItem, Object.assign(Object.assign({}, item), { urlDrillTarget }));
        }
        if (isDrillToAttributeUrlConfig(urlDrillTarget)) {
            const drillConfigItem = {
                transition: "new-window",
                origin: getOrigin(item),
                type: "drillToAttributeUrl",
                target: {
                    hyperlinkDisplayForm: urlDrillTarget.drillToAttributeDisplayForm,
                    displayForm: urlDrillTarget.insightAttributeDisplayForm,
                },
            };
            props.onSetup(drillConfigItem, Object.assign(Object.assign({}, item), { urlDrillTarget }));
        }
    };
    switch (props.item.drillTargetType) {
        case DRILL_TARGET_TYPE.DRILL_TO_DASHBOARD:
            return (React.createElement(DrillTargetDashboardItem, { selected: isDrillToDashboardConfig(item) ? item.dashboard : undefined, onSelect: onDashboardTargetSelect }));
        case DRILL_TARGET_TYPE.DRILL_TO_INSIGHT:
            return React.createElement(DrillTargetInsightItem, { insight: item, onSelect: onInsightTargetSelect });
        case DRILL_TARGET_TYPE.DRILL_TO_URL:
            return (React.createElement(DrillTargetUrlItem, { urlDrillTarget: isDrillToUrlConfig(item) ? item.urlDrillTarget : undefined, attributes: item.attributes, onSelect: onCustomUrlTargetSelect }));
        case undefined:
            return null;
        default:
            unknownDrillTargetTypeReceived(props.item.drillTargetType);
    }
    function unknownDrillTargetTypeReceived(targetType) {
        throw new Error(`unknown drill target type: ${targetType}`);
    }
    return null;
};
function getOrigin(item) {
    return item.type === "attribute"
        ? {
            type: "drillFromAttribute",
            attribute: { localIdentifier: item.localIdentifier },
        }
        : {
            type: "drillFromMeasure",
            measure: { localIdentifier: item.localIdentifier },
        };
}
//# sourceMappingURL=DrillTargets.js.map