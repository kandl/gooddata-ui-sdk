import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { LayoutState } from "./layoutState.js";
import { ExtendedDashboardItem, ExtendedDashboardLayoutSection, ExtendedDashboardWidget, RelativeIndex, StashedDashboardItemsId } from "../../types/layoutTypes.js";
import { ObjRef, VisualizationProperties, IDashboardFilterReference, InsightDrillDefinition, IDashboardLayout, IDashboardLayoutSectionHeader, IKpiComparisonDirection, IKpiComparisonTypeComparison, IDrillToLegacyDashboard, IInsightWidgetConfiguration, IKpiWidgetConfiguration } from "@gooddata/sdk-model";
import { WidgetDescription, WidgetHeader } from "../../types/widgetTypes.js";
import { Draft } from "immer";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
import { IdentityMapping } from "../../../_staging/dashboard/dashboardLayout.js";
import { IVisualizationSizeInfo } from "@gooddata/sdk-ui-ext";
type LayoutReducer<A> = CaseReducer<LayoutState, PayloadAction<A>>;
type AddSectionActionPayload = {
    section: ExtendedDashboardLayoutSection;
    index: RelativeIndex;
    usedStashes: StashedDashboardItemsId[];
};
type RemoveSectionActionPayload = {
    index: RelativeIndex;
    stashIdentifier?: StashedDashboardItemsId;
};
type ChangeSectionActionPayload = {
    index: number;
    header: IDashboardLayoutSectionHeader;
};
type changeItemsHeightActionPayload = {
    sectionIndex: number;
    itemIndexes: number[];
    height: number;
};
type changeItemWidthActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    width: number;
};
type MoveSectionActionPayload = {
    sectionIndex: number;
    toIndex: RelativeIndex;
};
type AddSectionItemsActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    items: ExtendedDashboardItem[];
    usedStashes: StashedDashboardItemsId[];
};
type MoveSectionItemActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    toSectionIndex: number;
    toItemIndex: RelativeIndex;
};
type RemoveSectionItemActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    stashIdentifier?: StashedDashboardItemsId;
};
type ReplaceSectionItemActionPayload = {
    sectionIndex: number;
    itemIndex: number;
    newItems: ExtendedDashboardItem[];
    stashIdentifier?: StashedDashboardItemsId;
    usedStashes: StashedDashboardItemsId[];
};
type ReplaceWidgetHeader = {
    ref: ObjRef;
    header: WidgetHeader;
};
type ReplaceWidgetDescription = {
    ref: ObjRef;
    description: WidgetDescription;
};
type ReplaceWidgetDrillDefinitions = {
    ref: ObjRef;
    drillDefinitions: InsightDrillDefinition[];
};
type ReplaceWidgetVisProperties = {
    ref: ObjRef;
    properties: VisualizationProperties | undefined;
};
type ReplaceWidgetVisConfiguration = {
    ref: ObjRef;
    config: IInsightWidgetConfiguration | undefined;
};
type ReplaceWidgetInsight = {
    ref: ObjRef;
    insightRef: ObjRef;
    properties: VisualizationProperties | undefined;
    header: WidgetHeader | undefined;
    newSize?: IVisualizationSizeInfo;
};
type ReplaceWidgetFilterSettings = {
    ref: ObjRef;
    ignoreDashboardFilters?: IDashboardFilterReference[];
    dateDataSet?: ObjRef;
};
type RemoveIgnoredAttributeFilter = {
    displayFormRefs: ObjRef[];
};
type ReplaceWidgetDateDataset = {
    ref: ObjRef;
    dateDataSet?: ObjRef;
};
type ReplaceKpiWidgetMeasure = {
    ref: ObjRef;
    measureRef: ObjRef;
};
type ReplaceKpiWidgetComparison = {
    ref: ObjRef;
    comparisonType: IKpiComparisonTypeComparison;
    comparisonDirection?: IKpiComparisonDirection;
};
type ReplaceKpiWidgetDrill = {
    ref: ObjRef;
    drill: IDrillToLegacyDashboard | undefined;
};
type ReplaceKpiWidgetConfiguration = {
    ref: ObjRef;
    config: IKpiWidgetConfiguration | undefined;
};
export declare const layoutReducers: {
    setLayout: LayoutReducer<IDashboardLayout<ExtendedDashboardWidget>>;
    updateWidgetIdentities: LayoutReducer<ObjRefMap<IdentityMapping>>;
    removeIgnoredAttributeFilter: LayoutReducer<RemoveIgnoredAttributeFilter>;
    addSection: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & AddSectionActionPayload, import("../../index.js").IDashboardCommand>;
    removeSection: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & RemoveSectionActionPayload, import("../../index.js").IDashboardCommand>;
    moveSection: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & MoveSectionActionPayload, import("../../index.js").IDashboardCommand>;
    changeSectionHeader: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ChangeSectionActionPayload, import("../../index.js").IDashboardCommand>;
    addSectionItems: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & AddSectionItemsActionPayload, import("../../index.js").IDashboardCommand>;
    moveSectionItem: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & MoveSectionItemActionPayload, import("../../index.js").IDashboardCommand>;
    removeSectionItem: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & RemoveSectionItemActionPayload, import("../../index.js").IDashboardCommand>;
    replaceSectionItem: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceSectionItemActionPayload, import("../../index.js").IDashboardCommand>;
    replaceWidgetHeader: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceWidgetHeader, import("../../index.js").IDashboardCommand>;
    replaceWidgetDescription: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceWidgetDescription, import("../../index.js").IDashboardCommand>;
    replaceWidgetDrillWithoutUndo: LayoutReducer<ReplaceWidgetDrillDefinitions>;
    replaceWidgetDrills: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceWidgetDrillDefinitions, import("../../index.js").IDashboardCommand>;
    replaceInsightWidgetVisProperties: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceWidgetVisProperties, import("../../index.js").IDashboardCommand>;
    replaceInsightWidgetVisConfiguration: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceWidgetVisConfiguration, import("../../index.js").IDashboardCommand>;
    replaceInsightWidgetInsight: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceWidgetInsight, import("../../index.js").IDashboardCommand>;
    replaceWidgetFilterSettings: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceWidgetFilterSettings, import("../../index.js").IDashboardCommand>;
    replaceWidgetDateDataset: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceWidgetDateDataset, import("../../index.js").IDashboardCommand>;
    replaceKpiWidgetMeasure: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceKpiWidgetMeasure, import("../../index.js").IDashboardCommand>;
    replaceKpiWidgetComparison: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceKpiWidgetComparison, import("../../index.js").IDashboardCommand>;
    replaceKpiWidgetDrillWithoutUndo: LayoutReducer<ReplaceKpiWidgetDrill>;
    replaceKpiWidgetDrill: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceKpiWidgetDrill, import("../../index.js").IDashboardCommand>;
    replaceKpiWidgetConfiguration: import("../_infra/undoEnhancer.js").UndoEnabledReducer<LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & ReplaceKpiWidgetConfiguration, import("../../index.js").IDashboardCommand>;
    undoLayout: <TState extends import("../_infra/undoEnhancer.js").UndoEnhancedState<import("../../index.js").IDashboardCommand>>(state: Draft<TState>, action: {
        payload: import("../_infra/undoEnhancer.js").UndoActionPayload;
        type: string;
    }) => TState;
    clearLayoutHistory: <TState_1 extends import("../_infra/undoEnhancer.js").UndoEnhancedState<import("../../index.js").IDashboardCommand>>(state: Draft<TState_1>) => void;
    changeItemsHeight: LayoutReducer<changeItemsHeightActionPayload>;
    changeItemWidth: LayoutReducer<changeItemWidthActionPayload>;
};
export {};
