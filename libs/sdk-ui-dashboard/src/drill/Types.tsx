// (C) 2019-2021 GoodData Corporation
import { IAvailableDrillTargets, IAvailableDrillTargetMeasure, IDrillEvent } from "@gooddata/sdk-ui";
import isEmpty from "lodash/isEmpty";
import { IInsight, ObjRef } from "@gooddata/sdk-model";
import { IDashboardDrillEvent, IDrillDownDefinition, isDrillDownDefinition } from "@gooddata/sdk-ui-ext";
import {
    DrillDefinition,
    IDrillToAttributeUrl,
    IDrillToCustomUrl,
    IInsightWidget,
    isDrillToAttributeUrl,
    isDrillToCustomUrl,
    IListedDashboard,
} from "@gooddata/sdk-backend-spi";
import { IDrillDownContext } from "@gooddata/sdk-ui-ext/esm/internal";

/////////////

/**
 * @internal
 */
export type DashboardDrillDefinition = DrillDefinition | IDrillDownDefinition;

//

export type IDrillToUrl = IDrillToCustomUrl | IDrillToAttributeUrl;

//

export function isDrillDefinition(
    drillDefinition: DashboardDrillDefinition,
): drillDefinition is DrillDefinition {
    return !isDrillDownDefinition(drillDefinition);
}

export function isDrillToUrl(drillDefinition: DashboardDrillDefinition): drillDefinition is IDrillToUrl {
    return isDrillToCustomUrl(drillDefinition) || isDrillToAttributeUrl(drillDefinition);
}

export interface IDrillConfig {
    [widgetRefAsString: string]: DashboardDrillDefinition[];
}

export enum DRILL_TARGET_TYPE {
    DRILL_TO_DASHBOARD = "DrillToDashboard",
    DRILL_TO_INSIGHT = "DrillToInsight",
    DRILL_TO_URL = "DrillToUrl",
}

export type DrillActionTarget = IDrillVisualizationTarget | IDrillDashboardTarget | IDrillUrlTarget;

export interface IDrillVisualizationTarget {
    insight: IInsight;
}

export function isDrillVisualizationTarget(target: DrillActionTarget): target is IDrillVisualizationTarget {
    return !isEmpty(target) && (target as IDrillVisualizationTarget).insight !== undefined;
}

export interface IDrillDashboardTarget {
    dashboard: ObjRef;
}

export function isDrillDashboardTarget(target: DrillActionTarget): target is IDrillDashboardTarget {
    return !isEmpty(target) && (target as IDrillDashboardTarget).dashboard !== undefined;
}

export interface IDrillUrlTarget {
    urlDrillTarget: UrlDrillTarget;
}

export function isDrillUrlTarget(target: DrillActionTarget): target is IDrillUrlTarget {
    return !isEmpty(target) && (target as IDrillUrlTarget).urlDrillTarget !== undefined;
}

export interface IDrillConfigItemBase {
    type: string;
    title: string;
    localIdentifier: string;
    drillTargetType: DRILL_TARGET_TYPE;
    complete: boolean;
    warning?: string;
    attributes: IAvailableDrillTargetMeasure["attributes"];
}

export type IDrillConfigItem = IDrillToDashboardConfig | IDrillToInsightConfig | IDrillToUrlConfig;

export interface IDrillToDashboardConfig extends IDrillConfigItemBase {
    dashboard?: ObjRef;
}

export function isDrillToDashboardConfig(item: IDrillConfigItem): item is IDrillToDashboardConfig {
    return !isEmpty(item) && (item as IDrillToDashboardConfig).dashboard !== undefined;
}

export interface IDrillToInsightConfig extends IDrillConfigItemBase {
    insightRef?: ObjRef;
}

export function isDrillToInsightConfig(item: IDrillConfigItem): item is IDrillToInsightConfig {
    return !isEmpty(item) && (item as IDrillToInsightConfig).insightRef !== undefined;
}

export interface IDrillToCustomUrlConfig {
    customUrl: string;
}

export function isDrillToCustomUrlConfig(item: UrlDrillTarget): item is IDrillToCustomUrlConfig {
    return !isEmpty(item) && (item as IDrillToCustomUrlConfig).customUrl !== undefined;
}

export interface IDrillToAttributeUrlConfig {
    insightAttributeDisplayForm: ObjRef;
    drillToAttributeDisplayForm: ObjRef;
}

export function isDrillToAttributeUrlConfig(item: UrlDrillTarget): item is IDrillToAttributeUrlConfig {
    return !isEmpty(item) && (item as IDrillToAttributeUrlConfig).insightAttributeDisplayForm !== undefined;
}

export type UrlDrillTarget = IDrillToCustomUrlConfig | IDrillToAttributeUrlConfig;

export interface IDrillToUrlConfig extends IDrillConfigItemBase {
    urlDrillTarget?: UrlDrillTarget;
}

export function isDrillToUrlConfig(item: IDrillConfigItem): item is IDrillToUrlConfig {
    return !isEmpty(item) && (item as IDrillToUrlConfig).urlDrillTarget !== undefined;
}

interface IKpiDrillEvent {
    executionContext: any; // IAfm;
    drillTo: {
        uri: string;
        target: string;
    };
}

export function isKpiDrillEvent(drillEvent: DashboardDrillEvent): drillEvent is IKpiDrillEvent {
    return drillEvent && (drillEvent as IKpiDrillEvent).drillTo !== undefined;
}

export type DashboardDrillEvent = IDrillEvent | IKpiDrillEvent;

export enum DRILL_TO_URL_PLACEHOLDER {
    PROJECT_ID = "{project_id}",
    INSIGHT_ID = "{insight_id}",
    WIDGET_ID = "{widget_id}",
    DASHBOARD_ID = "{dashboard_id}",
    CLIENT_ID = "{client_id}",
    DATA_PRODUCT_ID = "{data_product_id}",
}

export interface IDrillToUrlPlaceholder {
    placeholder: string;
    identifier: string;
    toBeEncoded: boolean;
}

export interface IDrillTargetsState {
    [url: string]: IInsight;
}

//////

export type OnDashboardDrill = (
    drillEvent: IDashboardDrillEvent,
    drillContext: DashboardDrillContext,
) => void;

export interface DashboardDrillContext {
    insight?: IInsight;
    widget?: IInsightWidget;
    getInsightWithDrillDownApplied(
        sourceVisualization: IInsight,
        drillDownContext: IDrillDownContext,
    ): IInsight;
}

export interface DrillStep {
    drillEvent: IDashboardDrillEvent;
    drillDefinition: DashboardDrillDefinition;
    insight?: IInsight;
}

// TODO: Edit mode
export enum AttributeDisplayFormType {
    HYPERLINK = "GDC.link",
    GEO_PUSHPIN = "GDC.geo.pin",
}

// TODO: remove / replace
export interface IAttributeDisplayForm {
    formOf: ObjRef;
    identifier: string;
    uri: string;
    ref: ObjRef;
    type?: AttributeDisplayFormType;
    displayFormTitle: string;
    attributeTitle: string;
}

export interface IDefinitionValidationData {
    supportedDrillableItems: IAvailableDrillTargets;
    dashboardsList: IListedDashboard[];
    attributeDisplayForms?: IAttributeDisplayForm[];
}
