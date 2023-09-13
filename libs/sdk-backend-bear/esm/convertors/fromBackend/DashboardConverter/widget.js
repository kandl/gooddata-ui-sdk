// (C) 2019-2022 GoodData Corporation
import { isDateFilterReference, isKpiContentWithoutComparison, isWrappedKpi, } from "@gooddata/api-model-bear";
import { uriRef } from "@gooddata/sdk-model";
import { convertVisualizationWidgetDrill, convertKpiDrill } from "./drills.js";
import { convertReferencesToUris } from "../ReferenceConverter.js";
import { deserializeProperties } from "../PropertiesConverter.js";
/**
 * @internal
 */
export const convertFilterReference = (filterReference) => {
    if (isDateFilterReference(filterReference)) {
        return {
            type: "dateFilterReference",
            dataSet: uriRef(filterReference.dateFilterReference.dataSet),
        };
    }
    return {
        type: "attributeFilterReference",
        displayForm: uriRef(filterReference.attributeFilterReference.displayForm),
    };
};
export const convertVisualizationWidget = (visualizationWidget) => {
    const { visualizationWidget: { content: { visualization, ignoreDashboardFilters, dateDataSet, drills, references, properties, configuration, }, meta: { identifier, uri, title, summary }, }, } = visualizationWidget;
    const { properties: convertedProperties } = convertReferencesToUris({
        properties: deserializeProperties(properties),
        references: references || {},
    });
    return Object.assign({ type: "insight", ref: uriRef(uri), identifier: identifier, uri: uri, title, description: summary, insight: uriRef(visualization), dateDataSet: dateDataSet ? uriRef(dateDataSet) : undefined, ignoreDashboardFilters: ignoreDashboardFilters
            ? ignoreDashboardFilters.map(convertFilterReference)
            : [], drills: drills ? drills.map(convertVisualizationWidgetDrill) : [], properties: convertedProperties }, (configuration ? { configuration } : {}));
};
export const convertKpi = (kpi) => {
    const { kpi: { content, content: { dateDataSet, ignoreDashboardFilters, drillTo, configuration }, meta: { identifier, uri, title, summary }, }, } = kpi;
    return Object.assign(Object.assign({ type: "kpi", ref: uriRef(uri), identifier: identifier, uri: uri, title, description: summary, dateDataSet: dateDataSet ? uriRef(dateDataSet) : undefined, ignoreDashboardFilters: ignoreDashboardFilters
            ? ignoreDashboardFilters.map(convertFilterReference)
            : [], drills: drillTo ? [convertKpiDrill(kpi)] : [] }, (configuration ? { configuration } : {})), { kpi: isKpiContentWithoutComparison(content)
            ? {
                comparisonType: content.comparisonType,
                metric: uriRef(content.metric),
            }
            : {
                comparisonType: content.comparisonType,
                comparisonDirection: content.comparisonDirection,
                metric: uriRef(content.metric),
            } });
};
export const convertWidget = (widget) => {
    if (isWrappedKpi(widget)) {
        return convertKpi(widget);
    }
    return convertVisualizationWidget(widget);
};
//# sourceMappingURL=widget.js.map