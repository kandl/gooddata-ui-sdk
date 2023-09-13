import { IInsight, IDrillToAttributeUrl, IDrillToCustomUrl, IDrillToDashboard, IDrillToInsight, IDrillToLegacyDashboard, FilterContextItem } from "@gooddata/sdk-model";
import { ExplicitDrill } from "@gooddata/sdk-ui";
import { DashboardContext, FiltersInfo } from "../types/commonTypes.js";
import { IDashboardEvent } from "./base.js";
import { IDashboardDrillEvent, IDrillDownDefinition, DashboardDrillContext, IDashboardFilter } from "../../types.js";
/**
 * Payload of the {@link DashboardDrillRequested} event.
 * @alpha
 */
export interface DashboardDrillRequestedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Context in which the drill interaction was triggered (widget and insight details - if available).
     */
    readonly drillContext: DashboardDrillContext;
}
/**
 * This event is emitted on start of the resolution of the {@link Drill} command.
 * It contains details about all possible drill definitions that are available for this particular drill interaction
 *
 * @alpha
 */
export interface DashboardDrillRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.REQUESTED";
    readonly payload: DashboardDrillRequestedPayload;
}
/**
 * @alpha
 */
export declare function drillRequested(ctx: DashboardContext, drillEvent: IDashboardDrillEvent, drillContext: DashboardDrillContext, correlationId?: string): DashboardDrillRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillRequested: (obj: unknown) => obj is DashboardDrillRequested;
/**
 * Payload of the {@link DashboardDrillResolved} event.
 * @alpha
 */
export interface DashboardDrillResolvedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Context in which the drill interaction was triggered (widget and insight details - if available).
     */
    readonly drillContext: DashboardDrillContext;
}
/**
 * A general drill event that is emitted each time any dashboard drill is resolved.
 * It contains only valid drillDefinitions for this particular drill interaction,
 * so you can select and dispatch relevant more granular drill command(s).
 *
 * This is general dashboard drill event with details about all possible more granular drill interactions that can follow.
 * Reason for this general drill event is that it may happen that multiple drill interactions are possible for one drill event.
 *
 * Example: some attribute on the insight has drill down set and also widget has drill to insight set. Then this event will be dispatched with both
 * {@link @gooddata/sdk-ui-ext#IDrillDownDefinition} and {@link @gooddata/sdk-backend-spi#IDrillToInsight} definitions.
 *
 * - This must be always the first event that occurs after the drill interaction, and must be dispatched before more granular drill events.
 * - Specific drill commands that can follow this general drill event are: {@link DrillDown}, {@link DrillToInsight}, {@link DrillToDashboard},
 *   {@link DrillToCustomUrl}, {@link DrillToAttributeUrl}, {@link DrillToLegacyDashboard}
 *
 * @alpha
 */
export interface DashboardDrillResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.RESOLVED";
    readonly payload: DashboardDrillResolvedPayload;
}
/**
 * @alpha
 */
export declare function drillResolved(ctx: DashboardContext, drillEvent: IDashboardDrillEvent, drillContext: DashboardDrillContext, correlationId?: string): DashboardDrillResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillResolved: (obj: unknown) => obj is DashboardDrillResolved;
/**
 * Payload of the {@link DashboardDrillDownRequested} event.
 * @alpha
 */
export interface DashboardDrillDownRequestedPayload {
    /**
     * Drill down definition that was applied.
     */
    readonly drillDefinition: IDrillDownDefinition;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * The target insight to apply drill down on.
     */
    readonly insight: IInsight;
}
/**
 * This event is emitted on start of the resolution of the {@link DrillDown} command.
 * It contains the target insight to apply the drill down on (result of the drill down application
 * depends on the particular visualization type).
 *
 * @alpha
 */
export interface DashboardDrillDownRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_DOWN.REQUESTED";
    readonly payload: DashboardDrillDownRequestedPayload;
}
/**
 * @alpha
 */
