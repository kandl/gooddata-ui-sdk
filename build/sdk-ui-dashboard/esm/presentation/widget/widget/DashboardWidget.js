// (C) 2020-2022 GoodData Corporation
import React, { useMemo } from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
import { extendedWidgetDebugStr } from "../../../model/index.js";
import { DefaultDashboardWidget } from "./DefaultDashboardWidget.js";
import { isDashboardWidget } from "@gooddata/sdk-model";
import { EmptyDashboardDropZone, LoadingDashboardPlaceholderWidget } from "../../dragAndDrop/index.js";
import { isInitialPlaceholderWidget, isInsightPlaceholderWidget, isKpiPlaceholderWidget, isLoadingPlaceholderWidget, } from "../../../widgets/index.js";
const BadWidgetType = () => {
    return React.createElement("div", null, "Missing renderer");
};
const MissingWidget = () => {
    return React.createElement("div", null, "Missing widget");
};
/**
 * @internal
 */
export const DashboardWidget = (props) => {
    const { WidgetComponentProvider, KpiWidgetComponentSet, InsightWidgetComponentSet } = useDashboardComponentsContext();
    const { widget, 
    // @ts-expect-error Don't expose index prop on public interface (we need it only for css class for KD tests)
    index, } = props;
    const WidgetComponent = useMemo(() => {
        // TODO: we need to get rid of this; the widget being optional at this point is the problem; the parent
        //  components (or possibly the model) should deal with layout items that have no valid widgets associated
        //  and thus short-circuit.
        if (!widget) {
            console.warn("Attempting render an undefined widget.");
            return MissingWidget;
        }
        const Component = WidgetComponentProvider(widget);
        // the default WidgetComponentProvider always returns something, DefaultDashboardWidget by default
        if (Component && Component !== DefaultDashboardWidget) {
            return Component;
        }
        if (isInitialPlaceholderWidget(widget)) {
            return EmptyDashboardDropZone;
        }
        if (isLoadingPlaceholderWidget(widget)) {
            return LoadingDashboardPlaceholderWidget;
        }
        if (isKpiPlaceholderWidget(widget) && KpiWidgetComponentSet.creating) {
            return KpiWidgetComponentSet.creating.CreatingPlaceholderComponent;
        }
        if (isInsightPlaceholderWidget(widget) && InsightWidgetComponentSet.creating) {
            return InsightWidgetComponentSet.creating.CreatingPlaceholderComponent;
        }
        if (isDashboardWidget(widget)) {
            return DefaultDashboardWidget;
        }
        console.warn(`Unable to render widget ${extendedWidgetDebugStr(widget)}`);
        return BadWidgetType;
    }, [widget]);
    return (React.createElement(WidgetComponent, Object.assign({}, props, { 
        // @ts-expect-error Don't expose index prop on public interface (we need it only for css class for KD tests)
        index: index })));
};
//# sourceMappingURL=DashboardWidget.js.map