// (C) 2020-2023 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { objRefToString, isWidget, } from "@gooddata/sdk-model";
import { LRUCache } from "lru-cache";
import max from "lodash/max.js";
import { useDashboardSelector, selectIsExport, selectIsLayoutEmpty, selectLayout, selectInsightsMap, selectEnableWidgetCustomHeight, selectRenderMode, } from "../../model/index.js";
import { DashboardLayoutWidget } from "./DashboardLayoutWidget.js";
import { DashboardLayout, DashboardLayoutBuilder, } from "./DefaultDashboardLayoutRenderer/index.js";
import { renderModeAwareDashboardLayoutSectionRenderer } from "./DefaultDashboardLayoutRenderer/RenderModeAwareDashboardLayoutSectionRenderer.js";
import { renderModeAwareDashboardLayoutSectionHeaderRenderer } from "./DefaultDashboardLayoutRenderer/RenderModeAwareDashboardLayoutSectionHeaderRenderer.js";
import { getMemoizedWidgetSanitizer } from "./DefaultDashboardLayoutUtils.js";
import { SectionHotspot } from "../dragAndDrop/index.js";
import { isInitialPlaceholderWidget } from "../../widgets/index.js";
import { EmptyDashboardLayout } from "./EmptyDashboardLayout.js";
/**
 * Get dashboard layout for exports.
 *  - Create new extra rows if current row has width of widgets greater than 12
 *
 * @internal
 * @param layout - dashboard layout to modify
 * @returns transformed layout
 */
function getDashboardLayoutForExport(layout) {
    const dashLayout = DashboardLayoutBuilder.for(layout);
    const layoutFacade = dashLayout.facade();
    const sections = layoutFacade.sections();
    const screenSplitSections = sections.map((section) => ({
        items: section.items().asGridRows("xl"),
        header: section.header(),
    }));
    dashLayout.removeSections();
    screenSplitSections.forEach((wrappedSection) => {
        wrappedSection.items.forEach((rowSection, index) => {
            // Also ensure that all items in a section have equal grid height - the max one.
            // This simulates non-export mode, where the flex-box stretches
            // all the items in a row to the equal height.
            // This is necessary as we have no control over the custom widgets heights.
            const sectionItemsGridHeights = rowSection.map((item) => item.size().xl.gridHeight);
            const maxGridHeight = max(sectionItemsGridHeights);
            dashLayout.createSection((section) => {
                rowSection.forEach((item) => {
                    if (index === 0) {
                        section.header(wrappedSection.header);
                    }
                    section.createItem(Object.assign(Object.assign({}, item.size().xl), { gridHeight: maxGridHeight }), (i) => i.widget(item.widget()));
                });
                return section;
            });
        });
    });
    return dashLayout.build();
}
const itemKeyGetter = (keyGetterProps) => {
    const widget = keyGetterProps.item.widget();
    if (isWidget(widget)) {
        return objRefToString(widget.ref);
    }
    return keyGetterProps.item.index().toString();
};
/**
 * @alpha
 */
export const DefaultDashboardLayout = (props) => {
    const { onFiltersChange, onDrill, onError } = props;
    const layout = useDashboardSelector(selectLayout);
    const isLayoutEmpty = useDashboardSelector(selectIsLayoutEmpty);
    const enableWidgetCustomHeight = useDashboardSelector(selectEnableWidgetCustomHeight);
    const insights = useDashboardSelector(selectInsightsMap);
    const isExport = useDashboardSelector(selectIsExport);
    const renderMode = useDashboardSelector(selectRenderMode);
    const getInsightByRef = useCallback((insightRef) => {
        return insights.get(insightRef);
    }, [insights]);
    const sanitizeWidgets = useMemo(() => {
        // keep the cache local so that it is cleared when the dashboard changes for example and this component is remounted
        const cache = new LRUCache({ max: 100 });
        return getMemoizedWidgetSanitizer(cache);
    }, []);
    const transformedLayout = useMemo(() => {
        if (isExport) {
            return getDashboardLayoutForExport(layout);
        }
        return DashboardLayoutBuilder.for(layout)
            .modifySections((section) => section.modifyItems(sanitizeWidgets(getInsightByRef, enableWidgetCustomHeight)))
            .build();
    }, [layout, isExport, getInsightByRef, enableWidgetCustomHeight, sanitizeWidgets]);
    const widgetRenderer = useCallback((renderProps) => {
        return (React.createElement(DashboardLayoutWidget, Object.assign({ onError: onError, onDrill: onDrill, onFiltersChange: onFiltersChange }, renderProps)));
    }, [onError, onDrill, onFiltersChange]);
    if (isLayoutEmpty) {
        return React.createElement(EmptyDashboardLayout, null);
    }
    // do not render the tailing section hotspot if there is only one section in the layout and it has only initial placeholders in it
    const shouldRenderSectionHotspot = transformedLayout.sections.length > 1 ||
        transformedLayout.sections[0].items.some((i) => !isInitialPlaceholderWidget(i.widget));
    return (React.createElement(React.Fragment, null,
        React.createElement(DashboardLayout, { className: isExport ? "export-mode" : "", layout: transformedLayout, itemKeyGetter: itemKeyGetter, widgetRenderer: widgetRenderer, enableCustomHeight: enableWidgetCustomHeight, sectionRenderer: renderModeAwareDashboardLayoutSectionRenderer, sectionHeaderRenderer: renderModeAwareDashboardLayoutSectionHeaderRenderer, renderMode: renderMode }),
        !!shouldRenderSectionHotspot && (React.createElement(SectionHotspot, { index: transformedLayout.sections.length, targetPosition: "below" }))));
};
//# sourceMappingURL=DefaultDashboardLayout.js.map