export declare function drillDownRequested(ctx: DashboardContext, insight: IInsight, drillDefinition: IDrillDownDefinition, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillDownRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillDownRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillDownRequested: (obj: unknown) => obj is DashboardDrillDownRequested;
/**
 * Payload of the {@link DashboardDrillDownResolved} event.
 * @alpha
 */
export interface DashboardDrillDownResolvedPayload {
    /**
     * Drill down definition that was applied.
     */
    readonly drillDefinition: IDrillDownDefinition;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Target insight with the drill down definition applied.
     */
    readonly insight: IInsight;
}
/**
 * This event is emitted as a result of the {@link DrillDown} command.
 * It contains the target insight with the drill down definition applied (result of the drill down application
 * depends on the particular visualization type).
 *
 * In the default dashboard implementation this event also opens drill dialog with the insight
 * that has this particular drill down definition applied.
 *
 * @alpha
 */
export interface DashboardDrillDownResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_DOWN.RESOLVED";
    readonly payload: DashboardDrillDownResolvedPayload;
}
/**
 * @alpha
 */
export declare function drillDownResolved(ctx: DashboardContext, insight: IInsight, drillDefinition: IDrillDownDefinition, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillDownResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillDownResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillDownResolved: (obj: unknown) => obj is DashboardDrillDownResolved;
/**
 * Payload of the {@link DashboardDrillToInsightRequested} event.
 * @alpha
 */
export interface DashboardDrillToInsightRequestedPayload {
    /**
     * Drill definition with the target insight.
     */
    readonly drillDefinition: IDrillToInsight;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Target insight with the drill intersection filters applied.
     */
    readonly insight: IInsight;
}
/**
 * This event is emitted on start of the resolution of the {@link DrillToInsight} command.
 * It contains the target insight to apply drill intersection filters on.
 *
 * @alpha
 */
export interface DashboardDrillToInsightRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.REQUESTED";
    readonly payload: DashboardDrillToInsightRequestedPayload;
}
/**
 * @alpha
 */
export declare function drillToInsightRequested(ctx: DashboardContext, insight: IInsight, drillDefinition: IDrillToInsight, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillToInsightRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToInsightRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToInsightRequested: (obj: unknown) => obj is DashboardDrillToInsightRequested;
/**
 * Payload of the {@link DashboardDrillToInsightResolved} event.
 * @alpha
 */
export interface DashboardDrillToInsightResolvedPayload {
    /**
     * Drill definition with the target insight.
     */
    readonly drillDefinition: IDrillToInsight;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Target insight with the drill intersection filters applied.
     */
    readonly insight: IInsight;
}
/**
 * This event is emitted as a result of the {@link DrillToInsight} command.
 * It contains the target insight with the drill intersection filters applied.
 *
 * In the default dashboard implementation this event also opens drill dialog with the insight
 * that has the drill intersection filters applied.
 *
 * @alpha
 */
export interface DashboardDrillToInsightResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.RESOLVED";
    readonly payload: DashboardDrillToInsightResolvedPayload;
}
/**
 * @alpha
 */
export declare function drillToInsightResolved(ctx: DashboardContext, insight: IInsight, drillDefinition: IDrillToInsight, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillToInsightResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToInsightResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToInsightResolved: (obj: unknown) => obj is DashboardDrillToInsightResolved;
/**
 * Payload of the {@link DashboardDrillToDashboardRequested} event.
 * @alpha
 */
export interface DashboardDrillToDashboardRequestedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     *  Drill definition with the target dashboard.
     */
    readonly drillDefinition: IDrillToDashboard;
}
/**
 * This event is emitted on start of the resolution of the {@link DrillToDashboard} command.
 *
 * @alpha
 */
export interface DashboardDrillToDashboardRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.REQUESTED";
    readonly payload: DashboardDrillToDashboardRequestedPayload;
}
/**
 * @alpha
 */
