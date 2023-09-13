/// <reference types="react" />
import { IDashboardAttributeFilter, IInsight, IKpi } from "@gooddata/sdk-model";
import { ICustomWidget } from "../../model/types/layoutTypes.js";
/**
 * @internal
 */
export type DraggableContentItemType = "attributeFilter" | "attributeFilter-placeholder" | "insightListItem" | "insight" | "insight-placeholder" | "kpi" | "kpi-placeholder" | "custom";
/**
 * @internal
 */
export type DraggableInternalItemType = "internal-width-resizer" | "internal-height-resizer";
/**
 * @internal
 */
export declare function isDraggableInternalItemType(type: string): type is DraggableInternalItemType;
/**
 * @internal
 */
export type DraggableItemType = DraggableContentItemType | DraggableInternalItemType;
/**
 * @internal
 */
export type AttributeFilterDraggableItem = {
    type: "attributeFilter";
    filter: IDashboardAttributeFilter;
    filterIndex: number;
};
/**
 * @internal
 */
export declare function isAttributeFilterDraggableItem(item: any): item is AttributeFilterDraggableItem;
/**
 * @internal
 */
export type BaseDraggableLayoutItemSize = {
    gridWidth: number;
    gridHeight: number;
};
/**
 * @internal
 */
export type BaseDraggableLayoutItem = {
    size: BaseDraggableLayoutItemSize;
};
/**
 * @internal
 */
export declare function isBaseDraggableLayoutItem(item: any): item is BaseDraggableMovingItem;
/**
 * @internal
 */
export type BaseDraggableMovingItem = BaseDraggableLayoutItem & {
    title: string;
    isOnlyItemInSection: boolean;
    sectionIndex: number;
    itemIndex: number;
};
/**
 * @internal
 */
export declare function isBaseDraggableMovingItem(item: any): item is BaseDraggableMovingItem;
/**
 * @internal
 */
export type InsightDraggableItem = BaseDraggableMovingItem & {
    type: "insight";
    insight: IInsight;
};
/**
 * @internal
 */
export declare function isInsightDraggableItem(item: any): item is InsightDraggableItem;
/**
 * @internal
 */
export type KpiDraggableItem = BaseDraggableMovingItem & {
    type: "kpi";
    kpi: IKpi;
};
/**
 * @internal
 */
export declare function isKpiDraggableItem(item: any): item is KpiDraggableItem;
/**
 * @internal
 */
export type CustomWidgetDraggableItem = BaseDraggableMovingItem & {
    type: "customWidget";
    widget: ICustomWidget;
};
/**
 * @internal
 */
export type AttributeFilterPlaceholderDraggableItem = {
    type: "attributeFilter-placeholder";
};
/**
 * @internal
 */
export declare function isAttributeFilterPlaceholderDraggableItem(item: any): item is AttributeFilterPlaceholderDraggableItem;
/**
 * @internal
 */
export type KpiPlaceholderDraggableItem = BaseDraggableLayoutItem & {
    type: "kpi-placeholder";
};
/**
 * @internal
 */
export declare function isKpiPlaceholderDraggableItem(item: any): item is KpiPlaceholderDraggableItem;
/**
 * @internal
 */
export type InsightPlaceholderDraggableItem = BaseDraggableLayoutItem & {
    type: "insight-placeholder";
};
/**
 * @internal
 */
export declare function isInsightPlaceholderDraggableItem(item: any): item is InsightPlaceholderDraggableItem;
/**
 * @internal
 */
export type InsightDraggableListItem = BaseDraggableLayoutItem & {
    type: "insightListItem";
    insight: IInsight;
};
/**
 * @internal
 */
export declare function isInsightDraggableListItem(item: any): item is InsightDraggableListItem;
/**
 * @internal
 */
export type CustomDraggableItem = {
    type: "custom";
    [key: string]: any;
};
/**
 * @internal
 */
export type DraggableContentItem = AttributeFilterDraggableItem | AttributeFilterPlaceholderDraggableItem | InsightDraggableItem | InsightDraggableListItem | InsightPlaceholderDraggableItem | KpiDraggableItem | KpiPlaceholderDraggableItem | CustomWidgetDraggableItem | CustomDraggableItem;
/**
 * @internal
 */
export type DraggableLayoutItem = InsightDraggableItem | KpiDraggableItem | CustomWidgetDraggableItem;
/**
 * @internal
 */
export type DraggableInternalItem = HeightResizerDragItem | WidthResizerDragItem;
/**
 * @internal
 */
export type DraggableItem = DraggableContentItem | DraggableInternalItem;
/**
 * @internal
 */
export type DraggableItemTypeMapping = DraggableItemComponentTypeMapping & DraggableItemInternalTypeMapping;
/**
 * @internal
 */
export type DraggableItemComponentTypeMapping = {
    attributeFilter: AttributeFilterDraggableItem;
    "attributeFilter-placeholder": AttributeFilterPlaceholderDraggableItem;
    insight: InsightDraggableItem;
    insightListItem: InsightDraggableListItem;
    "insight-placeholder": InsightPlaceholderDraggableItem;
    kpi: KpiDraggableItem;
    "kpi-placeholder": KpiPlaceholderDraggableItem;
    custom: CustomDraggableItem;
};
/**
 * @internal
 */
export interface HeightResizerDragItem {
    type: "internal-height-resizer";
    sectionIndex: number;
    itemIndexes: number[];
    widgetHeights: number[];
    initialLayoutDimensions: DOMRect;
    minLimit: number;
    maxLimit: number;
}
/**
 * @internal
 */
export interface WidthResizerDragItem {
    type: "internal-width-resizer";
    sectionIndex: number;
    itemIndex: number;
    gridColumnWidth: number;
    gridColumnHeightInPx: number;
    currentWidth: number;
    initialLayoutDimensions: DOMRect;
    minLimit: number;
    maxLimit: number;
}
/**
 * @internal
 */
export type DraggableItemInternalTypeMapping = {
    "internal-width-resizer": WidthResizerDragItem;
    "internal-height-resizer": HeightResizerDragItem;
};
/**
 * @internal
 */
export type CustomDashboardInsightListItemComponentProps = {
    isLocked?: boolean;
    title?: string;
    description?: string;
    updated?: string;
    type?: string;
    className?: string;
    showDescriptionPanel?: boolean;
    onDescriptionPanelOpen?: () => void;
    metadataTimeZone?: string;
};
/**
 * @internal
 */
export type CustomDashboardInsightListItemComponent = React.ComponentType<CustomDashboardInsightListItemComponentProps>;
/**
 * @internal
 */
export type IWrapCreatePanelItemWithDragProps = {
    children: JSX.Element;
    dragItem: DraggableItem;
    hideDefaultPreview?: boolean;
    disabled?: boolean;
};
/**
 * @internal
 */
export type IWrapCreatePanelItemWithDragInnerProps = {
    children: JSX.Element;
    dragItem: DraggableItem;
    hideDefaultPreview?: boolean;
    disabled?: boolean;
    canDrag: boolean;
    onDragStart?: (item: DraggableItem) => void;
    onDragEnd?: (didDrop: boolean) => void;
};
/**
 * @internal
 */
export type IWrapCreatePanelItemWithDragComponent = React.ComponentType<IWrapCreatePanelItemWithDragProps>;
/**
 * @internal
 */
export interface IWrapInsightListItemWithDragProps {
    children: JSX.Element;
    insight: IInsight;
}
/**
 * @internal
 */
export type IWrapInsightListItemWithDragComponent = React.ComponentType<IWrapInsightListItemWithDragProps>;
