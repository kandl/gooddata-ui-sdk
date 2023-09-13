// (C) 2020-2022 GoodData Corporation
import React, { useMemo } from "react";
import stringify from "json-stable-stringify";
import { useIntl } from "react-intl";
import { invariant } from "ts-invariant";
import { UnexpectedSdkError } from "@gooddata/sdk-ui";
import { Overlay } from "@gooddata/sdk-ui-kit";
import { isDrillDownDefinition } from "../../../types.js";
import { insightTitle, isDrillFromAttribute, isDrillToDashboard, isDrillToInsight, isDrillToLegacyDashboard, } from "@gooddata/sdk-model";
import { isDrillToUrl } from "../types.js";
import { DrillSelectListBody } from "./DrillSelectListBody.js";
import { getDrillDownAttributeTitle, getTotalDrillToUrlCount } from "../utils/drillDownUtils.js";
import { DrillType } from "./types.js";
import { selectAccessibleDashboards, selectDashboardTitle, selectInsightsMap, useDashboardSelector, } from "../../../model/index.js";
import { dashboardMatch } from "../utils/dashboardPredicate.js";
import { getDrillOriginLocalIdentifier } from "../../../_staging/drills/drillingUtils.js";
export const DrillSelectDropdown = (props) => {
    const { isOpen, dropDownAnchorClass, onClose, onSelect, drillDefinitions, drillEvent } = props;
    const intl = useIntl();
    const listedDashboards = useDashboardSelector(selectAccessibleDashboards);
    const dashboardTitle = useDashboardSelector(selectDashboardTitle);
    const insights = useDashboardSelector(selectInsightsMap);
    const drillSelectItems = useMemo(() => createDrillSelectItems(drillDefinitions, drillEvent, insights, listedDashboards, dashboardTitle, intl), [drillDefinitions, drillEvent, insights, listedDashboards, dashboardTitle, intl]);
    return isOpen ? (React.createElement("div", { className: "gd-drill-modal-picker-overlay-mask" },
        React.createElement(Overlay, { closeOnOutsideClick: true, closeOnEscape: true, alignTo: `.${dropDownAnchorClass}`, onClose: onClose },
            React.createElement(DrillSelectListBody, { items: drillSelectItems, onSelect: onSelect })))) : null;
};
const getDashboardTitle = (dashboardRef, dashboardList) => {
    const dashboard = dashboardList.find((dashboard) => dashboardMatch(dashboard.identifier, dashboard.ref, dashboardRef));
    return dashboard ? dashboard.title : null;
};
export const createDrillSelectItems = (drillDefinitions, drillEvent, insights, dashboardList, dashboardTitle, intl) => {
    const totalDrillToUrls = getTotalDrillToUrlCount(drillDefinitions);
    return drillDefinitions.map((drillDefinition) => {
        var _a;
        invariant(!isDrillToLegacyDashboard(drillDefinition), "Drill to pixel perfect dashboards from insight is not supported.");
        if (isDrillDownDefinition(drillDefinition)) {
            const { title: drillTitle } = drillDefinition;
            const drillDownOrigin = getDrillOriginLocalIdentifier(drillDefinition);
            const title = getDrillDownAttributeTitle(drillDownOrigin, drillEvent);
            return {
                type: DrillType.DRILL_DOWN,
                name: (_a = drillTitle !== null && drillTitle !== void 0 ? drillTitle : title) !== null && _a !== void 0 ? _a : "NULL",
                drillDefinition,
                id: stringify(drillDefinition),
            };
        }
        if (isDrillToInsight(drillDefinition)) {
            const targetInsight = insights.get(drillDefinition.target);
            const title = targetInsight && insightTitle(targetInsight);
            return {
                type: DrillType.DRILL_TO_INSIGHT,
                name: title,
                drillDefinition,
                id: stringify(drillDefinition),
            };
        }
        if (isDrillToDashboard(drillDefinition)) {
            const title = drillDefinition.target
                ? getDashboardTitle(drillDefinition.target, dashboardList)
                : dashboardTitle;
            return {
                type: DrillType.DRILL_TO_DASHBOARD,
                name: title,
                drillDefinition,
                id: stringify(drillDefinition),
            };
        }
        if (isDrillToUrl(drillDefinition)) {
            const drillToUrlOrigin = getDrillOriginLocalIdentifier(drillDefinition);
            const attributeValue = isDrillFromAttribute(drillDefinition.origin) && totalDrillToUrls > 1
                ? getDrillDownAttributeTitle(drillToUrlOrigin, drillEvent)
                : undefined;
            return {
                type: DrillType.DRILL_TO_URL,
                name: intl.formatMessage({ id: "drill_modal_picker.more.details" }),
                drillDefinition,
                attributeValue,
                id: stringify(drillDefinition),
            };
        }
        const unhandledDefinition = drillDefinition;
        throw new UnexpectedSdkError(`Unhandled drill definition: ${JSON.stringify(unhandledDefinition)}`);
    });
};
//# sourceMappingURL=DrillSelectDropdown.js.map