export declare function drillToDashboardRequested(ctx: DashboardContext, drillDefinition: IDrillToDashboard, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillToDashboardRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToDashboardRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToDashboardRequested: (obj: unknown) => obj is DashboardDrillToDashboardRequested;
/**
 * Payload of the {@link DashboardDrillToDashboardResolved} event.
 * @alpha
 */
export interface DashboardDrillToDashboardResolvedPayload {
    /**
     * Drill intersection filters that can be applied to the target dashboard.
     */
    readonly filters: (IDashboardFilter | FilterContextItem)[];
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     *  Drill definition with the target dashboard.
     */
    readonly drillDefinition: IDrillToDashboard;
}
/**
 * This event is emitted as a result of the {@link DrillToDashboard} command.
 * It contains the drill intersection filters that can be applied to the target dashboard.
 *
 * There is a factory function to create default event handler for drill to same dashboard - see {@link newDrillToSameDashboardHandler}.
 *
 * @alpha
 */
export interface DashboardDrillToDashboardResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.RESOLVED";
    readonly payload: DashboardDrillToDashboardResolvedPayload;
}
/**
 * @alpha
 */
export declare function drillToDashboardResolved(ctx: DashboardContext, filters: (IDashboardFilter | FilterContextItem)[], drillDefinition: IDrillToDashboard, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillToDashboardResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToDashboardResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToDashboardResolved: (obj: unknown) => obj is DashboardDrillToDashboardResolved;
/**
 * Payload of the {@link DashboardDrillToCustomUrlRequested} event.
 * @alpha
 */
export interface DashboardDrillToCustomUrlRequestedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Drill definition with the custom url that was resolved.
     */
    readonly drillDefinition: IDrillToCustomUrl;
}
/**
 * This event is emitted on start of the resolution of the {@link DrillToCustomUrl} command.
 *
 * @alpha
 */
export interface DashboardDrillToCustomUrlRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.REQUESTED";
    readonly payload: DashboardDrillToCustomUrlRequestedPayload;
}
/**
 * @alpha
 */
export declare function drillToCustomUrlRequested(ctx: DashboardContext, drillDefinition: IDrillToCustomUrl, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillToCustomUrlRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToCustomUrlRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToCustomUrlRequested: (obj: unknown) => obj is DashboardDrillToCustomUrlRequested;
/**
 * Payload of the {@link DashboardDrillToCustomUrlResolved} event.
 * @alpha
 */
export interface DashboardDrillToCustomUrlResolvedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Drill definition with the custom url that was resolved.
     */
    readonly drillDefinition: IDrillToCustomUrl;
    /**
     * Resolved custom url.
     */
    readonly url: string;
    /**
     * Information about filters used on the dashboard.
     */
    readonly filtersInfo: FiltersInfo;
}
/**
 * This event is emitted as a result of the {@link DrillToCustomUrl} command.
 * It contains resolved custom url from the drill definition.
 *
 * @alpha
 */
export interface DashboardDrillToCustomUrlResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.RESOLVED";
    readonly payload: DashboardDrillToCustomUrlResolvedPayload;
}
/**
 * @alpha
 */
export declare function drillToCustomUrlResolved(ctx: DashboardContext, url: string, drillDefinition: IDrillToCustomUrl, drillEvent: IDashboardDrillEvent, filtersInfo: FiltersInfo, correlationId?: string): DashboardDrillToCustomUrlResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToCustomUrlResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToCustomUrlResolved: (obj: unknown) => obj is DashboardDrillToCustomUrlResolved;
/**
 * Payload of the {@link DashboardDrillToAttributeUrlRequested} event.
 * @alpha
 */
export interface DashboardDrillToAttributeUrlRequestedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Drill definition with the attribute url that was resolved.
     */
    readonly drillDefinition: IDrillToAttributeUrl;
}
/**
 * This event is emitted on start of the resolution of the {@link DrillToAttributeUrl} command.
 *
 * @alpha
 */
export interface DashboardDrillToAttributeUrlRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.REQUESTED";
    readonly payload: DashboardDrillToAttributeUrlRequestedPayload;
}
/**
 * @alpha
 */
