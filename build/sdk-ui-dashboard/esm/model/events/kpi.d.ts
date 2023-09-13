import { ObjRef, IDashboardAttributeFilter, IKpiWidget, IKpiWidgetDefinition, ICatalogDateDataset, IMeasureMetadataObject, IKpi, IDrillToLegacyDashboard, IKpiWidgetConfiguration } from "@gooddata/sdk-model";
import { IDashboardEvent } from "./base.js";
import { WidgetDescription, WidgetHeader } from "../types/widgetTypes.js";
import { DashboardContext } from "../types/commonTypes.js";
/**
 * Payload of the {@link DashboardKpiWidgetHeaderChanged} event.
 * @beta
 */
export interface DashboardKpiWidgetHeaderChangedPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
    /**
     * New value of the widget header.
     */
    readonly header: WidgetHeader;
}
/**
 * This event is emitted when the dashboard's KPI Widget header is modified.
 *
 * @beta
 */
export interface DashboardKpiWidgetHeaderChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.HEADER_CHANGED";
    readonly payload: DashboardKpiWidgetHeaderChangedPayload;
}
export declare function kpiWidgetHeaderChanged(ctx: DashboardContext, ref: ObjRef, header: WidgetHeader, correlationId?: string): DashboardKpiWidgetHeaderChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetHeaderChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetHeaderChanged: (obj: unknown) => obj is DashboardKpiWidgetHeaderChanged;
/**
 * Payload of the {@link DashboardKpiWidgetDescriptionChanged} event.
 * @beta
 */
export interface DashboardKpiWidgetDescriptionChangedPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
    /**
     * New value of the widget description.
     */
    readonly description: WidgetDescription;
}
/**
 * This event is emitted when the dashboard's KPI Widget description is modified.
 *
 * @beta
 */
export interface DashboardKpiWidgetDescriptionChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.DESCRIPTION_CHANGED";
    readonly payload: DashboardKpiWidgetDescriptionChangedPayload;
}
export declare function kpiWidgetDescriptionChanged(ctx: DashboardContext, ref: ObjRef, description: WidgetDescription, correlationId?: string): DashboardKpiWidgetDescriptionChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDescriptionChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetDescriptionChanged: (obj: unknown) => obj is DashboardKpiWidgetDescriptionChanged;
/**
 * Payload of the {@link DashboardKpiWidgetConfigurationChanged} event.
 * @beta
 */
export interface DashboardKpiWidgetConfigurationChangedPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
    /**
     * New value of the widget configuration.
     */
    readonly configuration: IKpiWidgetConfiguration | undefined;
}
/**
 * This event is emitted when the dashboard's KPI Widget configuration is modified.
 *
 * @beta
 */
export interface DashboardKpiWidgetConfigurationChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.CONFIGURATION_CHANGED";
    readonly payload: DashboardKpiWidgetConfigurationChangedPayload;
}
export declare function kpiWidgetConfigurationChanged(ctx: DashboardContext, ref: ObjRef, configuration: IKpiWidgetConfiguration | undefined, correlationId?: string): DashboardKpiWidgetConfigurationChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetConfigurationChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetConfigurationChanged: (obj: unknown) => obj is DashboardKpiWidgetConfigurationChanged;
/**
 * Payload of the {@link DashboardKpiWidgetMeasureChanged} event.
 * @beta
 */
export interface DashboardKpiWidgetMeasureChangedPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
    /**
     * New setup of KPI. Includes the measure used to calculate KPI and the comparison settings that
     * are in effect.
     *
     * Note: the comparison may be 'none' - meaning
     */
    readonly kpiWidget: IKpiWidget;
    /**
     * Metadata object describing the measure that is now used on the KPI.
     */
    readonly measure: IMeasureMetadataObject;
    /**
     * If a new header was also set while changing the measure, then the new header value is included here.
     */
    readonly header?: WidgetHeader;
}
/**
 * This event is emitted when the dashboard's KPI Widget measure is modified - the KPI now shows value for
 * different measure. The change of measure to use may be accompanied with a change of the KPI header (change of
 * title). In that case new value of header is also included in the event.
 *
 * @beta
 */
export interface DashboardKpiWidgetMeasureChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.MEASURE_CHANGED";
    readonly payload: DashboardKpiWidgetMeasureChangedPayload;
}
export declare function kpiWidgetMeasureChanged(ctx: DashboardContext, ref: ObjRef, kpiWidget: IKpiWidget, measure: IMeasureMetadataObject, header?: WidgetHeader, correlationId?: string): DashboardKpiWidgetMeasureChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetMeasureChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetMeasureChanged: (obj: unknown) => obj is DashboardKpiWidgetMeasureChanged;
/**
 * Payload of the {@link DashboardKpiWidgetFilterSettingsChanged} event.
 * @beta
 */
