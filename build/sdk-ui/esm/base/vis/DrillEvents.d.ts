import { IDataView } from "@gooddata/sdk-backend-spi";
import { IMeasureDescriptor, IAttributeDescriptor, IResultAttributeHeader, ITotalDescriptor } from "@gooddata/sdk-model";
import { ChartElementType, ChartType, HeadlineElementType, HeadlineType, TableElementType, TableType, VisElementType, VisType, XirrType } from "./visualizationTypes.js";
import { IHeaderPredicate } from "../headerMatching/HeaderPredicate.js";
/**
 * Drillable item reference or predicate that enables insight / kpi drilling if it matches some attribute or measure of the insight / kpi.
 *
 * @remarks
 * You can use {@link @gooddata/sdk-ui#HeaderPredicates} factory functions to create predicates,
 * or specify reference to the identifier / uri of the target attribute / measure using {@link @gooddata/sdk-ui#IDrillableItem} definition.
 *
 * @public
 */
export type ExplicitDrill = IDrillableItem | IHeaderPredicate;
/**
 * @public
 */
export declare function isExplicitDrill(obj: unknown): obj is ExplicitDrill;
/**
 * @public
 */
export interface IDrillableItemUri {
    uri: string;
}
/**
 * @public
 */
export interface IDrillableItemIdentifier {
    identifier: string;
}
/**
 * @public
 */
export type IDrillableItem = IDrillableItemUri | IDrillableItemIdentifier | (IDrillableItemUri & IDrillableItemIdentifier);
/**
 * @public
 */
export declare function isDrillableItemUri(item: unknown): item is IDrillableItemUri;
/**
 * @public
 */
export declare function isDrillableItemIdentifier(item: unknown): item is IDrillableItemIdentifier;
/**
 * @public
 */
export declare function isDrillableItem(item: unknown): item is IDrillableItem;
/**
 * @public
 */
export type IDrillEventCallback = (event: IDrillEvent) => void | boolean;
/**
 * @public
 */
export interface IDrillIntersectionAttributeItem extends IAttributeDescriptor, IResultAttributeHeader {
}
/**
 * @public
 */
export declare function isDrillIntersectionAttributeItem(header: DrillEventIntersectionElementHeader): header is IDrillIntersectionAttributeItem;
/**
 * @public
 */
export type DrillEventIntersectionElementHeader = IAttributeDescriptor | IMeasureDescriptor | ITotalDescriptor | IDrillIntersectionAttributeItem;
/**
 * @public
 */
export interface IDrillEventIntersectionElement {
    header: DrillEventIntersectionElementHeader;
}
/**
 * Drill context for table
 *
 * @public
 */
export interface IDrillEventContextTable {
    type: TableType;
    element: TableElementType;
    columnIndex: number;
    rowIndex: number;
    row: any[];
    intersection: IDrillEventIntersectionElement[];
}
/**
 * Drill context for headline
 *
 * @public
 */
export interface IDrillEventContextHeadline {
    type: HeadlineType;
    element: HeadlineElementType;
    value: string;
    intersection: IDrillEventIntersectionElement[];
}
/**
 * Drill context for XIRR
 *
 * @public
 */
export interface IDrillEventContextXirr {
    type: XirrType;
    element: HeadlineElementType;
    value: string;
    intersection: IDrillEventIntersectionElement[];
}
/**
 * Drill context for pointy-charts
 *
 * @public
 */
export interface IDrillEventContextPoint {
    type: ChartType;
    element: ChartElementType;
    elementChartType?: ChartType;
    x?: number;
    y?: number;
    z?: number;
    value?: string;
    intersection: IDrillEventIntersectionElement[];
}
/**
 * Drill context for headline
 *
 * @public
 */
export interface IDrillPoint {
    x: number;
    y: number;
    intersection: IDrillEventIntersectionElement[];
    type?: ChartType;
}
/**
 * Drill context for chart element group (multiple series + click on axis value) where
 * every point has own intersection.
 *
 * @public
 */
export interface IDrillEventContextGroup {
    type: ChartType;
    element: ChartElementType;
    points: IDrillPoint[];
}
/**
 * Drill context for all visualization type.
 * @public
 */
export interface IDrillEventContext {
    type: VisType;
    element: VisElementType;
    x?: number;
    y?: number;
    z?: number;
    columnIndex?: number;
    rowIndex?: number;
    row?: any[];
    value?: string;
    intersection?: IDrillEventIntersectionElement[];
    points?: IDrillPoint[];
}
/**
 * @public
 */
export interface IDrillEvent {
    dataView: IDataView;
    drillContext: IDrillEventContext;
}
/**
 * @public
 */
export interface IHighchartsParentTick {
    leaves: number;
    startAt: number;
    label: any;
}
/**
 * @public
 */
export interface IHighchartsCategoriesTree {
    tick: IHighchartsParentTick;
}
/**
 * @public
 */
export type OnFiredDrillEvent = IDrillEventCallback;
/**
 * @public
 */
export interface IDrillConfig {
    dataView: IDataView;
    onDrill: OnFiredDrillEvent;
}
//# sourceMappingURL=DrillEvents.d.ts.map