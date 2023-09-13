// (C) 2020-2022 GoodData Corporation
import React, { useCallback, useMemo, useState } from "react";
import last from "lodash/last.js";
import { selectLocale, useDashboardSelector } from "../../../../model/index.js";
import { getDrillDownAttributeTitle, } from "../../../drill/index.js";
import { isDrillDownDefinition } from "../../../../types.js";
import { getDrillOriginLocalIdentifier } from "../../../../_staging/drills/drillingUtils.js";
import { DashboardInsightWithDrillSelect } from "./Insight/DashboardInsightWithDrillSelect.js";
import { InsightDrillDialog } from "./InsightDrillDialog/InsightDrillDialog.js";
/**
 * @internal
 */
export const DashboardInsightWithDrillDialog = (props) => {
    const [drillSteps, setDrillSteps] = useState([]);
    const activeDrillStep = last(drillSteps);
    const insight = activeDrillStep === null || activeDrillStep === void 0 ? void 0 : activeDrillStep.insight;
    const widget = props.widget;
    const breadcrumbs = useMemo(() => drillSteps
        .filter((s) => isDrillDownDefinition(s.drillDefinition))
        .map((s) => {
        var _a;
        return (_a = getDrillDownAttributeTitle(getDrillOriginLocalIdentifier(s.drillDefinition), s.drillEvent)) !== null && _a !== void 0 ? _a : "NULL";
    }), [drillSteps]);
    const locale = useDashboardSelector(selectLocale);
    const setNextDrillStep = useCallback((drillStep) => {
        setDrillSteps((s) => [...s, drillStep]);
    }, []);
    const goBack = useCallback(() => setDrillSteps(([firstDrill]) => [firstDrill]), []);
    const onClose = useCallback(() => setDrillSteps([]), []);
    const onDrillDown = useCallback((evt) => setNextDrillStep(evt.payload), [setNextDrillStep]);
    const onDrillToInsight = useCallback((evt) => setNextDrillStep(evt.payload), [setNextDrillStep]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DashboardInsightWithDrillSelect, Object.assign({}, props, { onDrillDown: onDrillDown, onDrillToInsight: onDrillToInsight })),
        activeDrillStep ? (React.createElement(InsightDrillDialog, { locale: locale, breadcrumbs: breadcrumbs, widget: widget, insight: insight, onDrillDown: onDrillDown, onBackButtonClick: goBack, onClose: onClose })) : null));
};
//# sourceMappingURL=DashboardInsightWithDrillDialog.js.map