export interface DashboardKpiWidgetFilterSettingsChangedPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
    /**
     * Attribute filters that are ignored for the widget.
     *
     * If empty, then all attribute filters defined for the dashboard are in effect.
     */
    readonly ignoredAttributeFilters: IDashboardAttributeFilter[];
    /**
     * Date dataset used for date filtering.
     *
     * If undefined, then dashboard's date filter is not in effect for the widget.
     */
    readonly dateDatasetForFiltering?: ICatalogDateDataset;
}
/**
 * This event is emitted when dashboard's KPI Widget filter settings are modified.
 *
 * @beta
 */
export interface DashboardKpiWidgetFilterSettingsChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.FILTER_SETTINGS_CHANGED";
    readonly payload: DashboardKpiWidgetFilterSettingsChangedPayload;
}
export declare function kpiWidgetFilterSettingsChanged(ctx: DashboardContext, ref: ObjRef, ignoredAttributeFilters: IDashboardAttributeFilter[], dateDatasetForFiltering: ICatalogDateDataset | undefined, correlationId?: string): DashboardKpiWidgetFilterSettingsChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetFilterSettingsChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetFilterSettingsChanged: (obj: unknown) => obj is DashboardKpiWidgetFilterSettingsChanged;
/**
 * Payload of the {@link DashboardKpiWidgetComparisonChanged} event.
 * @beta
 */
export interface DashboardKpiWidgetComparisonChangedPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
    /**
     * New setup of KPI. Includes the measure used to calculate KPI and the comparison settings that
     * are in effect.
     *
     * Note: the comparison may be 'none' - meaning
     */
    readonly kpi: IKpi;
}
/**
 * This event is emitted when dashboard's KPI Widget has its comparison type changed. The event includes
 * the new definition of the KPI that has uses same measure as before however has new setup of the over-time
 * comparison.
 *
 * @beta
 */
export interface DashboardKpiWidgetComparisonChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.COMPARISON_CHANGED";
    readonly payload: DashboardKpiWidgetComparisonChangedPayload;
}
export declare function kpiWidgetComparisonChanged(ctx: DashboardContext, ref: ObjRef, kpi: IKpi, correlationId?: string): DashboardKpiWidgetComparisonChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetComparisonChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetComparisonChanged: (obj: unknown) => obj is DashboardKpiWidgetComparisonChanged;
/**
 * Payload of the {@link DashboardKpiWidgetDrillRemoved} event.
 * @beta
 */
export interface DashboardKpiWidgetDrillRemovedPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
}
/**
 * This event is emitted when dashboard's KPI Widget has its drills removed.
 *
 * @beta
 */
export interface DashboardKpiWidgetDrillRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.DRILL_REMOVED";
    readonly payload: DashboardKpiWidgetDrillRemovedPayload;
}
export declare function kpiWidgetDrillRemoved(ctx: DashboardContext, ref: ObjRef, correlationId?: string): DashboardKpiWidgetDrillRemoved;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDrillRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetDrillRemoved: (obj: unknown) => obj is DashboardKpiWidgetDrillRemoved;
/**
 * Payload of the {@link DashboardKpiWidgetDrillSet} event.
 * @beta
 */
export interface DashboardKpiWidgetDrillSetPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
    /**
     * The drill set.
     */
    readonly drill: IDrillToLegacyDashboard;
}
/**
 * This event is emitted when dashboard's KPI Widget has its drill set.
 *
 * @beta
 */
export interface DashboardKpiWidgetDrillSet extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.DRILL_SET";
    readonly payload: DashboardKpiWidgetDrillSetPayload;
}
export declare function kpiWidgetDrillSet(ctx: DashboardContext, ref: ObjRef, drill: IDrillToLegacyDashboard, correlationId?: string): DashboardKpiWidgetDrillSet;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDrillSet}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetDrillSet: (obj: unknown) => obj is DashboardKpiWidgetDrillSet;
/**
 * Payload of the {@link DashboardKpiWidgetChanged} event.
 * @beta
 */
export interface DashboardKpiWidgetChangedPayload {
    /**
     * The new value of the changed widget.
     */
    kpiWidget: IKpiWidget | IKpiWidgetDefinition;
}
/**
 * This event is emitted after any change to KPI Widget configuration. It contains the entire new state of the
 * KPI Widget.
 *
 * @beta
 */
export interface DashboardKpiWidgetChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.WIDGET_CHANGED";
    readonly payload: DashboardKpiWidgetChangedPayload;
}
export declare function kpiWidgetChanged(ctx: DashboardContext, kpiWidget: IKpiWidget, correlationId?: string): DashboardKpiWidgetChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetChanged: (obj: unknown) => obj is DashboardKpiWidgetChanged;