export declare function drillToAttributeUrlRequested(ctx: DashboardContext, drillDefinition: IDrillToAttributeUrl, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillToAttributeUrlRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToAttributeUrlRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToAttributeUrlRequested: (obj: unknown) => obj is DashboardDrillToAttributeUrlRequested;
/**
 * Payload of the {@link DashboardDrillToAttributeUrlResolved} event.
 * @alpha
 */
export interface DashboardDrillToAttributeUrlResolvedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Drill definition with the attribute url that was resolved.
     */
    readonly drillDefinition: IDrillToAttributeUrl;
    /**
     * Resolved attribute url.
     */
    readonly url: string;
    /**
     * Information about filters used on the dashboard.
     */
    readonly filtersInfo: FiltersInfo;
    /**
     * drill is implicit generated on the fly base on metadata model or configured by user
     */
    readonly isImplicit: boolean;
}
/**
 * This event is emitted as a result of the {@link DrillToAttributeUrl} command.
 * It contains resolved attribute url from the drill definition.
 *
 * @alpha
 */
export interface DashboardDrillToAttributeUrlResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED";
    readonly payload: DashboardDrillToAttributeUrlResolvedPayload;
}
/**
 * @alpha
 */
export declare function drillToAttributeUrlResolved(ctx: DashboardContext, url: string, drillDefinition: IDrillToAttributeUrl, drillEvent: IDashboardDrillEvent, filtersInfo: FiltersInfo, isImplicit: boolean, correlationId?: string): DashboardDrillToAttributeUrlResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToAttributeUrlResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToAttributeUrlResolved: (obj: unknown) => obj is DashboardDrillToAttributeUrlResolved;
/**
 * Payload of the {@link DashboardDrillToLegacyDashboardRequested} event.
 * @alpha
 */
export interface DashboardDrillToLegacyDashboardRequestedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Drill definition with the drill information.
     */
    readonly drillDefinition: IDrillToLegacyDashboard;
}
/**
 * This event is emitted on start of the resolution of the {@link DrillToLegacyDashboard} command.
 *
 * @alpha
 */
export interface DashboardDrillToLegacyDashboardRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.REQUESTED";
    readonly payload: DashboardDrillToLegacyDashboardRequestedPayload;
}
/**
 * @alpha
 */
export declare function drillToLegacyDashboardRequested(ctx: DashboardContext, drillDefinition: IDrillToLegacyDashboard, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillToLegacyDashboardRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToLegacyDashboardRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToLegacyDashboardRequested: (obj: unknown) => obj is DashboardDrillToLegacyDashboardRequested;
/**
 * Payload of the {@link DashboardDrillToLegacyDashboardResolved} event.
 * @alpha
 */
export interface DashboardDrillToLegacyDashboardResolvedPayload {
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
    /**
     * Drill definition with the drill information.
     */
    readonly drillDefinition: IDrillToLegacyDashboard;
}
/**
 * This event is emitted as a result of the {@link DrillToLegacyDashboard} command.
 *
 * Drill to legacy dashboard can be configured for Kpi widgets only.
 *
 * @alpha
 */
export interface DashboardDrillToLegacyDashboardResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.RESOLVED";
    readonly payload: DashboardDrillToLegacyDashboardResolvedPayload;
}
/**
 * @alpha
 */
export declare function drillToLegacyDashboardResolved(ctx: DashboardContext, drillDefinition: IDrillToLegacyDashboard, drillEvent: IDashboardDrillEvent, correlationId?: string): DashboardDrillToLegacyDashboardResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToLegacyDashboardResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToLegacyDashboardResolved: (obj: unknown) => obj is DashboardDrillToLegacyDashboardResolved;
/**
 * Payload of the {@link DashboardDrillableItemsChanged} event.
 * @alpha
 */
export interface DashboardDrillableItemsChangedPayload {
    /**
     * Drillable items that was set.
     */
    readonly drillableItems: ExplicitDrill[];
}
/**
 * This event is emitted as a result of the {@link ChangeDrillableItems} command, if drillable items was successfully changed.
 *
 * @alpha
 */
export interface DashboardDrillableItemsChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILLABLE_ITEMS.CHANGED";
    readonly payload: DashboardDrillableItemsChangedPayload;
}
/**
 * @alpha
 */
export declare function drillableItemsChanged(ctx: DashboardContext, drillableItems: ExplicitDrill[], correlationId?: string): DashboardDrillableItemsChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillableItemsChanged}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillableItemsChanged: (obj: unknown) => obj is DashboardDrillableItemsChanged;
