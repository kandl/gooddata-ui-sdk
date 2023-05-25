// (C) 2007-2021 GoodData Corporation
import values from "lodash/fp/values.js";
import first from "lodash/first.js";
import flow from "lodash/flow.js";
import { GdcMetadata } from "./GdcMetadata.js";
import { GdcDashboard } from "../dashboard/GdcDashboard.js";
import { GdcFilterContext } from "../filterContext/GdcFilterContext.js";
import { GdcScheduledMail } from "../scheduledMail/GdcScheduledMail.js";
import { GdcProjectDashboard } from "../projectDashboard/GdcProjectDashboard.js";
import { GdcExtendedDateFilters } from "../extendedDateFilters/GdcExtendedDateFilters.js";
import { GdcVisualizationWidget } from "../visualizationWidget/GdcVisualizationWidget.js";
import { GdcVisualizationObject } from "../visualizationObject/GdcVisualizationObject.js";
import { GdcVisualizationClass } from "../visualizationObject/GdcVisualizationClass.js";
import { GdcKpi } from "../kpi/GdcKpi.js";
import { GdcDataSets } from "../dataSets/GdcDataSets.js";
import { GdcReport } from "../report/GdcReport.js";
import { GdcDashboardPlugin } from "../dashboardPlugin/GdcDashboardPlugin.js";

/**
 * @public
 */
export namespace GdcMetadataObject {
    export type IObject =
        | GdcMetadata.IAttribute
        | GdcMetadata.IMetric
        | GdcMetadata.IFact
        | GdcMetadata.IAttributeDisplayForm
        | GdcMetadata.IKpiAlert
        | GdcMetadata.IDataSet
        | GdcMetadata.IPrompt
        | GdcMetadata.ITheme
        | GdcDashboard.IAnalyticalDashboard
        | GdcFilterContext.IFilterContext
        | GdcFilterContext.ITempFilterContext
        | GdcKpi.IKPI
        | GdcScheduledMail.IScheduledMail
        | GdcProjectDashboard.IProjectDashboard
        | GdcExtendedDateFilters.IDateFilterConfig
        | GdcVisualizationWidget.IVisualizationWidget
        | GdcVisualizationObject.IVisualizationObject
        | GdcVisualizationClass.IVisualizationClass
        | GdcDataSets.IDataSet
        | GdcReport.IReport
        | GdcReport.IReportDefinition
        | GdcDashboardPlugin.IDashboardPlugin;

    export type WrappedObject =
        | GdcMetadata.IWrappedAttribute
        | GdcMetadata.IWrappedMetric
        | GdcMetadata.IWrappedFact
        | GdcMetadata.IWrappedAttributeDisplayForm
        | GdcMetadata.IWrappedKpiAlert
        | GdcMetadata.IWrappedDataSet
        | GdcMetadata.IWrappedPrompt
        | GdcMetadata.IWrappedTheme
        | GdcDashboard.IWrappedAnalyticalDashboard
        | GdcFilterContext.IWrappedFilterContext
        | GdcFilterContext.IWrappedTempFilterContext
        | GdcKpi.IWrappedKPI
        | GdcScheduledMail.IWrappedScheduledMail
        | GdcProjectDashboard.IWrappedProjectDashboard
        | GdcExtendedDateFilters.IWrappedDateFilterConfig
        | GdcVisualizationWidget.IWrappedVisualizationWidget
        | GdcVisualizationObject.IVisualization
        | GdcVisualizationClass.IVisualizationClassWrapped
        | GdcDataSets.IWrappedDataSet
        | GdcReport.IWrappedReport
        | GdcReport.IWrappedReportDefinition
        | GdcDashboardPlugin.IWrappedDashboardPlugin;

    export function unwrapMetadataObject(object: WrappedObject): IObject {
        return flow(values, first)(object);
    }
}
