export declare const layoutSliceReducer: import("@reduxjs/toolkit").Reducer<import("./layoutState.js").LayoutState>;
export declare const layoutActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setLayout: (state: import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>, action: {
        payload: import("@gooddata/sdk-model").IDashboardLayout<import("../../index.js").ExtendedDashboardWidget>;
        type: string;
    }) => void | import("./layoutState.js").LayoutState | import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>;
    updateWidgetIdentities: (state: import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>, action: {
        payload: import("../../../index.js").ObjRefMap<import("../../../_staging/dashboard/dashboardLayout.js").IdentityMapping>;
        type: string;
    }) => void | import("./layoutState.js").LayoutState | import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>;
    removeIgnoredAttributeFilter: (state: import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>, action: {
        payload: {
            displayFormRefs: import("@gooddata/sdk-model").ObjRef[];
        };
        type: string;
    }) => void | import("./layoutState.js").LayoutState | import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>;
    addSection: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        section: import("../../index.js").ExtendedDashboardLayoutSection;
        index: number;
        usedStashes: string[];
    }, import("../../index.js").IDashboardCommand>;
    removeSection: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        index: number;
        stashIdentifier?: string | undefined;
    }, import("../../index.js").IDashboardCommand>;
    moveSection: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        sectionIndex: number;
        toIndex: number;
    }, import("../../index.js").IDashboardCommand>;
    changeSectionHeader: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        index: number;
        header: import("@gooddata/sdk-model").IDashboardLayoutSectionHeader;
    }, import("../../index.js").IDashboardCommand>;
    addSectionItems: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        sectionIndex: number;
        itemIndex: number;
        items: import("../../index.js").ExtendedDashboardItem[];
        usedStashes: string[];
    }, import("../../index.js").IDashboardCommand>;
    moveSectionItem: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        sectionIndex: number;
        itemIndex: number;
        toSectionIndex: number;
        toItemIndex: number;
    }, import("../../index.js").IDashboardCommand>;
    removeSectionItem: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        sectionIndex: number;
        itemIndex: number;
        stashIdentifier?: string | undefined;
    }, import("../../index.js").IDashboardCommand>;
    replaceSectionItem: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        sectionIndex: number;
        itemIndex: number;
        newItems: import("../../index.js").ExtendedDashboardItem[];
        stashIdentifier?: string | undefined;
        usedStashes: string[];
    }, import("../../index.js").IDashboardCommand>;
    replaceWidgetHeader: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        header: import("../../index.js").WidgetHeader;
    }, import("../../index.js").IDashboardCommand>;
    replaceWidgetDescription: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        description: import("../../index.js").WidgetDescription;
    }, import("../../index.js").IDashboardCommand>;
    replaceWidgetDrillWithoutUndo: (state: import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>, action: {
        payload: {
            ref: import("@gooddata/sdk-model").ObjRef;
            drillDefinitions: import("@gooddata/sdk-model").InsightDrillDefinition[];
        };
        type: string;
    }) => void | import("./layoutState.js").LayoutState | import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>;
    replaceWidgetDrills: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        drillDefinitions: import("@gooddata/sdk-model").InsightDrillDefinition[];
    }, import("../../index.js").IDashboardCommand>;
    replaceInsightWidgetVisProperties: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        properties: import("@gooddata/sdk-model").VisualizationProperties | undefined;
    }, import("../../index.js").IDashboardCommand>;
    replaceInsightWidgetVisConfiguration: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        config: import("@gooddata/sdk-model").IInsightWidgetConfiguration | undefined;
    }, import("../../index.js").IDashboardCommand>;
    replaceInsightWidgetInsight: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        insightRef: import("@gooddata/sdk-model").ObjRef;
        properties: import("@gooddata/sdk-model").VisualizationProperties | undefined;
        header: import("../../index.js").WidgetHeader | undefined;
        newSize?: import("@gooddata/sdk-ui-ext").IVisualizationSizeInfo | undefined;
    }, import("../../index.js").IDashboardCommand>;
    replaceWidgetFilterSettings: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        ignoreDashboardFilters?: import("@gooddata/sdk-model").IDashboardFilterReference[] | undefined;
        dateDataSet?: import("@gooddata/sdk-model").ObjRef | undefined;
    }, import("../../index.js").IDashboardCommand>;
    replaceWidgetDateDataset: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        dateDataSet?: import("@gooddata/sdk-model").ObjRef | undefined;
    }, import("../../index.js").IDashboardCommand>;
    replaceKpiWidgetMeasure: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        measureRef: import("@gooddata/sdk-model").ObjRef;
    }, import("../../index.js").IDashboardCommand>;
    replaceKpiWidgetComparison: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        comparisonType: import("@gooddata/sdk-model").IKpiComparisonTypeComparison;
        comparisonDirection?: import("@gooddata/sdk-model").IKpiComparisonDirection | undefined;
    }, import("../../index.js").IDashboardCommand>;
    replaceKpiWidgetDrillWithoutUndo: (state: import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>, action: {
        payload: {
            ref: import("@gooddata/sdk-model").ObjRef;
            drill: import("@gooddata/sdk-model").IDrillToLegacyDashboard | undefined;
        };
        type: string;
    }) => void | import("./layoutState.js").LayoutState | import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>;
    replaceKpiWidgetDrill: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        drill: import("@gooddata/sdk-model").IDrillToLegacyDashboard | undefined;
    }, import("../../index.js").IDashboardCommand>;
    replaceKpiWidgetConfiguration: import("../_infra/undoEnhancer.js").UndoEnabledReducer<import("./layoutState.js").LayoutState, import("../_infra/undoEnhancer.js").UndoPayload<import("../../index.js").IDashboardCommand> & {
        ref: import("@gooddata/sdk-model").ObjRef;
        config: import("@gooddata/sdk-model").IKpiWidgetConfiguration | undefined;
    }, import("../../index.js").IDashboardCommand>;
    undoLayout: <TState extends import("../index.js").UndoEnhancedState<import("../../index.js").IDashboardCommand>>(state: import("@reduxjs/toolkit").Draft<TState>, action: {
        payload: import("../_infra/undoEnhancer.js").UndoActionPayload;
        type: string;
    }) => TState;
    clearLayoutHistory: <TState_1 extends import("../index.js").UndoEnhancedState<import("../../index.js").IDashboardCommand>>(state: import("@reduxjs/toolkit").Draft<TState_1>) => void;
    changeItemsHeight: (state: import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>, action: {
        payload: {
            sectionIndex: number;
            itemIndexes: number[];
            height: number;
        };
        type: string;
    }) => void | import("./layoutState.js").LayoutState | import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>;
    changeItemWidth: (state: import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>, action: {
        payload: {
            sectionIndex: number;
            itemIndex: number;
            width: number;
        };
        type: string;
    }) => void | import("./layoutState.js").LayoutState | import("immer/dist/internal.js").WritableDraft<import("./layoutState.js").LayoutState>;
}, "layout">;
