/**
 * This package provides the Dashboard component that can be used to embed dashboards into your application as React components.
 *
 * @remarks
 * The component also allows for customization of the embedded dashboard using plugins.
 * See also `@gooddata/sdk-ui-loaders`.
 *
 * @packageDocumentation
 */

/// <reference types="lodash" />
/// <reference types="react" />

import { AccessGranularPermission } from '@gooddata/sdk-model';
import { Action } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit';
import { CaseReducerActions } from '@reduxjs/toolkit';
import { CommandProcessingStatus as CommandProcessingStatus_2 } from '../../../model/index.js';
import { Component } from 'react';
import { ComponentPropsWithRef } from 'react';
import { ComponentType } from 'react';
import { CreateInsightRequested as CreateInsightRequested_2 } from '../events/lab.js';
import { CurrentUserPermissions } from '@gooddata/sdk-ui-kit';
import { DashboardAlertCreated as DashboardAlertCreated_2 } from '../events/alerts.js';
import { DashboardAlertsRemoved as DashboardAlertsRemoved_2 } from '../events/alerts.js';
import { DashboardAlertUpdated as DashboardAlertUpdated_2 } from '../events/alerts.js';
import { DashboardAsyncRenderRequested as DashboardAsyncRenderRequested_2 } from '../events/render.js';
import { DashboardAsyncRenderResolved as DashboardAsyncRenderResolved_2 } from '../events/render.js';
import { DashboardAttributeFilterAdded as DashboardAttributeFilterAdded_2 } from '../events/filters.js';
import { DashboardAttributeFilterMoved as DashboardAttributeFilterMoved_2 } from '../events/filters.js';
import { DashboardAttributeFilterParentChanged as DashboardAttributeFilterParentChanged_2 } from '../events/filters.js';
import { DashboardAttributeFilterRemoved as DashboardAttributeFilterRemoved_2 } from '../events/filters.js';
import { DashboardAttributeFilterSelectionChanged as DashboardAttributeFilterSelectionChanged_2 } from '../events/filters.js';
import { DashboardAttributeFilterSelectionMode } from '@gooddata/sdk-model';
import { DashboardAttributeSelectionModeChanged as DashboardAttributeSelectionModeChanged_2 } from '../events/filters.js';
import { DashboardAttributeTitleChanged as DashboardAttributeTitleChanged_2 } from '../events/filters.js';
import { DashboardCommandFailed as DashboardCommandFailed_2 } from '../events/general.js';
import { DashboardCommandRejected as DashboardCommandRejected_2 } from '../events/general.js';
import { DashboardCommandStarted as DashboardCommandStarted_2 } from '../events/general.js';
import { DashboardCopySaved as DashboardCopySaved_2 } from '../events/dashboard.js';
import { DashboardDateFilterConfigMode } from '@gooddata/sdk-model';
import { DashboardDateFilterSelectionChanged as DashboardDateFilterSelectionChanged_2 } from '../events/filters.js';
import { DashboardDeinitialized as DashboardDeinitialized_2 } from '../events/dashboard.js';
import { DashboardDrillableItemsChanged as DashboardDrillableItemsChanged_2 } from '../events/drill.js';
import { DashboardDrillContext as DashboardDrillContext_2 } from '../../../types.js';
import { DashboardDrillDownRequested as DashboardDrillDownRequested_2 } from '../events/drill.js';
import { DashboardDrillDownResolved as DashboardDrillDownResolved_2 } from '../events/drill.js';
import { DashboardDrillRequested as DashboardDrillRequested_2 } from '../events/drill.js';
import { DashboardDrillResolved as DashboardDrillResolved_2 } from '../events/drill.js';
import { DashboardDrillToAttributeUrlRequested as DashboardDrillToAttributeUrlRequested_2 } from '../events/drill.js';
import { DashboardDrillToAttributeUrlResolved as DashboardDrillToAttributeUrlResolved_2 } from '../events/drill.js';
import { DashboardDrillToCustomUrlRequested as DashboardDrillToCustomUrlRequested_2 } from '../events/drill.js';
import { DashboardDrillToCustomUrlResolved as DashboardDrillToCustomUrlResolved_2 } from '../events/drill.js';
import { DashboardDrillToDashboardRequested as DashboardDrillToDashboardRequested_2 } from '../events/drill.js';
import { DashboardDrillToDashboardResolved as DashboardDrillToDashboardResolved_2 } from '../events/drill.js';
import { DashboardDrillToInsightRequested as DashboardDrillToInsightRequested_2 } from '../events/drill.js';
import { DashboardDrillToInsightResolved as DashboardDrillToInsightResolved_2 } from '../events/drill.js';
import { DashboardDrillToLegacyDashboardRequested as DashboardDrillToLegacyDashboardRequested_2 } from '../events/drill.js';
import { DashboardDrillToLegacyDashboardResolved as DashboardDrillToLegacyDashboardResolved_2 } from '../events/drill.js';
import { DashboardExportToPdfRequested as DashboardExportToPdfRequested_2 } from '../events/dashboard.js';
import { DashboardExportToPdfResolved as DashboardExportToPdfResolved_2 } from '../events/dashboard.js';
import { DashboardFilterContextChanged as DashboardFilterContextChanged_2 } from '../events/filters.js';
import { DashboardInitialized as DashboardInitialized_2 } from '../events/dashboard.js';
import { DashboardInsightWidgetChanged as DashboardInsightWidgetChanged_2 } from '../events/insight.js';
import { DashboardInsightWidgetDescriptionChanged as DashboardInsightWidgetDescriptionChanged_2 } from '../events/insight.js';
import { DashboardInsightWidgetDrillsModified as DashboardInsightWidgetDrillsModified_2 } from '../events/insight.js';
import { DashboardInsightWidgetDrillsRemoved as DashboardInsightWidgetDrillsRemoved_2 } from '../events/insight.js';
import { DashboardInsightWidgetExportRequested as DashboardInsightWidgetExportRequested_2 } from '../events/insight.js';
import { DashboardInsightWidgetExportResolved as DashboardInsightWidgetExportResolved_2 } from '../events/insight.js';
import { DashboardInsightWidgetFilterSettingsChanged as DashboardInsightWidgetFilterSettingsChanged_2 } from '../events/insight.js';
import { DashboardInsightWidgetHeaderChanged as DashboardInsightWidgetHeaderChanged_2 } from '../events/insight.js';
import { DashboardInsightWidgetInsightSwitched as DashboardInsightWidgetInsightSwitched_2 } from '../events/insight.js';
import { DashboardInsightWidgetRefreshed as DashboardInsightWidgetRefreshed_2 } from '../events/insight.js';
import { DashboardInsightWidgetVisConfigurationChanged as DashboardInsightWidgetVisConfigurationChanged_2 } from '../events/insight.js';
import { DashboardInsightWidgetVisPropertiesChanged as DashboardInsightWidgetVisPropertiesChanged_2 } from '../events/insight.js';
import { DashboardKpiWidgetChanged as DashboardKpiWidgetChanged_2 } from '../events/kpi.js';
import { DashboardKpiWidgetComparisonChanged as DashboardKpiWidgetComparisonChanged_2 } from '../events/kpi.js';
import { DashboardKpiWidgetConfigurationChanged as DashboardKpiWidgetConfigurationChanged_2 } from '../events/kpi.js';
import { DashboardKpiWidgetDescriptionChanged as DashboardKpiWidgetDescriptionChanged_2 } from '../events/kpi.js';
import { DashboardKpiWidgetDrillRemoved as DashboardKpiWidgetDrillRemoved_2 } from '../events/kpi.js';
import { DashboardKpiWidgetDrillSet as DashboardKpiWidgetDrillSet_2 } from '../events/kpi.js';
import { DashboardKpiWidgetFilterSettingsChanged as DashboardKpiWidgetFilterSettingsChanged_2 } from '../events/kpi.js';
import { DashboardKpiWidgetHeaderChanged as DashboardKpiWidgetHeaderChanged_2 } from '../events/kpi.js';
import { DashboardKpiWidgetMeasureChanged as DashboardKpiWidgetMeasureChanged_2 } from '../events/kpi.js';
import { DashboardLayoutChanged as DashboardLayoutChanged_2 } from '../events/layout.js';
import { DashboardLayoutSectionAdded as DashboardLayoutSectionAdded_2 } from '../events/layout.js';
import { DashboardLayoutSectionHeaderChanged as DashboardLayoutSectionHeaderChanged_2 } from '../events/layout.js';
import { DashboardLayoutSectionItemMoved as DashboardLayoutSectionItemMoved_2 } from '../events/layout.js';
import { DashboardLayoutSectionItemRemoved as DashboardLayoutSectionItemRemoved_2 } from '../events/layout.js';
import { DashboardLayoutSectionItemReplaced as DashboardLayoutSectionItemReplaced_2 } from '../events/layout.js';
import { DashboardLayoutSectionItemsAdded as DashboardLayoutSectionItemsAdded_2 } from '../events/layout.js';
import { DashboardLayoutSectionMoved as DashboardLayoutSectionMoved_2 } from '../events/layout.js';
import { DashboardLayoutSectionRemoved as DashboardLayoutSectionRemoved_2 } from '../events/layout.js';
import { DashboardQueryCompleted as DashboardQueryCompleted_2 } from '../events/general.js';
import { DashboardQueryFailed as DashboardQueryFailed_2 } from '../events/general.js';
import { DashboardQueryRejected as DashboardQueryRejected_2 } from '../events/general.js';
import { DashboardQueryStarted as DashboardQueryStarted_2 } from '../events/general.js';
import { DashboardRenamed as DashboardRenamed_2 } from '../events/dashboard.js';
import { DashboardRenderModeChanged as DashboardRenderModeChanged_2 } from '../events/renderMode.js';
import { DashboardRenderRequested as DashboardRenderRequested_2 } from '../events/render.js';
import { DashboardRenderResolved as DashboardRenderResolved_2 } from '../events/render.js';
import { DashboardSaved as DashboardSaved_2 } from '../events/dashboard.js';
import { DashboardScheduledEmailCreated as DashboardScheduledEmailCreated_2 } from '../events/scheduledEmail.js';
import { DashboardScheduledEmailSaved as DashboardScheduledEmailSaved_2 } from '../events/scheduledEmail.js';
import { DashboardSharingChanged as DashboardSharingChanged_2 } from '../events/dashboard.js';
import { DashboardState as DashboardState_2 } from '../index.js';
import { DashboardUserInteractionTriggered as DashboardUserInteractionTriggered_2 } from '../events/userInteraction.js';
import { DashboardWasReset as DashboardWasReset_2 } from '../events/dashboard.js';
import { DashboardWidgetExecutionFailed as DashboardWidgetExecutionFailed_2 } from '../events/widget.js';
import { DashboardWidgetExecutionStarted as DashboardWidgetExecutionStarted_2 } from '../events/widget.js';
import { DashboardWidgetExecutionSucceeded as DashboardWidgetExecutionSucceeded_2 } from '../events/widget.js';
import { DataViewFacade } from '@gooddata/sdk-ui';
import { DateFilterGranularity } from '@gooddata/sdk-model';
import { DateFilterType } from '@gooddata/sdk-model';
import { DateFilterValidationFailed as DateFilterValidationFailed_2 } from '../events/dashboard.js';
import { DateString } from '@gooddata/sdk-model';
import { Dispatch } from '@reduxjs/toolkit';
import { DraggableLayoutItem as DraggableLayoutItem_2 } from '../../../index.js';
import { DrillDefinition } from '@gooddata/sdk-model';
import { EntityId } from '@reduxjs/toolkit';
import { EntityState } from '@reduxjs/toolkit';
import { ExplicitDrill } from '@gooddata/sdk-ui';
import { FilterContextItem } from '@gooddata/sdk-model';
import { GoodDataSdkError } from '@gooddata/sdk-ui';
import { IAbsoluteDateFilter } from '@gooddata/sdk-model';
import { IAccessControlAware } from '@gooddata/sdk-model';
import { IAccessGrantee } from '@gooddata/sdk-model';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAttributeDisplayFormMetadataObject } from '@gooddata/sdk-model';
import { IAttributeElement } from '@gooddata/sdk-model';
import { IAttributeElements } from '@gooddata/sdk-model';
import { IAttributeFilter } from '@gooddata/sdk-model';
import { IAttributeFilterBaseProps } from '@gooddata/sdk-ui-filters';
import { IAttributeMetadataObject } from '@gooddata/sdk-model';
import { IAvailableDrillTargets } from '@gooddata/sdk-ui';
import { IBackendCapabilities } from '@gooddata/sdk-backend-spi';
import { IBaseWidget } from '@gooddata/sdk-model';
import { ICatalogAttribute } from '@gooddata/sdk-model';
import { ICatalogAttributeHierarchy } from '@gooddata/sdk-model';
import { ICatalogDateAttribute } from '@gooddata/sdk-model';
import { ICatalogDateDataset } from '@gooddata/sdk-model';
import { ICatalogFact } from '@gooddata/sdk-model';
import { ICatalogMeasure } from '@gooddata/sdk-model';
import { IColorPalette } from '@gooddata/sdk-model';
import { IDashboard } from '@gooddata/sdk-model';
import { IDashboardAttributeFilter } from '@gooddata/sdk-model';
import { IDashboardAttributeFilterParent } from '@gooddata/sdk-model';
import { IDashboardDateFilter } from '@gooddata/sdk-model';
import { IDashboardDateFilterConfig as IDashboardDateFilterConfig_2 } from '@gooddata/sdk-model';
import { IDashboardDefinition } from '@gooddata/sdk-model';
import { IDashboardDrillEvent as IDashboardDrillEvent_2 } from '../../../types.js';
import { IDashboardFilterReference } from '@gooddata/sdk-model';
import { IDashboardInsightMenuButtonProps as IDashboardInsightMenuButtonProps_2 } from '../types.js';
import { IDashboardInsightMenuProps as IDashboardInsightMenuProps_2 } from '../types.js';
import { IDashboardInsightProps as IDashboardInsightProps_2 } from './types.js';
import { IDashboardKpiProps as IDashboardKpiProps_2 } from './types.js';
import { IDashboardLayout } from '@gooddata/sdk-model';
import { IDashboardLayoutItem } from '@gooddata/sdk-model';
import { IDashboardLayoutSection } from '@gooddata/sdk-model';
import { IDashboardLayoutSectionHeader } from '@gooddata/sdk-model';
import { IDashboardLayoutSizeByScreenSize } from '@gooddata/sdk-model';
import { IDashboardObjectIdentity } from '@gooddata/sdk-model';
import { IDashboardPermissions } from '@gooddata/sdk-model';
import { IDashboardWidget } from '@gooddata/sdk-model';
import { IDashboardWidgetOverlay as IDashboardWidgetOverlay_2 } from '../../index.js';
import { IDataView } from '@gooddata/sdk-backend-spi';
import { IDateFilter } from '@gooddata/sdk-model';
import { IDateFilterConfig } from '@gooddata/sdk-model';
import { IDateFilterOptionsByType } from '@gooddata/sdk-ui-filters';
import { Identifier } from '@gooddata/sdk-model';
import { IdentifierRef } from '@gooddata/sdk-model';
import { IDrillDownDefinition as IDrillDownDefinition_2 } from '../../../types.js';
import { IDrillEvent } from '@gooddata/sdk-ui';
import { IDrillToAttributeUrl } from '@gooddata/sdk-model';
import { IDrillToCustomUrl } from '@gooddata/sdk-model';
import { IDrillToDashboard } from '@gooddata/sdk-model';
import { IDrillToInsight } from '@gooddata/sdk-model';
import { IDrillToLegacyDashboard } from '@gooddata/sdk-model';
import { IEntitlementDescriptor } from '@gooddata/sdk-model';
import { IErrorProps } from '@gooddata/sdk-ui';
import { IExecutionConfiguration } from '@gooddata/sdk-ui';
import { IExecutionDefinition } from '@gooddata/sdk-model';
import { IExecutionResult } from '@gooddata/sdk-backend-spi';
import { IExportResult } from '@gooddata/sdk-backend-spi';
import { IFilter } from '@gooddata/sdk-model';
import { IFilterableWidget } from '@gooddata/sdk-model';
import { IFilterContext } from '@gooddata/sdk-model';
import { IFilterContextDefinition } from '@gooddata/sdk-model';
import { IHeaderPredicate } from '@gooddata/sdk-ui';
import { IInsight } from '@gooddata/sdk-model';
import { IInsightDefinition } from '@gooddata/sdk-model';
import { IInsightWidget } from '@gooddata/sdk-model';
import { IInsightWidgetBase } from '@gooddata/sdk-model';
import { IInsightWidgetConfiguration } from '@gooddata/sdk-model';
import { IInsightWidgetDefinition } from '@gooddata/sdk-model';
import { IKpi } from '@gooddata/sdk-model';
import { IKpiComparisonDirection } from '@gooddata/sdk-model';
import { IKpiComparisonTypeComparison } from '@gooddata/sdk-model';
import { IKpiWidget } from '@gooddata/sdk-model';
import { IKpiWidgetConfiguration } from '@gooddata/sdk-model';
import { IKpiWidgetDefinition } from '@gooddata/sdk-model';
import { ILayoutCoordinates as ILayoutCoordinates_2 } from '../../../types.js';
import { IListedDashboard } from '@gooddata/sdk-model';
import { ILoadingProps } from '@gooddata/sdk-ui';
import { ILocale } from '@gooddata/sdk-ui';
import { IMeasureMetadataObject } from '@gooddata/sdk-model';
import { IMenuButtonItemsVisibility as IMenuButtonItemsVisibility_2 } from '../../../types.js';
import { INegativeAttributeFilter } from '@gooddata/sdk-model';
import { InsightDisplayFormUsage } from '@gooddata/sdk-model';
import { InsightDrillDefinition } from '@gooddata/sdk-model';
import { IntlShape } from 'react-intl';
import { IPositiveAttributeFilter } from '@gooddata/sdk-model';
import { IPushData } from '@gooddata/sdk-ui';
import { IRelativeDateFilter } from '@gooddata/sdk-model';
import { IRenderListItemProps } from '@gooddata/sdk-ui-kit';
import { IResultWarning } from '@gooddata/sdk-model';
import { IScheduledMail } from '@gooddata/sdk-model';
import { IScheduledMailDefinition } from '@gooddata/sdk-model';
import { ISeparators } from '@gooddata/sdk-model';
import { ISettings } from '@gooddata/sdk-model';
import { IShareDialogInteractionData } from '@gooddata/sdk-ui-kit';
import { ISharedObject } from '@gooddata/sdk-ui-kit';
import { ISharingApplyPayload as ISharingApplyPayload_2 } from '@gooddata/sdk-ui-kit';
import { ITempFilterContext } from '@gooddata/sdk-model';
import { ITheme } from '@gooddata/sdk-model';
import { ITitleProps as ITitleProps_2 } from './types.js';
import { ITranslations } from '@gooddata/sdk-ui';
import { IUser } from '@gooddata/sdk-model';
import { IUserWorkspaceSettings } from '@gooddata/sdk-backend-spi';
import { IVisualizationCallbacks } from '@gooddata/sdk-ui';
import { IWidget } from '@gooddata/sdk-model';
import { IWidgetAlert } from '@gooddata/sdk-model';
import { IWidgetAlertDefinition } from '@gooddata/sdk-model';
import { IWidgetDefinition } from '@gooddata/sdk-model';
import { IWorkspacePermissions } from '@gooddata/sdk-model';
import { IWorkspaceUser } from '@gooddata/sdk-model';
import { LocalIdRef } from '@gooddata/sdk-model';
import { MemoizedFunction } from 'lodash';
import { MessageDescriptor } from 'react-intl';
import { MouseEvent as MouseEvent_2 } from 'react';
import { ObjectType } from '@gooddata/sdk-model';
import { ObjRef } from '@gooddata/sdk-model';
import { ObjRefInScope } from '@gooddata/sdk-model';
import { OnError } from '@gooddata/sdk-ui';
import { OnExportReady } from '@gooddata/sdk-ui';
import { OnFiredDrillEvent } from '@gooddata/sdk-ui';
import { OnLoadingChanged } from '@gooddata/sdk-ui';
import { Patch } from 'immer';
import { PayloadAction } from '@reduxjs/toolkit';
import { PlatformEdition } from '@gooddata/sdk-model';
import { QueryCacheEntryResult as QueryCacheEntryResult_2 } from '../store/_infra/queryService.js';
import { default as React_2 } from 'react';
import { ReactReduxContextValue } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { RefAttributes } from 'react';
import { RenderMode as RenderMode_2 } from '../../../types.js';
import { RenderModeState as RenderModeState_2 } from './renderModeState.js';
import { SagaIterator } from 'redux-saga';
import { ScreenSize } from '@gooddata/sdk-model';
import { Selector } from '@reduxjs/toolkit';
import { ShareStatus } from '@gooddata/sdk-model';
import { TypedUseSelectorHook } from 'react-redux';
import { UiState as UiState_2 } from './uiState.js';
import { Uri } from '@gooddata/sdk-model';
import { UriRef } from '@gooddata/sdk-model';
import { UseCancelablePromiseCallbacks } from '@gooddata/sdk-ui';
import { UseCancelablePromiseState } from '@gooddata/sdk-ui';
import { VisualizationProperties } from '@gooddata/sdk-model';
import { WeekStart } from '@gooddata/sdk-model';
import { WritableDraft } from 'immer/dist/internal.js';

/**
 * @beta
 */
export declare type ActionFailedErrorReason = "USER_ERROR" | "INTERNAL_ERROR";

/**
 * @beta
 */
export declare interface AddAttributeFilter extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADD";
    readonly payload: AddAttributeFilterPayload;
}

/**
 * Creates the AddAttributeFilter command. Dispatching this command will result in the addition
 * of another attribute filter to the dashboard's filter bar, at desired position,
 * or error in case of invalid update (e.g. wrong or duplicated displayForm)
 *
 * The filter will be set for the display form provided by reference. When created, the filter will be
 * no-op - all the elements will be selected.
 *
 * @param displayForm - specify attribute display form which will be used for filtering
 * @param index - specify index among the attribute filters at which the new filter should be placed.
 *  The index starts at zero and there is convenience that index of -1 would add the filter at the end.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing.
 * @param selectionMode - single or multi value selection mode of the filter.
 * @beta
 */
export declare function addAttributeFilter(displayForm: ObjRef, index: number, correlationId?: string, selectionMode?: DashboardAttributeFilterSelectionMode): AddAttributeFilter;

/**
 * @internal
 */
export declare function AddAttributeFilterButton({ className, isOpen, title }: IAddAttributeFilterButtonProps): JSX.Element;

/**
 * Payload of the {@link AddAttributeFilter} command.
 * @beta
 */
export declare interface AddAttributeFilterPayload {
    readonly displayForm: ObjRef;
    readonly index: number;
    /**
     * Specify parent filters whose selected values will be used to narrow
     * down the selection in this newly added filter.
     *
     * @privateRemarks
     * XXX: not needed in the initial version; would be good for API completeness
     */
    readonly parentFilters?: ReadonlyArray<IDashboardAttributeFilterParent>;
    /**
     * Specify the initial selection of attribute elements. If not provided all
     * elements will be selected by default.
     *
     * @privateRemarks
     * XXX: not needed in the initial version; would be good for API completeness
     */
    readonly initialSelection?: IAttributeElements;
    /**
     * Specify if the initial selection of attribute elements is a negative one:
     * if true, the elements selected should NOT be included in teh results.
     *
     * @privateRemarks
     * XXX: not needed in the initial version; would be good for API completeness
     */
    readonly initialIsNegativeSelection?: boolean;
    /**
     * Selection mode which defines how many elements can be in attributeElements.
     * Default value is 'multi' if property is missing.
     */
    readonly selectionMode?: DashboardAttributeFilterSelectionMode;
}

/**
 * @internal
 */
export declare function AddAttributeFilterPlaceholder({ disabled }: AddAttributeFilterPlaceholderProps): JSX.Element;

/**
 * @internal
 */
export declare interface AddAttributeFilterPlaceholderProps {
    disabled?: boolean;
}

/**
 * Add widget drill targets
 *
 * @alpha
 */
export declare interface AddDrillTargets extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL_TARGETS.ADD";
    readonly payload: AddDrillTargetsPayload;
}

/**
 * Create AddDrillTargets {@link AddDrillTargets} command.
 *
 * @param ref - Unique widget ref
 * @param availableDrillTargets - Available widget drill targets {@link @gooddata/sdk-ui#IAvailableDrillTargets}
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 * @returns AddDrillTargets command
 *
 * @alpha
 */
export declare function addDrillTargets(ref: ObjRef, availableDrillTargets: IAvailableDrillTargets, correlationId?: string): AddDrillTargets;

/**
 * Payload of the {@link AddDrillTargets} command.
 * @alpha
 */
export declare interface AddDrillTargetsPayload {
    readonly ref: ObjRef;
    readonly availableDrillTargets: IAvailableDrillTargets;
}

/**
 * @beta
 */
export declare interface AddLayoutSection extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.ADD_SECTION";
    readonly payload: AddLayoutSectionPayload;
}

/**
 * Creates the AddLayoutSection command.
 *
 * @remarks
 * Dispatching this command will result in the addition of a new layout section.
 * The new section will be placed at the desired index and will be empty by default.
 *
 * You may optionally specify the initial values of the section header and the items that will be in the new section.
 *
 * @param index - index to place the section at; -1 can be used as convenience to append a new section
 * @param initialHeader - specify specify header for the newly created section
 * @param initialItems - specify one or more items that the newly created section should include from the get-go
 * @param autoResolveDateFilterDataset - specify whether dashboard should auto-resolve date dataset to use for date filtering of KPI
 *  and insight widgets; default is disabled meaning date filtering will be enabled only for those KPI or Insight widgets
 *  that already specify dateDataset.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function addLayoutSection(index: number, initialHeader?: IDashboardLayoutSectionHeader, initialItems?: DashboardItemDefinition[], autoResolveDateFilterDataset?: boolean, correlationId?: string): AddLayoutSection;

/**
 * Payload of the {@link AddLayoutSection} command.
 * @beta
 */
export declare interface AddLayoutSectionPayload {
    /**
     * Index where to place the new section
     *
     * @remarks
     * Index is zero-based and for convenience index -1 means place new section at the end. 0 means place new
     * section at the beginning. Both 0 and -1 and can be used when inserting the first section into and empty layout.
     */
    readonly index: RelativeIndex;
    /**
     * Specify the section header.
     */
    readonly initialHeader?: IDashboardLayoutSectionHeader;
    /**
     * Specify one or more items to include in the newly created section.
     */
    readonly initialItems?: DashboardItemDefinition[];
    /**
     * Specify whether dashboard should auto-resolve date dataset to use for date filtering of KPI
     * and insight widgets.
     *
     * @remarks
     * This is by default disabled. Meaning date filtering will be enabled only for those KPI or Insight widgets
     * that already specify dateDataset. Those that have dateDataset `undefined` will not be filtered by dashboard's
     * date filter.
     *
     * When you turn on this option, then the dashboard will automatically resolve date dataset for those
     * KPI and Insight widgets that have it `undefined`.
     */
    readonly autoResolveDateFilterDataset?: boolean;
}

/**
 * Creates the AddSectionItems command.
 *
 * @remarks
 * Dispatching this command will result in addition of a new item into the existing
 * section. This item may be a placeholder for KPI or insight, an actual dashboard widget or a previously stashed
 * dashboard item.
 *
 *
 * @param sectionIndex - index of section to which the new item should be added
 * @param itemIndex - index at which to insert the new item
 * @param item - definition of the new item.
 * @param autoResolveDateFilterDataset - specify whether dashboard should auto-resolve date dataset to use for date filtering of KPI
 *  and insight widgets; default is disabled meaning date filtering will be enabled only for those KPI or Insight widgets
 *  that already specify dateDataset.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function addSectionItem(sectionIndex: number, itemIndex: number, item: DashboardItemDefinition, autoResolveDateFilterDataset?: boolean, correlationId?: string): AddSectionItems;

/**
 * @beta
 */
export declare interface AddSectionItems extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.ADD_ITEMS";
    readonly payload: AddSectionItemsPayload;
}

/**
 * Payload of the {@link AddSectionItems} command.
 * @beta
 */
export declare interface AddSectionItemsPayload {
    /**
     * Section to which the item should be added.
     *
     * @remarks
     * Index is zero-based.
     */
    readonly sectionIndex: number;
    /**
     * Index within section items where the item should be inserted.
     *
     * @remarks
     * Index is zero-based. For convenience, you may specify -1 to append the new item.
     */
    readonly itemIndex: RelativeIndex;
    /**
     * Items to add. This item may be a placeholder for KPI or insight, an actual dashboard widget or a previously
     * stashed dashboard item.
     *
     * @remarks
     * Note: if you use the stashed items identifier, the items will be moved from the stash - you cannot use
     * the stash identifier again.
     */
    readonly items: DashboardItemDefinition[];
    /**
     * Specify whether dashboard should auto-resolve date dataset to use for date filtering of KPI
     * and insight widgets.
     *
     * @remarks
     * This is by default disabled. Meaning date filtering will be enabled only for those KPI or Insight widgets
     * that already specify dateDataset. Those that have dateDataset `undefined` will not be filtered by dashboard's
     * date filter.
     *
     * When you turn on this option, then the dashboard will automatically resolve date dataset for those
     * KPI and Insight widgets that have it `undefined`.
     */
    readonly autoResolveDateFilterDataset?: boolean;
}

/**
 * @internal
 */
export declare type AlertsState = EntityState<IWidgetAlert>;

/**
 * This defines all possible reducers for the cache slice.
 *
 * @internal
 */
export declare type AllQueryCacheReducers<TQuery extends IDashboardQuery, TResult> = {
    /**
     * Sets value of cache entry.
     */
    set: QueryCacheReducer<TQuery, TResult, QueryCacheEntry<TQuery, TResult>>;
    /**
     * Removes cache entry by cache key
     */
    remove: QueryCacheReducer<TQuery, TResult, string>;
    /**
     * Removes all entries from cache.
     */
    removeAll: QueryCacheReducer<TQuery, TResult, void>;
};

/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for any dashboard event (i.e. not for custom events).
 *
 * @param handler - the actual event handling function
 * @public
 */
export declare function anyDashboardEventHandler(handler: DashboardEventHandler["handler"]): DashboardEventHandler;

/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for any event (event for custom events).
 *
 * @param handler - the actual event handling function
 * @public
 */
export declare function anyEventHandler(handler: DashboardEventHandler["handler"]): DashboardEventHandler;

/**
 * Creates the ChangeAttributeFilterSelection command.
 *
 * @remarks
 * Dispatching this command will result in application of element selection for the dashboard attribute filter
 * with the provided id, or error in case of invalid update (e.g. non-existing `filterLocalId`).
 *
 * The {@link ChangeAttributeFilterSelectionPayload}'s `selectionType` and `elements` are derived from the
 * provided attribute filter.
 *
 * To convert {@link IDashboardFilter} to {@link @gooddata/sdk-model#IFilter} use {@link dashboardAttributeFilterToAttributeFilter}.
 * Converted filter can be used within the command's payload.
 *
 * @param filterLocalId - dashboard attribute filter's local id
 * @param filter - attribute filter to apply
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @public
 */
export declare function applyAttributeFilter(filterLocalId: string, filter: IAttributeFilter, correlationId?: string): ChangeAttributeFilterSelection;

/**
 * Creates the ChangeDateFilterSelection command.
 *
 * @remarks
 * Dispatching this command will result in change of dashboard's date filter, or error in case of invalid
 * update (e.g. hidden date filter option by dateFilterConfig).
 *
 * All parameters for {@link ChangeDateFilterSelection} command is derived from the provided date filter.
 *
 * See {@link ChangeDateFilterSelection} for a more complete description of the different parameters
 *
 * @param filter - date filter to apply
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @public
 */
export declare function applyDateFilter(filter: IDateFilter, correlationId?: string): ChangeDateFilterSelection;

/**
 * @public
 */
export declare type AttributeFilterComponentProvider = (filter: IDashboardAttributeFilter) => CustomDashboardAttributeFilterComponent;

/**
 * Definition of attribute filter components
 * @internal
 */
export declare type AttributeFilterComponentSet = CustomComponentBase<IDashboardAttributeFilterProps, Parameters<AttributeFilterComponentProvider>> & DraggableComponent & CreatablePlaceholderComponent<IDashboardAttributeFilterPlaceholderProps> & CreatableByDragComponent;

/**
 * @internal
 */
export declare type AttributeFilterDraggableComponent = {
    DraggingComponent: AttributeFilterDraggingComponent;
    type: "attributeFilter";
};

/**
 * @internal
 */
export declare type AttributeFilterDraggableItem = {
    type: "attributeFilter";
    filter: IDashboardAttributeFilter;
    filterIndex: number;
};

/**
 * @internal
 */
export declare type AttributeFilterDraggingComponent = ComponentType<IAttributeFilterDraggingComponentProps>;

/**
 * @internal
 */
export declare type AttributeFilterPlaceholderDraggableItem = {
    type: "attributeFilter-placeholder";
};

/**
 * Attribute filter selection type for {@link ChangeAttributeFilterSelectionPayload}.
 *
 * @public
 */
export declare type AttributeFilterSelectionType = "IN" | "NOT_IN";

/**
 * @internal
 */
export declare function AttributesDropdown({ className, bodyClassName, onClose, onSelect, }: IDashboardAttributeFilterPlaceholderProps): JSX.Element;

/**
 * @public
 */
export declare interface BackendCapabilitiesState {
    backendCapabilities?: IBackendCapabilities;
}

/**
 * @beta
 */
export declare interface BareUserInteractionPayload {
    interaction: "kpiAlertDialogClosed" | "poweredByGDLogoClicked" | "attributeFilterTitleResetClicked";
}

/**
 * @beta
 */
export declare type BareUserInteractionType = BareUserInteractionPayload["interaction"];

/**
 * @internal
 */
export declare type BaseDraggableLayoutItem = {
    size: BaseDraggableLayoutItemSize;
};

/**
 * @internal
 */
export declare type BaseDraggableLayoutItemSize = {
    gridWidth: number;
    gridHeight: number;
};

/**
 * @internal
 */
export declare type BaseDraggableMovingItem = BaseDraggableLayoutItem & {
    title: string;
    isOnlyItemInSection: boolean;
    sectionIndex: number;
    itemIndex: number;
};

/**
 * Broken alert attribute filter basic info {@link @gooddata/sdk-backend-spi#IDashboardAttributeFilter}.
 *
 * @alpha
 */
export declare type BrokenAlertAttributeFilterInfo = IBrokenAlertFilterBasicInfo<IDashboardAttributeFilter>;

/**
 * Broken alert date filter basic info {@link @gooddata/sdk-backend-spi#IDashboardDateFilter}.
 *
 * @alpha
 */
export declare type BrokenAlertDateFilterInfo = IBrokenAlertFilterBasicInfo<IDashboardDateFilter>;

/**
 * Type of broken alert filter basic info
 *
 * @alpha
 */
export declare type BrokenAlertType = "deleted" | "ignored";

/**
 * @internal
 */
export declare const ButtonBar: (props: IButtonBarProps) => JSX.Element;

/**
 * @internal
 */
export declare const CancelButton: (props: ICancelButtonProps) => JSX.Element;

/**
 * @internal
 */
export declare const CancelEditDialog: React_2.FC<ICancelEditDialogProps>;

/**
 * Creates the ChangeRenderMode command for cancel edit mode.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function cancelEditRenderMode(correlationId?: string): ChangeRenderMode;

/**
 * @public
 */
export declare interface CatalogState {
    /** @beta */
    attributes?: ICatalogAttribute[];
    /** @beta */
    measures?: ICatalogMeasure[];
    /** @beta */
    dateDatasets?: ICatalogDateDataset[];
    /** @beta */
    facts?: ICatalogFact[];
    /** @beta */
    attributeHierarchies?: ICatalogAttributeHierarchy[];
}

/**
 * Command for attribute filter selection change.
 *
 * @remarks
 * See {@link changeAttributeFilterSelection} and {@link applyAttributeFilter} factory functions you can use to create
 * this command more easily from raw data and {@link @gooddata/sdk-model#IAttributeFilter}, respectively.
 *
 * @public
 */
export declare interface ChangeAttributeFilterSelection extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.CHANGE_SELECTION";
    readonly payload: ChangeAttributeFilterSelectionPayload;
}

/**
 * Creates the ChangeAttributeFilterSelection command.
 *
 * @remarks
 * Dispatching this command will result in application of element selection for the dashboard attribute filter
 * with the provided id, or error in case of invalid update (e.g. non-existing filterLocalId).
 *
 * The attribute elements can be provided either using their URI (primary key) or value. Together with the
 * elements you must indicate the selection type - either 'IN' or 'NOT_IN'.
 *
 * @remarks see {@link resetAttributeFilterSelection} for convenience function to select all attribute elements of
 *  particular filter.
 *
 * See also {@link applyAttributeFilter} for convenient function when you have an {@link @gooddata/sdk-model#IAttributeFilter} instance.
 *
 *  @example
 * ```
 * const selectionType = isPositiveAttributeFilter ? "IN" : "NOT_IN";
 * ```
 *
 * To create this command without a need to calculate the payload values from a {@link @gooddata/sdk-model#IFilter} object,
 * we recommend to use {@link applyAttributeFilter} command creator instead.
 *
 * @param filterLocalId - dashboard attribute filter's local id
 * @param elements - elements
 * @param selectionType - selection type. either 'IN' or 'NOT_IN'
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @public
 */
export declare function changeAttributeFilterSelection(filterLocalId: string, elements: IAttributeElements, selectionType: AttributeFilterSelectionType, correlationId?: string): ChangeAttributeFilterSelection;

/**
 * Payload type for {@link ChangeAttributeFilterSelection} command.
 *
 * @public
 */
export declare interface ChangeAttributeFilterSelectionPayload {
    /**
     * Dashboard attribute filter's local identifier.
     */
    readonly filterLocalId: string;
    /**
     * Selected attribute elements.
     */
    readonly elements: IAttributeElements;
    /**
     * Selection type. Either 'IN' for positive selection or 'NOT_IN' for negative selection (All except selected items).
     */
    readonly selectionType: AttributeFilterSelectionType;
}

/**
 * Command for date filter selection change.
 *
 * @remarks
 * See {@link changeDateFilterSelection} and {@link applyDateFilter} factory functions you can use to create
 * this command more easily from raw data and {@link @gooddata/sdk-model#IDateFilter}, respectively.
 *
 * @public
 */
export declare interface ChangeDateFilterSelection extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.DATE_FILTER.CHANGE_SELECTION";
    readonly payload: DateFilterSelection;
}

/**
 * Creates the ChangeDateFilterSelection command.
 *
 * @remarks
 * Dispatching this command will result in change of dashboard's date filter, or error in case of invalid
 * update (e.g. hidden date filter option by dateFilterConfig).
 *
 * @param type - date filter type; absolute filters use exact start and end dates, while relative filters use offsets from today
 * @param granularity - granularity on which the filter works; days, weeks, months, quarters or years.
 * @param from - start date; if not specified, then the start date will be unbounded
 * @param to - end date; if not specified, then the end date will be unbounded
 * @param dateFilterOptionLocalId - localId of the {@link @gooddata/sdk-backend-spi#IDateFilterOption} selected
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @see {@link ChangeDateFilterSelection} for a more complete description of the different parameters
 *
 * @public
 */
export declare function changeDateFilterSelection(type: DateFilterType, granularity: DateFilterGranularity, from?: DateString | number, to?: DateString | number, dateFilterOptionLocalId?: string, correlationId?: string): ChangeDateFilterSelection;

/**
 * @alpha
 */
export declare interface ChangeDrillableItems extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.DRILLABLE_ITEMS.CHANGE";
    readonly payload: ChangeDrillableItemsPayload;
}

/**
 * Creates the {@link ChangeDrillableItems} command.
 * Dispatching this command will result into enabling drilling of the widgets, if they match some of the drillable item definition/predicate.
 *
 * @alpha
 * @param drillableItems - reference to the drillable items or predicates that enables insight/kpi drilling.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns change drillable items command
 */
export declare function changeDrillableItems(drillableItems: ExplicitDrill[], correlationId?: string): ChangeDrillableItems;

/**
 * Payload of the {@link ChangeDrillableItems} command.
 * @alpha
 */
export declare interface ChangeDrillableItemsPayload {
    /**
     * Additional items that can enable drilling of the widgets.
     * If the item (identifier/uri/predicate) matches attribute or measure in the widget, widget drilling will be enabled.
     *
     * @remarks
     * Note: These items has lower priority than the configured widget drills or drill down.
     *       You can disable configured widget drills and drill down by setting {@link DashboardConfig} disableDefaultDrills property to true.
     */
    readonly drillableItems: ExplicitDrill[];
}

/**
 * Command for changing multiple filters at once.
 *
 * @remarks
 * See {@link changeFilterContextSelection} for a factory function that will help you create this command.
 *
 * @public
 */
export declare interface ChangeFilterContextSelection extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.CHANGE_SELECTION";
    readonly payload: ChangeFilterContextSelectionPayload;
}

/**
 * Creates the {@link ChangeFilterContextSelection} command.
 *
 * @remarks
 * Dispatching this command will result into setting provided dashboard filters to the current dashboard filter context.
 *
 * Only filters that are stored in the filter context can be applied (filters that are visible in the filter bar).
 * Filters will be matched via display form ref, duplicities will be omitted.
 * Date filter that does not match any visible option by the current date filter config will be also omitted.
 *
 * @public
 * @param filters - attribute filters and date filter to apply.
 * @param resetOthers - If true, filters not mentioned in the payload will be reset to All items selected/All time. Defaults to false.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns change filter selection command
 */
export declare function changeFilterContextSelection(filters: (IDashboardFilter | FilterContextItem)[], resetOthers?: boolean, correlationId?: string): ChangeFilterContextSelection;

/**
 * Payload of the {@link ChangeFilterContextSelection} command.
 * @public
 */
export declare interface ChangeFilterContextSelectionPayload {
    /**
     * Filters to apply to the current dashboard filter context.
     */
    filters: (IDashboardFilter | FilterContextItem)[];
    /**
     * Should filters not mentioned in the payload reset to All items selected/All time? Defaults to false.
     */
    resetOthers: boolean;
}

/**
 * @beta
 */
export declare interface ChangeInsightWidgetDescription extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_DESCRIPTION";
    readonly payload: ChangeInsightWidgetDescriptionPayload;
}

/**
 * Creates the ChangeInsightWidgetDescription command. Dispatching this command will result in change of the Insight widget's
 * description.
 *
 * @param ref - reference of the insight widget to modify
 * @param description - new description to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeInsightWidgetDescription(ref: ObjRef, description: WidgetDescription, correlationId?: string): ChangeInsightWidgetDescription;

/**
 * Payload of the {@link ChangeInsightWidgetDescription} command.
 * @beta
 */
export declare interface ChangeInsightWidgetDescriptionPayload {
    /**
     * Reference to Insight Widget whose description to change.
     */
    readonly ref: ObjRef;
    /**
     * Description to use for the Insight widget. Contents of the provided description will be used as-is and will be
     * used to replace the current description values.
     */
    readonly description: WidgetDescription;
}

/**
 * @beta
 */
export declare interface ChangeInsightWidgetFilterSettings extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS";
    readonly payload: ChangeInsightWidgetFilterSettingsPayload;
}

/**
 * Payload of the {@link ChangeInsightWidgetFilterSettings} command.
 * @beta
 */
export declare interface ChangeInsightWidgetFilterSettingsPayload {
    /**
     * Reference to Insight Widget whose filter settings to change.
     */
    readonly ref: ObjRef;
    /**
     * Filter operation to apply.
     */
    readonly operation: WidgetFilterOperation;
}

/**
 * @beta
 */
export declare interface ChangeInsightWidgetHeader extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_HEADER";
    readonly payload: ChangeInsightWidgetHeaderPayload;
}

/**
 * Creates the ChangeInsightWidgetHeader command. Dispatching this command will result in change of the Insight widget's
 * header which (now) includes title.
 *
 * @param ref - reference of the insight widget to modify
 * @param header - new header to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeInsightWidgetHeader(ref: ObjRef, header: WidgetHeader, correlationId?: string): ChangeInsightWidgetHeader;

/**
 * Payload of the {@link ChangeInsightWidgetHeader} command.
 * @beta
 */
export declare interface ChangeInsightWidgetHeaderPayload {
    /**
     * Reference to Insight Widget whose header to change.
     */
    readonly ref: ObjRef;
    /**
     * Header to use for the Insight widget. Contents of the provided header will be used as-is and will be
     * used to replace the current header values.
     */
    readonly header: WidgetHeader;
}

/**
 * XXX: don't think this is needed right away. should definitely allow such flexibility though. Would allow
 *  to switch between insights that are of different vis type but show same data.
 *
 * @beta
 */
export declare interface ChangeInsightWidgetInsight extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_INSIGHT";
    readonly payload: ChangeInsightWidgetInsightPayload;
}

/**
 * Creates the ChangeInsightWidgetInsight command. Dispatching this command will result in change of what
 * insight is rendered inside particular insight widget - while keeping all the other setup the same (filtering,
 * drilling).
 *
 * @param ref - reference to insight widget whose insight should be changed
 * @param insightRef - reference to the new insight to use in the widget
 * @param visualizationProperties - specify visualization properties to use. Undefined value means keeping the existing properties on record in the widget
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeInsightWidgetInsight(ref: ObjRef, insightRef: ObjRef, visualizationProperties?: VisualizationProperties, correlationId?: string): ChangeInsightWidgetInsight;

/**
 * Payload of the {@link ChangeInsightWidgetInsight} command.
 * @beta
 */
export declare interface ChangeInsightWidgetInsightPayload {
    /**
     * Reference to Insight Widget whose insight to change.
     */
    readonly ref: ObjRef;
    /**
     * Reference to the new insight to use inside the widget.
     */
    readonly insightRef: ObjRef;
    /**
     * Specify new visualization properties to use for the insight. If none specified,
     * the properties already included in the widget will be used.
     *
     * @remarks
     * Note: if you don't want to use any custom visualization properties for the new insight, then
     * pass empty object.
     */
    readonly visualizationProperties?: VisualizationProperties;
}

/**
 * @beta
 */
export declare interface ChangeInsightWidgetVisConfiguration extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_CONFIGURATION";
    readonly payload: ChangeInsightWidgetVisConfigurationPayload;
}

/**
 *
 * Creates the ChangeInsightWidgetVisConfiguration command. Dispatching this command will result is modification
 * of the visualization configuration that are effective for the particular insight widget.
 *
 * Through visualization configuration, you can modify how particular visualization behaves
 *
 * If you want to clear any widget-level configuration, set config to `undefined`.
 *
 * @param ref - reference of the insight widget to modify
 * @param config - new configuration to set, undefined to clear any widget level visualization config
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeInsightWidgetVisConfiguration(ref: ObjRef, config: IInsightWidgetConfiguration | undefined, correlationId?: string): ChangeInsightWidgetVisConfiguration;

/**
 * Payload of the {@link ChangeInsightWidgetVisConfiguration} command.
 * @beta
 */
export declare interface ChangeInsightWidgetVisConfigurationPayload {
    /**
     * Reference to Insight Widget whose visualization configuration to change.
     */
    readonly ref: ObjRef;
    /**
     * Visualization configuration to use for the insight that is rendered by the widget.
     *
     * These will replace the existing visualization configuration. To clear any widget-level configuration
     * currently in effect for the widget, set the configuration to `undefined`.
     */
    readonly config: IInsightWidgetConfiguration | undefined;
}

/**
 * @beta
 */
export declare interface ChangeInsightWidgetVisProperties extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_PROPERTIES";
    readonly payload: ChangeInsightWidgetVisPropertiesPayload;
}

/**
 * Creates the ChangeInsightWidgetVisProperties command. Dispatching this command will result is modification
 * of the visualization properties that are effective for the particular insight widget.
 *
 * Through visualization properties, you can modify how particular visualization looks and behaves (enable/disable
 * tooltips, legend, change axes, enable zooming).
 *
 * If you want to clear any widget-level properties, set properties to `undefined`.
 *
 * @param ref - reference of the insight widget to modify
 * @param properties - new properties to set, undefined to clear any widget level visualization properties
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeInsightWidgetVisProperties(ref: ObjRef, properties: VisualizationProperties | undefined, correlationId?: string): ChangeInsightWidgetVisProperties;

/**
 * Payload of the {@link ChangeInsightWidgetVisProperties} command.
 * @beta
 */
export declare interface ChangeInsightWidgetVisPropertiesPayload {
    /**
     * Reference to Insight Widget whose visualization properties to change.
     */
    readonly ref: ObjRef;
    /**
     * Visualization properties to use for the insight that is rendered by the widget.
     *
     * These will replace the existing visualization properties. To clear any widget-level properties
     * currently in effect for the widget, set the properties to `undefined`.
     */
    readonly properties: VisualizationProperties | undefined;
}

/**
 * @beta
 */
export declare interface ChangeKpiWidgetComparison extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_COMPARISON";
    readonly payload: ChangeKpiWidgetComparisonPayload;
}

/**
 * Creates the ChangeKpiWidgetComparison command. Dispatching this command will result in change of what comparison
 * method - if any - is used for the KPI's Measure. The KPI may compare measure value from current period (as selected
 * by the date filter) to previous period and then depending on whether the current value grows can visualize that
 * as a good or bad thing.
 *
 * @param ref - reference of the KPI widget to modify
 * @param comparison - new comparison setting
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeKpiWidgetComparison(ref: ObjRef, comparison: KpiWidgetComparison, correlationId?: string): ChangeKpiWidgetComparison;

/**
 * Payload of the {@link ChangeKpiWidgetComparison} command.
 * @beta
 */
export declare interface ChangeKpiWidgetComparisonPayload {
    /**
     * Reference to KPI Widget whose filter settings to change.
     */
    readonly ref: ObjRef;
    /**
     * Comparison settings to use for the KPI Widget.
     *
     * To disable comparison you can send empty object here.
     */
    readonly comparison: KpiWidgetComparison;
}

/**
 * @beta
 */
export declare interface ChangeKpiWidgetConfiguration extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_CONFIGURATION";
    readonly payload: ChangeKpiWidgetConfigurationPayload;
}

/**
 *
 * Creates the ChangeKpiWidgetConfiguration command. Dispatching this command will result is modification
 * of the configuration that are effective for the particular kpi widget.
 *
 * Through configuration, you can modify how is particular kpi rendered
 *
 * If you want to clear any widget-level configuration, set config to `undefined`.
 *
 * @param ref - reference of the insight widget to modify
 * @param config - new configuration to set, undefined to clear any widget level  config
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeKpiWidgetConfiguration(ref: ObjRef, config: IKpiWidgetConfiguration | undefined, correlationId?: string): ChangeKpiWidgetConfiguration;

/**
 * Payload of the {@link ChangeKpiWidgetConfiguration} command.
 * @beta
 */
export declare interface ChangeKpiWidgetConfigurationPayload {
    /**
     * Reference to Kpi Widget whose configuration to change.
     */
    readonly ref: ObjRef;
    /**
     * Configuration to use for the kpi that is rendered by the widget.
     *
     * These will replace the existing configuration. To clear any widget-level configuration
     * currently in effect for the widget, set the configuration to `undefined`.
     */
    readonly config: IKpiWidgetConfiguration | undefined;
}

/**
 * @beta
 */
export declare interface ChangeKpiWidgetDescription extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_DESCRIPTION";
    readonly payload: ChangeKpiWidgetDescriptionPayload;
}

/**
 * Creates the ChangeKpiWidgetDescription command. Dispatching this command will result in change of the Kpi widget's
 * description.
 *
 * @param ref - reference of the kpi widget to modify
 * @param description - new description to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeKpiWidgetDescription(ref: ObjRef, description: WidgetDescription, correlationId?: string): ChangeKpiWidgetDescription;

/**
 * Payload of the {@link ChangeKpiWidgetDescription} command.
 * @beta
 */
export declare interface ChangeKpiWidgetDescriptionPayload {
    /**
     * Reference to Kpi whose description to change.
     */
    readonly ref: ObjRef;
    /**
     * Description to use for the Kpi widget. Contents of the provided description will be used as-is and will be
     * used to replace the current description values.
     */
    readonly description: WidgetDescription;
}

/**
 * @beta
 */
export declare interface ChangeKpiWidgetFilterSettings extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS";
    readonly payload: ChangeKpiWidgetFilterSettingsPayload;
}

/**
 * Payload of the {@link ChangeKpiWidgetFilterSettings} command.
 * @beta
 */
export declare interface ChangeKpiWidgetFilterSettingsPayload {
    /**
     * KPI Widget reference whose filter settings to change.
     */
    readonly ref: ObjRef;
    /**
     * Filter settings to apply for the widget. The settings are used as-is and
     * replace current widget settings.
     */
    readonly operation: WidgetFilterOperation;
}

/**
 * @beta
 */
export declare interface ChangeKpiWidgetHeader extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_HEADER";
    readonly payload: ChangeKpiWidgetHeaderPayload;
}

/**
 * Creates the ChangeKpiWidgetHeader command. Dispatching this command will result in change of the KPI widget's
 * header which (now) includes title.
 *
 * @param ref - reference of the KPI widget to modify
 * @param header - new header to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeKpiWidgetHeader(ref: ObjRef, header: WidgetHeader, correlationId?: string): ChangeKpiWidgetHeader;

/**
 * Payload of the {@link ChangeKpiWidgetHeader} command.
 * @beta
 */
export declare interface ChangeKpiWidgetHeaderPayload {
    /**
     * KPI Widget reference whose measure to change.
     */
    readonly ref: ObjRef;
    /**
     * Header to use for the KPI widget. Contents of the provided header will be used as-is and will be
     * used to replace the current header values.
     */
    readonly header: WidgetHeader;
}

/**
 * @beta
 */
export declare interface ChangeKpiWidgetMeasure extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_MEASURE";
    readonly payload: ChangeKpiWidgetMeasurePayload;
}

/**
 * Creates the ChangeKpiWidgetMeasure command. Dispatching this command will result in change of the measure
 * used by the KPI.
 *
 * @param ref - reference of the KPI widget to modify
 * @param measureRef - reference of the measure to use
 * @param header - specify new header to use; if not provided the existing header will be reused
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeKpiWidgetMeasure(ref: ObjRef, measureRef: ObjRef, header?: WidgetHeader | "from-measure", correlationId?: string): ChangeKpiWidgetMeasure;

/**
 * Payload of the {@link ChangeKpiWidgetMeasure} command.
 * @beta
 */
export declare interface ChangeKpiWidgetMeasurePayload {
    /**
     * KPI Widget reference whose measure to change.
     */
    readonly ref: ObjRef;
    /**
     * Reference to the new measure to use instead of the old measure.
     */
    readonly measureRef: ObjRef;
    /**
     * Specify the new header that should be used for the KPI widget with the
     * changed measure.
     *
     * @remarks
     * You may specify the widget header as 'from-measure'. In that case the title will be automatically
     * set to the title of measure specified in the `measureRef` property.
     */
    readonly header?: WidgetHeader | "from-measure";
}

/**
 * @beta
 */
export declare interface ChangeLayoutSectionHeader extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.CHANGE_SECTION_HEADER";
    readonly payload: ChangeLayoutSectionHeaderPayload;
}

/**
 * Creates the ChangeLayoutSectionHeader command.
 *
 * @remarks
 * Dispatching this command will result in change of the section's title and/or description.
 *
 * @param index - index of section to change
 * @param header - new header
 * @param merge - indicates whether the old header and the new header should be merged; default is no merging
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeLayoutSectionHeader(index: number, header: IDashboardLayoutSectionHeader, merge?: boolean, correlationId?: string): ChangeLayoutSectionHeader;

/**
 * Payload of the {@link ChangeLayoutSectionHeader} command.
 * @beta
 */
export declare interface ChangeLayoutSectionHeaderPayload {
    /**
     * Index of section whose header to set.
     *
     * @remarks
     * Index is zero based. Exact index must be provided.
     */
    readonly index: number;
    /**
     * New value of the header.
     */
    readonly header: IDashboardLayoutSectionHeader;
    /**
     * Indicate that the old header and the new header should be merged.
     *
     * @remarks
     * The default behavior is to overwrite the old header with the new header provided in this command.
     */
    readonly merge?: boolean;
}

/**
 * @beta
 */
export declare interface ChangeRenderMode extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.CHANGE_RENDER_MODE";
    readonly payload: ChangeRenderModePayload;
}

/**
 * Creates the ChangeRenderMode command. Dispatching this command will result in change of the render mode of dashboard component
 *
 * @param renderMode - render mode value
 * @param renderModeChangeOptions - options for render mode change
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeRenderMode(renderMode: RenderMode, renderModeChangeOptions?: RenderModeChangeOptions, correlationId?: string): ChangeRenderMode;

/**
 * Payload of the {@link ChangeRenderMode} command.
 * @beta
 */
export declare interface ChangeRenderModePayload {
    readonly renderMode: RenderMode;
    readonly renderModeChangeOptions: RenderModeChangeOptions;
}

/**
 * @beta
 */
export declare interface ChangeSharing extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.SHARING.CHANGE";
    readonly payload: ChangeSharingPayload;
}

/**
 * Creates the ChangeSharing command. Dispatching this command will result in change of sharing status of dashboard. The changes
 * will be done in-memory and also propagated to the backend.
 *
 * @param newSharingProperties - new dashboard sharing properties
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @beta
 */
export declare function changeSharing(newSharingProperties: ISharingApplyPayload_2, correlationId?: string): ChangeSharing;

/**
 * Payload of the {@link ChangeSharing} command.
 * @beta
 */
export declare interface ChangeSharingPayload {
    /**
     * New sharing-related properties to use.
     */
    readonly newSharingProperties: ISharingApplyPayload_2;
}

/**
 * This convenience function will create ChangeDateFilterSelection configured so that the date filter will be
 * unbounded - showing data for 'All Time'.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @public
 */
export declare function clearDateFilterSelection(correlationId?: string): ChangeDateFilterSelection;

/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for a DashboardCommandFailed of a particular command.
 *
 * @param type - the type of command the DashboardCommandFailed of which this handler should trigger for
 * @param handler - the actual event handling function
 * @alpha
 */
export declare function commandFailedEventHandler<TCommand extends IDashboardCommand>(type: TCommand["type"], handler: DashboardEventHandler<DashboardCommandFailed<TCommand>>["handler"]): DashboardEventHandler<DashboardCommandFailed<TCommand>>;

/**
 * @public
 */
export declare interface CommandProcessingMeta {
    /**
     * Unique identifier assigned at the time command was submitted for processing.
     */
    readonly uuid: string;
}

/**
 * @internal
 */
export declare type CommandProcessingStatus = "running" | "success" | "error";

/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for a DashboardCommandStarted of a particular command.
 *
 * @param type - the type of command the DashboardCommandStarted of which this handler should trigger for
 * @param handler - the actual event handling function
 * @alpha
 */
export declare function commandStartedEventHandler<TCommand extends IDashboardCommand>(type: TCommand["type"], handler: DashboardEventHandler<DashboardCommandStarted<TCommand>>["handler"]): DashboardEventHandler<DashboardCommandStarted<TCommand>>;

/**
 * @public
 */
export declare interface ConfigState {
    /** @beta */
    config?: ResolvedDashboardConfig;
}

/**
 * Capability saying the component can be configured in edit mode.
 * @internal
 */
export declare type ConfigurableWidget<TWidget> = {
    configuration: {
        /**
         * Component used to render the insides of the configuration panel.
         */
        WidgetConfigPanelComponent: CustomWidgetConfigPanelComponent<TWidget>;
    };
};

/**
 * @internal
 */
export declare function CreatableAttributeFilter(props: ICreatePanelItemComponentProps): JSX.Element;

/**
 * Capability saying the component can be created by dragging it from the side drawer.
 * @internal
 */
export declare type CreatableByDragComponent = DraggableComponent & {
    creating: {
        /**
         * Component used to render the item in the left drawer menu used to create a new instance of this component on the dashboard
         */
        CreatePanelListItemComponent: CustomCreatePanelItemComponent;
        /**
         * The lower the priority, the earlier the component is shown in the drawer.
         *
         * @remarks
         * For example item with priority 0 is shown before item with priority 5
         */
        priority?: number;
        /**
         * Draggable item type for the creating item.
         */
        type: DraggableContentItemType;
    };
};

/**
 * Capability saying the component displays something else than the Main component while it is being configured for the first time after being created.
 * @internal
 */
export declare type CreatablePlaceholderComponent<TProps> = {
    creating: {
        /**
         * Component used to render the item before the initial configuration is done.
         */
        CreatingPlaceholderComponent: ComponentType<TProps>;
    };
};

/**
 * Creates Kpi alert.
 *
 * @beta
 */
export declare interface CreateAlert extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.ALERT.CREATE";
    readonly payload: CreateAlertPayload;
}

/**
 * Creates the SaveAlert command. Dispatching this command will result in the creating Kpi alert on the backend.
 *
 * @param alert - specify alert to create.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @beta
 */
export declare function createAlert(alert: IWidgetAlertDefinition, correlationId?: string): CreateAlert;

/**
 * Payload of the {@link CreateAlert} command.
 * @beta
 */
export declare interface CreateAlertPayload {
    /**
     * The alert to be created.
     */
    readonly alert: IWidgetAlertDefinition;
}

/**
 * This event is emitted when the create button is clicked.
 *
 * @internal
 */
export declare interface CreateInsightRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.CREATE_INSIGHT_REQUESTED";
}

/**
 * Create {@link CreateInsightRequested} event
 *
 * @internal
 */
export declare function createInsightRequested(correlationId?: string): DashboardEventBody<CreateInsightRequested>;

/**
 * Creates scheduled email.
 *
 * @beta
 */
export declare interface CreateScheduledEmail extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.SCHEDULED_EMAIL.CREATE";
    readonly payload: CreateScheduledEmailPayload;
}

/**
 * Creates the CreateScheduledEmail command.
 *
 * Dispatching this command will result in the creating scheduled email on the backend.
 *
 * @param scheduledEmail - specify scheduled email to create.
 * @param filterContext - specify filter context to use for the scheduled email. If no filter context is provided, stored dashboard filter context will be used.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing

 * @beta
 */
export declare function createScheduledEmail(scheduledEmail: IScheduledMailDefinition, filterContext?: IFilterContextDefinition, correlationId?: string): CreateScheduledEmail;

/**
 * Payload of the {@link CreateScheduledEmail} command.
 * @beta
 */
export declare interface CreateScheduledEmailPayload {
    /**
     * The scheduled email to create.
     */
    readonly scheduledEmail: IScheduledMailDefinition;
    /**
     * Filter context to use for the scheduled email. If no filter context is provided, stored dashboard filter context will be used.
     */
    readonly filterContext?: IFilterContextDefinition;
}

/**
 * @beta
 */
export declare type CustomButtonBarComponent = ComponentType<IButtonBarProps>;

/**
 * @beta
 */
export declare type CustomCancelButtonComponent = ComponentType<ICancelButtonProps>;

/**
 * @internal
 */
export declare interface CustomComponentBase<TMainProps, TProviderParams extends any[]> {
    /**
     * The main body of the component that is shown by default in view and edit modes.
     */
    MainComponentProvider: (...params: TProviderParams) => ComponentType<TMainProps>;
}

/**
 * @internal
 */
export declare type CustomCreatePanelItemComponent = ComponentType<ICreatePanelItemComponentProps>;

/**
 * @public
 */
export declare type CustomDashboardAttributeFilterComponent = ComponentType<IDashboardAttributeFilterProps>;

/**
 * @internal
 */
export declare type CustomDashboardAttributeFilterPlaceholderComponent = ComponentType<IDashboardAttributeFilterPlaceholderProps>;

/**
 * @public
 */
export declare type CustomDashboardDateFilterComponent = ComponentType<IDashboardDateFilterProps>;

/**
 * @public
 */
export declare type CustomDashboardInsightComponent = ComponentType<IDashboardInsightProps>;

/**
 * @internal
 */
export declare type CustomDashboardInsightListItemComponent = React.ComponentType<CustomDashboardInsightListItemComponentProps>;

/**
 * @internal
 */
export declare type CustomDashboardInsightListItemComponentProps = {
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
 * @alpha
 */
export declare type CustomDashboardInsightMenuButtonComponent = ComponentType<IDashboardInsightMenuButtonProps>;

/**
 * @alpha
 */
export declare type CustomDashboardInsightMenuComponent = ComponentType<IDashboardInsightMenuProps>;

/**
 * @internal
 */
export declare type CustomDashboardInsightMenuTitleComponent = ComponentType<IDashboardInsightMenuTitleProps>;

/**
 * @public
 */
export declare type CustomDashboardKpiComponent = ComponentType<IDashboardKpiProps>;

/**
 * @alpha
 */
export declare type CustomDashboardLayoutComponent = ComponentType<IDashboardLayoutProps>;

/**
 * @public
 */
export declare type CustomDashboardWidgetComponent = ComponentType<IDashboardWidgetProps>;

/**
 * @internal
 */
export declare type CustomDraggableComponent = {
    DraggingComponent: CustomDraggingComponent;
    type: "custom";
};

/**
 * @internal
 */
export declare type CustomDraggableItem = {
    type: "custom";
    [key: string]: any;
};

/**
 * @internal
 */
export declare type CustomDraggingComponent = ComponentType<ICustomDraggingComponentProps>;

/**
 * @beta
 */
export declare type CustomEditModeButtonComponent = ComponentType<IEditButtonProps>;

/**
 * @internal
 */
export declare type CustomEmptyLayoutDropZoneBodyComponent = ComponentType;

/**
 * @alpha
 */
export declare type CustomFilterBarComponent = ComponentType<IFilterBarProps>;

/**
 * @remarks
 * When implementing this using GoodData-provided components, make sure that you pass as many of the props
 * as possible to the component (especially the drill-related props and members of the {@link @gooddata/sdk-ui#IVisualizationCallbacks}).
 * This will ensure the integration with the rest of the widget is as complete as possible.
 *
 * @alpha
 */
export declare type CustomInsightBodyComponent = ComponentType<IInsightBodyProps>;

/**
 * @alpha
 */
export declare type CustomMenuButtonComponent = ComponentType<IMenuButtonProps>;

/**
 * @alpha
 */
export declare type CustomSaveAsDialogComponent = ComponentType<ISaveAsDialogProps>;

/**
 * @beta
 */
export declare type CustomSaveAsNewButtonComponent = ComponentType<ISaveAsNewButtonProps>;

/**
 * @beta
 */
export declare type CustomSaveButtonComponent = ComponentType<ISaveButtonProps>;

/**
 * @alpha
 */
export declare type CustomScheduledEmailDialogComponent = ComponentType<IScheduledEmailDialogProps>;

/**
 * @alpha
 */
export declare type CustomScheduledEmailManagementDialogComponent = ComponentType<IScheduledEmailManagementDialogProps>;

/**
 * @alpha
 */
export declare type CustomShareButtonComponent = ComponentType<IShareButtonProps>;

/**
 * @alpha
 */
export declare type CustomShareDialogComponent = ComponentType<IShareDialogProps>;

/**
 * @alpha
 */
export declare type CustomSidebarComponent = ComponentType<ISidebarProps>;

/**
 * @alpha
 */
export declare type CustomTitleComponent = ComponentType<ITitleProps>;

/**
 * @internal
 */
export declare type CustomToolbarComponent = ComponentType<IToolbarProps>;

/**
 * @alpha
 */
export declare type CustomTopBarComponent = ComponentType<ITopBarProps>;

/**
 * Definition of widget
 * @internal
 */
export declare type CustomWidgetComponentSet = CustomComponentBase<IDashboardWidgetProps, Parameters<WidgetComponentProvider>> & DraggableComponent & Partial<ConfigurableWidget<ICustomWidget>> & Partial<CreatableByDragComponent>;

/**
 * @internal
 */
export declare type CustomWidgetConfigPanelComponent<TWidget> = ComponentType<WidgetConfigPanelProps<TWidget>>;

/**
 * @internal
 */
export declare type CustomWidgetDraggableItem = BaseDraggableMovingItem & {
    type: "customWidget";
    widget: ICustomWidget;
};

/**
 * @internal
 */
export declare const Dashboard: React_2.FC<IDashboardProps>;

/**
 * Represents different kinds of accessibility limitation for dashboard.
 *
 * Dashboard is forbidden when strict access control is supported and user does not have permission to see it or drill to it.
 * Dashboard is not shared when user is able to drill to it but not see it directly.
 *
 * @alpha
 */
export declare type DashboardAccessibilityLimitation = "forbidden" | "notShared";

/**
 * This event is emitted after the Kpi alert is successfully saved.
 *
 * @beta
 */
export declare interface DashboardAlertCreated extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.ALERT.CREATED";
    readonly payload: DashboardAlertCreatedPayload;
}

/**
 * Payload of the {@link DashboardAlertCreated} event.
 * @beta
 */
export declare interface DashboardAlertCreatedPayload {
    /**
     * The alert created.
     */
    readonly alert: IWidgetAlert;
}

/**
 * This event is emitted after the Kpi alerts are successfully removed.
 *
 * @beta
 */
export declare interface DashboardAlertsRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.ALERTS.REMOVED";
    readonly payload: DashboardAlertsRemovedPayload;
}

/**
 * Payload of the {@link DashboardAlertsRemoved} event.
 * @beta
 */
export declare interface DashboardAlertsRemovedPayload {
    /**
     * The alerts removed.
     */
    readonly alerts: IWidgetAlert[];
}

/**
 * This event is emitted after the Kpi alert is updated.
 *
 * @beta
 */
export declare interface DashboardAlertUpdated extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.ALERT.UPDATED";
    readonly payload: DashboardAlertUpdatedPayload;
}

/**
 * Payload of the {@link DashboardAlertUpdated} event.
 * @beta
 */
export declare interface DashboardAlertUpdatedPayload {
    /**
     * The alert updated.
     */
    readonly updated: IWidgetAlert;
}

/**
 * This event is emitted when a component on the dashboard requests async rendering.
 *
 * @public
 */
export declare interface DashboardAsyncRenderRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER.ASYNC.REQUESTED";
    readonly payload: {
        /**
         * Item identifier.
         */
        readonly id: string;
    };
}

/**
 * Payload of the {@link DashboardAsyncRenderRequested} event.
 * @public
 */
export declare interface DashboardAsyncRenderRequestedPayload {
    /**
     * Item identifier.
     */
    readonly id: string;
}

/**
 * This event is emitted when a component on the dashboard resolves async rendering.
 *
 * @public
 */
export declare interface DashboardAsyncRenderResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER.ASYNC.RESOLVED";
    readonly payload: DashboardAsyncRenderResolvedPayload;
}

/**
 * Payload of the {@link DashboardAsyncRenderResolved} event.
 * @public
 */
export declare interface DashboardAsyncRenderResolvedPayload {
    /**
     * Item identifier.
     */
    readonly id: string;
}

/**
 * This event is emitted after a new dashboard attribute filter is successfully added into dashboard's
 * filters.
 *
 * @beta
 */
export declare interface DashboardAttributeFilterAdded extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADDED";
    readonly payload: DashboardAttributeFilterAddedPayload;
}

/**
 * Payload of the {@link DashboardAttributeFilterAdded} event.
 * @beta
 */
export declare interface DashboardAttributeFilterAddedPayload {
    /**
     * Definition of the created attribute filter. The filter's local identifier can be used in subsequent
     * commands to identify this filter.
     */
    readonly added: IDashboardAttributeFilter;
    /**
     * Zero-based index indicating the position of the attribute filter among the other filters.
     */
    readonly index: number;
}

/**
 * This event is emitted after a dashboard attribute filter is moved from one position in the filter bar
 * to a new position
 *
 * @beta
 */
export declare interface DashboardAttributeFilterMoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVED";
    readonly payload: DashboardAttributeFilterMovedPayload;
}

/**
 * Payload of the {@link DashboardAttributeFilterMoved} event.
 * @beta
 */
export declare interface DashboardAttributeFilterMovedPayload {
    /**
     * Definition of the dashboard attribute filter that was moved.
     */
    readonly moved: IDashboardAttributeFilter;
    /**
     * The original position of the filter.
     */
    readonly fromIndex: number;
    /**
     * New absolute position of the filter.
     */
    readonly toIndex: number;
}

/**
 * This event is emitted after the parent relationships of a filter change.
 *
 * @beta
 */
export declare interface DashboardAttributeFilterParentChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.PARENT_CHANGED";
    readonly payload: DashboardAttributeFilterParentChangedPayload;
}

/**
 * Payload of the {@link DashboardAttributeFilterParentChanged} event.
 * @beta
 */
export declare interface DashboardAttributeFilterParentChangedPayload {
    /**
     * The updated definition of the dashboard attribute filter.
     *
     * The definition of parents represents the new state.
     */
    readonly filter: IDashboardAttributeFilter;
}

/**
 * This event is emitted after a dashboard attribute filter is successfully removed.
 *
 * If the removed filter figured as a parent to one or more child filters, then the removal
 * also cleaned up the parent relationship.
 *
 * @beta
 */
export declare interface DashboardAttributeFilterRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVED";
    readonly payload: DashboardAttributeFilterRemovedPayload;
}

/**
 * Payload of the {@link DashboardAttributeFilterRemoved} event.
 * @beta
 */
export declare interface DashboardAttributeFilterRemovedPayload {
    /**
     * The dashboard attribute filter that has been removed.
     */
    readonly removed: IDashboardAttributeFilter;
    /**
     * If the removed filter figured as a parent filter for some other filters, then
     * those children have lost their parent - the relationship was removed.
     *
     * If any children filters were impacted by the removal, their new definition that does
     * not include the parent relationship is included here.
     */
    readonly children?: ReadonlyArray<IDashboardAttributeFilter>;
}

/**
 * This event is emitted after new elements are selected and applied in an attribute filter.
 *
 * @remarks
 *
 * See also {@link dashboardAttributeFilterToAttributeFilter} convertor – this allows you to convert the `filter`
 * in the event payload to an {@link @gooddata/sdk-model#IAttributeFilter} instance you can use with visualizations,
 * filter UI components and so on.
 *
 * @public
 */
export declare interface DashboardAttributeFilterSelectionChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED";
    readonly payload: DashboardAttributeFilterSelectionChangedPayload;
}

/**
 * Payload of the {@link DashboardAttributeFilterSelectionChanged} event.
 *
 * @remarks
 *
 * See also {@link dashboardAttributeFilterToAttributeFilter} convertor – this allows you to convert the `filter`
 * object to an {@link @gooddata/sdk-model#IAttributeFilter} instance you can use with visualizations,
 * filter UI components and so on.
 *
 * @public
 */
export declare interface DashboardAttributeFilterSelectionChangedPayload {
    /**
     * The update definition of the dashboard attribute filter.
     *
     * The attribute elements and/or the negativeSelection indicator values have changed.
     */
    readonly filter: IDashboardAttributeFilter;
}

/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardAttributeFilter} to {@link @gooddata/sdk-model#IAttributeFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @public
 */
export declare function dashboardAttributeFilterToAttributeFilter(filter: IDashboardAttributeFilter): IAttributeFilter;

/**
 * This event is emitted when the attribute filter selection mode is change.
 *
 * @beta
 */
export declare interface DashboardAttributeSelectionModeChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_MODE_CHANGED";
    readonly payload: DashboardAttributeSelectionModeChangedPayload;
}

/**
 * Payload of the {@link DashboardAttributeSelectionModeChanged} event.
 *
 * @beta
 */
export declare interface DashboardAttributeSelectionModeChangedPayload {
    /**
     * The updated definition of the dashboard attribute filter.
     *
     * The definition of selection mode represents the new state.
     */
    readonly filter: IDashboardAttributeFilter;
}

/**
 * This event is emitted when the attribute filter title change.
 *
 * @beta
 */
export declare interface DashboardAttributeTitleChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.TITLE_CHANGED";
    readonly payload: DashboardAttributeTitleChangedPayload;
}

/**
 * Payload of the {@link DashboardAttributeTitleChanged} event.
 * @beta
 */
export declare interface DashboardAttributeTitleChangedPayload {
    /**
     * The updated definition of the dashboard attribute filter.
     *
     * The definition of parents represents the new state.
     */
    readonly filter: IDashboardAttributeFilter;
}

/**
 * This event is emitted if a particular command processing fails. The failure may be for two general reasons:
 *
 * -  A user error was made; dispatched command is found to have bad payload or the dispatched command is not applicable
 *    in the current state of the dashboard
 *
 * -  An internal error has occurred in the dashboard component - highly likely due to a bug.
 *
 * @beta
 */
export declare interface DashboardCommandFailed<TCommand extends IDashboardCommand = IDashboardCommand> extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.COMMAND.FAILED";
    readonly payload: DashboardCommandFailedPayload<TCommand>;
}

/**
 * Payload of the {@link DashboardCommandFailed} event.
 * @beta
 */
export declare interface DashboardCommandFailedPayload<TCommand extends IDashboardCommand> {
    /**
     * Reason for the failure.
     */
    readonly reason: ActionFailedErrorReason;
    /**
     * Message explaining the nature of the failure.
     */
    readonly message: string;
    /**
     * Error that has occurred and caused the command to fail.
     */
    readonly error?: Error;
    /**
     * The command that failed.
     */
    readonly command: TCommand;
}

/**
 * This event is emitted when the submitted command has been rejected by the dashboard component because it does
 * not know how to handle the command.
 *
 * This typically indicates user error, perhaps a typo in the command type name.
 *
 * @beta
 */
export declare interface DashboardCommandRejected extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.COMMAND.REJECTED";
}

/**
 * Union type that contains all available built-in dashboard commands.
 *
 * @remarks
 * Note: while this type is marked as public most of the commands are currently an alpha-level API that
 * we reserve to change in the following releases. If you use those commands now, upgrading to the next
 * version of `@gooddata/sdk-ui-dashboard` will likely result in breakage.
 *
 * @public
 */
export declare type DashboardCommands = InitializeDashboard | SaveDashboardAs | RequestAsyncRender | ResolveAsyncRender | ChangeFilterContextSelection | ChangeDateFilterSelection | ChangeAttributeFilterSelection | ChangeRenderMode | SaveDashboard | RenameDashboard | ResetDashboard | ExportDashboardToPdf | DeleteDashboard | TriggerEvent | UpsertExecutionResult | AddAttributeFilter | RemoveAttributeFilters | MoveAttributeFilter | SetAttributeFilterParents | AddLayoutSection | MoveLayoutSection | RemoveLayoutSection | ChangeLayoutSectionHeader | ResizeHeight | ResizeWidth | AddSectionItems | ReplaceSectionItem | MoveSectionItem | MoveSectionItemToNewSection | RemoveSectionItem | RemoveSectionItemByWidgetRef | UndoLayoutChanges | ChangeKpiWidgetHeader | ChangeKpiWidgetDescription | ChangeKpiWidgetConfiguration | ChangeKpiWidgetMeasure | ChangeKpiWidgetFilterSettings | ChangeKpiWidgetComparison | RefreshKpiWidget | SetDrillForKpiWidget | RemoveDrillForKpiWidget | ChangeInsightWidgetHeader | ChangeInsightWidgetDescription | ChangeInsightWidgetFilterSettings | ChangeInsightWidgetVisProperties | ChangeInsightWidgetVisConfiguration | ChangeInsightWidgetInsight | ModifyDrillsForInsightWidget | RemoveDrillsForInsightWidget | RefreshInsightWidget | ExportInsightWidget | CreateAlert | UpdateAlert | RemoveAlerts | CreateScheduledEmail | SaveScheduledEmail | ChangeSharing | SetAttributeFilterDisplayForm | SetAttributeFilterTitle | SetAttributeFilterSelectionMode | Drill | DrillDown | DrillToAttributeUrl | DrillToCustomUrl | DrillToDashboard | DrillToInsight | DrillToLegacyDashboard | ChangeDrillableItems | AddDrillTargets;

/**
 * This event is emitted when a particular command processing starts.
 *
 * @beta
 */
export declare interface DashboardCommandStarted<TCommand extends IDashboardCommand> extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.COMMAND.STARTED";
    readonly payload: DashboardCommandStartedPayload<TCommand>;
}

/**
 * Payload of the {@link DashboardCommandStarted} event.
 * @beta
 */
export declare interface DashboardCommandStartedPayload<TCommand extends IDashboardCommand> {
    /**
     * The command that started processing.
     */
    readonly command: TCommand;
}

/**
 * All available command types.
 *
 * @remarks
 * Note: while this type is marked as public most of the command types are currently an alpha-level API that
 * we reserve to change in the following releases.
 *
 * At this moment, we only consider the GDC.DASH/CMD.SAVEAS as stable
 *
 * @public
 */
export declare type DashboardCommandType = "GDC.DASH/CMD.INITIALIZE" | "GDC.DASH/CMD.SAVE" | "GDC.DASH/CMD.SAVEAS" | "GDC.DASH/CMD.RESET" | "GDC.DASH/CMD.RENAME" | "GDC.DASH/CMD.DELETE" | "GDC.DASH/CMD.CHANGE_RENDER_MODE" | "GDC.DASH/CMD.SHARING.CHANGE" | "GDC.DASH/CMD.EXPORT.PDF" | "GDC.DASH/CMD.EVENT.TRIGGER" | "GDC.DASH/CMD.EXECUTION_RESULT.UPSERT" | "GDC.DASH/CMD.FILTER_CONTEXT.CHANGE_SELECTION" | "GDC.DASH/CMD.FILTER_CONTEXT.DATE_FILTER.CHANGE_SELECTION" | "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADD" | "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVE" | "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVE" | "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.CHANGE_SELECTION" | "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_PARENTS" | "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_DISPLAY_FORM" | "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_TITLE" | "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_SELECTION_MODE" | "GDC.DASH/CMD.FLUID_LAYOUT.ADD_SECTION" | "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_SECTION" | "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM_TO_NEW_SECTION" | "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_SECTION" | "GDC.DASH/CMD.FLUID_LAYOUT.CHANGE_SECTION_HEADER" | "GDC.DASH/CMD.FLUID_LAYOUT.ADD_ITEMS" | "GDC.DASH/CMD.FLUID_LAYOUT.REPLACE_ITEM" | "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM" | "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM" | "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM_BY_WIDGET_REF" | "GDC.DASH/CMD.FLUID_LAYOUT.UNDO" | "GDC.DASH/CMD.FLUID_LAYOUT.RESIZE_HEIGHT" | "GDC.DASH/CMD.FLUID_LAYOUT.RESIZE_WIDTH" | "GDC.DASH/CMD.KPI_WIDGET.CHANGE_HEADER" | "GDC.DASH/CMD.KPI_WIDGET.CHANGE_MEASURE" | "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS" | "GDC.DASH/CMD.KPI_WIDGET.CHANGE_COMPARISON" | "GDC.DASH/CMD.KPI_WIDGET.REFRESH" | "GDC.DASH/CMD.KPI_WIDGET.SET_DRILL" | "GDC.DASH/CMD.KPI_WIDGET.REMOVE_DRILL" | "GDC.DASH/CMD.KPI_WIDGET.CHANGE_DESCRIPTION" | "GDC.DASH/CMD.KPI_WIDGET.CHANGE_CONFIGURATION" | "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_HEADER" | "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_DESCRIPTION" | "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_FILTER_SETTINGS" | "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_PROPERTIES" | "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_CONFIGURATION" | "GDC.DASH/CMD.INSIGHT_WIDGET.CHANGE_INSIGHT" | "GDC.DASH/CMD.INSIGHT_WIDGET.EXPORT" | "GDC.DASH/CMD.INSIGHT_WIDGET.MODIFY_DRILLS" | "GDC.DASH/CMD.INSIGHT_WIDGET.REMOVE_DRILLS" | "GDC.DASH/CMD.INSIGHT_WIDGET.REFRESH" | "GDC.DASH/CMD.ALERT.CREATE" | "GDC.DASH/CMD.ALERT.UPDATE" | "GDC.DASH/CMD.ALERTS.REMOVE" | "GDC.DASH/CMD.SCHEDULED_EMAIL.CREATE" | "GDC.DASH/CMD.SCHEDULED_EMAIL.SAVE" | "GDC.DASH/CMD.DRILL" | "GDC.DASH/CMD.DRILL.DRILL_DOWN" | "GDC.DASH/CMD.DRILL.DRILL_TO_INSIGHT" | "GDC.DASH/CMD.DRILL.DRILL_TO_DASHBOARD" | "GDC.DASH/CMD.DRILL.DRILL_TO_ATTRIBUTE_URL" | "GDC.DASH/CMD.DRILL.DRILL_TO_CUSTOM_URL" | "GDC.DASH/CMD.DRILL.DRILL_TO_LEGACY_DASHBOARD" | "GDC.DASH/CMD.DRILL.DRILLABLE_ITEMS.CHANGE" | "GDC.DASH/CMD.DRILL_TARGETS.ADD" | "GDC.DASH/CMD.RENDER.ASYNC.REQUEST" | "GDC.DASH/CMD.RENDER.ASYNC.RESOLVE";

/**
 * Dashboard configuration can influence the available features, look and feel and behavior of the dashboard.
 *
 * @public
 */
export declare interface DashboardConfig {
    /**
     * Locale to use for the dashboard.
     */
    locale?: ILocale;
    /**
     * Number separators to use for charts and KPIs on the dashboard.
     */
    separators?: ISeparators;
    /**
     * Settings may influence how the dashboard behaves or what features it exposes.
     */
    settings?: ISettings;
    /**
     * Date filter configuration.
     *
     * @remarks
     * Date filter configuration is used to influence what filtering presets (options) should be
     * available on the date filter component.
     */
    dateFilterConfig?: IDateFilterConfig;
    /**
     * Color palette to pass down to charts.
     */
    colorPalette?: IColorPalette;
    /**
     * Specifies exclusion and inclusion criteria for objects that should be available during the
     * different object selections (e.g. selecting metric for KPI, attributes to filter by, date data sets to use for filtering).
     */
    objectAvailability?: ObjectAvailabilityConfig;
    /**
     * Token for Mapbox API. You need this to use GeoCharts in your dashboards.
     *
     * @remarks To create a Mapbox account and an access token, see [this guide](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/).
     */
    mapboxToken?: string;
    /**
     * Sets dashboard to the read-only mode.
     *
     * @remarks
     * If set to true, the dashboard will be embedded in a read-only mode disabling any user interaction
     * that would alter any backend state (disabling creating/changing alerts, creating scheduled emails, etc.).
     *
     * Defaults to false i.e. NOT a read-only mode.
     */
    isReadOnly?: boolean;
    /**
     * Sets dashboard to the embedded mode.
     *
     * @remarks
     * When dashboard is embedded via iframe, this property must be set to true.
     * In embedded mode, some interactions may be disabled.
     *
     * Defaults to false.
     */
    isEmbedded?: boolean;
    /**
     * When dashboard is executed in export mode, this property must be set to true.
     *
     * @remarks
     * Defaults to false.
     */
    isExport?: boolean;
    /**
     * When dashboard is white labeled, we hide GD links and branding.
     * @internal
     */
    isWhiteLabeled?: boolean;
    /**
     * Disables default dashboard drills.
     *
     * @remarks
     * Drills configured and stored on the widgets, or implicit drills (eg. drill down).
     * This property has no effect for drills enabled by drillableItems set by {@link ChangeDrillableItems} command.
     *
     * Defaults to false.
     */
    disableDefaultDrills?: boolean;
    /**
     * If set to true, filter values will resolve in drill events.
     *
     * @remarks
     * Defaults to false.
     */
    enableFilterValuesResolutionInDrillEvents?: boolean;
    /**
     * Configure which of the default menu button buttons are visible.
     * @beta
     */
    menuButtonItemsVisibility?: IMenuButtonItemsVisibility;
    /**
     * When turned on the features still under development will be turned on based on corresponding settings
     *
     * @remarks
     * Defaults to false.
     */
    allowUnfinishedFeatures?: boolean;
    /**
     * @internal
     * Allow to create insight button and event
     */
    allowCreateInsightRequest?: boolean;
    /**
     * Specify which render mode will be use d for initial rendering.
     *
     * @remarks
     * If you do not specify initialRenderMode, the dashboard component will be display in view mode.
     */
    initialRenderMode?: RenderMode;
    /**
     * @internal
     * Hide "Save as new" button in ButtonBar and MenuButton
     */
    hideSaveAsNewButton?: boolean;
    /**
     * @internal
     * Hide "Share" button in TopBar
     */
    hideShareButton?: boolean;
    /**
     * @internal
     * Provide widgets overlays for dashboard
     */
    widgetsOverlay?: Record<string, IDashboardWidgetOverlay>;
    /**
     * @internal
     * Identifier of the export
     *
     * @remarks
     * This identifier is utilized only by those backend implementations which suport storing
     * export metadata with the export request and is typically used to store inlined filter context.
     * In the future, there's a possibility to store some additional export-related temporary metadata there.
     *
     * As the backend does not expose the filter context publicly, this id is then used to access export metadata
     * api, retrieve the metadata and extract filter context from there.
     *
     * Important: When exportId is given, the filter context stored with export metadata for this exportId has
     * priority over other stored or supplied filter context.
     */
    exportId?: string;
}

/**
 * @public
 */
export declare interface DashboardContext {
    /**
     * Analytical Backend where the dashboard exists.
     */
    backend: IAnalyticalBackend;
    /**
     * Analytical Backend where the dashboard exists.
     */
    workspace: string;
    /**
     * Dashboard config
     * @internal
     *
     * @remarks
     * Do not use this, can be changed in future or removed at all
     *
     */
    config?: DashboardConfig;
    /**
     * Reference to dashboard that should be loaded into the store.
     *
     * @remarks
     * If the dashboardRef is not specified, then this indicates
     * the dashboard should be initialized with empty state (new dashboard).
     */
    dashboardRef?: ObjRef;
    /**
     * Reference to filter context that defines filters to use on the dashboard.
     */
    filterContextRef?: ObjRef;
    /**
     * Client identifier.
     *
     * @remarks
     * It's required, if the backend implementation supports it and workspace is provisioned via LCM.
     */
    clientId?: string;
    /**
     * Data product identifier.
     * @remarks
     * It's required, if the backend implementation supports it and workspace is provisioned via LCM.
     */
    dataProductId?: string;
}

/**
 * This event is emitted at the end of successful 'dashboard save as' command processing.
 *
 * @remarks
 * At this point, a new dashboard exists on the backend.
 *
 * @public
 */
export declare interface DashboardCopySaved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.COPY_SAVED";
    readonly payload: DashboardCopySavedPayload;
}

/**
 * Payload of the {@link DashboardCopySaved} event.
 * @public
 */
export declare interface DashboardCopySavedPayload {
    /**
     * Definition of the newly created dashboard copy.
     */
    readonly dashboard: IDashboard;
    /**
     * Flag describing whether a locked dashboard was copied.
     */
    readonly isOriginalDashboardLocked: boolean;
}

/**
 * This event is emitted after the dashboard's date filter selection is changed.
 *
 * @remarks
 *
 * See also {@link dashboardDateFilterToDateFilterByWidget} and {@link dashboardDateFilterToDateFilterByDateDataSet} convertors
 * – those allow you to convert the `filter` in the event payload to an {@link @gooddata/sdk-model#IDateFilter} instance you can use
 * with visualizations, filter UI components and so on.
 *
 * @public
 */
export declare interface DashboardDateFilterSelectionChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.SELECTION_CHANGED";
    readonly payload: DashboardDateFilterSelectionChangedPayload;
}

/**
 * Payload of the {@link DashboardDateFilterSelectionChanged} event.
 *
 * @remarks
 *
 * See also {@link dashboardDateFilterToDateFilterByWidget} and {@link dashboardDateFilterToDateFilterByDateDataSet} convertors
 * – those allow you to convert the `filter` object to an {@link @gooddata/sdk-model#IDateFilter} instance you can use
 * with visualizations, filter UI components and so on.
 *
 * @public
 */
export declare interface DashboardDateFilterSelectionChangedPayload {
    /**
     * Object with changed date filter selection.
     */
    readonly filter: IDashboardDateFilter | undefined;
    /**
     * Optional local identifier of the new selected date filter option.
     */
    readonly dateFilterOptionLocalId?: string;
}

/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardDateFilter} to {@link @gooddata/sdk-model#IDateFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @param dateDataSet - date data set to define {@link @gooddata/sdk-model#IDateFilter}
 * @public
 */
export declare function dashboardDateFilterToDateFilterByDateDataSet(filter: IDashboardDateFilter, dateDataSet: ObjRef): IDateFilter;

/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardDateFilter} to {@link @gooddata/sdk-model#IDateFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export declare function dashboardDateFilterToDateFilterByWidget(filter: IDashboardDateFilter, widget: Partial<IFilterableWidget>): IDateFilter;

/**
 * This event is emitted when a dashboard is deinitialized. The event contains contextual information such as
 * the ref of dashboard being deinitialized if the dashboard being deinitialized contained a persisted dashboard object.
 *
 * @remarks
 * This event is useful when your application switches between different dashboards (similar to what the Dashboards application does)
 * and you want to handle that. Note that this event WILL NOT be fired when navigating to a completely different
 * application/site in the browser or closing the tab etc., if you want to handle that, you need to do it yourself
 * using the appropriate events on the Window object.
 *
 * @public
 */
export declare interface DashboardDeinitialized extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DEINITIALIZED";
    readonly payload: DashboardDeinitializedPayload;
}

/**
 * Payload of the {@link DashboardDeinitialized} event.
 * @public
 */
export declare interface DashboardDeinitializedPayload {
    /**
     * Reference of the dashboard being deinitialized (if the dashboard being deinitialized had one i.e. contained a persisted dashboard object).
     */
    dashboard: ObjRef | undefined;
}

/**
 * This event is emitted at the end of successful 'dashboard delete' command processing. At this point,
 * the dashboard no longer exist on the backend and the component is reset to a state when it shows
 * an empty dashboard.
 *
 * @beta
 */
export declare interface DashboardDeleted extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DELETED";
    readonly payload: {
        /**
         * Dashboard that was deleted.
         */
        readonly dashboard: IDashboard;
    };
}

/**
 * Payload of the {@link DashboardDeleted} event.
 * @beta
 */
export declare interface DashboardDeletedPayload {
    /**
     * Dashboard that was deleted.
     */
    readonly dashboard: IDashboard;
}

/**
 * @public
 */
export declare type DashboardDescriptor = Pick<IDashboard, "title" | "description" | "tags"> & IAccessControlAware;

/**
 * @public
 */
export declare type DashboardDispatch = Dispatch<AnyAction>;

/**
 * This event is emitted as a result of the {@link ChangeDrillableItems} command, if drillable items was successfully changed.
 *
 * @alpha
 */
export declare interface DashboardDrillableItemsChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILLABLE_ITEMS.CHANGED";
    readonly payload: DashboardDrillableItemsChangedPayload;
}

/**
 * Payload of the {@link DashboardDrillableItemsChanged} event.
 * @alpha
 */
export declare interface DashboardDrillableItemsChangedPayload {
    /**
     * Drillable items that was set.
     */
    readonly drillableItems: ExplicitDrill[];
}

/**
 * @alpha
 */
export declare type DashboardDrillCommand = Drill | DrillDown | DrillToAttributeUrl | DrillToCustomUrl | DrillToDashboard | DrillToInsight | DrillToLegacyDashboard;

/**
 * @alpha
 */
export declare interface DashboardDrillContext {
    /**
     * Particular insight that triggered the drill event.
     */
    insight?: IInsight;
    /**
     * Particular widget that triggered the drill event.
     */
    widget?: IWidget;
}

/**
 * Supported dashboard drill definitions.
 *
 * @beta
 */
export declare type DashboardDrillDefinition = DrillDefinition | IDrillDownDefinition;

/**
 * This event is emitted on start of the resolution of the {@link DrillDown} command.
 * It contains the target insight to apply the drill down on (result of the drill down application
 * depends on the particular visualization type).
 *
 * @alpha
 */
export declare interface DashboardDrillDownRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_DOWN.REQUESTED";
    readonly payload: DashboardDrillDownRequestedPayload;
}

/**
 * Payload of the {@link DashboardDrillDownRequested} event.
 * @alpha
 */
export declare interface DashboardDrillDownRequestedPayload {
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
 * This event is emitted as a result of the {@link DrillDown} command.
 * It contains the target insight with the drill down definition applied (result of the drill down application
 * depends on the particular visualization type).
 *
 * In the default dashboard implementation this event also opens drill dialog with the insight
 * that has this particular drill down definition applied.
 *
 * @alpha
 */
export declare interface DashboardDrillDownResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_DOWN.RESOLVED";
    readonly payload: DashboardDrillDownResolvedPayload;
}

/**
 * Payload of the {@link DashboardDrillDownResolved} event.
 * @alpha
 */
export declare interface DashboardDrillDownResolvedPayload {
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
 * This event is emitted on start of the resolution of the {@link Drill} command.
 * It contains details about all possible drill definitions that are available for this particular drill interaction
 *
 * @alpha
 */
export declare interface DashboardDrillRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.REQUESTED";
    readonly payload: DashboardDrillRequestedPayload;
}

/**
 * Payload of the {@link DashboardDrillRequested} event.
 * @alpha
 */
export declare interface DashboardDrillRequestedPayload {
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
export declare interface DashboardDrillResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.RESOLVED";
    readonly payload: DashboardDrillResolvedPayload;
}

/**
 * Payload of the {@link DashboardDrillResolved} event.
 * @alpha
 */
export declare interface DashboardDrillResolvedPayload {
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
 * This event is emitted on start of the resolution of the {@link DrillToAttributeUrl} command.
 *
 * @alpha
 */
export declare interface DashboardDrillToAttributeUrlRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.REQUESTED";
    readonly payload: DashboardDrillToAttributeUrlRequestedPayload;
}

/**
 * Payload of the {@link DashboardDrillToAttributeUrlRequested} event.
 * @alpha
 */
export declare interface DashboardDrillToAttributeUrlRequestedPayload {
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
 * This event is emitted as a result of the {@link DrillToAttributeUrl} command.
 * It contains resolved attribute url from the drill definition.
 *
 * @alpha
 */
export declare interface DashboardDrillToAttributeUrlResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED";
    readonly payload: DashboardDrillToAttributeUrlResolvedPayload;
}

/**
 * Payload of the {@link DashboardDrillToAttributeUrlResolved} event.
 * @alpha
 */
export declare interface DashboardDrillToAttributeUrlResolvedPayload {
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
 * This event is emitted on start of the resolution of the {@link DrillToCustomUrl} command.
 *
 * @alpha
 */
export declare interface DashboardDrillToCustomUrlRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.REQUESTED";
    readonly payload: DashboardDrillToCustomUrlRequestedPayload;
}

/**
 * Payload of the {@link DashboardDrillToCustomUrlRequested} event.
 * @alpha
 */
export declare interface DashboardDrillToCustomUrlRequestedPayload {
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
 * This event is emitted as a result of the {@link DrillToCustomUrl} command.
 * It contains resolved custom url from the drill definition.
 *
 * @alpha
 */
export declare interface DashboardDrillToCustomUrlResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.RESOLVED";
    readonly payload: DashboardDrillToCustomUrlResolvedPayload;
}

/**
 * Payload of the {@link DashboardDrillToCustomUrlResolved} event.
 * @alpha
 */
export declare interface DashboardDrillToCustomUrlResolvedPayload {
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
 * This event is emitted on start of the resolution of the {@link DrillToDashboard} command.
 *
 * @alpha
 */
export declare interface DashboardDrillToDashboardRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.REQUESTED";
    readonly payload: DashboardDrillToDashboardRequestedPayload;
}

/**
 * Payload of the {@link DashboardDrillToDashboardRequested} event.
 * @alpha
 */
export declare interface DashboardDrillToDashboardRequestedPayload {
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
export declare interface DashboardDrillToDashboardResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.RESOLVED";
    readonly payload: DashboardDrillToDashboardResolvedPayload;
}

/**
 * Payload of the {@link DashboardDrillToDashboardResolved} event.
 * @alpha
 */
export declare interface DashboardDrillToDashboardResolvedPayload {
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
 * This event is emitted on start of the resolution of the {@link DrillToInsight} command.
 * It contains the target insight to apply drill intersection filters on.
 *
 * @alpha
 */
export declare interface DashboardDrillToInsightRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.REQUESTED";
    readonly payload: DashboardDrillToInsightRequestedPayload;
}

/**
 * Payload of the {@link DashboardDrillToInsightRequested} event.
 * @alpha
 */
export declare interface DashboardDrillToInsightRequestedPayload {
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
export declare interface DashboardDrillToInsightResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.RESOLVED";
    readonly payload: DashboardDrillToInsightResolvedPayload;
}

/**
 * Payload of the {@link DashboardDrillToInsightResolved} event.
 * @alpha
 */
export declare interface DashboardDrillToInsightResolvedPayload {
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
 * This event is emitted on start of the resolution of the {@link DrillToLegacyDashboard} command.
 *
 * @alpha
 */
export declare interface DashboardDrillToLegacyDashboardRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.REQUESTED";
    readonly payload: DashboardDrillToLegacyDashboardRequestedPayload;
}

/**
 * Payload of the {@link DashboardDrillToLegacyDashboardRequested} event.
 * @alpha
 */
export declare interface DashboardDrillToLegacyDashboardRequestedPayload {
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
export declare interface DashboardDrillToLegacyDashboardResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.RESOLVED";
    readonly payload: DashboardDrillToLegacyDashboardResolvedPayload;
}

/**
 * Payload of the {@link DashboardDrillToLegacyDashboardResolved} event.
 * @alpha
 */
export declare interface DashboardDrillToLegacyDashboardResolvedPayload {
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
 * @public
 */
export declare type DashboardEventBody<T extends IDashboardEvent | ICustomDashboardEvent> = Omit<T, "ctx">;

/**
 * @public
 */
export declare type DashboardEventEvalFn = (event: DashboardEvents | ICustomDashboardEvent) => boolean;

/**
 * Event handlers can be registered for a dashboard.
 *
 * @remarks
 * All events that occur during dashboard processing will be evaluated against all registered handlers and if
 * evaluation succeeds they will be dispatched to the handler function.
 *
 * @public
 */
export declare interface DashboardEventHandler<TEvents extends DashboardEvents | ICustomDashboardEvent = any> {
    /**
     * Specify event evaluation function.
     *
     * @remarks
     * This will be used by dashboard's event emitter to determine
     * whether event of particular type should be dispatched to this handler.
     *
     * @param event - dashboard or custom event
     */
    eval: DashboardEventEvalFn;
    /**
     * The actual event handling function.
     *
     * @remarks
     * This will be called if the eval function returns true.
     *
     * @param event - event to handle
     * @param dashboardDispatch - the dispatch object of the dashboard store use dot dispatch commands or queries
     * @param stateSelect - callback to execute arbitrary selectors against the dashboard state
     */
    handler: DashboardEventHandlerFn<TEvents>;
}

/**
 * @public
 */
export declare type DashboardEventHandlerFn<TEvents extends DashboardEvents | ICustomDashboardEvent> = (event: TEvents, dashboardDispatch: Dispatch<AnyAction>, stateSelect: DashboardSelectorEvaluator) => void;

/**
 * Union type that contains all available built-in dashboard events.
 *
 * @remarks
 * Note: while this type is marked as public most of the events are currently an alpha-level API that
 * we reserve to change in the following releases. If you use those events now, upgrading to the next
 * version of `@gooddata/sdk-ui-dashboard` will likely result in breakage.
 *
 * @public
 */
export declare type DashboardEvents = DashboardInitialized | DashboardDeinitialized | DateFilterValidationFailed | DashboardSaved | DashboardCopySaved | DashboardRenderRequested | DashboardAsyncRenderRequested | DashboardAsyncRenderResolved | DashboardRenderResolved | DashboardSharingChanged | DashboardRenderModeChanged | DashboardCommandStarted<any> | DashboardCommandFailed<any> | DashboardCommandRejected | DashboardQueryFailed | DashboardQueryRejected | DashboardQueryStarted | DashboardQueryCompleted<any, any> | DashboardRenamed | DashboardWasReset | DashboardExportToPdfRequested | DashboardExportToPdfResolved | DashboardUserInteractionTriggered | DashboardDateFilterSelectionChanged | DashboardAttributeFilterAdded | DashboardAttributeFilterRemoved | DashboardAttributeFilterMoved | DashboardAttributeFilterSelectionChanged | DashboardAttributeTitleChanged | DashboardAttributeSelectionModeChanged | DashboardAttributeFilterParentChanged | DashboardFilterContextChanged | DashboardLayoutSectionAdded | DashboardLayoutSectionMoved | DashboardLayoutSectionRemoved | DashboardLayoutSectionHeaderChanged | DashboardLayoutSectionItemsAdded | DashboardLayoutSectionItemReplaced | DashboardLayoutSectionItemMoved | DashboardLayoutSectionItemRemoved | DashboardLayoutChanged | DashboardKpiWidgetHeaderChanged | DashboardKpiWidgetDescriptionChanged | DashboardKpiWidgetConfigurationChanged | DashboardKpiWidgetMeasureChanged | DashboardKpiWidgetFilterSettingsChanged | DashboardKpiWidgetComparisonChanged | DashboardKpiWidgetDrillRemoved | DashboardKpiWidgetDrillSet | DashboardKpiWidgetChanged | DashboardInsightWidgetHeaderChanged | DashboardInsightWidgetDescriptionChanged | DashboardInsightWidgetFilterSettingsChanged | DashboardInsightWidgetVisPropertiesChanged | DashboardInsightWidgetVisConfigurationChanged | DashboardInsightWidgetInsightSwitched | DashboardInsightWidgetDrillsModified | DashboardInsightWidgetDrillsRemoved | DashboardInsightWidgetChanged | DashboardInsightWidgetExportRequested | DashboardInsightWidgetExportResolved | DashboardInsightWidgetRefreshed | DashboardWidgetExecutionStarted | DashboardWidgetExecutionSucceeded | DashboardWidgetExecutionFailed | DashboardAlertCreated | DashboardAlertsRemoved | DashboardAlertUpdated | DashboardScheduledEmailCreated | DashboardScheduledEmailSaved | DashboardDrillDownResolved | DashboardDrillToAttributeUrlResolved | DashboardDrillToCustomUrlResolved | DashboardDrillToDashboardResolved | DashboardDrillToInsightResolved | DashboardDrillToLegacyDashboardResolved | DashboardDrillResolved | DashboardDrillDownRequested | DashboardDrillToAttributeUrlRequested | DashboardDrillToCustomUrlRequested | DashboardDrillToDashboardRequested | DashboardDrillToInsightRequested | DashboardDrillToLegacyDashboardRequested | DashboardDrillRequested | DashboardDrillableItemsChanged | CreateInsightRequested;

/**
 * A union of all available built-in dashboard event type names.
 *
 * @remarks
 * Note: while this type is marked as public most of the event types are currently an alpha-level API that
 * we reserve to change in the following releases.
 *
 * These are the event types that we currently consider stable:
 *
 * -  GDC.DASH/EVT.INITIALIZED
 * -  GDC.DASH/EVT.DEINITIALIZED
 * -  GDC.DASH/EVT.SAVED
 * -  GDC.DASH/EVT.COPY_SAVED
 * -  GDC.DASH/EVT.SHARING.CHANGED
 * -  GDC.DASH/EVT.FILTER_CONTEXT.CHANGED
 * -  GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.SELECTION_CHANGED
 * -  GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED
 *
 * @public
 */
export declare type DashboardEventType = "GDC.DASH/EVT.COMMAND.FAILED" | "GDC.DASH/EVT.COMMAND.REJECTED" | "GDC.DASH/EVT.COMMAND.STARTED" | "GDC.DASH/EVT.QUERY.FAILED" | "GDC.DASH/EVT.QUERY.REJECTED" | "GDC.DASH/EVT.QUERY.STARTED" | "GDC.DASH/EVT.QUERY.COMPLETED" | "GDC.DASH/EVT.USER_INTERACTION.TRIGGERED" | "GDC.DASH/EVT.INITIALIZED" | "GDC.DASH/EVT.DEINITIALIZED" | "GDC.DASH/EVT.SAVED" | "GDC.DASH/EVT.COPY_SAVED" | "GDC.DASH/EVT.RENAMED" | "GDC.DASH/EVT.RESET" | "GDC.DASH/EVT.DELETED" | "GDC.DASH/EVT.RENDER_MODE.CHANGED" | "GDC.DASH/EVT.EXPORT.PDF.REQUESTED" | "GDC.DASH/EVT.EXPORT.PDF.RESOLVED" | "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.VALIDATION.FAILED" | "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.SELECTION_CHANGED" | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADDED" | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVED" | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVED" | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED" | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.PARENT_CHANGED" | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.DISPLAY_FORM_CHANGED" | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_MODE_CHANGED" | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.TITLE_CHANGED" | "GDC.DASH/EVT.FILTER_CONTEXT.CHANGED" | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ADDED" | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_MOVED" | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_REMOVED" | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_HEADER_CHANGED" | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ITEM_WIDTH_RESIZED" | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ITEMS_HEIGHT_RESIZED" | "GDC.DASH/EVT.FLUID_LAYOUT.ITEMS_ADDED" | "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REPLACED" | "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED" | "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED_TO_NEW_SECTION" | "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REMOVED" | "GDC.DASH/EVT.FLUID_LAYOUT.LAYOUT_CHANGED" | "GDC.DASH/EVT.KPI_WIDGET.HEADER_CHANGED" | "GDC.DASH/EVT.KPI_WIDGET.DESCRIPTION_CHANGED" | "GDC.DASH/EVT.KPI_WIDGET.CONFIGURATION_CHANGED" | "GDC.DASH/EVT.KPI_WIDGET.MEASURE_CHANGED" | "GDC.DASH/EVT.KPI_WIDGET.FILTER_SETTINGS_CHANGED" | "GDC.DASH/EVT.KPI_WIDGET.COMPARISON_CHANGED" | "GDC.DASH/EVT.KPI_WIDGET.DRILL_REMOVED" | "GDC.DASH/EVT.KPI_WIDGET.DRILL_SET" | "GDC.DASH/EVT.KPI_WIDGET.WIDGET_CHANGED" | "GDC.DASH/EVT.INSIGHT_WIDGET.HEADER_CHANGED" | "GDC.DASH/EVT.INSIGHT_WIDGET.DESCRIPTION_CHANGED" | "GDC.DASH/EVT.INSIGHT_WIDGET.FILTER_SETTINGS_CHANGED" | "GDC.DASH/EVT.INSIGHT_WIDGET.PROPERTIES_CHANGED" | "GDC.DASH/EVT.INSIGHT_WIDGET.CONFIGURATION_CHANGED" | "GDC.DASH/EVT.INSIGHT_WIDGET.INSIGHT_SWITCHED" | "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_MODIFIED" | "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_REMOVED" | "GDC.DASH/EVT.INSIGHT_WIDGET.WIDGET_CHANGED" | "GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_REQUESTED" | "GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_RESOLVED" | "GDC.DASH/EVT.INSIGHT_WIDGET.REFRESHED" | "GDC.DASH/EVT.WIDGET.EXECUTION_STARTED" | "GDC.DASH/EVT.WIDGET.EXECUTION_FAILED" | "GDC.DASH/EVT.WIDGET.EXECUTION_SUCCEEDED" | "GDC.DASH/EVT.ALERT.CREATED" | "GDC.DASH/EVT.ALERT.UPDATED" | "GDC.DASH/EVT.ALERTS.REMOVED" | "GDC.DASH/EVT.SCHEDULED_EMAIL.CREATED" | "GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED" | "GDC.DASH/EVT.DRILL.REQUESTED" | "GDC.DASH/EVT.DRILL.RESOLVED" | "GDC.DASH/EVT.DRILL.DRILL_DOWN.REQUESTED" | "GDC.DASH/EVT.DRILL.DRILL_DOWN.RESOLVED" | "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.REQUESTED" | "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.RESOLVED" | "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.REQUESTED" | "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.RESOLVED" | "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.REQUESTED" | "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED" | "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.REQUESTED" | "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.RESOLVED" | "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.REQUESTED" | "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.RESOLVED" | "GDC.DASH/EVT.DRILL.DRILLABLE_ITEMS.CHANGED" | "GDC.DASH/EVT.DRILL_TARGETS.ADDED" | "GDC.DASH/EVT.RENDER.REQUESTED" | "GDC.DASH/EVT.RENDER.ASYNC.REQUESTED" | "GDC.DASH/EVT.RENDER.ASYNC.RESOLVED" | "GDC.DASH/EVT.RENDER.RESOLVED" | "GDC.DASH/EVT.SHARING.CHANGED" | "GDC.DASH/EVT.CREATE_INSIGHT_REQUESTED";

/**
 * This event is emitted at the start of the 'dashboard export to PDF' command processing.
 *
 * @beta
 */
export declare interface DashboardExportToPdfRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.EXPORT.PDF.REQUESTED";
}

/**
 * This event is emitted at the end of successful 'dashboard export to PDF' command processing.
 * In its payload, there is an uri of the resulting PDF file.
 *
 * @beta
 */
export declare interface DashboardExportToPdfResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.EXPORT.PDF.RESOLVED";
    readonly payload: DashboardExportToPdfResolvedPayload;
}

/**
 * Payload of the {@link DashboardExportToPdfResolved} event.
 * @beta
 */
export declare interface DashboardExportToPdfResolvedPayload {
    /**
     * URI of the resulting file that can be used to download it.
     */
    readonly resultUri: string;
    /**
     * Collection of information used to download the resulting file.
     */
    readonly result: IExportResult;
}

/**
 * This event is emitted after _any_ change to dashboard filters (be it date or attribute filter).
 * The event describes the new state of the entire filter context.
 *
 * @remarks
 * This event is emitted as convenience - more granular events describe all the possible
 * changes to the dashboard filters and can be used to event source the state of filter context.
 *
 * See also {@link filterContextToDashboardFiltersByWidget} and {@link filterContextToDashboardFiltersByDateDataSet} convertors
 * – those allow you to convert the `filterContext` in the event payload to array of {@link @gooddata/sdk-model#IFilter} instances you can use
 * with visualizations, filter UI components and so on.
 *
 * @public
 */
export declare interface DashboardFilterContextChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.CHANGED";
    readonly payload: DashboardFilterContextChangedPayload;
}

/**
 * Payload of the {@link DashboardFilterContextChanged} event.
 *
 * @remarks
 *
 * See also {@link filterContextToDashboardFiltersByWidget} and {@link filterContextToDashboardFiltersByDateDataSet} convertors
 * – those allow you to convert the `filterContext` object to array of {@link @gooddata/sdk-model#IFilter} instances you can use
 * with visualizations, filter UI components and so on.
 *
 * @public
 */
export declare interface DashboardFilterContextChangedPayload {
    /**
     * The new value of the filterContext.
     */
    readonly filterContext: IFilterContextDefinition;
}

/**
 * This event is emitted when a dashboard is successfully initialized.
 *
 * @remarks
 * The event contains contextual information such as the resolved DashboardConfig and the permissions in effect
 * for the current user and current workspace.
 *
 * If the initialization loaded an existing, persisted dashboard then the dashboard object will be included in
 * the event.
 *
 * If the initialization created a new, empty dashboard then dashboard object will be undefined.
 *
 * @public
 */
export declare interface DashboardInitialized extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INITIALIZED";
    readonly payload: DashboardInitializedPayload;
}

/**
 * Payload of the {@link DashboardInitialized} event.
 * @public
 */
export declare interface DashboardInitializedPayload {
    /**
     * Loaded dashboard.
     */
    readonly dashboard?: IDashboard;
    /**
     * Insights used on the dashboard.
     */
    readonly insights: ReadonlyArray<IInsight>;
    /**
     * Configuration in effect for the dashboard.
     *
     * @remarks
     * If the config was provided via props, then
     * that same config is sent here. If there was no config in props, then the dashboard component load resolved
     * all the config and includes it here.
     */
    readonly config: DashboardConfig;
    /**
     * Permissions in effect for the dashboard.
     *
     * @remarks
     * If the permissions were provided via props, then those
     * same permissions are included here. Otherwise the dashboard will load the permissions and include it here.
     */
    readonly permissions: IWorkspacePermissions;
}

/**
 * @internal
 */
export declare const DashboardInsight: (props: IDashboardInsightProps) => JSX.Element;

/**
 * @internal
 */
export declare const DashboardInsightMenu: (props: IDashboardInsightMenuProps) => JSX.Element;

/**
 * @internal
 */
export declare const DashboardInsightMenuButton: (props: IDashboardInsightMenuButtonProps) => JSX.Element;

/**
 * @internal
 */
export declare const DashboardInsightMenuTitle: (props: IDashboardInsightMenuTitleProps) => JSX.Element;

/**
 * This event is emitted after any change to Insight Widget configuration. It contains the entire new state of the
 * Insight Widget.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.WIDGET_CHANGED";
    readonly payload: DashboardInsightWidgetChangedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetChanged} event.
 * @beta
 */
export declare interface DashboardInsightWidgetChangedPayload {
    /**
     * The entire definition of the insight widget after the change.
     */
    insightWidget: IInsightWidget | IInsightWidgetDefinition;
}

/**
 * This event is emitted when the description of an insight widget changed. The new value of the description (summary)
 * is included in the event.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetDescriptionChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.DESCRIPTION_CHANGED";
    readonly payload: DashboardInsightWidgetDescriptionChangedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetDescriptionChanged} event.
 * @beta
 */
export declare interface DashboardInsightWidgetDescriptionChangedPayload {
    /**
     * Reference to Insight Widget that was changed.
     */
    readonly ref: ObjRef;
    /**
     * New widget description that is now used on the widget.
     */
    readonly description: WidgetDescription;
}

/**
 * This event is emitted when the insight widget's drill definitions change. The change may include
 * addition or change of drill definition for one or more drillable measures.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetDrillsModified extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_MODIFIED";
    readonly payload: DashboardInsightWidgetDrillsModifiedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetDrillsModified} event.
 * @beta
 */
export declare interface DashboardInsightWidgetDrillsModifiedPayload {
    /**
     * Reference to Insight Widget that was changed.
     */
    readonly ref: ObjRef;
    /**
     * Drill definitions that were newly added. There will be at most one drill definition for drillable
     * measure.
     */
    readonly added: DrillDefinition[];
    /**
     * Drill definitions that were updated. For each measure that was already set up with a drill definition,
     * there will be the new drill definition.
     */
    readonly updated: DrillDefinition[];
}

/**
 * This event is emitted when the insight widget's drill definitions are removed. The measures for which
 * the drill definitions were set up will no longer be clickable.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetDrillsRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_REMOVED";
    readonly payload: DashboardInsightWidgetDrillsRemovedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetDrillsRemoved} event.
 * @beta
 */
export declare interface DashboardInsightWidgetDrillsRemovedPayload {
    /**
     * Reference to Insight Widget that was changed.
     */
    readonly ref: ObjRef;
    /**
     * Drill definitions that were removed.
     */
    readonly removed: DrillDefinition[];
}

/**
 * This event is emitted after export of an insight widget is requested.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetExportRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_REQUESTED";
    readonly payload: DashboardInsightWidgetExportRequestedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetExportRequested} event.
 * @beta
 */
export declare interface DashboardInsightWidgetExportRequestedPayload {
    /**
     * Reference to the Insight to be exported.
     */
    readonly ref: ObjRef;
    /**
     * Additional configuration of the export.
     */
    readonly config: IExportConfig;
}

/**
 * This event is emitted after export of an insight widget is resolved.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetExportResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_RESOLVED";
    readonly payload: DashboardInsightWidgetExportResolvedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetExportResolved} event.
 * @beta
 */
export declare interface DashboardInsightWidgetExportResolvedPayload {
    /**
     * URI of the resulting file that can be used to download it.
     */
    resultUri: string;
    /**
     * Collection of information used to download the resulting file.
     */
    result: IExportResult;
}

/**
 * This event is emitted when the insight widget's filter settings change.
 *
 * Filter settings influence what date dataset to use for filter or which of the dashboard's attribute filters
 * should be used for the widget. A change of filter settings means the insight rendered in the widget will
 * be re-rendered.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetFilterSettingsChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.FILTER_SETTINGS_CHANGED";
    readonly payload: DashboardInsightWidgetFilterSettingsChangedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetFilterSettingsChanged} event.
 * @beta
 */
export declare interface DashboardInsightWidgetFilterSettingsChangedPayload {
    /**
     * Reference to Insight Widget that was changed.
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
 * This event is emitted when the header of an insight widget changed. The new value of the header (title)
 * is included in the event.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetHeaderChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.HEADER_CHANGED";
    readonly payload: DashboardInsightWidgetHeaderChangedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetHeaderChanged} event.
 * @beta
 */
export declare interface DashboardInsightWidgetHeaderChangedPayload {
    /**
     * Reference to Insight Widget that was changed.
     */
    readonly ref: ObjRef;
    /**
     * New widget header that is now used on the widget.
     */
    readonly header: WidgetHeader;
}

/**
 * This event is emitted when the insight rendered inside an insight widget gets switched for another one.
 *
 * That essentially means the insight widget now renders a different visualization
 *
 * @beta
 */
export declare interface DashboardInsightWidgetInsightSwitched extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.INSIGHT_SWITCHED";
    readonly payload: DashboardInsightWidgetInsightSwitchedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetInsightSwitched} event.
 * @beta
 */
export declare interface DashboardInsightWidgetInsightSwitchedPayload {
    /**
     * Reference to Insight Widget that was changed.
     */
    readonly ref: ObjRef;
    /**
     * The new insight that is now rendered for the widget.
     */
    readonly insight: IInsight;
}

/**
 * This event is emitted after an insight widget is refreshed.
 *
 * @beta
 */
export declare interface DashboardInsightWidgetRefreshed extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.REFRESHED";
    readonly payload: DashboardInsightWidgetRefreshedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetRefreshed} event.
 * @beta
 */
export declare interface DashboardInsightWidgetRefreshedPayload {
    /**
     * The new value of the insight.
     */
    insight: IInsight;
}

/**
 * This event is emitted when the insight widget's visualization configuration change.
 *
 * The configuration specified influence how the insight rendered in the widget appears visually
 *
 * @beta
 */
export declare interface DashboardInsightWidgetVisConfigurationChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.CONFIGURATION_CHANGED";
    readonly payload: DashboardInsightWidgetVisConfigurationChangedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetVisPropertiesChanged} event.
 * @beta
 */
export declare interface DashboardInsightWidgetVisConfigurationChangedPayload {
    /**
     * Reference to Insight Widget that was changed.
     */
    readonly ref: ObjRef;
    /**
     * New visualization config that are now in effect for the insight widget. These config
     * will be merged with the config defined on the insight itself. They will influence how the
     * insight visually appears.
     *
     * Will be undefined if there are no widget-level visualization config set for the particular
     * insight widget.
     */
    readonly newConfig: IInsightWidgetConfiguration | undefined;
    /**
     * Previous visualization config to detect what has been changed if this info needed.
     */
    readonly oldConfig: IInsightWidgetConfiguration | undefined;
}

/**
 * This event is emitted when the insight widget's visualization properties change.
 *
 * The properties specified influence how the insight rendered in the widget appears visually (legend, tooltips,
 * axes, etc)
 *
 * @beta
 */
export declare interface DashboardInsightWidgetVisPropertiesChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.INSIGHT_WIDGET.PROPERTIES_CHANGED";
    readonly payload: DashboardInsightWidgetVisPropertiesChangedPayload;
}

/**
 * Payload of the {@link DashboardInsightWidgetVisPropertiesChanged} event.
 * @beta
 */
export declare interface DashboardInsightWidgetVisPropertiesChangedPayload {
    /**
     * Reference to Insight Widget that was changed.
     */
    readonly ref: ObjRef;
    /**
     * New visualization properties that are now in effect for the insight widget. These properties
     * will be merged with the properties defined on the insight itself. They will influence how the
     * insight visually appears.
     *
     * Will be undefined if there are no widget-level visualization properties set for the particular
     * insight widget.
     */
    readonly properties: VisualizationProperties | undefined;
}

/**
 * Definition of items that may be placed into the dashboard sections.
 *
 * @beta
 */
export declare type DashboardItemDefinition = ExtendedDashboardItem<ExtendedDashboardWidget | IWidgetDefinition | ICustomWidgetDefinition> | StashedDashboardItemsId;

/**
 * @internal
 */
export declare const DashboardKpi: (props: IDashboardKpiProps) => JSX.Element;

/**
 * This event is emitted after any change to KPI Widget configuration. It contains the entire new state of the
 * KPI Widget.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.WIDGET_CHANGED";
    readonly payload: DashboardKpiWidgetChangedPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetChanged} event.
 * @beta
 */
export declare interface DashboardKpiWidgetChangedPayload {
    /**
     * The new value of the changed widget.
     */
    kpiWidget: IKpiWidget | IKpiWidgetDefinition;
}

/**
 * This event is emitted when dashboard's KPI Widget has its comparison type changed. The event includes
 * the new definition of the KPI that has uses same measure as before however has new setup of the over-time
 * comparison.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetComparisonChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.COMPARISON_CHANGED";
    readonly payload: DashboardKpiWidgetComparisonChangedPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetComparisonChanged} event.
 * @beta
 */
export declare interface DashboardKpiWidgetComparisonChangedPayload {
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
 * This event is emitted when the dashboard's KPI Widget configuration is modified.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetConfigurationChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.CONFIGURATION_CHANGED";
    readonly payload: DashboardKpiWidgetConfigurationChangedPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetConfigurationChanged} event.
 * @beta
 */
export declare interface DashboardKpiWidgetConfigurationChangedPayload {
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
 * This event is emitted when the dashboard's KPI Widget description is modified.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetDescriptionChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.DESCRIPTION_CHANGED";
    readonly payload: DashboardKpiWidgetDescriptionChangedPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetDescriptionChanged} event.
 * @beta
 */
export declare interface DashboardKpiWidgetDescriptionChangedPayload {
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
 * This event is emitted when dashboard's KPI Widget has its drills removed.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetDrillRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.DRILL_REMOVED";
    readonly payload: DashboardKpiWidgetDrillRemovedPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetDrillRemoved} event.
 * @beta
 */
export declare interface DashboardKpiWidgetDrillRemovedPayload {
    /**
     * Reference to changed KPI Widget.
     */
    readonly ref: ObjRef;
}

/**
 * This event is emitted when dashboard's KPI Widget has its drill set.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetDrillSet extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.DRILL_SET";
    readonly payload: DashboardKpiWidgetDrillSetPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetDrillSet} event.
 * @beta
 */
export declare interface DashboardKpiWidgetDrillSetPayload {
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
 * This event is emitted when dashboard's KPI Widget filter settings are modified.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetFilterSettingsChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.FILTER_SETTINGS_CHANGED";
    readonly payload: DashboardKpiWidgetFilterSettingsChangedPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetFilterSettingsChanged} event.
 * @beta
 */
export declare interface DashboardKpiWidgetFilterSettingsChangedPayload {
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
 * This event is emitted when the dashboard's KPI Widget header is modified.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetHeaderChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.HEADER_CHANGED";
    readonly payload: DashboardKpiWidgetHeaderChangedPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetHeaderChanged} event.
 * @beta
 */
export declare interface DashboardKpiWidgetHeaderChangedPayload {
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
 * This event is emitted when the dashboard's KPI Widget measure is modified - the KPI now shows value for
 * different measure. The change of measure to use may be accompanied with a change of the KPI header (change of
 * title). In that case new value of header is also included in the event.
 *
 * @beta
 */
export declare interface DashboardKpiWidgetMeasureChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.KPI_WIDGET.MEASURE_CHANGED";
    readonly payload: DashboardKpiWidgetMeasureChangedPayload;
}

/**
 * Payload of the {@link DashboardKpiWidgetMeasureChanged} event.
 * @beta
 */
export declare interface DashboardKpiWidgetMeasureChangedPayload {
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
 * @internal
 */
export declare const DashboardLayout: (props: IDashboardLayoutProps) => JSX.Element;

/**
 * This event is emitted after any change to the dashboard layout and will include the entire new layout.
 *
 * @beta
 */
export declare interface DashboardLayoutChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.LAYOUT_CHANGED";
    readonly payload: DashboardLayoutChangedPayload;
}

/**
 * Payload of the {@link DashboardLayoutChanged} event.
 * @beta
 */
export declare interface DashboardLayoutChangedPayload {
    /**
     * Layout after the change.
     */
    readonly layout: IDashboardLayout<ExtendedDashboardWidget>;
}

/**
 * @beta
 */
export declare type DashboardLayoutCommands = AddLayoutSection | MoveLayoutSection | RemoveLayoutSection | ChangeLayoutSectionHeader | AddSectionItems | MoveSectionItem | RemoveSectionItem | RemoveSectionItemByWidgetRef | ResizeHeight;

/**
 * This event is emitted when a new dashboard layout section is added.
 *
 * @beta
 */
export declare interface DashboardLayoutSectionAdded extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ADDED";
    readonly payload: DashboardLayoutSectionAddedPayload;
}

/**
 * Payload of the {@link DashboardLayoutSectionAdded} event.
 * @beta
 */
export declare interface DashboardLayoutSectionAddedPayload {
    /**
     * The new section.
     */
    readonly section: ExtendedDashboardLayoutSection;
    /**
     * Index of the new section among other sections in the layout.
     *
     * Index is zero-based.
     */
    readonly index: number;
}

/**
 * This event is emitted when dashboard layout section changes.
 *
 * @beta
 */
export declare interface DashboardLayoutSectionHeaderChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_HEADER_CHANGED";
    readonly payload: DashboardLayoutSectionHeaderChangedPayload;
}

/**
 * Payload of the {@link DashboardLayoutSectionHeaderChanged} event.
 * @beta
 */
export declare interface DashboardLayoutSectionHeaderChangedPayload {
    /**
     * The new header of the section.
     */
    readonly newHeader: IDashboardLayoutSectionHeader;
    /**
     * Index of the section which had the header updated.
     */
    readonly sectionIndex: number;
}

/**
 * This event is emitted when a dashboard item is moved between sections or within a section.
 *
 * @beta
 */
export declare interface DashboardLayoutSectionItemMoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED";
    readonly payload: DashboardLayoutSectionItemMovedPayload;
}

/**
 * Payload of the {@link DashboardLayoutSectionItemMoved} event.
 * @beta
 */
export declare interface DashboardLayoutSectionItemMovedPayload {
    /**
     * Item that was moved.
     */
    readonly item: ExtendedDashboardItem;
    /**
     * Index of section from which the item was moved.
     */
    readonly fromSectionIndex: number;
    /**
     * Index of section to which the item was moved.
     *
     * This may be the same as `fromSectionIndex` - which means the move happened within the same section.
     */
    readonly toSectionIndex: number;
    /**
     * Index within the `fromSection` from where the item was moved.
     */
    readonly fromIndex: number;
    /**
     * Index in `toSection` at which the item was inserted.
     */
    readonly toIndex: number;
    /**
     * Indicate, that original section has been removed.
     */
    readonly originalSectionRemoved: boolean;
}

/**
 * This event is emitted when an item is removed from dashboard layout section.
 *
 * @beta
 */
export declare interface DashboardLayoutSectionItemRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REMOVED";
    readonly payload: DashboardLayoutSectionItemRemovedPayload;
}

/**
 * Payload of the {@link DashboardLayoutSectionItemRemoved} event.
 * @beta
 */
export declare interface DashboardLayoutSectionItemRemovedPayload {
    /**
     * Item that was removed.
     */
    readonly item: ExtendedDashboardItem;
    /**
     * Index where the item resided.
     */
    readonly itemIndex: number;
    /**
     * If the removal was eager and removed the entire section, then that section is included here.
     *
     * NOTE: the {@link DashboardLayoutSectionRemoved} will be fired at the occasion as well.
     */
    readonly section?: ExtendedDashboardLayoutSection;
    /**
     * If the removal indicated to stash the item, then the stash identifier is mirrored here.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
}

/**
 * This event is emitted when an item in a dashboard section is replaced.
 * @beta
 */
export declare interface DashboardLayoutSectionItemReplaced extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REPLACED";
    readonly payload: DashboardLayoutSectionItemReplacedPayload;
}

/**
 * Payload of the {@link DashboardLayoutSectionItemReplaced} event.
 * @beta
 */
export declare interface DashboardLayoutSectionItemReplacedPayload {
    /**
     * Index of section where the replacement happened.
     */
    readonly sectionIndex: number;
    /**
     * Index of item within the section that was replaced.
     */
    readonly itemIndex: number;
    /**
     * New item definition.
     */
    readonly items: ReadonlyArray<ExtendedDashboardItem>;
    /**
     * Item that was replaced
     */
    readonly previousItem: ExtendedDashboardItem;
    /**
     * If the replacement specified to stash the old item, then the identifier of the
     * stash is included here.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
}

/**
 * This event is emitted when items are added to a dashboard section.
 *
 * @beta
 */
export declare interface DashboardLayoutSectionItemsAdded extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEMS_ADDED";
    readonly payload: DashboardLayoutSectionItemsAddedPayload;
}

/**
 * Payload of the {@link DashboardLayoutSectionItemsAdded} event.
 * @beta
 */
export declare interface DashboardLayoutSectionItemsAddedPayload {
    /**
     * Index of the section to which the items were added.
     */
    readonly sectionIndex: number;
    /**
     * Index within the section at which the items were inserted.
     */
    readonly startIndex: number;
    /**
     * Items that were inserted.
     */
    readonly itemsAdded: ReadonlyArray<ExtendedDashboardItem>;
    /**
     * If the items from one or more stashes were added and the stashes were cleared, the the list of
     * stash identifiers will be included here.
     */
    readonly stashesUsed?: ReadonlyArray<StashedDashboardItemsId>;
}

/**
 * This event is emitted when a dashboard layout section is moved from one place to another.
 *
 * @beta
 */
export declare interface DashboardLayoutSectionMoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_MOVED";
    readonly payload: DashboardLayoutSectionMovedPayload;
}

/**
 * Payload of the {@link DashboardLayoutSectionMoved} event.
 * @beta
 */
export declare interface DashboardLayoutSectionMovedPayload {
    /**
     * The section moved.
     */
    readonly section: ExtendedDashboardLayoutSection;
    /**
     * Index from which the section was moved.
     */
    readonly fromIndex: number;
    /**
     * Zero-based index to which the section was moved.
     */
    readonly toIndex: number;
}

/**
 * This event is emitted when a dashboard layout section is removed from the layout.
 *
 * Note: this event will be emitted also when the section is removed as part of eager removal of
 * its items. E.g. item is removed, it is last item in the section, and the whole section is removed
 * as well.
 *
 * @beta
 */
export declare interface DashboardLayoutSectionRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_REMOVED";
    readonly payload: DashboardLayoutSectionRemovedPayload;
}

/**
 * Payload of the {@link DashboardLayoutSectionRemoved} event.
 * @beta
 */
export declare interface DashboardLayoutSectionRemovedPayload {
    /**
     * Section that was removed.
     *
     * Note: when the section is eagerly removed, it's items will be empty.
     */
    readonly section: ExtendedDashboardLayoutSection;
    /**
     * Index where the section originally resided.
     */
    readonly index: number;
    /**
     * Indicates that the section was removed as part of eager removal of the section items.
     */
    readonly eagerRemoval?: boolean;
    /**
     * If the remove command indicated to stash the items for later reuse, then the stash identifier
     * provided on the command is mirrored here.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
}

/**
 * @beta
 */
export declare interface DashboardMetaState {
    /**
     * This property contains current state of the dashboard's descriptive metadata. This descriptor can
     * be modified by the dashboard component and the new values will be used during save.
     */
    descriptor?: DashboardDescriptor;
    /**
     * This property contains the IDashboard object that is persisted on the backend and that is used
     * to derive the rest of the dashboard state in the component.
     *
     * The persisted dashboard is updated only during the initial load or during SaveDashboard or
     * SaveAsDashboard command processing (which essentially flush the current dashboard state to backend)
     */
    persistedDashboard?: IDashboard;
}

/**
 * @public
 */
export declare interface DashboardModelCustomizationFns {
    /**
     * Provide a function that will be used during dashboard initialization of an existing dashboard.
     *
     * @remarks
     * This function will be called after the dashboard is loaded from backend and before it is dispatched for
     * cleanup, sanitization and storage in the Dashboard component state.
     *
     * -  If the function is not defined, results in an error or returns `undefined`, then the original
     *    dashboard will be used as-is.
     */
    existingDashboardTransformFn?: DashboardTransformFn;
}

/**
 * @public
 */
export declare interface DashboardPermissionsState {
    /** @beta */
    dashboardPermissions?: IDashboardPermissions;
}

/**
 * Basic set of information about a Dashboard plugin.
 *
 * @public
 */
export declare interface DashboardPluginDescriptor {
    /**
     * Author of the plugin.
     *
     * @remarks
     * This should ideally contain name and contact (email) for the author.
     */
    readonly author: string;
    /**
     * Specify human-readable name of the plugin.
     */
    readonly displayName: string;
    /**
     * Version of the plugin.
     *
     * @remarks
     * At this point, the version is included for diagnostic purposes. It may
     * be whatever string the author sees fit. We recommend, however, to use semantic versioning.
     */
    readonly version: string;
    /**
     * Specify human-readable short description of the plugin.
     *
     * @remarks
     * This is typically a one- or two-line description of the plugin, what it brings, what it does.
     */
    readonly shortDescription?: string;
    /**
     * Human-readable long description of the plugin.
     */
    readonly longDescription?: string;
    /**
     * Developer-assigned name of the plugin that will be used.
     *
     * @remarks
     * If not specified the debug name falls back to display name.
     */
    readonly debugName?: string;
    /**
     * Minimum version of dashboard engine that this plugin supports.
     *
     * @remarks
     * Value can be "bundled" - then the minimum required version of the engine equals to the bundled one.
     * Another option is to specify exact minimum version of the SDK - e.g. "8.7.0".
     */
    readonly minEngineVersion: string;
    /**
     * Greatest version of the dashboard engine that this plugin supports.
     *
     * @remarks
     * Value can be "bundled" - then the maximum possible version of the engine equals to the bundled one.
     * Another option is to specify exact maximum version of the SDK - e.g. "8.8.0".
     */
    readonly maxEngineVersion?: string;
}

/**
 * Abstract base class for the Dashboard Plugin.
 *
 * @remarks
 * Each plugin should extend this class and implement at least the {@link DashboardPluginV1.register} method.
 *
 * @public
 */
export declare abstract class DashboardPluginV1 implements IDashboardPluginContract_V1 {
    readonly _pluginVersion = "1.0";
    readonly minEngineVersion: string;
    readonly maxEngineVersion?: string;
    abstract readonly author: string;
    abstract readonly displayName: string;
    abstract readonly version: string;
    abstract register(ctx: DashboardContext, customize: IDashboardCustomizer, handlers: IDashboardEventHandling): void;
}

/**
 * @alpha
 */
export declare type DashboardQueries = QueryInsightDateDatasets | QueryMeasureDateDatasets | QueryInsightAttributesMeta | QueryWidgetFilters | QueryWidgetBrokenAlerts | QueryWidgetAlertCount | QueryConnectingAttributes | QueryAttributeByDisplayForm | QueryAttributeDataSet | QueryAttributeElements;

/**
 * This event is emitted when query processing completes with success. Both the query payload and the result are
 * included.
 *
 * @beta
 */
export declare interface DashboardQueryCompleted<TQuery extends IDashboardQuery, TResult> extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.QUERY.COMPLETED";
    readonly payload: DashboardQueryCompletedPayload<TQuery, TResult>;
}

/**
 * Payload of the {@link DashboardQueryCompleted} event.
 * @beta
 */
export declare interface DashboardQueryCompletedPayload<TQuery extends IDashboardQuery, TResult> {
    /**
     * The query that was run to get the given result.
     */
    readonly query: TQuery;
    /**
     * The result of the query.
     */
    readonly result: TResult;
}

/**
 * This event is emitted if a particular query processing fails. The failure may be for two general reasons:
 *
 * -  A user error was made; dispatched query is found to have bad payload or the dispatched query is not applicable
 *    in the current state of the dashboard
 *
 * -  An internal error has occurred in the dashboard component - highly likely due to a bug.
 *
 * @beta
 */
export declare interface DashboardQueryFailed extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.QUERY.FAILED";
    readonly payload: DashboardQueryFailedPayload;
}

/**
 * Payload of the {@link DashboardQueryFailed} event.
 * @beta
 */
export declare interface DashboardQueryFailedPayload {
    /**
     * Reason for the failure.
     */
    readonly reason: ActionFailedErrorReason;
    /**
     * Message explaining the nature of the failure.
     */
    readonly message: string;
    /**
     * Error that has occurred and caused the command to fail.
     */
    readonly error?: Error;
}

/**
 * This event is emitted when the submitted query has been rejected by the dashboard component because it does
 * not know how to handle the query.
 *
 * @beta
 */
export declare interface DashboardQueryRejected extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.QUERY.REJECTED";
}

/**
 * This event is emitted when query processing starts.
 *
 * @beta
 */
export declare interface DashboardQueryStarted extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.QUERY.STARTED";
    readonly payload: DashboardQueryStartedPayload;
}

/**
 * Payload of the {@link DashboardQueryStarted} event.
 * @beta
 */
export declare interface DashboardQueryStartedPayload {
    /**
     * The query that is starting to be run.
     */
    readonly query: IDashboardQuery;
}

/**
 * @beta
 */
export declare type DashboardQueryType = "GDC.DASH/QUERY.INSIGHT.DATE.DATASETS" | "GDC.DASH/QUERY.INSIGHT.ATTRIBUTE.META" | "GDC.DASH/QUERY.MEASURE.DATE.DATASETS" | "GDC.DASH/QUERY.WIDGET.FILTERS" | "GDC.DASH/QUERY.WIDGET.BROKEN_ALERTS" | "GDC.DASH/QUERY.WIDGET.ALERT_COUNT" | "GDC.DASH/QUERY.CONNECTING.ATTRIBUTES" | "GDC.DASH/QUERY.DISPLAY.FORM.ATTRIBUTE" | "GDC.DASH/QUERY.DATA.SET.ATTRIBUTE" | "GDC.DASH/QUERY.ELEMENTS.ATTRIBUTE";

/**
 * This event is emitted at the end of successful 'dashboard rename' command processing. At this point, only the
 * in-memory title is changed and the changes are not saved on the backend.
 *
 * @beta
 */
export declare interface DashboardRenamed extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENAMED";
    readonly payload: DashboardRenamedPayload;
}

/**
 * Payload of the {@link DashboardRenamed} event.
 * @beta
 */
export declare interface DashboardRenamedPayload {
    /**
     * The new title of the dashboard.
     */
    readonly newTitle: string;
}

/**
 * This event is emitted after render mode change.
 *
 * @beta
 */
export declare interface DashboardRenderModeChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER_MODE.CHANGED";
    readonly payload: DashboardRenderModeChangedPayload;
}

/**
 * Payload of the {@link DashboardRenderModeChanged} event.
 * @beta
 */
export declare interface DashboardRenderModeChangedPayload {
    /**
     * Current render mode value
     */
    renderMode: RenderMode;
}

/**
 * This event is emitted as soon as the dashboard component is mounted,
 * and rendering of its content started.
 *
 * @public
 */
export declare interface DashboardRenderRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER.REQUESTED";
}

/**
 * @public
 */
export declare interface DashboardRenderResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER.RESOLVED";
}

/**
 * This event is emitted at the end of successful dashboard save command processing. At this point, the
 * dashboard state is persisted on the backend.
 *
 * @public
 */
export declare interface DashboardSaved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.SAVED";
    readonly payload: DashboardSavedPayload;
}

/**
 * Payload of the {@link DashboardSaved} event.
 * @public
 */
export declare interface DashboardSavedPayload {
    /**
     * Definition of the saved dashboard.
     */
    readonly dashboard: IDashboard;
    /**
     * If true, this was the initial save and thus a new dashboard object was created.
     * If false, an existing dashboard was updated.
     */
    readonly newDashboard: boolean;
}

/**
 * This event is emitted after the scheduled email is successfully created.
 *
 * @beta
 */
export declare interface DashboardScheduledEmailCreated extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.SCHEDULED_EMAIL.CREATED";
    readonly payload: DashboardScheduledEmailCreatedPayload;
}

/**
 * Payload of the {@link DashboardScheduledEmailCreated} event.
 * @beta
 */
export declare interface DashboardScheduledEmailCreatedPayload {
    /**
     * The scheduled email created.
     */
    readonly scheduledEmail: IScheduledMail;
}

/**
 * This event is emitted after the scheduled email is successfully saved.
 *
 * @beta
 */
export declare interface DashboardScheduledEmailSaved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED";
}

/**
 * Function that selects part of the Dashboard state.
 *
 * @public
 */
export declare type DashboardSelector<TResult> = (state: DashboardState) => TResult;

/**
 * Type of a callback that evaluates a selector function against the Dashboard state
 *
 * @public
 */
export declare type DashboardSelectorEvaluator = <TResult>(selector: DashboardSelector<TResult>) => TResult;

/**
 * This event is emitted at the end of successful 'change sharing status of dashboard' command processing.
 *
 * @public
 */
export declare interface DashboardSharingChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.SHARING.CHANGED";
    readonly payload: DashboardSharingChangedPayload;
}

/**
 * Payload of the {@link DashboardSharingChanged} event.
 * @public
 */
export declare interface DashboardSharingChangedPayload {
    /**
     * New properties related to the sharing.
     */
    newSharingProperties: ISharingProperties;
}

/**
 * Layout of the dashboard component's state. State modifications are always done using Command API. Reading
 * from state must always be done using the Selectors API.
 *
 * Accessing state props directly is dangerous practice. We reserve the rights to refactor and otherwise break
 * the shape of the state at any time while keeping the Selectors and Command APIs stable.
 *
 * @public
 */
export declare interface DashboardState {
    /** @beta */
    loading: LoadingState;
    saving: SavingState;
    backendCapabilities: BackendCapabilitiesState;
    config: ConfigState;
    /** @beta */
    entitlements: EntitlementsState;
    permissions: PermissionsState;
    filterContext: FilterContextState;
    /** @alpha */
    layout: LayoutState;
    /** @beta */
    dateFilterConfig: DateFilterConfigState;
    catalog: CatalogState;
    user: UserState;
    /** @beta */
    meta: DashboardMetaState;
    /** @beta */
    drill: DrillState;
    legacyDashboards: LegacyDashboardsState;
    /** @beta */
    insights: EntityState<IInsight>;
    /** @beta */
    alerts: EntityState<IWidgetAlert>;
    /** @alpha */
    drillTargets: EntityState<IDrillTargets>;
    /** @beta */
    listedDashboards: EntityState<IListedDashboard>;
    /** @beta */
    accessibleDashboards: EntityState<IListedDashboard>;
    /** @alpha */
    inaccessibleDashboards: EntityState<IInaccessibleDashboard>;
    dashboardPermissions: DashboardPermissionsState;
    /**
     * State controlling how exactly the dashboard is rendered.
     * @beta
     */
    renderMode: RenderModeState;
    /**
     * Ui state controllable from the outside.
     * @beta
     */
    ui: UiState;
    /**
     * Part of state where execution results of the individual widgets are stored.
     * @beta
     */
    executionResults: EntityState<IExecutionResultEnvelope>;
    /**
     * Part of state where the different dashboard component queries may cache their results.
     *
     * @internal
     */
    _queryCache: {
        [queryName: string]: any;
    };
}

/**
 * Callback called whenever the Dashboard's internal state changes.
 *
 * @param state - the new value of the state
 * @param dispatch - the new dispatcher function that can be used to dispatch commands
 *
 * @public
 */
export declare type DashboardStateChangeCallback = (state: DashboardState, dispatch: DashboardDispatch) => void;

/**
 * This class serves the selector and the dispatcher properties of the dashboard component state.
 *
 * @remarks
 * The {@link Dashboard} component has an optional property {@link IDashboardProps#onStateChange} through which
 * you can handle set the values for {@link DashboardDispatch} and {@link DashboardSelectorEvaluator}.
 *
 *
 * In your component using {@link Dashboard} you can create and instance of the {@link DashboardStoreAccessor} object
 * and use it like in the example below. The example shows the accessor's usage as well. There is a need to check
 * the select and dispatch object existence.
 *
 * See {@link DashboardStoreAccessorRepository} on possible way how to use the store accessor.
 *
 * To get latest properties, use static member function {@link DashboardStoreAccessor#getInstance}. If there is already an instance
 * created, it will return this instance and will return new instance of the {@link DashboardStoreAccessor} otherwise.
 *
 * @public
 */
export declare class DashboardStoreAccessor {
    selectorEvaluator: DashboardSelectorEvaluator | undefined;
    dispatch: DashboardDispatch | undefined;
    constructor(selector: DashboardSelectorEvaluator, dispatch: DashboardDispatch);
    /**
     * Returns current selector for the dashboard's component state.
     */
    getDashboardSelect: () => DashboardSelectorEvaluator;
    /**
     * Setter for the dashboard's component state selector.
     * @param selectorEvaluator - dashboardSelectorEvaluator
     */
    private setSelector;
    /**
     * Returns current dispatch object for the dashboard component state.
     */
    getDashboardDispatch: () => DashboardDispatch;
    /**
     * Setter for the dashboard's component state dispatch.
     * @param dispatch - dashboardDispatch
     */
    private setDispatch;
    /**
     * Checks if {@link DashboardStoreAccessor} is fully initialized.
     */
    isDashboardStoreAccessorInitialized: () => boolean;
    /**
     * Callback to be passed as {@link Dashboard} component {@link Dashboard#onStateChange} property to set
     * {@link DashboardStoreAccessor#selectorEvaluator} and {@link DashboardStoreAccessor#dispatch} to handle Dashboard component state from outside of the
     * component.
     *
     * @param state - {@link DashboardState} object.
     * @param dispatch - {@link DashboardDispatch} object.
     */
    setSelectAndDispatch: (state: DashboardState, dispatch: DashboardDispatch) => void;
}

/**
 * This singleton class serves the selector and the dispatcher properties for given dashboard.
 *
 * @remarks
 * The {@link Dashboard} component has an optional property {@link IDashboardProps#onStateChange} through which
 * you can handle setting of the values for {@link DashboardDispatch} and {@link DashboardSelectorEvaluator}.
 *
 *
 * In your component using {@link Dashboard} you can create an onStateChange callback for your dashboard using
 * {@link DashboardStoreAccessorRepository#getOnChangeHandlerForDashboard} and pass it to mentioned Dashboard
 * component property.
 *
 * @example
 * ```
 *  const dashboardStoreAccessors = DashboardStoreAccessorRepository.getInstance();
 *
 *
 *  // in the code where needed
 *  dashboardStoreAccessors.getAccessorsForDashboard(<DASHBOARD_ID>).getDispatch()(
 *      changeDateFilterSelection("relative", "GDC.time.month", "-3", "0"),
 *  );
 *
 *  // or with check if accessor is initialized already
 *  if (dashboardStoreAccessors.isAccessorInitializedForDashboard(DASHBOARD_ID)) {
 *          setSelectResult(
 *              dashboardStoreAccessors.getAccessorsForDashboard(DASHBOARD_ID).getSelector()(
 *                  selectEffectiveDateFilterOptions,
 *              ),
 *          );
 *      }
 *
 *  return (
 *      <Dashboard dashboard={"<dashboardId>"} onStateChange={dashboardStoreAccessors.getOnChangeHandlerForDashboard(DASHBOARD_REF)}/>
 *  )
 * ```
 *
 * To get latest properties, use static member function {@link DashboardStoreAccessor#getInstance}. If there is already an instance
 * created, it will return this instance and will return new instance of the {@link DashboardStoreAccessor} otherwise.
 *
 * @public
 */
export declare class DashboardStoreAccessorRepository {
    private static accessors;
    private static getSerializedDashboardRef;
    /**
     * Gets the correct {@link DashboardStoreAccessor} for given dashboard from the accessors map.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static getAccessorsForDashboard(dashboard: ObjRef | string): DashboardStoreAccessor;
    /**
     * Gets the correct {@link DashboardSelectorEvaluator} for given dashboard from the accessors map.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static getDashboardSelectForDashboard(dashboard: ObjRef | string): DashboardSelectorEvaluator;
    /**
     * Gets the correct {@link DashboardDispatch} for given dashboard from the accessors map.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static getDashboardDispatchForDashboard(dashboard: ObjRef | string): DashboardDispatch;
    /**
     * Creates a {@link Dashboard#onStateChange} callback for given dashboard.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static getOnChangeHandlerForDashboard(dashboard: ObjRef | string): (state: DashboardState, dispatch: DashboardDispatch) => void;
    private static setAccessorForDashboard;
    /**
     * Removes dashboard accessors from {@link DashboardStoreAccessorRepository#accessors} for the given dashboard {@link @gooddata/sdk-model#ObjRef}.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static clearAccessorForDashboard(dashboard: ObjRef | string): void;
    /**
     * Clears all accessors saved in accessors map.
     */
    static clearAllAccessors(): void;
    /**
     * Checks if accessors is initialized for given dashboard {@link @gooddata/sdk-model#ObjRef}.
     *
     * @param dashboard -an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static isAccessorInitializedForDashboard(dashboard: ObjRef | string): boolean;
}

/**
 * @internal
 */
export declare const DashboardStoreProvider: React_2.FC<IDashboardStoreProviderProps>;

/**
 * @public
 */
export declare type DashboardTransformFn = (dashboard: IDashboard<ExtendedDashboardWidget>) => IDashboard<ExtendedDashboardWidget> | undefined;

/**
 * This event is emitted after the user interaction that cannot be tracked by other existing events
 * is triggered.
 *
 * @beta
 */
export declare interface DashboardUserInteractionTriggered extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.USER_INTERACTION.TRIGGERED";
    readonly payload: UserInteractionPayload;
}

/**
 * This event is emitted at the end of successful 'dashboard reset' command processing. At this point, the
 * dashboard is reset to the state it was after initial load.
 *
 * @beta
 */
export declare interface DashboardWasReset extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RESET";
    readonly payload: DashboardWasResetPayload;
}

/**
 * Payload of the {@link DashboardWasReset} event.
 * @beta
 */
export declare interface DashboardWasResetPayload {
    /**
     * Persisted state to which the dashboard was reset. If a new (not yet saved) dashboard was reset
     * then this property will be undefined.
     */
    dashboard?: IDashboard;
}

/**
 * @internal
 */
export declare const DashboardWidget: (props: IDashboardWidgetProps) => JSX.Element;

/**
 * This event is emitted after execution of an insight widget fails.
 *
 * @beta
 */
export declare interface DashboardWidgetExecutionFailed extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.WIDGET.EXECUTION_FAILED";
    readonly payload: DashboardWidgetExecutionFailedPayload;
}

/**
 * Payload of the {@link DashboardWidgetExecutionFailed} event.
 * @beta
 */
export declare interface DashboardWidgetExecutionFailedPayload {
    /**
     * Instance of {@link @gooddata/sdk-ui#GoodDataSdkError} with the information about the error the related execution failed with.
     */
    error: GoodDataSdkError;
    /**
     * Reference to the widget that this event relates to.
     */
    widgetRef: ObjRef;
}

/**
 * This event is emitted after execution of an insight widget starts.
 *
 * @beta
 */
export declare interface DashboardWidgetExecutionStarted extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.WIDGET.EXECUTION_STARTED";
    readonly payload: DashboardWidgetExecutionStartedPayload;
}

/**
 * Payload of the {@link DashboardWidgetExecutionStarted} event.
 * @beta
 */
export declare interface DashboardWidgetExecutionStartedPayload {
    /**
     * Reference to the widget that this event relates to.
     */
    widgetRef: ObjRef;
    /**
     * Instance of {@link @gooddata/sdk-model#IExecutionDefinition} that the widget executed.
     */
    executionDefinition: IExecutionDefinition;
}

/**
 * This event is emitted after execution of an insight widget succeeds.
 *
 * @beta
 */
export declare interface DashboardWidgetExecutionSucceeded extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.WIDGET.EXECUTION_SUCCEEDED";
    readonly payload: DashboardWidgetExecutionSucceededPayload;
}

/**
 * Payload of the {@link DashboardWidgetExecutionSucceeded} event.
 * @beta
 */
export declare interface DashboardWidgetExecutionSucceededPayload {
    /**
     * Instance of {@link @gooddata/sdk-backend-spi#IDataView} with the data the widget first requested.
     */
    dataView: IDataView;
    /**
     * Reference to the widget that this event relates to.
     */
    widgetRef: ObjRef;
}

/**
 * @public
 */
export declare type DateFilterComponentProvider = (filter: IDashboardDateFilter) => CustomDashboardDateFilterComponent;

/**
 * @beta
 */
export declare interface DateFilterConfigState {
    /**
     * Dashboard-level overrides of the workspace-level date filter config.
     */
    dateFilterConfig?: IDashboardDateFilterConfig_2;
    /**
     * The effective date filter config to use for the dashboard. This is obtained by merging the
     * workspace-level config with the dashboard-level overrides. If the merged result is valid, then it
     * is used for effective config. If the merged result is invalid, then the workspace-level config is used as
     * fallback.
     */
    effectiveDateFilterConfig?: IDateFilterConfig;
    /**
     * Indicates whether the effectiveDateFilterConfig is actually reflecting the dashboard-level config
     * overrides or it is just fallback to the workspace-level config.
     *
     * This is only true if the dashboard-level overrides are present AND their merge with workspace-level config
     * resulted in valid config.
     */
    isUsingDashboardOverrides?: boolean;
    /**
     * Warnings result of the date filter validation if any.
     *
     * @remarks
     * When loading a date filter configuration, it can have some issues that we surface (e.g. having zero visible items).
     * These are not blocking though, if any issue is encountered, the config falls back to something sane.
     * The reason for storing this here is mainly for us to be able to show a warning when some issues are detected.
     */
    dateFilterConfigValidationWarnings?: DateFilterValidationResult[];
}

/**
 * Validation result.
 *
 * @public
 */
export declare type DateFilterConfigValidationResult = "Valid" | "NoVisibleOptions" | "ConflictingIdentifiers" | "SelectedOptionInvalid";

/**
 * Payload type for {@link ChangeDateFilterSelection} command.
 *
 * @public
 */
export declare interface DateFilterSelection {
    /**
     * Indicates whether the filter should select absolute or relative values.
     *
     * @remarks
     * -  Absolute values: `from` and `to` props should be exact dates on the defined granularity
     * -  Relative values: `from` and `to` are offsets on the defined granularity
     */
    readonly type: DateFilterType;
    /**
     * Date filter granularity. For absolute dates this indicates what is the expected input format.
     *
     * @remarks
     * -  Date = MM/DD/YYYY
     * -  Month = MM/YYYY
     * -  Year = YYYY
     * -  Quarter = Q#/YYYY
     * -  Week = WW/YYYY
     */
    readonly granularity: DateFilterGranularity;
    /**
     * The start date. If absolute date filter, then `from` is the formatted start date.
     *
     * @remarks
     * If relative date filter, then `from` is offset from today.
     *
     * If not specified, then the start date is unbounded.
     *
     * See `granularity` prop for more on date format.
     */
    readonly from?: DateString | number;
    /**
     * The end date. If absolute date filter, then `to` is formatted end date.
     *
     * @remarks
     * If relative date filter, then `to` is offset from today.
     *
     * If not specified, then the end date is current date.
     *
     * See `granularity` prop for more on date format
     */
    readonly to?: DateString | number;
    /**
     * The localId of the DateFilterOption selected.
     */
    readonly dateFilterOptionLocalId?: string;
}

/**
 * This event may occur while the dashboard is handling the Load Dashboard command and is loading and validating
 * dashboard configuration from the backend.
 *
 * @remarks
 * Part of that process is obtaining workspace's Date Filter configuration. If the date filter config stored in
 * workspace has issues, then this event will occur.
 *
 * Note that this event is not a show stopper. The dashboard load will recover and fall back to a safe date
 * filter configuration.
 *
 * @public
 */
export declare interface DateFilterValidationFailed extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.VALIDATION.FAILED";
    readonly payload: DateFilterValidationFailedPayload;
}

/**
 * Payload of the {@link DateFilterValidationFailed} event.
 * @public
 */
export declare interface DateFilterValidationFailedPayload {
    /**
     * Result of the date filter validation.
     */
    readonly result: DateFilterValidationResult;
}

/**
 * @public
 */
export declare type DateFilterValidationResult = "TOO_MANY_CONFIGS" | "NO_CONFIG" | DateFilterConfigValidationResult;

/**
 * @alpha
 */
export declare const DefaultButtonBar: React_2.FC<IButtonBarProps>;

/**
 * @internal
 */
export declare function DefaultCancelButton({ isVisible, onCancelClick }: ICancelButtonProps): JSX.Element | null;

/**
 * @internal
 */
export declare const DefaultCancelEditDialog: React_2.FC<ICancelEditDialogProps>;

/**
 * Default implementation of the attribute filter to use on the dashboard's filter bar.
 *
 * This will use the SDK's AttributeFilter with the button styled same as we have it today on KD.
 *
 * @alpha
 */
export declare const DefaultDashboardAttributeFilter: (props: IDashboardAttributeFilterProps) => JSX.Element | null;

/**
 * @internal
 */
export declare function DefaultDashboardAttributeFilterComponentSetFactory(attributeFilterProvider: AttributeFilterComponentProvider): AttributeFilterComponentSet;

/**
 * Default implementation of the attribute filter to use on the dashboard's filter bar.
 *
 * This will use the SDK's DateFilter with the button styled same as we have it today on KD.
 *
 * @alpha
 */
export declare const DefaultDashboardDateFilter: (props: IDashboardDateFilterProps) => JSX.Element;

/**
 * Default implementation of the Dashboard Insight widget.
 *
 * @public
 */
export declare const DefaultDashboardInsight: ComponentType<IDashboardInsightProps_2>;

/**
 * @internal
 */
export declare function DefaultDashboardInsightComponentSetFactory(insightProvider: InsightComponentProvider): InsightWidgetComponentSet;

/**
 * @alpha
 */
export declare const DefaultDashboardInsightMenu: (props: IDashboardInsightMenuProps) => JSX.Element;

/**
 * @internal
 */
export declare const DefaultDashboardInsightMenuButton: (props: IDashboardInsightMenuButtonProps) => JSX.Element;

/**
 * @internal
 */
export declare const DefaultDashboardInsightMenuTitle: CustomDashboardInsightMenuTitleComponent;

/**
 * @internal
 */
export declare const DefaultDashboardKpi: ComponentType<IDashboardKpiProps_2>;

/**
 * @internal
 */
export declare function DefaultDashboardKpiComponentSetFactory(kpiProvider: KpiComponentProvider): KpiWidgetComponentSet;

/**
 * @internal
 */
export declare const DefaultDashboardKpiPlaceholderWidget: CustomDashboardWidgetComponent;

/**
 * @alpha
 */
export declare const DefaultDashboardLayout: (props: IDashboardLayoutProps) => JSX.Element;

/**
 * Default modifier applied to any theme passed to Dashboard component
 * @param theme - theme to modify
 * @beta
 */
export declare const defaultDashboardThemeModifier: (theme: ITheme) => ITheme;

/**
 * @internal
 */
export declare const DefaultDashboardToolbar: CustomToolbarComponent;

/**
 * @internal
 */
export declare const DefaultDashboardToolbarButton: React_2.FC<IDefaultDashboardToolbarButtonProps>;

/**
 * @internal
 */
export declare const DefaultDashboardToolbarGroup: React_2.FC<IDefaultDashboardToolbarGroupProps>;

/**
 * @internal
 */
export declare const DefaultDashboardWidget: React_2.NamedExoticComponent<IDashboardWidgetProps>;

/**
 * @internal
 */
export declare function DefaultEditButton({ isVisible, isEnabled, onEditClick }: IEditButtonProps): JSX.Element | null;

/**
 * @alpha
 */
export declare function DefaultFilterBar(props: IFilterBarProps): JSX.Element;

/**
 * Default implementation of the InsightBody.
 *
 * @alpha
 */
export declare const DefaultInsightBody: CustomInsightBodyComponent;

/**
 * @alpha
 */
export declare const DefaultLockedStatus: React_2.FC<ILockedStatusProps>;

/**
 * @alpha
 */
export declare const DefaultMenuButton: (props: IMenuButtonProps) => JSX.Element | null;

/**
 * @alpha
 */
export declare const DefaultSaveAsDialog: (props: ISaveAsDialogProps) => JSX.Element | null;

/**
 * @internal
 */
export declare function DefaultSaveAsNewButton({ isVisible, onSaveAsNewClick }: ISaveAsNewButtonProps): JSX.Element | null;

/**
 * @internal
 */
export declare function DefaultSaveButton({ isVisible, isEnabled, isSaving, buttonTitle, buttonValue, onSaveClick, }: ISaveButtonProps): JSX.Element | null;

/**
 * @alpha
 */
export declare const DefaultScheduledEmailDialog: (props: IScheduledEmailDialogProps) => JSX.Element | null;

/**
 * @alpha
 */
export declare const DefaultScheduledEmailManagementDialog: React_2.FC<IScheduledEmailManagementDialogProps>;

/**
 * @alpha
 */
export declare const DefaultShareButton: React_2.FC<IShareButtonProps>;

/**
 * @alpha
 */
export declare const DefaultShareDialog: (props: IShareDialogProps) => JSX.Element | null;

/**
 * @alpha
 */
export declare const DefaultShareStatus: React_2.FC<IShareStatusProps>;

/**
 * @alpha
 */
export declare const DefaultTitle: CustomTitleComponent;

/**
 * @alpha
 */
export declare function DefaultTopBar(props: ITopBarProps): JSX.Element;

/**
 * @beta
 */
export declare interface DeleteDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DELETE";
}

/**
 * Creates the DeleteDashboard command. Dispatching this command will result in removal of the currently
 * rendered dashboard from analytical backend and reverting the dashboard component to an 'empty' state where
 * it is initialized to create a new dashboard.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function deleteDashboard(correlationId?: string): DeleteDashboard;

/**
 * @beta
 */
export declare type DescriptionTooltipOpenedData = {
    from: DescriptionTooltipOpenedFrom;
    type: DescriptionTooltipOpenedType;
    description?: string;
};

/**
 * @beta
 */
export declare type DescriptionTooltipOpenedFrom = "kpi" | "widget" | "insight";

/**
 * @beta
 */
export declare type DescriptionTooltipOpenedPayload = UserInteractionPayloadWithDataBase<"descriptionTooltipOpened", DescriptionTooltipOpenedData>;

/**
 * @beta
 */
export declare type DescriptionTooltipOpenedType = "inherit" | "custom";

/**
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpDisableDateFilter} operation.
 *
 * Dispatching this command will result in change of Insight widget's date filter setting. The date filtering will
 * be disabled.
 *
 * @param ref - reference of the insight widget to modify
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function disableInsightWidgetDateFilter(ref: ObjRef, correlationId?: string): ChangeInsightWidgetFilterSettings;

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpDisableDateFilter} operation.
 *
 * Dispatching this command will result in change of KPI widget's date filter setting. The date filtering will
 * be disabled.
 *
 * @param ref - reference of the KPI widget to modify
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function disableKpiWidgetDateFilter(ref: ObjRef, correlationId?: string): ChangeKpiWidgetFilterSettings;

/**
 * Dispatches a command and returns a promise to wait for it to get resolved.
 *
 * @param dispatch - dashboard dispatch to use
 * @param command - command to trigger and wait for resolution of
 * @returns Promise of the command resolution
 * @alpha
 */
export declare function dispatchAndWaitFor<TCommand extends DashboardCommands, TResult>(dispatch: DashboardDispatch, command: TCommand): Promise<TResult>;

/**
 * Capability saying the component can be dragged somewhere.
 * @internal
 */
export declare type DraggableComponent = {
    dragging: AttributeFilterDraggableComponent | KpiDraggableComponent | InsightDraggableComponent | CustomDraggableComponent;
};

/**
 * @internal
 */
export declare type DraggableContentItem = AttributeFilterDraggableItem | AttributeFilterPlaceholderDraggableItem | InsightDraggableItem | InsightDraggableListItem | InsightPlaceholderDraggableItem | KpiDraggableItem | KpiPlaceholderDraggableItem | CustomWidgetDraggableItem | CustomDraggableItem;

/**
 * @internal
 */
export declare type DraggableContentItemType = "attributeFilter" | "attributeFilter-placeholder" | "insightListItem" | "insight" | "insight-placeholder" | "kpi" | "kpi-placeholder" | "custom";

/**
 * @internal
 */
export declare const DraggableCreatePanelItem: React_2.FC<IDraggableCreatePanelItemProps>;

/**
 * @internal
 */
export declare type DraggableInternalItem = HeightResizerDragItem | WidthResizerDragItem;

/**
 * @internal
 */
export declare type DraggableInternalItemType = "internal-width-resizer" | "internal-height-resizer";

/**
 * @internal
 */
export declare type DraggableItem = DraggableContentItem | DraggableInternalItem;

/**
 * @internal
 */
export declare type DraggableItemComponentTypeMapping = {
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
export declare type DraggableItemInternalTypeMapping = {
    "internal-width-resizer": WidthResizerDragItem;
    "internal-height-resizer": HeightResizerDragItem;
};

/**
 * @internal
 */
export declare type DraggableItemType = DraggableContentItemType | DraggableInternalItemType;

/**
 * @internal
 */
export declare type DraggableItemTypeMapping = DraggableItemComponentTypeMapping & DraggableItemInternalTypeMapping;

/**
 * @internal
 */
export declare type DraggableLayoutItem = InsightDraggableItem | KpiDraggableItem | CustomWidgetDraggableItem;

/**
 * @internal
 */
export declare interface DraggingComponentProps {
}

/**
 * @alpha
 */
export declare interface Drill extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL";
    readonly payload: DrillPayload;
}

/**
 * Creates the {@link Drill} command.
 * Dispatching this command will result into dispatching {@link DashboardDrillResolved} event.
 *
 * This is general dashboard drill command with details about all possible more granular drill interactions that can follow.
 * Reason for this general drill command is that it may happen that multiple drill interactions are possible for one drill event.
 *
 * Example: some attribute on the insight has drill down set and also widget has drill to insight set. Then this command must be dispatched with both
 * {@link @gooddata/sdk-ui-ext#IDrillDownDefinition} and {@link @gooddata/sdk-backend-spi#IDrillToInsight} definitions.
 *
 * - This must be always the first command that occurs after the drill interaction and must be dispatched before more granular drill commands.
 * - Specific drill commands that can follow this general drill command are: {@link DrillDown}, {@link DrillToInsight}, {@link DrillToDashboard},
 *   {@link DrillToCustomUrl}, {@link DrillToAttributeUrl}, {@link DrillToLegacyDashboard}
 *
 *
 * @alpha
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param drillContext - context in which the drill interaction was triggered (widget and insight details - if available).
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill command
 */
export declare function drill(drillEvent: IDashboardDrillEvent, drillContext: DashboardDrillContext, correlationId?: string): Drill;

/**
 * @internal
 */
export declare enum DRILL_TO_URL_PLACEHOLDER {
    PROJECT_ID = "{project_id}",
    WORKSPACE_ID = "{workspace_id}",
    INSIGHT_ID = "{insight_id}",
    WIDGET_ID = "{widget_id}",
    DASHBOARD_ID = "{dashboard_id}",
    CLIENT_ID = "{client_id}",
    DATA_PRODUCT_ID = "{data_product_id}"
}

/**
 * @alpha
 */
export declare interface DrillDown extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.DRILL_DOWN";
    readonly payload: DrillDownPayload;
}

/**
 * Creates the {@link DrillDown} command.
 * Dispatching this command will result into applying drill down definition to the provided insight (result of the drill down application
 * depends on the particular visualization type) and dispatching {@link DashboardDrillDownResolved} event that will contain it.
 *
 * In the default dashboard implementation dispatching this command will also result into opening drill dialog with the insight
 * that has this particular drill down definition applied.
 *
 * @alpha
 * @param insight - insight to which the drill down should be applied.
 * @param drillDefinition - drill definition to apply.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill down command
 */
export declare function drillDown(insight: IInsight, drillDefinition: IDrillDownDefinition, drillEvent: IDashboardDrillEvent, correlationId?: string): DrillDown;

/**
 * Payload of the {@link DrillDown} command.
 * @alpha
 */
export declare interface DrillDownPayload {
    /**
     * Insight to which the drill down should be applied.
     */
    readonly insight: IInsight;
    /**
     * Drill down definition to apply.
     */
    readonly drillDefinition: IDrillDownDefinition;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
}

/**
 * Payload of the {@link Drill} command.
 * @alpha
 */
export declare interface DrillPayload {
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
 * @beta
 */
export declare interface DrillState {
    drillableItems: ExplicitDrill[];
}

/**
 * @internal
 */
export declare interface DrillStep {
    drillEvent: IDashboardDrillEvent;
    drillDefinition: IDrillToInsight | IDrillDownDefinition;
    insight: IInsight;
}

/**
 * Widget drill targets added event
 *
 * @alpha
 */
export declare interface DrillTargetsAdded extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.DRILL_TARGETS.ADDED";
    readonly payload: DrillTargetsAddedPayload;
}

/**
 * Create DrillTargetsAdded {@link DrillTargetsAdded} event.
 *
 * @param ref - Unique widget ref
 * @param availableDrillTargets - Available widget drill targets {@link @gooddata/sdk-ui#IAvailableDrillTargets}
 * @param correlationId - correlationId
 * @returns - DrillTargetsAdded command
 *
 * @alpha
 */
export declare function drillTargetsAdded(ctx: DashboardContext, ref: ObjRef, availableDrillTargets: IAvailableDrillTargets, correlationId?: string): DrillTargetsAdded;

/**
 * Payload of the {@link DrillTargetsAdded} event.
 * @alpha
 */
export declare interface DrillTargetsAddedPayload {
    /**
     * Reference to Insight Widget
     */
    readonly ref: ObjRef;
    readonly availableDrillTargets: IAvailableDrillTargets;
}

/**
 * @alpha
 */
export declare interface DrillToAttributeUrl extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.DRILL_TO_ATTRIBUTE_URL";
    readonly payload: DrillToAttributeUrlPayload;
}

/**
 * Creates the {@link DrillToAttributeUrl} command.
 * Dispatching this command will result into resolving the target attribute url
 * and dispatching {@link DashboardDrillToAttributeUrlResolved} event that will contain it.
 *
 * For more details, see: {@link https://help.gooddata.com/pages/viewpage.action?pageId=86794855}
 *
 * @alpha
 * @param drillDefinition - drill definition with the target attribute url to resolve.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to attribute url command
 * @alpha
 */
export declare function drillToAttributeUrl(drillDefinition: IDrillToAttributeUrl, drillEvent: IDashboardDrillEvent, correlationId?: string): DrillToAttributeUrl;

/**
 * Payload of the {@link DrillToAttributeUrl} command.
 * @alpha
 */
export declare interface DrillToAttributeUrlPayload {
    /**
     * Drill definition with the attribute url to resolve.
     */
    readonly drillDefinition: IDrillToAttributeUrl;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
}

/**
 * @alpha
 */
export declare interface DrillToCustomUrl extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.DRILL_TO_CUSTOM_URL";
    readonly payload: DrillToCustomUrlPayload;
}

/**
 * Creates the {@link DrillToCustomUrl} command.
 * Dispatching this command will result into resolving the target url
 * and dispatching {@link DashboardDrillToCustomUrlResolved} event that will contain it.
 *
 * Custom url can contain various identifier or attribute title placeholders, see:
 * {@link https://help.gooddata.com/pages/viewpage.action?pageId=86794855}
 *
 * @alpha
 * @param drillDefinition - drill definition with the target url to resolve.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to custom url command
 * @alpha
 */
export declare function drillToCustomUrl(drillDefinition: IDrillToCustomUrl, drillEvent: IDashboardDrillEvent, correlationId?: string): DrillToCustomUrl;

/**
 * Payload of the {@link DrillToCustomUrl} command.
 * @alpha
 */
export declare interface DrillToCustomUrlPayload {
    /**
     * Drill definition with the custom url to resolve.
     */
    readonly drillDefinition: IDrillToCustomUrl;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
}

/**
 * @alpha
 */
export declare interface DrillToDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.DRILL_TO_DASHBOARD";
    readonly payload: DrillToDashboardPayload;
}

/**
 * Creates the {@link DrillToDashboard} command.
 * Dispatching this command will result into getting the drill intersection filters that can be applied to the target dashboard
 * and dispatching {@link DashboardDrillToDashboardResolved} event that will contain them.
 *
 * @alpha
 * @param drillDefinition - drill definition with the target dashboard.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to dashboard command
 */
export declare function drillToDashboard(drillDefinition: IDrillToDashboard, drillEvent: IDashboardDrillEvent, correlationId?: string): DrillToDashboard;

/**
 * Payload of the {@link DrillToDashboard} command.
 * @alpha
 */
export declare interface DrillToDashboardPayload {
    /**
     * Drill definition with the target dashboard.
     */
    readonly drillDefinition: IDrillToDashboard;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
}

/**
 * @alpha
 */
export declare interface DrillToInsight extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.DRILL_TO_INSIGHT";
    readonly payload: DrillToInsightPayload;
}

/**
 * Creates the {@link DrillToInsight} command.
 * Dispatching this command will result into applying the drill intersection filters to the target insight
 * and dispatching {@link DashboardDrillToInsightResolved} event that will contain it.
 *
 * In the default dashboard implementation this command will also result into opening the drill dialog with the target insight
 * that has the drill intersection filters applied.
 *
 * @alpha
 * @param drillDefinition - drill definition with the target insight.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to insight command
 */
export declare function drillToInsight(drillDefinition: IDrillToInsight, drillEvent: IDashboardDrillEvent, correlationId?: string): DrillToInsight;

/**
 * Payload of the {@link DrillToInsight} command.
 * @alpha
 */
export declare interface DrillToInsightPayload {
    /**
     * Drill definition with the target insight.
     */
    readonly drillDefinition: IDrillToInsight;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
}

/**
 * @alpha
 */
export declare interface DrillToLegacyDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.DRILL.DRILL_TO_LEGACY_DASHBOARD";
    readonly payload: DrillToLegacyDashboardPayload;
}

/**
 * Creates the {@link DrillToLegacyDashboard} command.
 * Dispatching this command will result into dispatching {@link DashboardDrillToLegacyDashboardResolved} event.
 *
 * Drill to legacy dashboard can be configured for Kpi widgets only.
 *
 * @alpha
 * @param drillDefinition - drill definition with the target dashboard.
 * @param drillEvent - original drill event, that triggered this particular drill interaction.
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns drill to legacy dashboard command
 * @alpha
 */
export declare function drillToLegacyDashboard(drillDefinition: IDrillToLegacyDashboard, drillEvent: IDashboardDrillEvent, correlationId?: string): DrillToLegacyDashboard;

/**
 * Payload of the {@link DrillToLegacyDashboard} command.
 * @alpha
 */
export declare interface DrillToLegacyDashboardPayload {
    /**
     * Drill definition with the target dashboard.
     */
    readonly drillDefinition: IDrillToLegacyDashboard;
    /**
     * Original drill event, that triggered this particular drill interaction.
     */
    readonly drillEvent: IDashboardDrillEvent;
}

/**
 * Capability saying the component can receive draggable items.
 * @internal
 */
export declare type DropTarget = {
    dropping: {
        /**
         * Component shown when item is dragged onto component.
         */
        DropTargetComponent: ComponentType<DropTargetComponentProps>;
    };
};

/**
 * @internal
 */
export declare interface DropTargetComponentProps {
}

/**
 * Creates the RemoveSectionItem configured to do eager remove of item.
 *
 * @remarks
 * Dispatching this command will result in removal
 * of the item from a section and if the section only contains that item then the whole section will be removed as well.
 *
 * You may optionally specify the stashIdentifier in order to stash the removed item for later resurrection.
 *
 * @param sectionIndex - index of section from which to remove the item
 * @param itemIndex - index of item to remove
 * @param stashIdentifier - stash identifier to store the removed item under; if not specified the item will be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function eagerRemoveSectionItem(sectionIndex: number, itemIndex: number, stashIdentifier?: StashedDashboardItemsId, correlationId?: string): RemoveSectionItem;

/**
 * Creates the RemoveSectionItemByWidgetRef configured to do eager remove of item.
 *
 * @remarks
 * Dispatching this command will result in removal
 * of the item from a section and if the section only contains that item then the whole section will be removed as well.
 *
 * You may optionally specify the stashIdentifier in order to stash the removed item for later resurrection.
 *
 * @param widgetRef - widget reference of the item to remove;
 * @param stashIdentifier - stash identifier to store the removed item under; if not specified the item will be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function eagerRemoveSectionItemByWidgetRef(widgetRef: ObjRef, stashIdentifier?: StashedDashboardItemsId, correlationId?: string): RemoveSectionItemByWidgetRef;

/**
 * @alpha
 */
export declare const EditableTitle: CustomTitleComponent;

/**
 * @internal
 */
export declare const EditButton: (props: IEditButtonProps) => JSX.Element;

/**
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpEnableDateFilter} operation.
 *
 * Dispatching this command will result in change of Insight widget's date filter setting. The date filtering will
 * be enabled and the provided date data set will be used for date-filtering widget's insight.
 *
 * @param ref - reference of the insight widget to modify
 * @param dateDataset - date data set to use for filtering the insight, if "default" is provided, the default date dataset will be resolved and used
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function enableInsightWidgetDateFilter(ref: ObjRef, dateDataset: ObjRef | "default", correlationId?: string): ChangeInsightWidgetFilterSettings;

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpEnableDateFilter} operation.
 *
 * Dispatching this command will result in change of KPI widget's date filter setting. The date filtering will
 * be enabled and the provided date data set will be used for date-filtering widget's KPI.
 *
 * @param ref - reference of the KPI widget to modify
 * @param dateDataset - date data set to use for filtering the insight, if "default" is provided, the default date dataset will be resolved and used
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function enableKpiWidgetDateFilter(ref: ObjRef, dateDataset: ObjRef | "default", correlationId?: string): ChangeKpiWidgetFilterSettings;

/**
 * @beta
 */
export declare interface EntitlementsState {
    entitlements?: ResolvedEntitlements;
}

/**
 * @beta
 */
export declare interface ExportDashboardToPdf extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.EXPORT.PDF";
}

/**
 * Creates the {@link ExportDashboardToPdf} command. Dispatching this command will result in a request to export
 * the dashboard to a PDF file. If successful, an instance of {@link DashboardExportToPdfResolved} will be emitted
 * with the URL of the resulting file.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function exportDashboardToPdf(correlationId?: string): ExportDashboardToPdf;

/**
 * @beta
 */
export declare interface ExportInsightWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.EXPORT";
    readonly payload: ExportInsightWidgetPayload;
}

/**
 * Creates the ExportInsightWidget command. Dispatching this command will result in exporting of the widget to a CSV of XLSX file.
 *
 * @param ref - reference to the Insight widget to refresh
 * @param config - configuration of the export operation
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function exportInsightWidget(ref: ObjRef, config: IExportConfig, correlationId?: string): ExportInsightWidget;

/**
 * Payload of the {@link ExportInsightWidget} command.
 * @beta
 */
export declare interface ExportInsightWidgetPayload {
    /**
     * Reference to Insight Widget to export.
     */
    readonly ref: ObjRef;
    /**
     * Options for the export.
     */
    readonly config: IExportConfig;
}

/**
 * Specialization of the IDashboardLayoutItem which also includes the extended dashboard widgets - KPI and
 * Insight placeholders.
 *
 * @public
 */
export declare type ExtendedDashboardItem<T = ExtendedDashboardWidget> = IDashboardLayoutItem<T>;

/**
 * Utility type to get the widget type from a given {@link ExtendedDashboardItem} type.
 * @public
 */
export declare type ExtendedDashboardItemType<T> = T extends ExtendedDashboardItem<infer S> ? S : never;

/**
 * Utility type to get the widget type from a given {@link ExtendedDashboardItem} array.
 * @public
 */
export declare type ExtendedDashboardItemTypes<T extends ReadonlyArray<ExtendedDashboardItem<unknown>>> = {
    [K in keyof T]: ExtendedDashboardItemType<T[K]>;
}[number];

/**
 * Dashboard layout section that can contain extended set of items - including KPI and Insight placeholders.
 *
 * @public
 */
export declare type ExtendedDashboardLayoutSection = IDashboardLayoutSection<ExtendedDashboardWidget>;

/**
 * Extension of the default {@link @gooddata/sdk-backend-spi#IWidget} type to also include view-only
 * custom widget types.
 *
 * @public
 */
export declare type ExtendedDashboardWidget = IWidget | ICustomWidget;

/**
 * Dumps debug information about a widget into a string.
 *
 * @param widget - widget to dump info from
 * @internal
 */
export declare function extendedWidgetDebugStr(widget: ExtendedDashboardWidget): string;

/**
 * @internal
 */
export declare const FilterBar: (props: IFilterBarProps) => JSX.Element;

/**
 * Mode of rendering of the FilterBar.
 *
 * @remarks
 * Its value can be:
 * - default - the filter bar will be rendered as if no rendering mode was set at all.
 * - hidden - the filter bar is hidden. Note that the filters set on the dashboard are still active, just not visible.
 *
 * @public
 */
export declare type FilterBarRenderingMode = "default" | "hidden";

/**
 * Gets {@link IDashboardFilter} items for filters specified as {@link @gooddata/sdk-backend-spi#FilterContextItem} instances.
 *
 * @param filterContextItems - filter context items to get filters for
 * @param dateDataSet - date data set to define {@link @gooddata/sdk-model#IDateFilter}
 * @public
 */
export declare function filterContextItemsToDashboardFiltersByDateDataSet(filterContextItems: FilterContextItem[], dateDataSet: ObjRef): IDashboardFilter[];

/**
 * Gets {@link IDashboardFilter} items for filters specified as {@link @gooddata/sdk-backend-spi#FilterContextItem} instances.
 *
 * @param filterContextItems - filter context items to get filters for
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export declare function filterContextItemsToDashboardFiltersByWidget(filterContextItems: FilterContextItem[], widget: Partial<IFilterableWidget>): IDashboardFilter[];

/**
 * @public
 */
export declare interface FilterContextState {
    /**
     * Filter context definition contains the actual filters to use. Filter context definition is present
     * @beta
     */
    filterContextDefinition?: IFilterContextDefinition;
    /**
     * Filter context definition contains the original dashboard filters stored on the backend.
     * @beta
     */
    originalFilterContextDefinition?: IFilterContextDefinition;
    /**
     * Filter context identity is available for persisted filter contexts.
     *
     * @remarks
     * This property may be undefined in two circumstances:
     *
     * -  a new, yet unsaved dashboard; the filter context is saved together with the dashboard and after the
     *    save the identity will be known and added
     *
     * -  export of an existing, saved dashboard; during the export the dashboard receives a temporary
     *    filter context that represents values of filters at the time the export was initiated - which may
     *    be different from what is saved in the filter context itself. that temporary context is not
     *    persistent and lives only for that particular export operation.
     *
     * @beta
     */
    filterContextIdentity?: IDashboardObjectIdentity;
    /**
     * Display form metadata objects for all attribute filters in the `filterContextDefinition`
     * @beta
     */
    attributeFilterDisplayForms?: IAttributeDisplayFormMetadataObject[];
}

/**
 * Gets {@link IDashboardFilter} items for filters specified in given filterContext in relation to the
 * given dateDataSet.
 *
 * @param filterContext - filter context to get filters for
 * @param dateDataSet - widget to use to get dateDataSet for date filters
 * @public
 */
export declare function filterContextToDashboardFiltersByDateDataSet(filterContext: IFilterContextDefinition | IFilterContext | ITempFilterContext | undefined, dateDataSet: ObjRef): IDashboardFilter[];

/**
 * Gets {@link IDashboardFilter} items for filters specified in given filterContext in relation to the given widget.
 *
 * @param filterContext - filter context to get filters for
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export declare function filterContextToDashboardFiltersByWidget(filterContext: IFilterContextDefinition | IFilterContext | ITempFilterContext | undefined, widget: IWidgetDefinition): IDashboardFilter[];

/**
 * @beta
 */
export declare interface FilterOp {
    readonly type: FilterOperations;
}

/**
 * This filter operation disabled date filtering for the widget.
 *
 * @beta
 */
export declare interface FilterOpDisableDateFilter extends FilterOp {
    type: "disableDateFilter";
}

/**
 * This filter operation enables date filtering for the widget.
 *
 * A ref to date data set must be specified as it is passed down to widget content. Insights or KPIs can be typically
 * date-filtered using different date data sets and so this selection is essential.
 *
 * @beta
 */
export declare interface FilterOpEnableDateFilter extends FilterOp {
    type: "enableDateFilter";
    /**
     * Ref of date data set to use in date filters applied on the content of the widget.
     * If passed "default", the default date dataset will be resolved and used.
     */
    dateDataset: ObjRef | "default";
}

/**
 * @beta
 */
export declare type FilterOperations = "enableDateFilter" | "disableDateFilter" | "replaceAttributeIgnores" | "ignoreAttributeFilter" | "unignoreAttributeFilter" | "replace";

/**
 * This filter operation appends one or more attribute filters into the widget's filter ignore-list.
 *
 * @beta
 */
export declare interface FilterOpIgnoreAttributeFilter extends FilterOp {
    type: "ignoreAttributeFilter";
    /**
     * The attribute filters to add to ignore-list; specified using the refs of display forms that are used during the
     * filtering.
     *
     * If the list is empty, then the operation will not change the filters in any way.
     * Attempting to add same attribute filter into the ignore list has no effect.
     */
    displayFormRefs: ObjRef[];
}

/**
 *
 * This filter operation completely replaces widget's filter settings. Both date data set (and thus date filter) setting
 * and the attribute filter ignore list will be replaced using the parameters in the operation body.
 *
 * @beta
 */
export declare interface FilterOpReplaceAll extends FilterOp {
    type: "replace";
    /**
     * Dashboard filters to ignore for particular widget.
     *
     * Specify ObjRefs of display forms that are used by dashboard's attribute filters which you wish to disable.
     */
    readonly ignoreAttributeFilters?: ObjRef[];
    /**
     * Date data set that will be used when constructing date filter for a widget.
     *
     * If the widget does not specify any dateDataSet, then no date filtering is applied to it.
     */
    readonly dateDatasetForFiltering?: ObjRef;
}

/**
 * This filter operation replaces the setting which determines which of the dashboard's attribute filters
 * should be ignored for the widget.
 *
 * @beta
 */
export declare interface FilterOpReplaceAttributeIgnores extends FilterOp {
    type: "replaceAttributeIgnores";
    /**
     * The attribute filters to ignore; specified using the refs of display forms that are used during the
     * filtering.
     *
     * If the list of display forms is empty, then none of the dashboard's attribute filters will be ignored.
     */
    displayFormRefs: ObjRef[];
}

/**
 * This filter operation removes one or more attribute filters from the widget's filter ignore-list.
 *
 * @beta
 */
export declare interface FilterOpUnignoreAttributeFilter extends FilterOp {
    type: "unignoreAttributeFilter";
    /**
     * The attribute filters to remove from the ignore-list; specified using the refs of display forms that are
     * used during the filtering.
     *
     * If the list is empty, then the operation will not change the filters in any way.
     * Attempting to remove same attribute filter twice has no effect.
     */
    displayFormRefs: ObjRef[];
}

/**
 * Contains information about dashboard filters.
 *
 * @alpha
 */
export declare type FiltersInfo = {
    filters: IDashboardFilter[];
    resolvedFilterValues?: IResolvedFilterValues;
};

/**
 * @public
 */
export declare type FluidLayoutCustomizationFn = (layout: IDashboardLayout<ExtendedDashboardWidget>, customizer: IFluidLayoutCustomizer) => void;

/**
 * @internal
 */
export declare function getDefaultInsightEditMenuItems(widget: IInsightWidget, { intl, dispatch, includeInteractions }: MenuItemDependencies): IInsightMenuItem[];

/**
 * @internal
 */
export declare function getDefaultInsightMenuItems(intl: IntlShape, config: {
    exportXLSXDisabled: boolean;
    exportCSVDisabled: boolean;
    scheduleExportDisabled: boolean;
    onExportXLSX: () => void;
    onExportCSV: () => void;
    onScheduleExport: () => void;
    isScheduleExportVisible: boolean;
    isDataError: boolean;
}): IInsightMenuItem[];

/**
 * @internal
 */
export declare function getDefaultLegacyInsightMenuItems(intl: IntlShape, config: {
    exportXLSXDisabled: boolean;
    exportCSVDisabled: boolean;
    onExportXLSX: () => void;
    onExportCSV: () => void;
    isDataError: boolean;
}): IInsightMenuItem[];

/**
 * @internal
 */
export declare function getDrillDownAttributeTitle(localIdentifier: string, drillEvent: IDrillEvent): string | null;

/**
 * @internal
 */
export declare class HeadlessDashboard {
    private readonly reduxedStore;
    protected monitoredActions: Record<string, MonitoredAction>;
    protected capturedActions: Array<PayloadAction<any>>;
    protected capturedEvents: Array<DashboardEvents>;
    constructor(ctx: DashboardContext, config?: HeadlessDashboardConfig);
    protected getOrCreateMonitoredAction: (actionType: string) => MonitoredAction;
    private onActionCaptured;
    private eventHandler;
    dispatch(action: DashboardCommands | PayloadAction<any>): void;
    /**
     * Convenience function that combines both {@link HeadlessDashboard.dispatch} and {@link HeadlessDashboard.waitFor}.
     *
     * @param action - action (typically a command) to dispatch
     * @param actionType - type of action (typically an event type) to wait for
     * @param timeout - timeout after which the wait fails, default is 1000
     */
    dispatchAndWaitFor(action: DashboardCommands | PayloadAction<any>, actionType: DashboardEventType | DashboardCommandType | string, timeout?: number): Promise<any>;
    private commandFailedRejectsWaitFor;
    private commandRejectedEndsWaitFor;
    /**
     * Starts a dashboard query.
     *
     * @param action - query action
     */
    query<TQueryResult>(action: IDashboardQuery): Promise<TQueryResult>;
    /**
     * Wait for action to occur. The wait is bounded by a timeout that is 1s by default.
     *
     * @param actionType - action type to wait for
     * @param timeout - timeout after which the wait fails, default is 1000
     */
    waitFor(actionType: DashboardEventType | DashboardCommandType | string, timeout?: number): Promise<any>;
    /**
     * select data from the state
     */
    select<TSelectorFactory extends (...args: any[]) => any>(selectorFactory: TSelectorFactory): ReturnType<TSelectorFactory>;
    /**
     * Returns dashboard state.
     */
    protected state(): DashboardState;
}

/**
 * @internal
 */
export declare interface HeadlessDashboardConfig {
    queryServices?: IDashboardQueryService<any, any>[];
    backgroundWorkers?: ((context: DashboardContext) => SagaIterator<void>)[];
    customizationFns?: DashboardModelCustomizationFns;
}

/**
 * @internal
 */
export declare interface HeightResizerDragItem {
    type: "internal-height-resizer";
    sectionIndex: number;
    itemIndexes: number[];
    widgetHeights: number[];
    initialLayoutDimensions: DOMRect;
    minLimit: number;
    maxLimit: number;
}

/**
 * This implementation of button bar keeps it out of sight and effectively disables it.
 *
 * @alpha
 */
export declare const HiddenButtonBar: () => JSX.Element | null;

/**
 * This implementation of dashboard attribute filter keeps the filter hidden out of sight. The attribute filter itself
 * will still be in effect.
 *
 * @alpha
 */
export declare const HiddenDashboardAttributeFilter: () => JSX.Element | null;

/**
 * This implementation of dashboard date filter keeps the filter hidden out of sight. The attribute filter itself
 * will still be in effect.
 *
 * @alpha
 */
export declare const HiddenDashboardDateFilter: () => JSX.Element | null;

/**
 * This implementation of Filter Bar will ensure that all the filter controls are out of sight. All the dashboard
 * filtering is still in place however user cannot see or interact with the filters.
 *
 * @alpha
 */
export declare const HiddenFilterBar: (_props: IFilterBarProps) => JSX.Element | null;

/**
 * This implementation of menu button keeps it out of sight and effectively disables it.
 *
 * @alpha
 */
export declare const HiddenMenuButton: () => JSX.Element | null;

/**
 * This implementation of share button keeps it out of sight and effectively disables it.
 *
 * @alpha
 */
export declare const HiddenShareButton: () => JSX.Element | null;

/**
 * This implementation of title keeps it out of sight and effectively disables it.
 *
 * @alpha
 */
export declare const HiddenTitle: () => JSX.Element | null;

/**
 * This implementation of toolbar keeps it out of sight.
 *
 * @internal
 */
export declare const HiddenToolbar: CustomToolbarComponent;

/**
 * This implementation of top bar keeps it out of sight.
 *
 * @alpha
 */
export declare const HiddenTopBar: (_props: ITopBarProps) => JSX.Element | null;

/**
 * @internal
 */
export declare interface IAddAttributeFilterButtonProps {
    className: string;
    isOpen: boolean;
    title?: string;
}

/**
 * @internal
 */
export declare type IAttributeFilterDraggingComponentProps = {
    itemType: "attributeFilter";
    item: AttributeFilterDraggableItem;
};

/**
 * Set of functions you can use to customize how attribute filters are rendered.
 *
 * @public
 */
export declare interface IAttributeFiltersCustomizer {
    /**
     * Register a provider for React components to render attribute filters.
     *
     * @remarks
     * A provider takes the attribute filter as input and is expected to return
     * a React component that should be used to render that filter.
     *
     * If the provider returns `undefined` then:
     *
     * -  if there are other providers registered, they will be called to see if they can provide
     *    a component to render the attribute filter
     * -  if there are no other providers registered, the default, built-in component will be used.
     *
     * You may register multiple providers. They will be evaluated in the order you register them.
     *
     * @param provider - provider to register
     * @returns self, for call chaining sakes
     */
    withCustomProvider(provider: OptionalAttributeFilterComponentProvider): IAttributeFiltersCustomizer;
}

/**
 * Information about the broken alert filters. These are filters that are set up on the alert,
 * but the currently applied filters either do not contain them, or the KPI has started ignoring them
 * since the alert was first set up.
 *
 * @alpha
 */
export declare interface IBrokenAlertFilterBasicInfo<TFilter extends FilterContextItem = FilterContextItem> {
    alertFilter: TFilter;
    brokenType: BrokenAlertType;
}

/**
 * @beta
 */
export declare interface IButtonBarProps {
    buttons?: React_2.ReactNode;
    childContentPosition?: "left" | "right";
    shareButtonProps: IShareButtonProps;
    DefaultButtonBar: CustomButtonBarComponent;
    cancelButtonProps: ICancelButtonProps;
    editButtonProps: IEditButtonProps;
    saveButtonProps: ISaveButtonProps;
    saveAsNewButtonProps: ISaveAsNewButtonProps;
    children?: React_2.ReactNode;
}

/**
 * @beta
 */
export declare interface ICancelButtonProps {
    isVisible: boolean;
    onCancelClick: () => void;
}

/**
 * @internal
 */
export declare interface ICancelEditDialogProps {
    onCancel: () => void;
    onSubmit: () => void;
}

/**
 * @internal
 */
export declare interface IConnectingAttribute {
    title: string;
    ref: ObjRef;
}

/**
 * @internal
 */
export declare interface ICreatePanelItemComponentProps {
    WrapCreatePanelItemWithDragComponent?: IWrapCreatePanelItemWithDragComponent;
    disabled?: boolean;
}

/**
 * @beta
 */
export declare interface ICsvExportConfig {
    format: "csv";
}

/**
 * Base type for all custom events.
 *
 * @typeParam TPayload - type of the event's additional data
 * @public
 */
export declare interface ICustomDashboardEvent<TPayload = any> {
    /**
     * Event type. Always starts with "CUSTOM/EVT".
     */
    readonly type: string;
    /**
     * Dashboard context in which the event occurred.
     */
    readonly ctx: DashboardContext;
    /**
     * Specify any additional data the custom event needs.
     */
    readonly payload?: TPayload;
    /**
     * Metadata about the event useful for logging and handling of the event.
     */
    readonly meta?: {
        /**
         * When the event was accepted by the Dashboard store and emitted.
         */
        acceptedTimestamp: number;
    };
}

/**
 * @internal
 */
export declare type ICustomDraggingComponentProps = {
    itemType: "custom";
    item: CustomDraggableItem;
};

/**
 * Custom widget with assigned identity.
 *
 * @public
 */
export declare interface ICustomWidget extends ICustomWidgetBase, IDashboardObjectIdentity, Partial<IFilterableWidget> {
}

/**
 * Base type for custom widgets. Custom widgets may extend this and add extra properties to hold widget-specific
 * configuration.
 *
 * @public
 */
export declare interface ICustomWidgetBase extends IBaseWidget {
    readonly type: "customWidget";
    readonly customType: string;
}

/**
 * Definition of custom widget. The definition may not specify identity. In that case a temporary identity
 * will be assigned to the widget as it is added onto a dashboard.
 *
 * @public
 */
export declare interface ICustomWidgetDefinition extends ICustomWidgetBase, Partial<IDashboardObjectIdentity> {
}

/**
 * @internal
 */
export declare interface IDashboardAttributeFilterDisplayForms {
    selectedDisplayForm: ObjRef;
    availableDisplayForms: IAttributeDisplayFormMetadataObject[];
}

/**
 * @internal
 */
export declare interface IDashboardAttributeFilterParentItem {
    localIdentifier: string;
    title?: string;
    displayForm: ObjRef;
    isSelected: boolean;
    overAttributes?: ObjRef[];
    selectedConnectingAttribute: ObjRef | undefined;
}

/**
 * @internal
 */
export declare interface IDashboardAttributeFilterPlaceholderProps {
    className?: string;
    bodyClassName?: string;
    onSelect: (displayForm: ObjRef) => void;
    onClose: () => void;
}

/**
 * @public
 */
export declare interface IDashboardAttributeFilterProps {
    /**
     * Definition of filter to render.
     */
    filter: IDashboardAttributeFilter;
    /**
     * When the user interacts with the filter and changes its value, it MUST use this callback to propagate the
     * new filter value.
     *
     * @param filter - new attribute filter value.
     */
    onFilterChanged: (filter: IDashboardAttributeFilter) => void;
    /**
     * Callback to be called, when user closes filter dropdown
     */
    onClose?: () => void;
    /**
     * Specify whether dragging handle and grab cursor should be displayed on hover
     */
    isDraggable?: boolean;
    /**
     * Specify whether should render filter with open dropdown
     */
    autoOpen?: boolean;
}

/**
 * @public
 */
export declare interface IDashboardBaseProps {
    /**
     * Analytical backend from which the dashboard obtains data to render.
     *
     * @remarks
     * If you do not specify instance of analytical backend using this prop, then you MUST have
     * BackendProvider up in the component tree.
     */
    backend?: IAnalyticalBackend;
    /**
     * Identifier of analytical workspace, from which the dashboard obtains data to render.
     *
     * @remarks
     * If you do not specify workspace identifier, then you MUST have WorkspaceProvider up in the
     * component tree.
     */
    workspace?: string;
    /**
     * Specify dashboard to render; you can specify the dashboard either by reference (ObjRef) or
     * by value (of type IDashboard).
     *
     * @remarks
     * As a convenience, you may also specify a dashboard object
     * identifier - this is same as using `idRef(objectIdentifier)`.
     *
     * If you do not specify dashboard to render, a new default empty dashboard will be rendered.
     */
    dashboard?: string | ObjRef | IDashboard;
    /**
     * Specify reference to a filter context that should be used instead of the default,
     * built-in filter context.
     *
     * @remarks
     * Note: this property only makes sense if you also specify `dashboard` by reference. If you specify
     * dashboard by value, then the component assumes that the value also contains the desired filter context
     * and will use it as is.
     */
    filterContextRef?: ObjRef;
    /**
     * Configuration that can be used to modify dashboard features, capabilities and behavior.
     *
     * @remarks
     * If not specified, then the dashboard will retrieve and use the essential configuration from the backend.
     */
    config?: DashboardConfig;
    /**
     * Specify permissions to use when determining availability of the different features of
     * the dashboard component.
     *
     * @remarks
     * If you do not specify permissions, the dashboard component will load permissions for the currently
     * logged-in user.
     */
    permissions?: IWorkspacePermissions;
}

/**
 * Base type for all commands.
 *
 * @remarks
 * Commands are dispatched using dispatcher obtained by useDashboardDispatcher(). All the dispatchers are 'contextual' -
 * they target backend, workspace and dashboard in depending on the Dashboard component tree from which the dispatch
 * is done.
 *
 * @public
 */
export declare interface IDashboardCommand {
    /**
     * Command type. Always starts with "GDC.DASH/CMD"
     */
    readonly type: DashboardCommandType;
    /**
     * Correlation ID can be provided when creating a command.
     *
     * @remarks
     * All events emitted during the command processing will contain the same correlation ID.
     *
     * If the correlation ID is not specified, a random string will be assigned.
     */
    readonly correlationId?: string;
    /**
     * Metadata related to processing of the command by the dashboard component.
     *
     * @remarks
     * Note: this metadata is added by the dashboard component. It will be added dynamically to command
     * right after its dispatch.
     */
    readonly meta?: CommandProcessingMeta;
}

/**
 * These props allow you to specify custom components or custom component providers that the Dashboard
 * component will use for rendering different parts of the dashboard.
 *
 * @remarks
 * IMPORTANT: while this interface is marked as public, you also need to heed the maturity annotations
 * on each property. A lot of these properties are at this moment alpha or internal level.
 *
 * @public
 */
export declare interface IDashboardCustomComponentProps {
    /**
     * Component to render if embedding fails.
     *
     * @remarks
     * This component is also used in all the individual widgets when they have some error occur.
     *
     * @privateRemarks
     * TODO do we need separate component for the dashboard as a whole and individual widgets?
     *
     * @alpha
     */
    ErrorComponent?: ComponentType<IErrorProps>;
    /**
     * Component to render while the dashboard or a widget is loading.
     *
     * @remarks
     * This component is also used in all the individual widgets while they are loading.
     *
     * @privateRemarks
     * TODO do we need separate component for the dashboard as a whole and individual widgets?
     *
     * @alpha
     */
    LoadingComponent?: ComponentType<ILoadingProps>;
    /**
     * Specify component to use for rendering the layout.
     *
     * @alpha
     */
    LayoutComponent?: CustomDashboardLayoutComponent;
    /**
     * Specify function to obtain custom component to use for rendering a widget.
     *
     * @remarks
     * -  If not provided, the default implementation {@link DefaultDashboardWidget} will be used.
     * -  If factory function is provided and it returns undefined, then the default implementation {@link DefaultDashboardWidget}.
     *    This is useful if you want to customize just one particular widget and keep default rendering for the
     *    other widgets.
     *
     * @example
     *
     * ```tsx
     * // Simple component that alters the title of every widget
     * const CustomWidget = (props) => {
     *     const widget: IInsightWidget = {
     *         ...props.widget,
     *         title: `Prepend to ${props.widget.title}`,
     *     };
     *
     *     return <DefaultDashboardWidget {...props} widget={widget} />;
     * };
     * ```
     *
     * @public
     */
    WidgetComponentProvider?: OptionalWidgetComponentProvider;
    /**
     * Specify function to obtain custom component to use for rendering an insight.
     *
     * @remarks
     * -  If not provided, the default implementation {@link DefaultDashboardInsight} will be used.
     * -  If factory function is provided and it returns undefined, then the default implementation {@link DefaultDashboardInsight} will be used.
     *    This is useful if you want to customize just one particular insight and keep default rendering for
     *    the other insights.
     *
     * @public
     */
    InsightComponentProvider?: OptionalInsightComponentProvider;
    /**
     * Specify function to obtain custom component to use for rendering an insight body (i.e. the insight itself) in the {@link DefaultDashboardInsight}.
     *
     * @remarks
     * -  If not provided, the default implementation {@link DefaultInsightBody} will be used.
     * -  If factory function is provided and it returns undefined, then the default implementation {@link DefaultInsightBody} will be used.
     *    This is useful if you want to customize just one particular insight and keep default rendering for
     *    the other insights.
     *
     * @alpha
     */
    InsightBodyComponentProvider?: OptionalInsightBodyComponentProvider;
    /**
     * Specify function to obtain custom component to use for rendering an insight menu button.
     *
     * @remarks
     * -  If not provided, the default implementation {@link DefaultDashboardInsightMenuButton} will be used
     *    if insightMenuItemsProvider property is specified, otherwise {@link LegacyDashboardInsightMenuButton} will be used.
     * -  If factory function is provided and it returns undefined, then the default implementation {@link DefaultDashboardInsightMenuButton} will be used.
     *    This is useful if you want to customize just one particular insight and keep default rendering for
     *    the other insights.
     *
     * @alpha
     */
    InsightMenuButtonComponentProvider?: OptionalInsightMenuButtonComponentProvider;
    /**
     * Specify function to obtain custom component to use for rendering an insight menu.
     *
     * @remarks
     * -  If not provided, the default implementation {@link DefaultDashboardInsightMenu} will be used
     *    if insightMenuItemsProvider property is specified, otherwise {@link LegacyDashboardInsightMenu} will be used.
     * -  If factory function is provided and it returns undefined, then the default implementation {@link DefaultDashboardInsightMenu} will be used.
     *    This is useful if you want to customize just one particular insight and keep default rendering for
     *    the other insights.
     *
     * @alpha
     */
    InsightMenuComponentProvider?: OptionalInsightMenuComponentProvider;
    /**
     * Specify function to obtain custom component to use for rendering the title of the insight menu.
     *
     * @remarks
     * -  If not provided, the default implementation {@link DefaultDashboardInsightMenuTitle} will be used.
     * -  If factory function is provided and it returns undefined, then the default implementation {@link DefaultDashboardInsightMenuTitle} will be used.
     *    This is useful if you want to customize just one particular insight and keep default rendering for
     *    the other insights.
     *
     * @internal
     */
    InsightMenuTitleComponentProvider?: OptionalInsightMenuTitleComponentProvider;
    /**
     * Specify function to obtain insight component set.
     *
     * @remarks
     * If not provided, the default implementation {@link DefaultDashboardInsightComponentSetFactory} will be used.
     *
     * @internal
     */
    InsightComponentSetProvider?: InsightComponentSetProvider;
    /**
     * Specify function to obtain custom component to use for rendering a KPI.
     *
     * @remarks
     * -  If not provided, the default implementation {@link DefaultDashboardKpi} will be used.
     * -  If factory function is provided and it returns undefined, then the default implementation {@link DefaultDashboardKpi}.
     *    This is useful if you want to customize just one particular KPI and keep default rendering for
     *    the other insights.
     *
     * @public
     */
    KpiComponentProvider?: OptionalKpiComponentProvider;
    /**
     * Specify component to use for rendering the scheduled email dialog.
     *
     * @alpha
     */
    ScheduledEmailDialogComponent?: CustomScheduledEmailDialogComponent;
    /**
     * Specify component to use for rendering the scheduled email management dialog.
     *
     * @alpha
     */
    ScheduledEmailManagementDialogComponent?: CustomScheduledEmailManagementDialogComponent;
    /**
     * Specify component to use for rendering the share dialog.
     *
     * @alpha
     */
    ShareDialogComponent?: CustomShareDialogComponent;
    /**
     * Specify component to use for rendering the save as dialog.
     *
     * @alpha
     */
    SaveAsDialogComponent?: CustomSaveAsDialogComponent;
    /**
     * Specify component to use for rendering the button bar.
     *
     * @alpha
     */
    ButtonBarComponent?: CustomButtonBarComponent;
    /**
     * Specify component to use for rendering the menu button.
     *
     * @alpha
     */
    MenuButtonComponent?: CustomMenuButtonComponent;
    /**
     * Specify component to use for rendering the top bar.
     *
     * @remarks
     * Note that if you override this component, the ButtonBarComponent, MenuButtonComponent and TitleComponent
     * props might get ignored depending on your implementation.
     *
     * @alpha
     */
    TopBarComponent?: CustomTopBarComponent;
    /**
     * Specify component to use for rendering the toolbar.
     *
     * @internal
     */
    ToolbarComponent?: CustomToolbarComponent;
    /**
     * Specify component to use for rendering the title.
     *
     * @remarks
     * Defaults to {@link DefaultTitle}. For an editable title, you can use {@link EditableTitle} instead.
     * To hide the dashboard title altogether, you can use {@link HiddenTitle}.
     *
     * @alpha
     */
    TitleComponent?: CustomTitleComponent;
    /**
     * Specify custom component to use for rendering all attribute filters or a factory function to customize the component
     * per different attribute filter.
     *
     * @remarks
     * If you want to hide some or all filters, you can use the {@link HiddenDashboardAttributeFilter} implementation.
     *
     * -  If not provided, the default implementation {@link DefaultDashboardAttributeFilter} will be used.
     * -  If factory function is provided and it returns undefined, then the default implementation {@link DefaultDashboardAttributeFilter}.
     *    This is useful if you want to customize just one particular filter and keep all other filters the same.
     *
     * @example
     * Here is how to override the component for all filters:
     * ```
     * ComponentFactory: () => MyCustomComponent
     * ```
     *
     * @alpha
     */
    DashboardAttributeFilterComponentProvider?: OptionalAttributeFilterComponentProvider;
    /**
     * Specify component to use for rendering the date filters.
     *
     * @alpha
     */
    DashboardDateFilterComponentProvider?: OptionalDateFilterComponentProvider;
    /**
     * Specify component to use for rendering the filter bar.
     *
     * @remarks
     *
     * Note that if you override this component, the DashboardAttributeFilterComponentFactory and DashboardDateFilterComponent
     * props might get ignored depending on your implementation.
     *
     * @alpha
     */
    FilterBarComponent?: CustomFilterBarComponent;
    /**
     * Specify component to use for rendering the sidebar.
     *
     * @alpha
     */
    SidebarComponent?: CustomSidebarComponent;
    /**
     * Specify the component rendered as the body of the drop zone when the layout is empty.
     *
     * @internal
     *
     * @privateRemarks
     * We would ideally replace the whole EmptyLayoutComponent, however integrating with the drop zone is currently too complicated.
     *
     */
    EmptyLayoutDropZoneBodyComponent?: CustomEmptyLayoutDropZoneBodyComponent;
    /**
     * Specify the component rendered as save button.
     *
     * @remarks
     * If not provided, the default implementation {@link DefaultSaveButton} will be used.
     *
     * @internal
     */
    SaveButtonComponent?: CustomSaveButtonComponent;
}

/**
 * Properties for {@link Dashboard} customization.
 *
 * @remarks
 * IMPORTANT: while this interface is marked as public, you also need to heed the maturity annotations
 * on each property. A lot of these properties are at this moment alpha level.
 *
 * @public
 */
export declare interface IDashboardCustomizationProps extends IDashboardCustomComponentProps {
    /**
     * Provide custom configuration for the Menu button.
     *
     * @alpha
     */
    menuButtonConfig?: IMenuButtonConfiguration;
    /**
     * Provide custom provider to change items rendered in insight menus.
     *
     * @remarks
     * If the function returns an empty array, the menu will not be rendered at all.
     *
     * @alpha
     */
    insightMenuItemsProvider?: InsightMenuItemsProvider;
    /**
     * Specify customization functions.
     *
     * @remarks
     * The dashboard component will call out to these functions
     * at different points during its lifetime. See documentation of the different functions to learn more.
     *
     * @public
     */
    customizationFns?: DashboardModelCustomizationFns;
}

/**
 * @public
 */
export declare interface IDashboardCustomizer {
    /**
     * Customize how rendering of insight widgets is done.
     */
    insightWidgets(): IDashboardInsightCustomizer;
    /**
     * Customize how rendering of KPI widgets is done.
     */
    kpiWidgets(): IDashboardKpiCustomizer;
    /**
     * Register custom widget types.
     */
    customWidgets(): IDashboardWidgetCustomizer;
    /**
     * Customize dashboard layout.
     *
     * @remarks
     * This allows the plugin to step in during initialization and modify
     * the existing dashboard layout before it gets stored into dashboard component's state and
     * before it is rendered.
     */
    layout(): IDashboardLayoutCustomizer;
    /**
     * Customize the filter bar.
     */
    filterBar(): IFilterBarCustomizer;
    /**
     * Customize how rendering of filters is done.
     */
    filters(): IFiltersCustomizer;
}

/**
 * Defines the configuration of the DateFilter component.
 *
 * @public
 */
export declare interface IDashboardDateFilterConfig {
    /**
     * Granularities available in the Floating range form.
     * @alpha
     */
    availableGranularities: DateFilterGranularity[];
    /**
     * A {@link @gooddata/sdk-ui-filters#IDateFilterOptionsByType} configuration of the Date Filter.
     * @alpha
     */
    dateFilterOptions: IDateFilterOptionsByType;
    /**
     * Specify custom filter name. Defaults to "Date range" (or its localized equivalent).
     */
    customFilterName?: string;
}

/**
 * @public
 */
export declare interface IDashboardDateFilterProps {
    /**
     * Definition of filter to render.
     */
    filter: IDashboardDateFilter | undefined;
    /**
     * When the user interacts with the filter and changes its value, it MUST use this callback to propagate the
     * new filter value.
     *
     * @param filter - new date filter value
     * @param dateFilterOptionLocalId - localId of the {@link @gooddata/sdk-backend-spi#IDateFilterOption} selected
     */
    onFilterChanged: (filter: IDashboardDateFilter | undefined, dateFilterOptionLocalId?: string) => void;
    /**
     * Additional DateFilter configuration.
     */
    config: IDashboardDateFilterConfig;
    /**
     * Specify whether the filter should be readonly.
     */
    readonly?: boolean;
}

/**
 * A {@link @gooddata/sdk-ui#IDrillEvent} with added information about the drill event specific to the Dashboard context.
 * @beta
 */
export declare interface IDashboardDrillEvent extends IDrillEvent {
    /**
     * All the drilling interactions set in KPI dashboards that are relevant to the given drill event (including drill downs).
     */
    drillDefinitions: DashboardDrillDefinition[];
    /**
     * Reference to the widget that triggered the drill event.
     */
    widgetRef?: ObjRef;
}

/**
 * Dashboard Engine encapsulates a particular build of the {@link Dashboard} component and provides
 * factory methods to create the Dashboard component's customization-related props using one or more
 * plugins.
 *
 * @public
 */
export declare interface IDashboardEngine {
    /**
     * Version of the dashboard engine.
     */
    readonly version: string;
    /**
     * Drives initialization of loaded dashboard plugins and their registration logic.
     *
     * @remarks
     * During registration, the plugins register their customizations, contributions and event handlers.
     *
     * The plugin' contributions will be used to construct the dashboard extension props which can then be
     * used as input to the dashboard component itself and thus achieve the integration of the plugins
     * into the dashboard.
     *
     * @param ctx - dashboard context in which the plugins operate
     * @param plugins - plugins to initialize
     */
    initializePlugins(ctx: DashboardContext, plugins: IDashboardPluginContract_V1[]): IDashboardExtensionProps;
    /**
     * Returns Dashboard component provided by this dashboard engine.
     */
    getDashboardComponent(): ComponentType<IDashboardProps>;
}

/**
 * Base type for all dashboard events.
 *
 * @typeParam TPayload - type of the event's additional data
 * @public
 */
export declare interface IDashboardEvent<TPayload = any> {
    /**
     * Event type. Always starts with "GDC.DASH/EVT".
     */
    readonly type: DashboardEventType;
    /**
     * If this event was triggered as part of a command processing, then the prop will contain command's correlation ID.
     */
    readonly correlationId?: string;
    /**
     * Dashboard context in which the event occurred.
     */
    readonly ctx: DashboardContext;
    /**
     * Specify any additional data the custom event needs.
     */
    readonly payload?: TPayload;
    /**
     * Metadata about the event useful for logging and handling of the event.
     */
    readonly meta?: {
        /**
         * When the event was accepted by the Dashboard store and emitted.
         */
        acceptedTimestamp: number;
    };
}

/**
 * Defines a facade that you can use to register or unregister dashboard event handlers.
 *
 * @public
 */
export declare interface IDashboardEventHandling {
    /**
     * Adds a handler for particular event type.
     *
     * @remarks
     * Every time event of that type occurs, the provided callback function will be triggered.
     *
     * @param eventType - type of the event to handle; this can be either built-event event type (see {@link DashboardEventType}), a custom
     *  event type or `'*'` to register handler for all events
     * @param callback - function to call when the event occurs
     */
    addEventHandler<TEvents extends DashboardEvents | ICustomDashboardEvent>(eventType: DashboardEventType | string | "*", callback: DashboardEventHandlerFn<TEvents>): IDashboardEventHandling;
    /**
     * Removes a handler for particular event type. This is reverse operation to {@link IDashboardEventHandling.addEventHandler}.
     *
     * @remarks
     * In order for this method to remove a handler, the arguments must be the same when you added the handler.
     *
     * E.g. it is not possible to add a handler for all events using `'*'` and then subtract just one particular event
     * from handling.
     *
     * @param eventType - type of the event to stop handling; this can be either built-event event type (see {@link DashboardEventType}), a custom
     *  event type or `'*'` to register handler for all events
     * @param callback - originally registered callback function
     * @returns self, for call chaining sakes
     */
    removeEventHandler<TEvents extends DashboardEvents | ICustomDashboardEvent>(eventType: DashboardEventType | string | "*", callback: DashboardEventHandlerFn<TEvents>): IDashboardEventHandling;
    /**
     * Adds a custom event handler. This is a lower-level API where the handler can include both the function to
     * evaluate events and the function to trigger when the evaluation succeeds.
     *
     * @remarks
     * Attempts to register same handler twice will be ignored.
     *
     * @param handler - event handler to add
     * @returns self, for call chaining sakes
     */
    addCustomEventHandler(handler: DashboardEventHandler): IDashboardEventHandling;
    /**
     * Removes custom event handler.
     *
     * @remarks
     * In order for successful removal the entire handler object must be exactly the same as the one
     * that was used when you added the handler.
     *
     * @param handler - event handler to remove
     * @returns self, for call chaining sakes
     */
    removeCustomEventHandler(handler: DashboardEventHandler): IDashboardEventHandling;
    /**
     * Subscribe to state changes of the dashboard.
     *
     * @remarks
     * There is no need to use this if all you need is your custom React components to get up-to-date state. Your
     * React component code can (and really should) use the {@link @gooddata/sdk-ui-dashboard#useDashboardSelector} and
     * {@link @gooddata/sdk-ui-dashboard#useDashboardDispatch} hooks instead.
     *
     * Subscription to state changes is only really needed if you have custom code outside of React components and
     * you need to extract custom data from state using the selectors API.
     *
     * See also {@link SingleDashboardStoreAccessor} and {@link DashboardStoreAccessorRepository} for utility classes
     * that make managing the callback subscriptions more convenient.
     *
     * @param callback - function to call when dashboard state changes; the function will be called with
     *  two parameters: the new state and an instance of dispatch to use.
     * @returns self, for call chaining sakes
     */
    subscribeToStateChanges(callback: DashboardStateChangeCallback): IDashboardEventHandling;
    /**
     * Unsubscribe from receiving calls about state changes of the dashboard.
     *
     * @param callback - callback that was previously used for subscription
     * @returns self, for call chaining sakes
     */
    unsubscribeFromStateChanges(callback: DashboardStateChangeCallback): IDashboardEventHandling;
}

/**
 * {@link Dashboard} eventing configuration
 *
 * @remarks
 * Dashboard Component eventing is divided into two major groups:
 *
 * 1.  Domain events describing what is happening on the dashboard or with the dashboard
 * 2.  Infrastructural events required hook into different technical aspects of the dashboard component
 *     implementation.
 *
 * Dashboard Component treats the domain events using the typical pub-sub semantics. It is possible to
 * register any number of subscribers for the different types of events. Types of events are enumerated and
 * each event comes with its own type describing the contents. Please see {@link @gooddata/sdk-ui-dashboard#DashboardEventType}
 * and {@link @gooddata/sdk-ui-dashboard#DashboardEvents} to learn more.
 *
 * The infrastructural events are handled using callbacks. There are only few of these infr
 *
 * @public
 */
export declare interface IDashboardEventing {
    /**
     * Specify event handlers to register at the dashboard creation time.
     *
     * @remarks
     * Note: all events that will be emitted during the initial load processing will have the `initialLoad`
     * correlationId.
     */
    eventHandlers?: DashboardEventHandler[];
    /**
     * Specify callback that will be called when the dashboard eventing subsystem initializes and
     * it is possible to register new or unregister existing event handlers.
     *
     * @remarks
     * Note: these callbacks allow modification of event handlers on an existing, initialized dashboard. See
     * {@link IDashboardEventing.eventHandlers} prop if you want to register handlers _before_ the dashboard
     * initialization starts.
     */
    onEventingInitialized?: (registerEventHandler: (handler: DashboardEventHandler) => void, unregisterEventHandler: (handler: DashboardEventHandler) => void) => void;
    /**
     * Specify callback that will be called each time the state changes.
     *
     * @remarks
     * Note: there is no need to use this in your own React components that you plug into the dashboard. Your
     * React component code can use {@link @gooddata/sdk-ui-dashboard#useDashboardSelector} and
     * {@link @gooddata/sdk-ui-dashboard#useDashboardDispatch} hooks instead.
     */
    onStateChange?: (state: DashboardState, dispatch: DashboardDispatch) => void;
}

/**
 * @alpha
 */
export declare interface IDashboardEventsContext {
    registerHandler: (handler: DashboardEventHandler) => void;
    unregisterHandler: (handler: DashboardEventHandler) => void;
}

/**
 * Cumulative properties for {@link Dashboard} customization.
 *
 * @remarks
 * IMPORTANT: while this interface is marked as public, you also need to heed the maturity annotations
 * on each property. A lot of these properties are at this moment alpha level.
 *
 * @public
 */
export declare interface IDashboardExtensionProps extends IDashboardEventing, IDashboardCustomizationProps, IDashboardWidgetsOverlayProps, IDashboardThemingProps {
    /**
     * Pass instance of ReactReduxContext where the dashboard component's store should be saved.
     *
     * @remarks
     *
     * This is essential if you are dynamically loading dashboard engine and then enriching the
     * dashboard with embedded, local plugins. If such plugins are compiled against sdk-ui-dashboard and
     * use Redux hooks (useDashboardSelect, useDashboardDispatch) then your solution will not work
     * unless you explicitly send your application's `ReactDashboardContext` into this prop.
     *
     * Note: there is no need to use this prop unless you are dynamically loading the engine bundle.
     */
    additionalReduxContext?: React_2.Context<ReactReduxContextValue>;
}

/**
 * Supported dashboard filter type.
 * @public
 */
export declare type IDashboardFilter = IAbsoluteDateFilter | IRelativeDateFilter | IPositiveAttributeFilter | INegativeAttributeFilter;

/**
 * Set of functions you can use to customize how insights are rendered.
 *
 * @public
 */
export declare interface IDashboardInsightCustomizer {
    /**
     * A convenience method that will register a specific React component to use for rendering
     * any insight that is tagged with the provided `tag`.
     *
     * @remarks
     * If plugins register multiple providers for the same tag, then the provider will be picked
     * using 'last-win' strategy.
     *
     * @param tag - tag to look for on the insight, this function will do nothing if this argument is an empty string
     * @param component - component to use if the tag is found
     * @returns self, for call chaining sakes
     */
    withTag(tag: string, component: CustomDashboardInsightComponent): IDashboardInsightCustomizer;
    /**
     * Register a provider for React components to render insights.
     *
     * @remarks
     * A provider takes the insight and widget that it is part of as input and is expected to return
     * a React component that should be used to render that insight.
     *
     * If the provider returns `undefined` then:
     *
     * -  if there are other providers registered, they will be called to see if they can provide
     *    a component to render the insight
     * -  if there are no other providers registered, the default, built-in component will be used.
     *
     * You may register multiple providers. They will be evaluated in the order you register them.
     *
     * See the {@link IDashboardInsightCustomizer.withTag} convenience method to register components for insights
     *  with particular tags.
     * @param provider - provider to register
     * @returns self, for call chaining sakes
     */
    withCustomProvider(provider: OptionalInsightComponentProvider): IDashboardInsightCustomizer;
    /**
     * Register a provider for React components to render insight body inside of the {@link DefaultDashboardInsight}.
     *
     * @remarks
     * A provider takes the insight and widget that it is part of as input and is expected to return
     * a React component that should be used to render that insight.
     *
     * If the provider returns `undefined` then:
     *
     * -  if there are other providers registered, they will be called to see if they can provide
     *    a component to render the insight
     * -  if there are no other providers registered, the default, built-in component will be used.
     *
     * You may register multiple providers. They will be evaluated in the order you register them.
     * @param provider - provider to register
     * @returns self, for call chaining sakes
     * @alpha
     */
    withCustomInsightBodyProvider(provider: OptionalInsightBodyComponentProvider): IDashboardInsightCustomizer;
    /**
     * Register a factory for insight decorator providers.
     *
     * @remarks
     * Decorators are a way to add customizations or embellishments on top
     * of an existing component. Decorators are more complex to write because they need to work with the component
     * they should decorate and add 'something' on top of that component.
     *
     * This is best illustrated on an example:
     *
     * @example
     * ```
     * withCustomDecorator((next) => {
     *     return (insight, widget) => {
     *         if (some_condition_to_prevent_decoration) {
     *             return undefined;
     *         }
     *
     *         // Make sure you call this outside the component render function,
     *         // otherwise a new instance of the decorated component is created on each re-render.
     *         const Decorated = next(insight, widget);
     *
     *         function MyCustomDecorator(props) {
     *              return (
     *                  <div>
     *                      <p>My Custom Decoration</p>
     *                      <Decorated {...props} />
     *                  </div>
     *              )
     *         }
     *
     *         return MyCustomDecorator;
     *     }
     * })
     * ```
     *
     * The above shows how to register a decorator that will use some condition to determine whether particular
     * insight is eligible for decoration. If yes, it will add some extra text in front of the insight. Decorator
     * defers rendering of the actual insight to the underlying provider.
     *
     * Note: the factory function that you specify will be called immediately at the registration time. The
     * provider that it returns will be called at render time.
     *
     * @param providerFactory - factory
     */
    withCustomDecorator(providerFactory: (next: InsightComponentProvider) => OptionalInsightComponentProvider): IDashboardInsightCustomizer;
}

/**
 * @alpha
 */
export declare interface IDashboardInsightMenuButtonProps {
    widget: IInsightWidget;
    insight: IInsight;
    isOpen: boolean;
    onClick: () => void;
    items: IInsightMenuItem[];
}

/**
 * @alpha
 */
export declare interface IDashboardInsightMenuProps {
    widget: IInsightWidget;
    insight: IInsight;
    isOpen: boolean;
    onClose: () => void;
    items: IInsightMenuItem[];
}

/**
 * @internal
 */
export declare interface IDashboardInsightMenuTitleProps {
    widget: IInsightWidget;
    insight: IInsight;
    renderMode: RenderMode;
}

/**
 * Insight widget props.
 *
 * @remarks
 * IMPORTANT: this interface is marked as public but not all properties in it are suitable for public consumption
 * yet. Please heed the per-property API maturity annotations; the alpha level APIs may change in a breaking way
 * in the next release.
 *
 * @public
 */
export declare interface IDashboardInsightProps {
    /**
     * Backend to work with.
     *
     * @remarks
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the component MUST be rendered within an existing BackendContext.
     *
     * @alpha
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where the Insight widget exists.
     *
     * @remarks
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the component MUST be rendered within an existing WorkspaceContext.
     *
     * @alpha
     */
    workspace?: string;
    /**
     * Definition of insight widget to render.
     *
     * @public
     */
    widget: IInsightWidget;
    /**
     * An insight to render.
     *
     * @remarks
     * Note: the insight object provided here represents the insight as it is stored on the backend. It does
     * not reflect dashboard filters that should be applied when computing data for this insight.
     *
     * Use the `useWidgetFilters()` to obtain filters to use on this insight. Use those filters to replace
     * all insight filters using `insightSetFilters()` function available in `@gooddata/sdk-model`.
     *
     * @public
     */
    insight: IInsight;
    /**
     * Error component to use when insight rendering fails for any reason.
     *
     * @alpha
     */
    ErrorComponent: ComponentType<IErrorProps>;
    /**
     * Loading component to use while loading and preparing data to render.
     *
     * @alpha
     */
    LoadingComponent: ComponentType<ILoadingProps>;
    /**
     * @alpha
     */
    clientHeight?: number;
    /**
     * @alpha
     */
    clientWidth?: number;
    /**
     * @alpha
     */
    onDrill?: OnWidgetDrill;
    /**
     * @alpha
     */
    onDrillDown?: OnDrillDownSuccess;
    /**
     * @alpha
     */
    onDrillToInsight?: OnDrillToInsightSuccess;
    /**
     * @alpha
     */
    onDrillToDashboard?: OnDrillToDashboardSuccess;
    /**
     * @alpha
     */
    onDrillToAttributeUrl?: OnDrillToAttributeUrlSuccess;
    /**
     * @alpha
     */
    onDrillToCustomUrl?: OnDrillToCustomUrlSuccess;
    /**
     * @alpha
     */
    onError?: OnError;
    /**
     * @alpha
     */
    onLoadingChanged?: OnLoadingChanged;
    /**
     * @alpha
     */
    onExportReady?: OnExportReady;
    /**
     * @internal
     */
    pushData?: (data: IPushData) => void;
}

/**
 * Set of functions you can use to customize how KPIs are rendered.
 *
 * @public
 */
export declare interface IDashboardKpiCustomizer {
    /**
     * Register a provider for React components to render insights.
     *
     * @remarks
     * A provider takes the insight and
     * widget that it is part of as input and is expected to return a React component that should be
     * used to render that insight.
     *
     * If the provider returns `undefined` then:
     *
     * -  if there are other providers registered, they will be called to see if they can provide
     *    a component to render the insight
     * -  if there are no other providers registered, the default, built-in component will be used.
     *
     * You may register multiple providers. They will be evaluated in the order you register them.
     *
     * @param provider - provider to register
     * @returns self, for call chaining sakes
     */
    withCustomProvider(provider: OptionalKpiComponentProvider): IDashboardKpiCustomizer;
    /**
     * Register a factory for insight decorator providers.
     *
     * @remarks
     * Decorators are a way to add customizations or embellishments on top
     * of an existing component. Decorators are more complex to write because they need to work with the component
     * they should decorate and add 'something' on top of that component.
     *
     * This is best illustrated on an example:
     *
     * @example
     * ```
     * withCustomDecorator((next) => {
     *     return (kpi, widget) => {
     *         if (some_condition_to_prevent_decoration) {
     *             return undefined;
     *         }
     *
     *         function MyCustomDecorator(props) {
     *              const Decorated = next(kpi, widget);
     *
     *              return (
     *                  <div>
     *                      <p>My Custom Decoration</p>
     *                      <Decorated {...props}/>
     *                  </div>
     *              )
     *         }
     *
     *         return MyCustomDecorator;
     *     }
     * })
     * ```
     *
     * The above shows how to register a decorator that will use some condition to determine whether particular
     * insight is eligible for decoration. If yes, it will add some extra text in front of the insight. Decorator
     * defers rendering of the actual insight to the underlying provider.
     *
     * Note: the factory function that you specify will be called immediately at the registration time. The
     * provider that it returns will be called at render time.
     *
     * @param providerFactory - factory
     */
    withCustomDecorator(providerFactory: (next: KpiComponentProvider) => OptionalKpiComponentProvider): IDashboardKpiCustomizer;
}

/**
 * KPI Widget props
 *
 * @remarks
 * IMPORTANT: this interface is marked as public but not all properties in it are suitable for public consumption
 * yet. Please heed the per-property API maturity annotations; the alpha level APIs may change in a breaking way
 * in the next release.

 * @public
 */
export declare interface IDashboardKpiProps {
    /**
     * Backend to work with.
     *
     * @remarks
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the component MUST be rendered within an existing BackendContext.
     *
     * @alpha
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where the KPI exists.
     *
     * @remarks
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the component MUST be rendered within an existing WorkspaceContext.
     *
     * @alpha
     */
    workspace?: string;
    /**
     * The KPI to execute and display.
     *
     * @public
     */
    kpiWidget: IKpiWidget;
    /**
     * Specify alert set by the current user to this KPI.
     *
     * @public
     */
    alert?: IWidgetAlert;
    /**
     * Component to render if embedding fails.
     *
     * @alpha
     */
    ErrorComponent?: React_2.ComponentType<IErrorProps>;
    /**
     * Component to render while the KPI is loading.
     *
     * @alpha
     */
    LoadingComponent?: React_2.ComponentType<ILoadingProps>;
    /**
     * Specify a callback that will be triggered when the filters should be changed.
     * (e.g. to apply filters of a KPI alert to the whole dashboard)
     *
     * @alpha
     */
    onFiltersChange?: (filters: (IDashboardFilter | FilterContextItem)[], resetOthers?: boolean) => void;
    /**
     * Called when user triggers a drill on a visualization.
     *
     * @alpha
     */
    onDrill?: OnFiredDashboardDrillEvent;
    /**
     * Called in case of any error, either in the dashboard loading or any of the widgets execution.
     *
     * @alpha
     */
    onError?: OnError;
}

/**
 * Set of functions you can use to customize the layout of the dashboard rendered.
 *
 * @public
 */
export declare interface IDashboardLayoutCustomizer {
    /**
     * Register customization of the fluid layout that is used to render the dashboard.
     *
     * @remarks
     * At this point, you can register a function which will be called after dashboard component loads
     * the dashboard and before it starts initializing the layout itself. The function will be called
     * with two arguments:
     *
     * -  The actual dashboard layout
     * -  Customizer that allows the plugin to add new sections or section items
     *
     * Your customization function may introspect the original layout and then register its customizations.
     *
     * If the dashboard is not rendering fluid layout, then the registered function will not
     * be called.
     */
    customizeFluidLayout(fun: FluidLayoutCustomizationFn): IDashboardLayoutCustomizer;
}

/**
 * @alpha
 */
export declare interface IDashboardLayoutProps {
    ErrorComponent?: React.ComponentType<IErrorProps>;
    onFiltersChange?: (filters: (IDashboardFilter | FilterContextItem)[], resetOthers?: boolean) => void;
    onDrill?: OnFiredDashboardDrillEvent;
    onError?: OnError;
}

/**
 * Raw, low-level interface that the dashboard plugins need to implement.
 *
 * @remarks
 * Through this interface the plugin communicates its metadata and provides functions that will be
 * used by dashboard loader to obtain plugins customizations and contributions to apply on top of
 * the {@link Dashboard} Component.
 *
 * See {@link DashboardPluginV1}
 *
 * @public
 */
export declare interface IDashboardPluginContract_V1 extends DashboardPluginDescriptor {
    /**
     * Version of the SPI that is realized by the plugin.
     */
    readonly _pluginVersion: "1.0";
    /**
     * This function will be called right after the plugin's asset are loaded.
     *
     * @remarks
     * The plugin may do some early initialization and parameter parsing at this point.
     *
     * Note that the parameterization that can be specified for the dashboard-plugin link can be edited
     * freely by the dashboard creator - and may thus be incorrect.
     *
     * If this function is not specified, then any parameters specified on the dashboard-plugin link will be
     * ignored. If this function throws any exception, then your plugin will not be used on the dashboard.

     * @param ctx - dashboard context into which this plugin was loaded
     * @param parameters - parameters that the dashboard specifies on its link to this plugin; these parameters
     *  are
     */
    onPluginLoaded?(ctx: DashboardContext, parameters?: string): Promise<void> | void;
    /**
     * This function will be called before the dashboard initialization and rendering starts.
     *
     * @remarks
     * At this point, the plugin can use:
     *
     * -  the `customize` API to add its contribution to the dashboard; modify how rendering is done, add custom
     *    content and so on
     * -  the `eventing` API to add domain event handlers or subscribe to infrastructural events emitted
     *    by the dashboard
     *
     * Notes:
     *
     * -  The plugin code MAY hold onto the `eventing` API and use it event after the registration is finished
     *    to ad-hoc add or remove event handlers.
     * -  The plugin code SHOULD NOT perform any customizations using the `customize` API after its registration
     *    completes. All plugin customizations and contributions must be registered at this point. Trying to
     *    register additional customizations or contributions after the registration will be ignored.
     *
     * @param ctx - dashboard context into which this plugin was loaded
     * @param customize - API through which you can register dashboard customizations; the customize API
     *  should not be used after the registration completes
     * @param eventing - API through which plugin can add or remove domain event handlers or subscribe to
     *  infrastructural events; it is safe to hold onto the eventing API and use it at later points to
     *  add or remove event handlers
     */
    register(ctx: DashboardContext, customize: IDashboardCustomizer, eventing: IDashboardEventHandling): void;
    /**
     * This function will be called when user navigates away from the dashboard that uses an instance of
     * this plugin.
     *
     * @remarks
     * At this point, the plugin SHOULD perform any essential cleanup.
     *
     * @param ctx - dashboard context into which this plugin was loaded
     */
    onPluginUnload?(ctx: DashboardContext): Promise<void> | void;
}

/**
 * @public
 */
export declare interface IDashboardProps extends IDashboardBaseProps, IDashboardExtensionProps {
    children?: JSX.Element | ((dashboard: any) => JSX.Element);
    /**
     * Override the persisted dashboard. This is mainly useful for internal use cases.
     * @internal
     */
    persistedDashboard?: IDashboard;
}

/**
 * Base type for all dashboard queries. A dashboard query encapsulates how complex, read-only dashboard-specific logic
 * can be can be executed.
 *
 * @beta
 */
export declare interface IDashboardQuery {
    /**
     * Query type. Always starts with "GDC.DASH/QUERY".
     */
    readonly type: DashboardQueryType;
    /**
     * Correlation ID can be provided when creating a query. Events emitted during the query processing
     * will contain the same correlation ID.
     */
    readonly correlationId?: string;
}

/**
 * Describes dashboard component's query service.
 *
 * Query service is registered into the dashboard component's store and will be used to process actions
 * of type equal to the query name.
 *
 * The responsibility of query service is to perform complex, asynchronous domain logic that spans across the
 * component state and the data or metadata stored on the analytical backend - and then return a result.
 *
 * The dashboard component's infrastructure and hooks ensure that the query result (or query error) will be
 * pushed to the caller code.
 *
 * @internal
 */
export declare interface IDashboardQueryService<TQuery extends IDashboardQuery, TResult> {
    name: DashboardQueryType;
    generator: (ctx: DashboardContext, query: TQuery, refresh: boolean) => SagaIterator<TResult>;
    cache?: QueryCache<TQuery, TResult>;
}

/**
 * Subset of IDashboardProps required during initialization of the dashboard component's store.
 *
 * @internal
 */
export declare interface IDashboardStoreProviderProps {
    backend?: IAnalyticalBackend;
    workspace?: string;
    dashboard?: ObjRef | IDashboard;
    persistedDashboard?: IDashboard;
    filterContextRef?: ObjRef;
    eventHandlers?: DashboardEventHandler[];
    config?: DashboardConfig;
    permissions?: IWorkspacePermissions;
    onStateChange?: (state: DashboardState, dispatch: DashboardDispatch) => void;
    onEventingInitialized?: (registerEventHandler: (handler: DashboardEventHandler) => void, unregisterEventHandler: (handler: DashboardEventHandler) => void) => void;
    additionalReduxContext?: React_2.Context<ReactReduxContextValue>;
    customizationFns?: DashboardModelCustomizationFns;
    widgetsOverlayFn?: WidgetsOverlayFn;
    initialRenderMode?: RenderMode;
    children?: React_2.ReactNode;
}

/**
 * @public
 */
export declare interface IDashboardThemingProps {
    /**
     * Theme to use.
     *
     * @remarks
     * Note: the theme can come either from this property or from ThemeContext or from the dashboard.
     * If you do not specify theme here, it will be taken from an existing ThemeContext or if there is no ThemeContext,
     * it will be loaded for the dashboard.
     */
    theme?: ITheme;
    /**
     * When true, disables the loading of the workspace theme and creation of a ThemeProvider (if there is none
     * already present in the parent scope).
     *
     * @remarks
     * Currently – for technical reasons – the ThemeProvider changes the theme
     * globally (i.e. the theme is NOT constrained inside of a ThemeProvider).
     *
     * Turn this property to true if you need to avoid the global aspect of the themes, or you do not want to use themes at all.
     *
     * Defaults to false.
     */
    disableThemeLoading?: boolean;
    /**
     * If provided it is called with loaded theme to allow its modification according to the app needs.
     *
     * @remarks
     * This is only applied to themes loaded from the backend, it is NOT applied to themes provided using
     * the "theme" prop.
     */
    themeModifier?: (theme: ITheme) => ITheme;
}

/**
 * Set of functions you can use to customize custom widgets.
 *
 * @public
 */
export declare interface IDashboardWidgetCustomizer {
    /**
     * Adds a new custom widget type.
     *
     * @remarks
     * Custom widget's can be used to render arbitrary content.
     *
     * The custom widget must be wrapped inside an element which sets the height and width CSS sizing
     * properties in order to align the behavior with the provided widget types.
     *
     * @param widgetType - unique type name of the custom widget; if plugins register multiple custom
     *  widgets for the same widget type, then the last-registered custom widget wins
     * @param Component - React component to use for rendering of the custom widget
     */
    addCustomWidget(widgetType: string, Component: CustomDashboardWidgetComponent): IDashboardWidgetCustomizer;
}

/**
 * @beta
 */
export declare interface IDashboardWidgetOverlay {
    /**
     * Overlay over widget is display
     *
     * @alpha
     */
    showOverlay: boolean;
    /**
     * Modifications type for widget
     *
     * @remarks
     * "insertedByPlugin"
     * Widget is inserted by plugin and is not originally in layout
     *
     * "modifiedByPlugin"
     * Widget is originally in layout but was modified by plugin by adding some decorators, tags, providers and so on
     *
     * @alpha
     */
    modification?: "insertedByPlugin" | "modifiedByPlugin";
}

/**
 * Dashboard widget props.
 *
 * @remarks
 * IMPORTANT: this interface is marked as public but not all properties in it are suitable for public consumption
 * yet. Please heed the per-property API maturity annotations; the alpha level APIs may change in a breaking way
 * in the next release.
 *
 * @public
 */
export declare interface IDashboardWidgetProps {
    /**
     * Backend to work with.
     *
     * @remarks
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the component MUST be rendered within an existing BackendContext.
     *
     * @alpha
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where the widget exists.
     *
     * @remarks
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the component MUST be rendered within an existing WorkspaceContext.
     *
     * @alpha
     */
    workspace?: string;
    /**
     * @public
     */
    widget?: ExtendedDashboardWidget;
    /**
     * Specify date data set to use when passing dashboard date filter to rendered visualization.
     *
     * @remarks
     * If not provided, the date filter will not be applied
     *
     * @public
     */
    dateDataset?: ObjRef;
    /**
     * Specify what attribute filters to ignore for this widget.
     *
     * @remarks
     * Those filters will not be passed to the rendered visualization.
     *
     * @public
     */
    ignoredAttributeFilters?: ObjRefInScope[];
    /**
     * Error component to use when insight rendering fails for any reason.
     *
     * @alpha
     */
    ErrorComponent: ComponentType<IErrorProps>;
    /**
     * Loading component to use while loading and preparing data to render.
     *
     * @alpha
     */
    LoadingComponent: ComponentType<ILoadingProps>;
    /**
     * @alpha
     */
    screen: ScreenSize;
    /**
     * @alpha
     */
    onDrill?: OnFiredDashboardDrillEvent;
    /**
     * @alpha
     */
    onError?: OnError;
    /**
     * @alpha
     */
    onFiltersChange?: (filters: (IDashboardFilter | FilterContextItem)[], resetOthers?: boolean) => void;
    /**
     * Callback that the component MUST call when the widget is clicked.
     *
     * @alpha
     */
    onWidgetClicked?: () => void;
    /**
     * Turn widget header on/off.
     *
     * @alpha
     */
    showHeader?: boolean;
    /**
     * Turn visibility of the interactions menu on/off.
     *
     * @alpha
     */
    showMenu?: boolean;
}

/**
 * Properties for {@link Dashboard} widgets overlay.
 *
 * @remarks
 * IMPORTANT: while this interface is marked as public, you also need to heed the maturity annotations
 * on each property. A lot of these properties are at this moment alpha level.
 *
 * @public
 */
export declare interface IDashboardWidgetsOverlayProps {
    /**
     * Provide settings for widgets overlay
     *
     * @alpha
     */
    widgetsOverlayFn?: WidgetsOverlayFn;
}

/**
 * Set of functions you can use to customize how date filters are rendered.
 *
 * @public
 */
export declare interface IDateFiltersCustomizer {
    /**
     * Register a provider for React components to render date filters.
     *
     * @remarks
     * A provider takes the date filter as input and is expected to return
     * a React component that should be used to render that filter.
     *
     * If the provider returns `undefined` then:
     *
     * -  if there are other providers registered, they will be called to see if they can provide
     *    a component to render the date filter
     * -  if there are no other providers registered, the default, built-in component will be used.
     *
     * You may register multiple providers. They will be evaluated in the order you register them.
     *
     * @param provider - provider to register
     * @returns self, for call chaining sakes
     */
    withCustomProvider(provider: OptionalDateFilterComponentProvider): IDateFiltersCustomizer;
}

/**
 * @internal
 */
export declare interface IDefaultDashboardToolbarButtonProps {
    icon: string;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    tooltip?: string;
}

/**
 * @internal
 */
export declare interface IDefaultDashboardToolbarGroupProps {
    title: string;
    children?: React_2.ReactNode;
}

/**
 * @internal
 */
export declare type IDraggableCreatePanelItemProps = {
    Component: CustomCreatePanelItemComponent;
    WrapCreatePanelItemWithDragComponent?: IWrapCreatePanelItemWithDragComponent;
    dragItem: DraggableItem;
    hideDefaultPreview?: boolean;
    disabled?: boolean;
};

/**
 * Implicit drill down context
 *
 * @alpha
 */
export declare interface IDrillDownContext {
    drillDefinition: IDrillDownDefinition;
    event: IDrillEvent;
}

/**
 * Information about the DrillDown interaction - the attribute that is next in the drill down hierarchy.
 * @beta
 */
export declare interface IDrillDownDefinition {
    type: "drillDown";
    /**
     * Local identifier of the attribute that triggered the drill down.
     */
    origin: LocalIdRef;
    /**
     * Target attribute display form for drill down.
     */
    target: ObjRef;
    /**
     * Title for the target attribute.
     */
    title?: string;
}

/**
 * Represent state item of widget reported available drill targets.
 *
 * @alpha
 */
export declare interface IDrillTargets {
    /**
     * Identifier of widget to which the drills belong.
     */
    identifier: Identifier;
    /**
     * URI of the widget to which the drills belong.
     */
    uri: string;
    /**
     * widget ref
     */
    ref: ObjRef;
    /**
     * widget reported available drill targets
     */
    availableDrillTargets?: IAvailableDrillTargets;
}

/**
 * @internal
 */
export declare interface IDrillToUrlPlaceholder {
    placeholder: string;
    identifier: string;
    toBeEncoded: boolean;
}

/**
 * @beta
 */
export declare interface IEditButtonProps {
    isVisible: boolean;
    isEnabled: boolean;
    onEditClick: () => void;
}

/**
 * @beta
 */
export declare interface IExecutionResultEnvelope {
    id: string;
    isLoading: boolean;
    executionResult?: IExecutionResult;
    error?: GoodDataSdkError;
    warnings?: IResultWarning[];
}

/**
 * @beta
 */
export declare type IExportConfig = ICsvExportConfig | IXlsxExportConfig;

/**
 * Set of functions you can use to customize some aspects of the FilterBar.
 *
 * @public
 */
export declare interface IFilterBarCustomizer {
    /**
     * Set the rendering mode of the FilterBar.
     *
     * @param mode - the mode to use, see {@link FilterBarRenderingMode} for info on individual values
     */
    setRenderingMode(mode: FilterBarRenderingMode): IFilterBarCustomizer;
}

/**
 * @alpha
 */
export declare interface IFilterBarProps {
    /**
     * Filters that are set for the dashboard.
     */
    filters: FilterContextItem[];
    /**
     * When value of an attribute filter that is part of the FilterBar changes, the filter bar MUST propagate the event
     * using this callback.
     *
     * @param filter - filter that has changed
     */
    onAttributeFilterChanged: (filter: IDashboardAttributeFilter) => void;
    /**
     * When value of a date filter that is part of the FilterBar changes, the filter bar MUST propagate the event
     * using this callback.
     *
     * @param filter - filter that has changed, undefined if All time date filter was selected
     * @param dateFilterOptionLocalId - localId of the {@link @gooddata/sdk-backend-spi#IDateFilterOption} selected
     */
    onDateFilterChanged: (filter: IDashboardDateFilter | undefined, dateFilterOptionLocalId?: string) => void;
    /**
     * Contains reference to default implementation of the filter bar. If you are implementing a custom
     * filter bar that decorates default filter bar, then use this component to render the default filter
     * bar.
     */
    DefaultFilterBar: ComponentType<IFilterBarProps>;
}

/**
 * Set of functions you can use to customize rendering of the filters.
 *
 * @public
 */
export declare interface IFiltersCustomizer {
    /**
     * Customize how rendering of date filters is done.
     */
    date(): IDateFiltersCustomizer;
    /**
     * Customize how rendering of attribute filters is done.
     */
    attribute(): IAttributeFiltersCustomizer;
}

/**
 * Set of functions you can use to customize the fluid layout of the dashboard rendered.
 *
 * @public
 */
export declare interface IFluidLayoutCustomizer {
    /**
     * Adds a new section with one or more custom widgets onto the fluid layout.
     *
     * @remarks
     * The section to add must not be empty - it must contain at least one item. Attempts to add empty sections
     * will be ignored and warnings will be reported.
     *
     * @param sectionIdx - index to add the new section at
     * @param section - section to add; note: customizer will make a deep copy of the item before adding it
     *  onto a dashboard. At this moment, the newly added items are read-only.
     */
    addSection(sectionIdx: number, section: IDashboardLayoutSection<ICustomWidget>): IFluidLayoutCustomizer;
    /**
     * Adds a new item containing a custom widget onto the dashboard.
     *
     * @remarks
     * New item will be added to
     * an existing section at index `sectionIdx` and within that section will be placed at `itemIdx`. The item
     * to add must contain a custom widget data. Attempts to add item that does not contain any widget data
     * will be ignored and warnings will be reported. Keep in mind that this can lead to further errors or
     * problems down the line if you are adding more items at specific indexes into the same section.
     *
     * Note: new items will be added into existing sections before new sections will be added using the
     * {@link IFluidLayoutCustomizer.addSection} method. Therefore,
     *
     * @param sectionIdx - index of section where to add the new item
     * @param itemIdx - index within the section where to add new item; you may specify -1 to add the
     *  item at the end of the section
     * @param item - item containing custom widget; note: customizer will make a deep copy of the item before adding it
     *  onto a dashboard. At this moment, the newly added items are read-only.
     */
    addItem(sectionIdx: number, itemIdx: number, item: IDashboardLayoutItem<ICustomWidget>): IFluidLayoutCustomizer;
}

/**
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpIgnoreAttributeFilter} operation.
 *
 * Dispatching this command will result in addition of one or more filters into Insight widget's attribute filter ignore-list.
 * Those attribute filters that use the provided displayForms for filtering will be ignored by the widget on top of any
 * other filters that are already ignored.
 *
 * Ignored attribute filters are not passed down to the insight and will not be used to filter that insight.
 *
 * The operation is idempotent - trying to ignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the insight widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be added to the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function ignoreFilterOnInsightWidget(ref: ObjRef, oneOrMoreDisplayForms: ObjRef | ObjRef[], correlationId?: string): ChangeInsightWidgetFilterSettings;

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpIgnoreAttributeFilter} operation.
 *
 * Dispatching this command will result in addition of one or more filters into KPI widget's attribute filter ignore-list.
 * Those attribute filters that use the provided displayForms for filtering will be ignored by the widget on top of any
 * other filters that are already ignored.
 *
 * Ignored attribute filters are not passed down to the KPI and will not be used to filter that KPI.
 *
 * The operation is idempotent - trying to ignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the KPI widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be added to the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function ignoreFilterOnKpiWidget(ref: ObjRef, oneOrMoreDisplayForms: ObjRef | ObjRef[], correlationId?: string): ChangeKpiWidgetFilterSettings;

/**
 * @internal
 */
export declare interface IImplicitDrillWithPredicates {
    drillDefinition: DashboardDrillDefinition;
    predicates: IHeaderPredicate[];
}

/**
 * Dashboard which is inaccessible by current user.
 *
 * @alpha
 */
export declare interface IInaccessibleDashboard extends IDashboardObjectIdentity {
    /**
     * Dashboard title
     */
    title: string;
    /**
     * Type of accessibility limitation
     */
    accessibilityLimitation?: DashboardAccessibilityLimitation;
}

/**
 * Insight body props.
 *
 * @alpha
 */
export declare interface IInsightBodyProps extends Partial<IVisualizationCallbacks> {
    /**
     * Backend to work with.
     */
    backend: IAnalyticalBackend;
    /**
     * Workspace where the insight exists.
     */
    workspace: string;
    /**
     * The insight to render.
     */
    insight: IInsight;
    /**
     * Definition of insight widget to render.
     */
    widget: IInsightWidget;
    /**
     * Configure chart drillability; e.g. which parts of the charts can be clicked.
     */
    drillableItems: ExplicitDrill[] | undefined;
    /**
     * Configure color palette to use for the chart. If you do not specify this, then the palette will be
     * obtained from style settings stored on the backend.
     */
    colorPalette: IColorPalette | undefined;
    /**
     * Additional config that should be passed to the underlying visualization.
     */
    config: {
        mapboxToken?: string;
        separators?: ISeparators;
        forceDisableDrillOnAxes?: boolean;
        isExportMode?: boolean;
    };
    /**
     * Locale to use for localization of texts appearing in the chart.
     *
     * Note: text values coming from the data itself are not localized.
     */
    locale: ILocale;
    /**
     * Component to render if embedding fails.
     */
    ErrorComponent: React.ComponentType<IErrorProps>;
    /**
     * Component to render while the insight is loading.
     */
    LoadingComponent: React.ComponentType<ILoadingProps>;
    /**
     * The current user settings.
     */
    settings: IUserWorkspaceSettings | undefined;
}

/**
 * @internal
 */
export declare type IInsightDraggingComponentProps = {
    itemType: "insight";
    item: InsightDraggableItem;
};

/**
 * @internal
 */
export declare interface IInsightListProps {
    WrapInsightListItemWithDragComponent?: IWrapInsightListItemWithDragComponent;
    height?: number;
    width?: number;
    searchAutofocus?: boolean;
    renderItem?: (props: IRenderListItemProps<IInsight>) => JSX.Element;
    selectedRef?: ObjRef;
    onSelect?: (insight: IInsight) => void;
    enableDescriptions?: boolean;
}

/**
 * @beta
 */
export declare type IInsightMenuItem = IInsightMenuItemButton | IInsightMenuItemSeparator | IInsightMenuSubmenu;

/**
 * @beta
 */
export declare interface IInsightMenuItemButton {
    type: "button";
    itemId: string;
    itemName: string;
    onClick?: (e: MouseEvent_2) => void;
    /**
     * If specified, the value is shown on hover of the item as a tooltip.
     */
    tooltip?: string;
    disabled?: boolean;
    icon?: JSX.Element | string;
    /**
     * Additional class names to be applied to the item.
     */
    className?: string;
}

/**
 * @beta
 */
export declare interface IInsightMenuItemSeparator {
    type: "separator";
    itemId: string;
}

/**
 * @beta
 */
export declare interface IInsightMenuSubmenu {
    type: "submenu";
    itemId: string;
    itemName: string;
    /** @alpha */
    SubmenuComponent: ComponentType<{
        widget: IInsightWidget;
    }>;
    /**
     * If specified, the value is shown on hover of the item as a tooltip.
     */
    tooltip?: string;
    disabled?: boolean;
    icon?: JSX.Element | string;
    /**
     * Additional class names to be applied to the item.
     */
    className?: string;
}

/**
 * @internal
 */
export declare type IKpiDraggingComponentProps = {
    itemType: "kpi";
    item: KpiDraggableItem;
};

/**
 * Coordinates of an item in a layout.
 * @beta
 */
export declare interface ILayoutCoordinates {
    /**
     * 0-based index of the section the item is in.
     */
    sectionIndex: number;
    /**
     * 0-based index of the item within the section.
     */
    itemIndex: number;
}

/**
 * Legacy Dashboard (a.k.a. PP Dashboard).
 * @alpha
 */
export declare interface ILegacyDashboard {
    /**
     * Object ref
     */
    readonly ref: ObjRef;
    /**
     * Object uri
     */
    readonly uri: string;
    /**
     * Object identifier
     */
    readonly identifier: string;
    /**
     * Title of the legacy dashboard
     */
    readonly title: string;
    /**
     * Tabs included in the legacy dashboard
     */
    readonly tabs: ILegacyDashboardTab[];
}

/**
 * Legacy Dashboard (a.k.a. PP Dashboard) tab.
 * @alpha
 */
export declare interface ILegacyDashboardTab {
    /**
     * Title of the tab
     */
    readonly title: string;
    /**
     * Unique identifier of the tab
     */
    readonly identifier: string;
}

/**
 * @alpha
 */
export declare interface ILockedStatusProps {
    isLocked: boolean;
    theme?: ITheme;
}

/**
 * @alpha
 */
export declare interface IMenuButtonConfiguration {
    /**
     * Specify custom items that will be in the menu.
     *
     * @remarks
     * Using this setting fully overrides the menu items. The default items will not be shown.
     */
    menuItems?: ReadonlyArray<IMenuButtonItem>;
    /**
     * Specify additional menu items to add on top of the default items.
     *
     * @remarks
     * If specified, this should be a list of tuples: index to add item at, the menu item to add. If you want
     * to add item at the end of the list, use index `-1`.
     */
    additionalMenuItems?: ReadonlyArray<[number, IMenuButtonItem]>;
}

/**
 * @alpha
 */
export declare type IMenuButtonItem = IMenuButtonItemButton | IMenuButtonItemSeparator | IMenuButtonItemHeader;

/**
 * @alpha
 */
export declare interface IMenuButtonItemButton extends IMenuItemCommonProps {
    type: "button";
    itemName: string;
    onClick?: () => void;
    /**
     * If specified, the value is shown on hover of the item as a tooltip.
     */
    tooltip?: string;
    disabled?: boolean;
}

/**
 * @alpha
 */
export declare interface IMenuButtonItemHeader extends IMenuItemCommonProps {
    type: "header";
    itemName: string;
}

/**
 * @alpha
 */
export declare interface IMenuButtonItemSeparator extends IMenuItemCommonProps {
    type: "separator";
}

/**
 * @beta
 */
export declare interface IMenuButtonItemsVisibility {
    /**
     * If set to true, the Save as new button will be visible. Defaults to false.
     */
    saveAsNewButton?: boolean;
    /**
     * If set to true, the Export to PDF button will be visible. Defaults to true.
     */
    pdfExportButton?: boolean;
    /**
     * If set to true, the Schedule emailing button will be visible. Defaults to true.
     */
    scheduleEmailButton?: boolean;
    /**
     * If set to true, the Delete button will be visible. Defaults to true.
     */
    deleteButton?: boolean;
}

/**
 * @alpha
 */
export declare interface IMenuButtonProps {
    /**
     * Items that will be in the menu.
     */
    menuItems: ReadonlyArray<IMenuButtonItem>;
    DefaultMenuButton: CustomMenuButtonComponent;
}

/**
 * @alpha
 */
export declare interface IMenuItemCommonProps {
    itemId: string;
    visible?: boolean;
    className?: string;
}

/**
 * Loads dashboard from analytical backend.
 *
 * @public
 */
export declare interface InitializeDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INITIALIZE";
    readonly payload: InitializeDashboardPayload;
}

/**
 * Creates the InitializeDashboard command.
 *
 * @remarks
 * Dispatching this command will result in the load of all the essential data from the backend and initializing
 * the state of Dashboard to a point where the dashboard can be rendered.
 *
 * Note that the command takes the dashboard to initialize from context - from the properties of the Dashboard
 * component in which it runs:
 *
 * -  If Dashboard component is referencing an existing, persisted dashboard, then the dashboard will be loaded and
 *    rendered.
 *
 * -  If Dashboard component does not reference any dashboard, then the component will initialize for an empty
 *    dashboard with default filter setup.
 *
 * In both cases the essential configuration, permissions and additional metadata gets loaded from the backend.
 *
 * @param config - specify configuration to use for for the Dashboard; you MAY provide partial configuration.
 *  During the LoadDashboard processing the Dashboard component will resolve all the missing parts by reading them
 *  from the backend.
 * @param permissions - specify permissions to use when determining whether the user is eligible for some
 *  actions with the dashboard; if you do not specify permissions Dashboard component will load the permissions
 *  from the backend.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @public
 */
export declare function initializeDashboard(config?: DashboardConfig, permissions?: IWorkspacePermissions, correlationId?: string): InitializeDashboard;

/**
 * Payload of the {@link InitializeDashboard} command.
 * @public
 */
export declare interface InitializeDashboardPayload {
    readonly config?: DashboardConfig;
    readonly permissions?: IWorkspacePermissions;
    /**
     * @internal
     */
    readonly persistedDashboard?: IDashboard;
}

/**
 * Creates the InitializeDashboard command with the persisted dashboard overridden.
 *
 * @remarks
 * Dispatching this command will result in the load of all the essential data from the backend and initializing
 * the state of Dashboard to a point where the dashboard can be rendered.
 *
 * Note that the command takes the dashboard to initialize from context - from the properties of the Dashboard
 * component in which it runs:
 *
 * -  If Dashboard component is referencing an existing, persisted dashboard, then the dashboard will be loaded and
 *    rendered.
 *
 * -  If Dashboard component does not reference any dashboard, then the component will initialize for an empty
 *    dashboard with default filter setup.
 *
 * In both cases the essential configuration, permissions and additional metadata gets loaded from the backend.
 *
 * @param config - specify configuration to use for for the Dashboard; you MAY provide partial configuration.
 *  During the LoadDashboard processing the Dashboard component will resolve all the missing parts by reading them
 *  from the backend.
 * @param permissions - specify permissions to use when determining whether the user is eligible for some
 *  actions with the dashboard; if you do not specify permissions Dashboard component will load the permissions
 *  from the backend.
 * @param persistedDashboard - dashboard to use for the persisted dashboard state slice in case it needs to be
 *  different from the dashboard param
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @internal
 */
export declare function initializeDashboardWithPersistedDashboard(config?: DashboardConfig, permissions?: IWorkspacePermissions, persistedDashboard?: IDashboard, correlationId?: string): InitializeDashboard;

/**
 * The initial load of the dashboard will use this correlation id.
 *
 * @beta
 */
export declare const InitialLoadCorrelationId = "initialLoad";

/**
 * @internal
 */
export declare const INSIGHT_PLACEHOLDER_WIDGET_ID = "__insightPlaceholder__";

/**
 * @alpha
 */
export declare interface InsightAttributesMeta {
    /**
     * High-level break down of how different display forms are used in the insight.
     */
    usage: InsightDisplayFormUsage;
    /**
     * List of metadata objects describing display forms used by the insight.
     */
    displayForms: ReadonlyArray<IAttributeDisplayFormMetadataObject>;
    /**
     * List of attributes to which the used display forms belong.
     */
    attributes: ReadonlyArray<IAttributeMetadataObject>;
}

/**
 * @alpha
 */
export declare type InsightBodyComponentProvider = (insight: IInsight, widget: IInsightWidget) => CustomInsightBodyComponent;

/**
 * @public
 */
export declare type InsightComponentProvider = (insight: IInsight, widget: IInsightWidget) => CustomDashboardInsightComponent;

/**
 * @internal
 */
export declare type InsightComponentSetProvider = (defaultComponentSet: InsightWidgetComponentSet) => InsightWidgetComponentSet;

/**
 * The insight date datasets is a digest of information related to what date datasets are used by the insight and
 * what date datasets are also relevant to the insight.
 *
 * @remarks
 * The relevancy of date datasets is determined by relation of the entities used by the insight (facts, metric, attributes)
 * and the data datasets in the workspace's LDM.
 *
 * The data included herein can be used to select an appropriate date dataset to filter the insight on a dashboard.
 *
 * The `mostImportantFromInsight` date dataset - if available, should be typically picked to use for date filtering. If
 * it is not available (meaning the insight does not directly use anything related to date datasets) then the `dateDatasetsOrdered`
 * can be used to pick the date dataset for filtering.
 *
 * @alpha
 */
export declare interface InsightDateDatasets {
    /**
     * Date datasets that are available for filtering of the insight. The available datasets are obtained by inspecting
     * the LDM entities used in the insight and how they relate to date datasets in the workspace's logical data model.
     */
    readonly dateDatasets: ReadonlyArray<ICatalogDateDataset>;
    /**
     * The contents of the `dateDatasets` prop that are ordered according to the relevance. The most relevant and thus
     * most recommended date dataset is first.
     */
    readonly dateDatasetsOrdered: ReadonlyArray<ICatalogDateDataset>;
    /**
     * Date datasets that the insight references in its date filters.
     *
     * Will be empty if the insight does not have any date filters.
     */
    readonly usedInDateFilters: ReadonlyArray<ICatalogDateDataset>;
    /**
     * Date datasets that the insight references in the attributes used to slice and dice the results.
     *
     * The order of appearance matches the order in which display forms from the data sets appear in the {@link InsightAttributesMeta}'s
     * `usage.inAttributes`. If some display form does not belong to a date dataset, then the element will be undefined.
     */
    readonly usedInAttributes: ReadonlyArray<ICatalogDateDataset | undefined>;
    /**
     * Date datasets that the insight references in the attribute filters.
     *
     * The order of appearance matches the order in which attribute display forms used for filtering appear in the {@link InsightAttributesMeta}'s
     * `usage.inFilters`. If some display form does not belong to a date dataset, then the element will be undefined.
     */
    readonly usedInAttributeFilters: ReadonlyArray<ICatalogDateDataset | undefined>;
    /**
     * Pin-points the 'most important' date dataset referenced by the insight itself. This may be undefined if the
     * insight does not use any date filtering or does not use any date attribute display form's to filter or slice or
     * dice the results.
     *
     * The importance is evaluated as follows:
     *
     * 1.  Date datasets used directly in date filters have highest importance. Dataset from first-found filter will be used
     * 2.  Date datasets that own the display forms used to slice or dice the insight's data have the second highest importance. Dataset from first-found attribute will be used.
     * 3.  Date datasets that own the display forms used for attribute-filtering the insight have the least important. Dataset from first-found attribute filter will be used.
     */
    readonly mostImportantFromInsight: ICatalogDateDataset | undefined;
    /**
     * A mapping between original date dataset title and a nicely formatted title that is suitable to display to the end-user. All date datasets
     * that figure in the result structure have their titles included in this mapping
     */
    readonly dateDatasetDisplayNames: Record<string, string>;
    /**
     * All date datasets that can be used to filter the insight. This list is union of all the categorized
     * date datasets listed in this result.
     */
    readonly allAvailableDateDatasets: ICatalogDateDataset[];
}

/**
 * @internal
 */
export declare type InsightDraggableComponent = {
    DraggingComponent?: InsightDraggingComponent;
    type: "insight";
};

/**
 * @internal
 */
export declare type InsightDraggableItem = BaseDraggableMovingItem & {
    type: "insight";
    insight: IInsight;
};

/**
 * @internal
 */
export declare type InsightDraggableListItem = BaseDraggableLayoutItem & {
    type: "insightListItem";
    insight: IInsight;
};

/**
 * @internal
 */
export declare type InsightDraggingComponent = ComponentType<IInsightDraggingComponentProps>;

/**
 * @internal
 */
export declare const InsightList: React_2.FC<IInsightListProps>;

/**
 * @alpha
 */
export declare type InsightMenuButtonComponentProvider = (insight: IInsight, widget: IInsightWidget) => CustomDashboardInsightMenuButtonComponent;

/**
 * @alpha
 */
export declare type InsightMenuComponentProvider = (insight: IInsight, widget: IInsightWidget) => CustomDashboardInsightMenuComponent;

/**
 * @beta
 */
export declare type InsightMenuItemsProvider = (insight: IInsight, widget: IInsightWidget, defaultItems: IInsightMenuItem[], closeMenu: () => void, renderMode: RenderMode) => IInsightMenuItem[];

/**
 * @internal
 */
export declare type InsightMenuTitleComponentProvider = (insight: IInsight, widget: IInsightWidget) => CustomDashboardInsightMenuTitleComponent;

/**
 * @internal
 */
export declare type InsightPlaceholderDraggableItem = BaseDraggableLayoutItem & {
    type: "insight-placeholder";
};

/**
 * @alpha
 */
export declare interface InsightPlaceholderWidget extends ICustomWidget {
    readonly customType: "gd-insight-placeholder";
}

/**
 * Given results of a query of date datasets available to use for filtering an insight, this function will
 * pick a single date dataset to use.
 *
 * @param queryResult - insight date datasets query result
 * @alpha
 */
export declare function insightSelectDateDataset(queryResult: InsightDateDatasets): ICatalogDateDataset | undefined;

/**
 * Builder for a {@link @gooddata/sdk-model#IInsightWidgetBase} object.
 *
 * @remarks
 * The builder without any modifications returns a widget with all mandatory data. To apply
 * additional information use builder functions.
 *
 * @internal
 */
export declare class InsightWidgetBuilder {
    widget: {
        -readonly [K in keyof IInsightWidgetBase]: IInsightWidgetBase[K];
    };
    constructor(insightRef: ObjRef, title: string);
    withIgnoreDashboardFilters(ignoreDashboardFilters: IDashboardFilterReference[]): this;
    withDrills(drills: InsightDrillDefinition[]): this;
    withTitle(title: string): this;
    withDescription(description: string): this;
    withConfiguration(configuration: IInsightWidgetConfiguration): this;
    withProperties(properties: VisualizationProperties): this;
    build(): IInsightWidgetBase;
}

/**
 * Definition of Insight widget
 * @internal
 */
export declare type InsightWidgetComponentSet = CustomComponentBase<IDashboardInsightProps, Parameters<InsightComponentProvider>> & DraggableComponent & Partial<CreatableByDragComponent> & Partial<CreatablePlaceholderComponent<IDashboardWidgetProps>> & ConfigurableWidget<IInsightWidget>;

/**
 * @internal
 */
export declare type InsightWidgetModifications = (builder: InsightWidgetBuilder) => InsightWidgetBuilder;

/**
 * @alpha
 */
export declare interface InvalidCustomUrlDrillParameterInfo {
    widgetId: Identifier;
    widgetUri: Uri;
    widgetRef: ObjRef;
    drillsWithInvalidParametersLocalIds: string[];
    showMessage: boolean;
}

/**
 * @internal
 */
export declare interface IParentWithConnectingAttributes {
    /**
     * Local identifier of the parent filter.
     */
    filterLocalId: string;
    /**
     * Common attributes with the currently opened attribute filter.
     */
    connectingAttributes: IConnectingAttribute[];
}

/**
 * @alpha
 */
export declare interface IResolvedAttributeFilterValues {
    [elementRef: string]: string | undefined | null;
}

/**
 * @alpha
 */
export declare interface IResolvedDateFilterValue {
    from: string;
    to: string;
}

/**
 * Resolved values types for all resolvable filters.
 *
 * @alpha
 */
export declare interface IResolvedFilterValues {
    dateFilters: ResolvedDateFilterValues;
    attributeFilters: {
        [filterStringRef: string]: IResolvedAttributeFilterValues;
    };
}

/**
 * Tests whether an object is any type of placeholder widgets.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isAnyPlaceholderWidget(obj: unknown): obj is PlaceholderWidget | InsightPlaceholderWidget | KpiPlaceholderWidget;

/**
 * @internal
 */
export declare function isAttributeFilterDraggableItem(item: any): item is AttributeFilterDraggableItem;

/**
 * @internal
 */
export declare function isAttributeFilterPlaceholderDraggableItem(item: any): item is AttributeFilterPlaceholderDraggableItem;

/**
 * @alpha
 */
export declare interface ISaveAsDialogProps {
    /**
     * Is SaveAs dialog visible?
     */
    isVisible?: boolean;
    /**
     * Callback to be called, when user submits the save as dialog.
     */
    onSubmit?: (title: string, switchToCopy?: boolean) => void;
    /**
     * Callback to be called, when user closes the save as dialog.
     */
    onCancel?: () => void;
    /**
     * Callback to be called, when error occurs.
     */
    onError?: (error: GoodDataSdkError) => void;
    /**
     * Callback to be called, when save as finished successfully.
     */
    onSuccess?: (dashboard: IDashboard) => void;
}

/**
 * @beta
 */
export declare interface ISaveAsNewButtonProps {
    isVisible: boolean;
    onSaveAsNewClick: () => void;
}

/**
 * @beta
 */
export declare interface ISaveButtonProps {
    isVisible: boolean;
    isEnabled: boolean;
    isSaving: boolean;
    buttonTitle: MessageDescriptor;
    buttonValue: MessageDescriptor;
    onSaveClick: () => void;
}

/**
 * @internal
 */
export declare function isBaseDraggableLayoutItem(item: any): item is BaseDraggableMovingItem;

/**
 * @internal
 */
export declare function isBaseDraggableMovingItem(item: any): item is BaseDraggableMovingItem;

/**
 * Tests whether the provided object is an instance of {@link BrokenAlertAttributeFilterInfo}
 *
 * @param item - object to test
 *
 * @alpha
 */
export declare function isBrokenAlertAttributeFilterInfo(item: IBrokenAlertFilterBasicInfo): item is BrokenAlertAttributeFilterInfo;

/**
 * Tests whether the provided object is an instance of {@link BrokenAlertDateFilterInfo}
 *
 * @param item - object to test
 *
 * @alpha
 */
export declare function isBrokenAlertDateFilterInfo(item: IBrokenAlertFilterBasicInfo): item is BrokenAlertDateFilterInfo;

/**
 * @alpha
 */
export declare interface IScheduledEmailDialogProps {
    /**
     * Is scheduled e-mail dialog visible?
     */
    isVisible?: boolean;
    /**
     * Callback to be called, when user submits the scheduled email dialog.
     */
    onSubmit?: (scheduledEmailDefinition: IScheduledMailDefinition) => void;
    /**
     * Callback to be called, when user save the existing scheduled email.
     */
    onSave?: (scheduledEmailDefinition: IScheduledMailDefinition) => void;
    /**
     * Callback to be called, when user closes the scheduled email dialog.
     */
    onCancel?: () => void;
    /**
     * Callback to be called, when error occurs.
     */
    onError?: (error: GoodDataSdkError) => void;
    /**
     * Callback to be called, when scheduling finishes successfully.
     */
    onSuccess?: () => void;
    /**
     * Callback to be called, when error occurs.
     */
    onSaveError?: (error: GoodDataSdkError) => void;
    /**
     * Callback to be called, when scheduling finishes successfully.
     */
    onSaveSuccess?: () => void;
    /**
     * Schedule to be edited in the dialog.
     */
    editSchedule?: IScheduledMail;
    /**
     * Users in workspace
     */
    users: IWorkspaceUser[];
}

/**
 * @alpha
 */
export declare interface IScheduledEmailManagementDialogProps {
    /**
     * Is scheduled email management dialog visible?
     */
    isVisible?: boolean;
    /**
     * Callback to be called, when user adds new scheduled email item.
     */
    onAdd?: () => void;
    /**
     * Callback to be called, when user clicks scheduled email item for editing.
     */
    onEdit?: (scheduledMail: IScheduledMail, users: IWorkspaceUser[]) => void;
    /**
     * Callback to be called, when user closes the scheduled email management dialog.
     */
    onClose?: () => void;
    /**
     * Callback to be called, when scheduled email is deleted.
     */
    onDeleteSuccess?: () => void;
    /**
     * Callback to be called, when emails fail to load.
     */
    onLoadError?: (error: GoodDataSdkError) => void;
    /**
     * Callback to be called, when schedule fails to delete.
     */
    onDeleteError?: (error: GoodDataSdkError) => void;
}

/**
 * Tests whether the provided object is an instance of {@link CreateInsightRequested}.
 *
 * @param obj - object to test
 * @internal
 */
export declare const isCreateInsightRequested: (obj: unknown) => obj is CreateInsightRequested;

/**
 * Tests whether object is an instance of {@link ICustomDashboardEvent}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isCustomDashboardEvent(obj: unknown): obj is ICustomDashboardEvent;

/**
 * Type-guard that tests whether an object is an instance of {@link ICustomWidget}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isCustomWidget(obj: unknown): obj is ICustomWidget;

/**
 * Type-guard that tests whether an object is an instance of {@link ICustomWidgetBase}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isCustomWidgetBase(obj: unknown): obj is ICustomWidgetBase;

/**
 * Type-guard that tests whether an object is an instance of {@link ICustomWidgetDefinition}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isCustomWidgetDefinition(obj: unknown): obj is ICustomWidgetDefinition;

/**
 * Tests whether the provided object is an instance of {@link DashboardAlertCreated}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAlertCreated: (obj: unknown) => obj is DashboardAlertCreated;

/**
 * Tests whether the provided object is an instance of {@link DashboardAlertsRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAlertsRemoved: (obj: unknown) => obj is DashboardAlertsRemoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardAlertUpdated}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAlertUpdated: (obj: unknown) => obj is DashboardAlertUpdated;

/**
 * Tests whether the provided object is an instance of {@link DashboardAsyncRenderRequested}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardAsyncRenderRequested: (obj: unknown) => obj is DashboardAsyncRenderRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardAsyncRenderResolved}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardAsyncRenderResolved: (obj: unknown) => obj is DashboardAsyncRenderResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterAdded}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAttributeFilterAdded: (obj: unknown) => obj is DashboardAttributeFilterAdded;

/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterMoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAttributeFilterMoved: (obj: unknown) => obj is DashboardAttributeFilterMoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterParentChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAttributeFilterParentChanged: (obj: unknown) => obj is DashboardAttributeFilterParentChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAttributeFilterRemoved: (obj: unknown) => obj is DashboardAttributeFilterRemoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterSelectionChanged}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardAttributeFilterSelectionChanged: (obj: unknown) => obj is DashboardAttributeFilterSelectionChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeSelectionModeChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAttributeFilterSelectionModeChanged: (obj: unknown) => obj is DashboardAttributeSelectionModeChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeTitleChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardAttributeFilterTitleChanged: (obj: unknown) => obj is DashboardAttributeTitleChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardCommandFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardCommandFailed: (obj: unknown) => obj is DashboardCommandFailed<any>;

/**
 * Tests whether the provided object is an instance of {@link DashboardCommandRejected}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardCommandRejected: (obj: unknown) => obj is DashboardCommandRejected;

/**
 * Tests whether the provided object is an instance of {@link DashboardCommandStarted}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardCommandStarted: (obj: unknown) => obj is DashboardCommandStarted<any>;

/**
 * Tests whether the provided object is an instance of {@link DashboardCopySaved}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardCopySaved: (obj: unknown) => obj is DashboardCopySaved;

/**
 * Tests whether the provided object is an instance of {@link DashboardDateFilterSelectionChanged}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardDateFilterSelectionChanged: (obj: unknown) => obj is DashboardDateFilterSelectionChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardDeinitialized}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardDeinitialized: (obj: unknown) => obj is DashboardDeinitialized;

/**
 * Tests whether the provided object is an instance of {@link DashboardDeleted}
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardDeleted: (obj: unknown) => obj is DashboardDeleted;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillableItemsChanged}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillableItemsChanged: (obj: unknown) => obj is DashboardDrillableItemsChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillDownRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillDownRequested: (obj: unknown) => obj is DashboardDrillDownRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillDownResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillDownResolved: (obj: unknown) => obj is DashboardDrillDownResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillRequested: (obj: unknown) => obj is DashboardDrillRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillResolved: (obj: unknown) => obj is DashboardDrillResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToAttributeUrlRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToAttributeUrlRequested: (obj: unknown) => obj is DashboardDrillToAttributeUrlRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToAttributeUrlResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToAttributeUrlResolved: (obj: unknown) => obj is DashboardDrillToAttributeUrlResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToCustomUrlRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToCustomUrlRequested: (obj: unknown) => obj is DashboardDrillToCustomUrlRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToCustomUrlResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToCustomUrlResolved: (obj: unknown) => obj is DashboardDrillToCustomUrlResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToDashboardRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToDashboardRequested: (obj: unknown) => obj is DashboardDrillToDashboardRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToDashboardResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToDashboardResolved: (obj: unknown) => obj is DashboardDrillToDashboardResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToInsightRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToInsightRequested: (obj: unknown) => obj is DashboardDrillToInsightRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToInsightResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToInsightResolved: (obj: unknown) => obj is DashboardDrillToInsightResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToLegacyDashboardRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToLegacyDashboardRequested: (obj: unknown) => obj is DashboardDrillToLegacyDashboardRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToLegacyDashboardResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDashboardDrillToLegacyDashboardResolved: (obj: unknown) => obj is DashboardDrillToLegacyDashboardResolved;

/**
 * Tests whether object is an instance of {@link IDashboardEvent}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isDashboardEvent(obj: unknown): obj is IDashboardEvent;

/**
 * Tests whether object is an instance of {@link IDashboardEvent} or {@link ICustomDashboardEvent}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isDashboardEventOrCustomDashboardEvent(obj: unknown): obj is IDashboardEvent | ICustomDashboardEvent;

/**
 * Tests whether the provided object is an instance of {@link DashboardExportToPdfRequested}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardExportToPdfRequested: (obj: unknown) => obj is DashboardExportToPdfRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardExportToPdfResolved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardExportToPdfResolved: (obj: unknown) => obj is DashboardExportToPdfResolved;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardFilter}.
 *
 * @alpha
 */
export declare function isDashboardFilter(obj: unknown): obj is IDashboardFilter;

/**
 * Tests whether the provided object is an instance of {@link DashboardFilterContextChanged}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardFilterContextChanged: (obj: unknown) => obj is DashboardFilterContextChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardInitialized}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardInitialized: (obj: unknown) => obj is DashboardInitialized;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetChanged: (obj: unknown) => obj is DashboardInsightWidgetChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetDescriptionChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetDescriptionChanged: (obj: unknown) => obj is DashboardInsightWidgetDescriptionChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetDrillsModified}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetDrillsModified: (obj: unknown) => obj is DashboardInsightWidgetDrillsModified;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetDrillsRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetDrillsRemoved: (obj: unknown) => obj is DashboardInsightWidgetDrillsRemoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetExportRequested}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetExportRequested: (obj: unknown) => obj is DashboardInsightWidgetExportRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetExportResolved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetExportResolved: (obj: unknown) => obj is DashboardInsightWidgetExportResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetFilterSettingsChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetFilterSettingsChanged: (obj: unknown) => obj is DashboardInsightWidgetFilterSettingsChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetHeaderChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetHeaderChanged: (obj: unknown) => obj is DashboardInsightWidgetHeaderChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetInsightSwitched}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetInsightSwitched: (obj: unknown) => obj is DashboardInsightWidgetInsightSwitched;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetRefreshed}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetRefreshed: (obj: unknown) => obj is DashboardInsightWidgetRefreshed;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetVisConfigurationChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetVisConfigurationChanged: (obj: unknown) => obj is DashboardInsightWidgetVisConfigurationChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetVisPropertiesChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardInsightWidgetVisPropertiesChanged: (obj: unknown) => obj is DashboardInsightWidgetVisPropertiesChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetChanged: (obj: unknown) => obj is DashboardKpiWidgetChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetComparisonChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetComparisonChanged: (obj: unknown) => obj is DashboardKpiWidgetComparisonChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetConfigurationChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetConfigurationChanged: (obj: unknown) => obj is DashboardKpiWidgetConfigurationChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDescriptionChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetDescriptionChanged: (obj: unknown) => obj is DashboardKpiWidgetDescriptionChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDrillRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetDrillRemoved: (obj: unknown) => obj is DashboardKpiWidgetDrillRemoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDrillSet}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetDrillSet: (obj: unknown) => obj is DashboardKpiWidgetDrillSet;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetFilterSettingsChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetFilterSettingsChanged: (obj: unknown) => obj is DashboardKpiWidgetFilterSettingsChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetHeaderChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetHeaderChanged: (obj: unknown) => obj is DashboardKpiWidgetHeaderChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetMeasureChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardKpiWidgetMeasureChanged: (obj: unknown) => obj is DashboardKpiWidgetMeasureChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutChanged: (obj: unknown) => obj is DashboardLayoutChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionAdded}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionAdded: (obj: unknown) => obj is DashboardLayoutSectionAdded;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionHeaderChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionHeaderChanged: (obj: unknown) => obj is DashboardLayoutSectionHeaderChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemMoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemMoved: (obj: unknown) => obj is DashboardLayoutSectionItemMoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemRemoved: (obj: unknown) => obj is DashboardLayoutSectionItemRemoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemReplaced}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemReplaced: (obj: unknown) => obj is DashboardLayoutSectionItemReplaced;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemsAdded}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemsAdded: (obj: unknown) => obj is DashboardLayoutSectionItemsAdded;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionMoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionMoved: (obj: unknown) => obj is DashboardLayoutSectionMoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionRemoved: (obj: unknown) => obj is DashboardLayoutSectionRemoved;

/**
 * Tests whether the provided object is an instance of {@link DashboardQueryCompleted}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardQueryCompleted: (obj: unknown) => obj is DashboardQueryCompleted<any, any>;

/**
 * Tests whether the provided object is an instance of {@link DashboardCommandFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardQueryFailed: (obj: unknown) => obj is DashboardQueryFailed;

/**
 * Tests whether the provided object is an instance of {@link DashboardQueryRejected}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardQueryRejected: (obj: unknown) => obj is DashboardQueryRejected;

/**
 * Tests whether the provided object is an instance of {@link DashboardQueryStarted}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardQueryStarted: (obj: unknown) => obj is DashboardQueryStarted;

/**
 * Tests whether the provided object is an instance of {@link DashboardRenamed}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardRenamed: (obj: unknown) => obj is DashboardRenamed;

/**
 * Tests whether the provided object is an instance of {@link DashboardRenderModeChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardRenderModeChanged: (obj: unknown) => obj is DashboardRenderModeChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardRenderRequested}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardRenderRequested: (obj: unknown) => obj is DashboardRenderRequested;

/**
 * Tests whether the provided object is an instance of {@link DashboardRenderResolved}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardRenderResolved: (obj: unknown) => obj is DashboardRenderResolved;

/**
 * Tests whether the provided object is an instance of {@link DashboardSaved}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardSaved: (obj: unknown) => obj is DashboardSaved;

/**
 * Tests whether the provided object is an instance of {@link DashboardScheduledEmailCreated}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardScheduledEmailCreated: (obj: unknown) => obj is DashboardScheduledEmailCreated;

/**
 * Tests whether the provided object is an instance of {@link DashboardScheduledEmailSaved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardScheduledEmailSaved: (obj: unknown) => obj is DashboardScheduledEmailSaved;

/**
 * Tests whether the provided object is an instance of {@link DashboardSharingChanged}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardSharingChanged: (obj: unknown) => obj is DashboardSharingChanged;

/**
 * Tests whether the provided object is an instance of {@link DashboardUserInteractionTriggered}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardUserInteractionTriggered: (obj: unknown) => obj is DashboardUserInteractionTriggered;

/**
 * Tests whether the provided object is an instance of {@link DashboardWasReset}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardWasReset: (obj: unknown) => obj is DashboardWasReset;

/**
 * Tests whether the provided object is an instance of {@link DashboardWidgetExecutionFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardWidgetExecutionFailed: (obj: unknown) => obj is DashboardWidgetExecutionFailed;

/**
 * Tests whether the provided object is an instance of {@link DashboardWidgetExecutionStarted}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardWidgetExecutionStarted: (obj: unknown) => obj is DashboardWidgetExecutionStarted;

/**
 * Tests whether the provided object is an instance of {@link DashboardWidgetExecutionSucceeded}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardWidgetExecutionSucceeded: (obj: unknown) => obj is DashboardWidgetExecutionSucceeded;

/**
 * Tests whether the provided object is an instance of {@link DateFilterValidationFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDateFilterValidationFailed: (obj: unknown) => obj is DateFilterValidationFailed;

/**
 * @internal
 */
export declare function isDraggableInternalItemType(type: string): type is DraggableInternalItemType;

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillDownDefinition}.
 * @beta
 */
export declare function isDrillDownDefinition(obj: unknown): obj is IDrillDownDefinition;

/**
 * Tests whether the provided object is an instance of {@link DrillTargetsAdded}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isDrillTargetsAdded: (obj: unknown) => obj is DrillTargetsAdded;

/**
 * @beta
 */
export declare interface IShareButtonProps {
    isVisible: boolean;
    onShareButtonClick: () => void;
}

/**
 * @alpha
 */
export declare interface IShareDialogProps {
    /**
     * Analytical backend from which the dashboard obtains data to render.
     */
    backend: IAnalyticalBackend;
    /**
     * Identifier of analytical workspace, from which the dashboard obtains data to render.
     */
    workspace: string;
    /**
     * Is share dialog visible?
     */
    isVisible?: boolean;
    /**
     * Object to share
     */
    sharedObject: ISharedObject;
    /**
     * Current user
     */
    currentUser: IUser;
    /**
     * Is locking of the dashboard supported by the currently logged user and backend?
     */
    isLockingSupported: boolean;
    /**
     * Is currently logger user a workspace manager?
     */
    isCurrentUserWorkspaceManager: boolean;
    /**
     * Dashboard permissions for current user.
     */
    currentUserPermissions: CurrentUserPermissions;
    /**
     * Callback to be called when user apply share dialog
     */
    onApply: (payload: ISharingApplyPayload) => void;
    /**
     * Callback to be called, when error occurs.
     */
    onError?: (error: GoodDataSdkError) => void;
    /**
     * Callback to be called when user closes the share dialog.
     */
    onCancel: () => void;
    /**
     * Callback to be called on specific share dialog interactions.
     */
    onInteraction?: (data: IShareDialogInteractionData) => void;
}

/**
 * @alpha
 */
export declare interface IShareStatusProps {
    shareStatus: ShareStatus;
    isUnderStrictControl: boolean;
}

/**
 * @alpha
 */
export declare interface ISharingApplyPayload extends ISharingApplyPayload_2 {
}

/**
 * All sharing properties describing sharing changes
 *
 * @public
 */
export declare interface ISharingProperties {
    /**
     * Dashboard share status
     *
     * @remarks
     * private - dashboard accessible only by its creator
     * shared - dashboard shared with closed set of users/groups
     * public - accessible by everyone in the workspace
     */
    shareStatus: ShareStatus;
    /**
     * For backends NOT forcing strict access this prop reflects its current setting of strict access
     *
     * @remarks
     * If set to true then object is not accessible via its URI/ref for people without access rights.
     * Otherwise object is accessible by its URI/ref, eg. when drilling to it.
     */
    isUnderStrictControl: boolean;
    /**
     * When set to true, the dashboard is locked and no one other than the administrator can edit it.
     */
    isLocked: boolean;
    /**
     * Access grantees to grant access to the dashboard to.
     */
    granteesToAdd: IAccessGrantee[];
    /**
     * Access grantees whose access to the dashboard to revoke.
     */
    granteesToDelete: IAccessGrantee[];
}

/**
 * @alpha
 */
export declare interface ISidebarProps {
    /**
     * Contains reference to default implementation of the sidebar. If you are implementing a custom
     * sidebar that decorates default side bar, then use this component to render the default sidebar.
     */
    DefaultSidebar: ComponentType<ISidebarProps>;
    /**
     * Specify className for configurationPanel.
     */
    configurationPanelClassName?: string;
    /**
     * Component, that adds dnd functionality to a create panel item.
     * Do not set or override this property, it's injected by the Dashboard.
     *
     * @internal
     */
    WrapCreatePanelItemWithDragComponent?: IWrapCreatePanelItemWithDragComponent;
    /**
     * Component, that adds dnd functionality to a insight list item.
     * Do not set or override this property, it's injected by the Dashboard.
     *
     * @internal
     */
    WrapInsightListItemWithDragComponent?: IWrapInsightListItemWithDragComponent;
    /**
     * Kpi widget component set.
     * Do not set or override this property, it's injected by the Dashboard.
     *
     * @internal
     */
    KpiWidgetComponentSet?: KpiWidgetComponentSet;
    /**
     * Attribute filter component set.
     * Do not set or override this property, it's injected by the Dashboard.
     *
     * @internal
     */
    AttributeFilterComponentSet?: AttributeFilterComponentSet;
    /**
     * Insight widget component set.
     * Do not set or override this property, it's injected by the Dashboard.
     *
     * @internal
     */
    InsightWidgetComponentSet?: InsightWidgetComponentSet;
    /**
     * Component, that renders delete drop zone.
     * Do not set or override this property, it's injected by the Dashboard.
     *
     * @internal
     */
    DeleteDropZoneComponent?: React.ComponentType;
}

/**
 * Tests whether an object is a {@link PlaceholderWidget} and is initial.
 *
 * @param obj - object to test
 * @internal
 */
export declare function isInitialPlaceholderWidget(obj: unknown): obj is PlaceholderWidget;

/**
 * @internal
 */
export declare function isInsightDraggableItem(item: any): item is InsightDraggableItem;

/**
 * @internal
 */
export declare function isInsightDraggableListItem(item: any): item is InsightDraggableListItem;

/**
 * @internal
 */
export declare function isInsightPlaceholderDraggableItem(item: any): item is InsightPlaceholderDraggableItem;

/**
 * Tests whether an object is a {@link InsightPlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isInsightPlaceholderWidget(obj: unknown): obj is InsightPlaceholderWidget;

/**
 * @internal
 */
export declare function isKpiDraggableItem(item: any): item is KpiDraggableItem;

/**
 * @internal
 */
export declare function isKpiPlaceholderDraggableItem(item: any): item is KpiPlaceholderDraggableItem;

/**
 * Tests whether an object is a {@link KpiPlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isKpiPlaceholderWidget(obj: unknown): obj is KpiPlaceholderWidget;

/**
 * Tests whether an object is a {@link PlaceholderWidget} and is loading.
 *
 * @param obj - object to test
 * @internal
 */
export declare function isLoadingPlaceholderWidget(obj: unknown): obj is PlaceholderWidget;

/**
 * Tests whether an object is a {@link PlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare function isPlaceholderWidget(obj: unknown): obj is PlaceholderWidget;

/**
 * Tests whether the provided object is/has a temporary identity. A temporary identity is used for those
 * objects which are not yet persisted however need to be reference-able from the dashboard itself.
 *
 * @param obj - object to test
 * @internal
 */
export declare function isTemporaryIdentity(obj: IDashboardObjectIdentity): boolean;

/**
 * @alpha
 */
export declare interface ITitleProps {
    title: string;
    onTitleChanged?: (newTitle: string) => void;
}

/**
 * @internal
 */
export declare interface IToolbarProps {
    children?: React.ReactNode;
}

/**
 * @alpha
 */
export declare interface ITopBarProps {
    menuButtonProps: IMenuButtonProps;
    titleProps: ITitleProps;
    buttonBarProps: IButtonBarProps;
    shareStatusProps: IShareStatusProps;
    lockedStatusProps: ILockedStatusProps;
    DefaultTopBar: CustomTopBarComponent;
}

/**
 * @internal
 */
export declare interface IUseAttributeElements {
    elements: IAttributeElement[];
    totalCount: number;
}

/**
 * Configuration options for the {@link useCustomWidgetExecutionDataView} hook.
 *
 * @public
 */
export declare interface IUseCustomWidgetExecutionDataViewConfig {
    /**
     * Custom widget in the context of which the execution should be run. This affects which filters will be used.
     */
    widget: ICustomWidget;
    /**
     * Definition of the execution to execute (without filters). The filters will be filled automatically.
     *
     * @remarks
     * Note: When the execution is not provided, hook is locked in a "pending" state.
     */
    execution?: Exclude<IExecutionConfiguration, "filters">;
}

/**
 * Configuration options for the {@link useCustomWidgetInsightDataView} hook.
 *
 * @public
 */
export declare interface IUseCustomWidgetInsightDataViewConfig {
    /**
     * Custom widget in the context of which the execution should be run. This affects which filters will be used.
     */
    widget: ICustomWidget;
    /**
     * Insight to execute or a reference to it.
     *
     * @remarks
     * The filters will be automatically merged with the filters on the dashboard.
     * Note: When the insight is not provided, hook is locked in a "pending" state.
     */
    insight?: IInsightDefinition | ObjRef;
}

/**
 * Configuration for the `useInsightWidgetDataView` hook.
 *
 * @public
 */
export declare interface IUseInsightWidgetDataView {
    /**
     * Insight widget to get data view for.
     *
     * @remarks
     * Note: When the insight widget is not provided, hook is locked in a "pending" state.
     */
    insightWidget?: IInsightWidget;
}

/**
 * @internal
 */
export declare interface IUseWidgetSelectionResult {
    /**
     * Flag indicating the given item can be selected.
     */
    isSelectable: boolean;
    /**
     * Flag indicating the given item is selected.
     */
    isSelected: boolean;
    /**
     * Callback to call when an item is selected. Called with the relevant mouse event if originating from a click.
     */
    onSelected: (e?: MouseEvent_2) => void;
    /**
     * Callback to call when you want to close the config panel.
     */
    closeConfigPanel: () => void;
    /**
     * Callback to call to deselect widgets. Called with the relevant mouse event if originating from a click.
     */
    deselectWidgets: (e?: MouseEvent_2) => void;
    /**
     * Flag indicating the given item has its config panel open.
     */
    hasConfigPanelOpen: boolean;
}

/**
 * @internal
 */
export declare type IWrapCreatePanelItemWithDragComponent = React.ComponentType<IWrapCreatePanelItemWithDragProps>;

/**
 * @internal
 */
export declare type IWrapCreatePanelItemWithDragInnerProps = {
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
export declare type IWrapCreatePanelItemWithDragProps = {
    children: JSX.Element;
    dragItem: DraggableItem;
    hideDefaultPreview?: boolean;
    disabled?: boolean;
};

/**
 * @internal
 */
export declare type IWrapInsightListItemWithDragComponent = React.ComponentType<IWrapInsightListItemWithDragProps>;

/**
 * @internal
 */
export declare interface IWrapInsightListItemWithDragProps {
    children: JSX.Element;
    insight: IInsight;
}

/**
 * @beta
 */
export declare interface IXlsxExportConfig {
    format: "xlsx";
    /**
     * Specify title of the workbook.
     */
    title?: string;
    /**
     * Indicate whether headers and cells in the sheet
     * should be merged.
     */
    mergeHeaders?: boolean;
    /**
     * Specify filters to include as comments / metadata in the Excel sheet.
     *
     * @remarks
     * Filters provided here are purely to paint a better context for the
     * person looking at the XLSX file. They serve no other purpose and are merely serialized
     * into the XLSX in a human readable form.
     */
    showFilters?: boolean;
}

/**
 * @internal
 */
export declare const KPI_PLACEHOLDER_WIDGET_ID = "__kpiPlaceholder__";

/**
 * @beta
 */
export declare type KpiAlertDialogOpenedPayload = UserInteractionPayloadWithDataBase<"kpiAlertDialogOpened", {
    alreadyHasAlert: boolean;
}>;

/**
 * @public
 */
export declare type KpiComponentProvider = (kpi: IKpi, widget: IKpiWidget) => CustomDashboardKpiComponent;

/**
 * @internal
 */
export declare type KpiDraggableComponent = {
    DraggingComponent?: KpiDraggingComponent;
    type: "kpi";
};

/**
 * @internal
 */
export declare type KpiDraggableItem = BaseDraggableMovingItem & {
    type: "kpi";
    kpi: IKpi;
};

/**
 * @internal
 */
export declare type KpiDraggingComponent = ComponentType<IKpiDraggingComponentProps>;

/**
 * @internal
 */
export declare type KpiPlaceholderDraggableItem = BaseDraggableLayoutItem & {
    type: "kpi-placeholder";
};

/**
 * @alpha
 */
export declare interface KpiPlaceholderWidget extends ICustomWidget {
    readonly customType: "gd-kpi-placeholder";
}

/**
 * @beta
 */
export declare interface KpiWidgetComparison {
    /**
     * Type of comparison to do. May be period-over-period, previous period or no
     * comparison.
     *
     * TODO: explain PoP & previous period
     *
     * If not specified, defaults to no comparison.
     */
    comparisonType?: IKpiComparisonTypeComparison;
    /**
     * Customizes whether growth of the measure compared to previous period is considered
     * a good thing or a bad thing. This setting influences the visuals (red vs green indicators)
     */
    comparisonDirection?: IKpiComparisonDirection;
}

/**
 * Definition of KPI widget
 * @internal
 */
export declare type KpiWidgetComponentSet = CustomComponentBase<IDashboardKpiProps, Parameters<KpiComponentProvider>> & DraggableComponent & CreatableByDragComponent & CreatablePlaceholderComponent<IDashboardWidgetProps> & ConfigurableWidget<IKpiWidget>;

/**
 * @beta
 */
export declare type LayoutStash = Record<string, ExtendedDashboardItem[]>;

/**
 * @alpha
 */
export declare interface LayoutState extends UndoEnhancedState<DashboardLayoutCommands> {
    layout?: IDashboardLayout<ExtendedDashboardWidget>;
    stash: LayoutStash;
}

/**
 * @internal
 */
export declare const LegacyDashboardInsightMenu: ComponentType<IDashboardInsightMenuProps_2 | (IDashboardInsightMenuProps_2 & RefAttributes<Component<IDashboardInsightMenuProps_2, any, any>>)>;

/**
 * @internal
 */
export declare const LegacyDashboardInsightMenuButton: ComponentType<IDashboardInsightMenuButtonProps_2 | (IDashboardInsightMenuButtonProps_2 & RefAttributes<Component<IDashboardInsightMenuButtonProps_2, any, any>>)>;

/**
 * @public
 */
export declare interface LegacyDashboardsState {
    /** @alpha */
    legacyDashboards?: ILegacyDashboard[];
}

/**
 * @beta
 */
export declare interface LoadingState {
    loading: boolean;
    result?: boolean;
    error?: Error;
}

/**
 * @alpha
 */
export declare const LockedStatusIndicator: (props: ILockedStatusProps) => JSX.Element | null;

/**
 * The measure date datasets holds information about available date datasets that can be used for date-filtering a particular
 * measure.
 *
 * The data included herein can be used to select an appropriate date dataset to filter a KPI widget that renders value
 * of particular measure.
 *
 * @alpha
 */
export declare interface MeasureDateDatasets {
    /**
     * Date datasets that are available for filtering of the measure. The available datasets are obtained by inspecting
     * relation of measure and the different date datasets in the workspace's logical data model.
     */
    readonly dateDatasets: ReadonlyArray<ICatalogDateDataset>;
    /**
     * The contents of the `dateDatasets` prop that are ordered according to the relevance. The most relevant and thus
     * most recommended date dataset is first.
     */
    readonly dateDatasetsOrdered: ReadonlyArray<ICatalogDateDataset>;
    /**
     * A mapping between original date dataset title and a nicely formatted title that is suitable to display to the end-user. All date datasets
     * that figure in the result structure have their titles included in this mapping
     */
    readonly dateDatasetDisplayNames: Record<string, string>;
}

/**
 * @internal
 */
export declare const MenuButton: (props: IMenuButtonProps) => JSX.Element;

/**
 * @internal
 */
export declare type MenuItemDependencies = {
    intl: IntlShape;
    dispatch: ReturnType<typeof useDashboardDispatch>;
    includeInteractions?: boolean;
};

/**
 * @beta
 */
export declare interface ModifyDrillsForInsightWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.MODIFY_DRILLS";
    readonly payload: ModifyDrillsForInsightWidgetPayload;
}

/**
 * Creates the ModifyDrillsForInsightWidget command. Dispatching the created command will add or modify a new drill for
 * the insight widget.
 *
 * Drill can be setup for particular measure - meaning elements in the insight will be clickable. Exactly one drill
 * can be specified for a measure.
 *
 * What happens on click depends on the context in which the dashboard lives:
 *
 * -  When in KPI Dashboard (embedded or not) the defined action is actually triggered and done - it may open a new tab,
 *    open overlay with insight, navigate to a new dashboard and carry over the filters.
 * -  When the dashboard is embedded using Dashboard component, an event will be emitted describing the defined
 *    drill action.
 *
 * @param ref - reference to insight widget whose drills should be modified
 * @param drills - drills to add or modify.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function modifyDrillsForInsightWidget(ref: ObjRef, drills: InsightDrillDefinition[], correlationId?: string): ModifyDrillsForInsightWidget;

/**
 * Payload of the {@link ModifyDrillsForInsightWidget} command.
 * @beta
 */
export declare interface ModifyDrillsForInsightWidgetPayload {
    /**
     * Reference to Insight Widget whose drill items should be modified.
     */
    readonly ref: ObjRef;
    /**
     * New drill definitions. The drills are defined per measure in insight and there can
     * be exactly one drill definition for insight measure.
     *
     * The newly provided items will be matches to existing items by the measure they are linked to. The
     * definition of drill for that measure will be modified.
     *
     * Note: this can do upsert. if you specify drill for a measure and there is no existing drill for it,
     * then the new definition will be used.
     */
    readonly drills: InsightDrillDefinition[];
}

/**
 * @internal
 */
export declare interface MonitoredAction {
    calls: number;
    promise: Promise<PayloadAction<any>>;
    resolve: (action: PayloadAction<any>) => void;
    reject: (e: any) => void;
}

/**
 * @beta
 */
export declare interface MoveAttributeFilter extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVE";
    readonly payload: MoveAttributeFilterPayload;
}

/**
 * Creates the MoveAttributeFilter command. Dispatching this command will result in move of the dashboard attribute
 * filter with the provided local id to a new spot. The new spot is defined by index. For convenience the index
 * of -1 means move to the end of the attribute filter list.
 *
 * @param filterLocalId - dashboard filter's local identifier
 * @param index - specify index among the attribute filters at which the new filter should be placed.
 *  The index starts at zero and there is convenience that index of -1 would add the filter at the end.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function moveAttributeFilter(filterLocalId: string, index: number, correlationId?: string): MoveAttributeFilter;

/**
 * Payload of the {@link MoveAttributeFilter} command.
 * @beta
 */
export declare interface MoveAttributeFilterPayload {
    /**
     * Local identifier of the filter to move.
     */
    readonly filterLocalId: string;
    /**
     * Index to move the filter to.
     */
    readonly index: number;
}

/**
 * @beta
 */
export declare interface MoveLayoutSection extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_SECTION";
    readonly payload: MoveLayoutSectionPayload;
}

/**
 * Creates the MoveLayoutSection command. Dispatching this command will result in move of the section located at `sectionIndex`
 * to a new place indicated by `toIndex`.
 *
 * @param sectionIndex - index of section to move
 * @param toIndex - the new index for the section
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function moveLayoutSection(sectionIndex: number, toIndex: number, correlationId?: string): MoveLayoutSection;

/**
 * Payload of the {@link MoveLayoutSection} command.
 * @beta
 */
export declare interface MoveLayoutSectionPayload {
    /**
     * Index of the section to move.
     *
     * Index is zero-based.
     */
    readonly sectionIndex: number;
    /**
     * Index where the section should be moved.
     *
     * Index is zero-based. For convenience index of -1 means moving the item to the end of the section list.
     */
    readonly toIndex: RelativeIndex;
}

/**
 * @beta
 */
export declare interface MoveSectionItem extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM";
    readonly payload: MoveSectionItemPayload;
}

/**
 * Creates the MoveSectionItem command.
 *
 * @remarks
 * Dispatching this command will result in move of single item within
 * section or from one section to another.
 *
 * @param sectionIndex - source section index
 * @param itemIndex - index of item to move
 * @param toSectionIndex - target section index; you may specify -1 to move to last section
 * @param toItemIndex - index within target section where the item should be inserted; you may specify -1 to append
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function moveSectionItem(sectionIndex: number, itemIndex: number, toSectionIndex: number, toItemIndex: number, correlationId?: string): MoveSectionItem;

/**
 * Creates the MoveSectionItem command.
 *
 * @remarks
 * Dispatching this command will result in move of single item within
 * section or from one section to another. If original section stays empty after move, then it will be removed.
 *
 * @param sectionIndex - source section index
 * @param itemIndex - index of item to move
 * @param toSectionIndex - target section index; you may specify -1 to move to last section
 * @param toItemIndex - index within target section where the item should be inserted; you may specify -1 to append
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function moveSectionItemAndRemoveOriginalSectionIfEmpty(sectionIndex: number, itemIndex: number, toSectionIndex: number, toItemIndex: number, correlationId?: string): MoveSectionItem;

/**
 * Payload of the {@link MoveSectionItem} command.
 * @beta
 */
export declare interface MoveSectionItemPayload {
    /**
     * Index of the section where the item to move is located.
     *
     * Index is zero-based.
     */
    readonly sectionIndex: number;
    /**
     * Index of section item that should be moved.
     *
     * Index is zero-based.
     */
    readonly itemIndex: number;
    /**
     * Index of section to which the item should be moved.
     *
     * Index is zero-based. For convenience you may specify -1 to move to last section.
     */
    readonly toSectionIndex: RelativeIndex;
    /**
     * Index within the target section.
     *
     * Index is zero-based. For convenience you may specify -1 to append the item at the end of the target section's
     * items.
     */
    readonly toItemIndex: RelativeIndex;
    /**
     * If true and original section stays empty after move, then it will be removed.
     */
    readonly removeOriginalSectionIfEmpty: boolean;
}

/**
 * @beta
 */
export declare interface MoveSectionItemToNewSection extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM_TO_NEW_SECTION";
    readonly payload: MoveSectionItemToNewSectionPayload;
}

/**
 * Creates the MoveSectionItemToNewSection command.
 *
 * @remarks
 * Dispatching this command will result in move of single item within
 * section or from one section to another.
 *
 * @param sectionIndex - source section index
 * @param itemIndex - index of item to move
 * @param toSectionIndex - target section index; you may specify -1 to move to last section
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function moveSectionItemToNewSection(sectionIndex: number, itemIndex: number, toSectionIndex: number, correlationId?: string): MoveSectionItemToNewSection;

/**
 * Creates the MoveSectionItemToNewSection command.
 *
 * @remarks
 * Dispatching this command will result in move of single item within
 * section or from one section to another. If original section stays empty after move, then it will be removed.
 *
 * @param sectionIndex - source section index
 * @param itemIndex - index of item to move
 * @param toSectionIndex - target section index; you may specify -1 to move to last section
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function moveSectionItemToNewSectionAndRemoveOriginalSectionIfEmpty(sectionIndex: number, itemIndex: number, toSectionIndex: number, correlationId?: string): MoveSectionItemToNewSection;

/**
 * Payload of the {@link MoveSectionItemToNewSection} command.
 * @beta
 */
export declare interface MoveSectionItemToNewSectionPayload {
    /**
     * Index of the section where the item to move is located.
     *
     * Index is zero-based.
     */
    readonly sectionIndex: number;
    /**
     * Index of section item that should be moved.
     *
     * Index is zero-based.
     */
    readonly itemIndex: number;
    /**
     * Index of section to which should be created and the item should be moved into.
     *
     * Index is zero-based. For convenience you may specify -1 to move to last section.
     */
    readonly toSectionIndex: RelativeIndex;
    /**
     * If true and original section stays empty after move, then it will be removed.
     */
    readonly removeOriginalSectionIfEmpty: boolean;
}

/**
 * Creates a new custom widget.
 *
 * @param identifier - identifier for custom widget; once added onto a dashboard, widget will be referencable using this identifier
 * @param customType - custom widget type
 * @param extras - provide extra data to include on the custom widget; the content of this argument can be an
 *  arbitrary plain object. note: the factory will make a copy of all the extra data. at this moment it is not possible
 *  to modify the data once the widget is added onto a dashboard.
 * @public
 */
export declare function newCustomWidget<TExtra = void>(identifier: string, customType: string, extras?: TExtra & Partial<IFilterableWidget>): TExtra & ICustomWidget;

/**
 * A factory function to obtain an instance of {@link IDashboardEngine}.
 *
 * @remarks
 * This is the main, well-known entry point to the Dashboard Engine that is used during both static and dynamic
 * loading of the dashboard engine instances by the DashboardLoader.
 *
 * @public
 */
export declare function newDashboardEngine(): IDashboardEngine;

/**
 * Creates DashboardEvent predicate that test whether the provided event matches it.
 *
 * @alpha
 * @param eventType - dashboard event type
 * @param pred - predicate to test
 * @returns boolean - matches?
 */
export declare function newDashboardEventPredicate<T extends DashboardEvents["type"]>(eventType: T, pred?: (event: DashboardEvents & {
    type: T;
}) => boolean): (event: Action) => boolean;

/**
 * Creates a new dashboard item containing the provided custom widget.
 *
 * @param widget - custom widget to include
 * @param sizeOrColSize - item size specification; for convenience you can specify the size as number which will be
 *  interpreted as number of columns in a 12-col grid that the item should use when rendered on an XL screen.
 * @public
 */
export declare function newDashboardItem<T = ExtendedDashboardWidget>(widget: T, sizeOrColSize: IDashboardLayoutSizeByScreenSize | number): ExtendedDashboardItem<T>;

/**
 * Creates a new dashboard section.
 *
 * @param titleOrHeader - header to use for this section (if any); for convenience, you may provide just string containing the title instead
 * of specifying full header. if you specify empty string for title, then there will be no header.
 * @param items - dashboard items to include in the section; note: a deep copy of each item will be used on the new section
 *
 * @public
 */
export declare function newDashboardSection<T extends ReadonlyArray<ExtendedDashboardItem<unknown>>>(titleOrHeader: IDashboardLayoutSectionHeader | string | undefined, ...items: T): IDashboardLayoutSection<ExtendedDashboardItemTypes<T>>;

/**
 * Creates {@link ObjRefMap} for attribute display form metadata objects.
 *
 * @param items - items to add into map
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export declare function newDisplayFormMap(items: ReadonlyArray<IAttributeDisplayFormMetadataObject>, strictTypeCheck?: boolean): ObjRefMap<IAttributeDisplayFormMetadataObject>;

/**
 * Event handler with the default implementation for drill to the same dashboard.
 *
 * When {@link DashboardDrillToDashboardResolved} event is fired and contains dashboard ref that matches the provided dashboard ref,
 * or dashboard ref in the event is missing, it sets relevant drill intersection filters to the current dashboard.
 *
 * Note that only filters that are already stored in the dashboard filter context will be applied
 * (attribute filters that are not visible in the filter bar will not be applied).
 *
 * @alpha
 * @param dashboardRef - reference to the current dashboard
 * @returns event handler
 */
export declare const newDrillToSameDashboardHandler: (dashboardRef: ObjRef) => DashboardEventHandler<DashboardDrillToDashboardResolved>;

/**
 * @internal
 */
export declare function newInitialPlaceholderWidget(): PlaceholderWidget;

/**
 * @alpha
 */
export declare function newInsightPlaceholderWidget(): InsightPlaceholderWidget;

/**
 * Creates a new insightWidget with specified identifier and title and with optional modifications.
 *
 * @param insight - the insight object to create widget for.
 * @param modifications - optional modifications
 *
 * @internal
 */
export declare function newInsightWidget(insight: IInsight, modifications?: InsightWidgetModifications): IInsightWidgetBase;

/**
 * @alpha
 */
export declare function newKpiPlaceholderWidget(): KpiPlaceholderWidget;

/**
 * @internal
 */
export declare function newLoadingPlaceholderWidget(): PlaceholderWidget;

/**
 * @alpha
 */
export declare function newPlaceholderWidget(): PlaceholderWidget;

/**
 * Dashboard component may offer users to pick objects to use on the dashboard.
 *
 * @remarks
 * User can, for instance, select a metric to use on KPI, select an attribute or a date dataset to filter by.
 *
 * The object availability configuration can be used to filter objects that the user can pick.
 *
 * By default, all objects
 *
 * @public
 */
export declare interface ObjectAvailabilityConfig {
    /**
     * Specify tags to exclude objects by.
     *
     * @remarks
     * If any of these tags appears on an object, then it will be not available for use.
     */
    excludeObjectsWithTags?: string[];
    /**
     * Specify tags to include objects by.
     *
     * @remarks
     * This option does not make sense on its own - as all objects are
     * included by default. However it can be used in conjunction with {@link ObjectAvailabilityConfig.excludeObjectsWithTags} - a wide
     * range of objects may be excluded at first and then a subset will be cherry-picked using this prop.
     */
    includeObjectsWithTags?: string[];
}

/**
 * Utility class that assists with type-agnostic mapping of metadata objects by ObjRef.
 *
 * Problem
 * =======
 *
 * The challenges with ObjRef's start in context of backend that supports both uri and id ref (e.g. bear) and the client.
 *
 * Backend according to contract creates one type of ref - uri ref - so that is fine. However when instances of `ref` are created
 * by the client code and are passed in through the public API (as is the case with the dashboard component) - problems start.
 *
 * For clients it is often more convenient to use ID refs.. because they are transferable across workspaces and because
 * they appear in the catalog export.
 *
 * Doing strict ref-to-ref matching between user input and the data stored in state will result in no matches because
 * the types of ref's do not match.
 *
 * ---
 *
 * This class addresses the problem by having the `get` method check the type of ObjRef first and then perform
 * lookups into either id to item or uri to item mapping.
 *
 * @alpha
 */
export declare class ObjRefMap<T> {
    private readonly config;
    readonly [Symbol.toStringTag]: string;
    size: number;
    private items;
    private itemsByIdentifier;
    private itemsByUri;
    constructor(config: ObjRefMapConfig<T>);
    private idRefToKey;
    private addItem;
    private cleanupUnmappedItems;
    fromItems: (items: ReadonlyArray<T>) => ObjRefMap<T>;
    [Symbol.iterator](): IterableIterator<[ObjRef, T]>;
    entries(): IterableIterator<[ObjRef, T]>;
    get(key: ObjRef): T | undefined;
    has(key: ObjRef): boolean;
    keys(): IterableIterator<ObjRef>;
    values(): IterableIterator<T>;
}

/**
 * Configuration for the ObjRefMap.
 *
 * @alpha
 */
export declare interface ObjRefMapConfig<T> {
    /**
     * Function that extracts `ref` from object
     */
    readonly refExtract: (obj: T) => ObjRef;
    /**
     * Function that extracts `id` from object
     */
    readonly idExtract: (obj: T) => Identifier;
    /**
     * Function that extracts `uri` from object
     */
    readonly uriExtract: (obj: T) => string;
    /**
     * Indicates whether strict idRef type-checking is desired. Some backends (e.g. tiger) have identifier
     * refs use combination of `id` and `type` and have type-level `id` uniqueness constraints. On those backends,
     * strict type checks are essential to correctly match objects.
     *
     * On other backends, the `type` information coming in the idRef is superfluous and should not be influencing
     * anything.
     */
    readonly strictTypeCheck: boolean;
    /**
     * Type of object stored in the map.
     */
    readonly type?: ObjectType;
}

/**
 * @internal
 */
export declare type OnDashboardDrill = (cmd: Drill) => void;

/**
 * @internal
 */
export declare type OnDashboardDrillError = (event: DashboardCommandFailed<DashboardDrillCommand>) => void;

/**
 * @internal
 */
export declare type OnDashboardDrillSuccess = (event: DashboardDrillResolved) => void;

/**
 * @internal
 */
export declare type OnDrillDown = (cmd: DrillDown) => void;

/**
 * @alpha
 */
export declare type OnDrillDownSuccess = (event: DashboardDrillDownResolved) => void;

/**
 * @internal
 */
export declare type OnDrillToAttributeUrl = (cmd: DrillToAttributeUrl) => void;

/**
 * @alpha
 */
export declare type OnDrillToAttributeUrlSuccess = (event: DashboardDrillToAttributeUrlResolved) => void;

/**
 * @internal
 */
export declare type OnDrillToCustomUrl = (cmd: DrillToCustomUrl) => void;

/**
 * @alpha
 */
export declare type OnDrillToCustomUrlSuccess = (event: DashboardDrillToCustomUrlResolved) => void;

/**
 * @internal
 */
export declare type OnDrillToDashboard = (cmd: DrillToDashboard) => void;

/**
 * @alpha
 */
export declare type OnDrillToDashboardSuccess = (event: DashboardDrillToDashboardResolved) => void;

/**
 * @internal
 */
export declare type OnDrillToInsight = (cmd: DrillToInsight) => void;

/**
 * @alpha
 */
export declare type OnDrillToInsightSuccess = (event: DashboardDrillToInsightResolved) => void;

/**
 * @internal
 */
export declare type OnDrillToLegacyDashboard = (cmd: DrillToLegacyDashboard) => void;

/**
 * @internal
 */
export declare type OnDrillToLegacyDashboardSuccess = (event: DashboardDrillToLegacyDashboardResolved) => void;

/**
 * Callback called when a drill event occurs.
 * @beta
 */
export declare type OnFiredDashboardDrillEvent = (event: IDashboardDrillEvent) => ReturnType<OnFiredDrillEvent>;

/**
 * @alpha
 */
export declare type OnWidgetDrill = (drillEvent: IDashboardDrillEvent, drillContext: DashboardDrillContext) => void;

/**
 * @public
 */
export declare type OptionalAttributeFilterComponentProvider = OptionalProvider<AttributeFilterComponentProvider>;

/**
 * @public
 */
export declare type OptionalDateFilterComponentProvider = OptionalProvider<DateFilterComponentProvider>;

/**
 * @alpha
 */
export declare type OptionalInsightBodyComponentProvider = OptionalProvider<InsightBodyComponentProvider>;

/**
 * @public
 */
export declare type OptionalInsightComponentProvider = OptionalProvider<InsightComponentProvider>;

/**
 * @alpha
 */
export declare type OptionalInsightMenuButtonComponentProvider = OptionalProvider<InsightMenuButtonComponentProvider>;

/**
 * @alpha
 */
export declare type OptionalInsightMenuComponentProvider = OptionalProvider<InsightMenuComponentProvider>;

/**
 * @internal
 */
export declare type OptionalInsightMenuTitleComponentProvider = OptionalProvider<InsightMenuTitleComponentProvider>;

/**
 * @public
 */
export declare type OptionalKpiComponentProvider = OptionalProvider<KpiComponentProvider>;

/**
 * @public
 */
export declare type OptionalProvider<T> = T extends (...args: infer TArgs) => infer TRes ? (...args: TArgs) => TRes | undefined : never;

/**
 * @public
 */
export declare type OptionalWidgetComponentProvider = OptionalProvider<WidgetComponentProvider>;

/**
 * @public
 */
export declare interface PermissionsState {
    permissions?: IWorkspacePermissions;
}

/**
 * @internal
 */
export declare const PLACEHOLDER_WIDGET_ID = "__placeholder__";

/**
 * @alpha
 */
export declare interface PlaceholderWidget extends ICustomWidget {
    readonly customType: "gd-widget-placeholder";
    readonly isInitial?: boolean;
    readonly isLoading?: boolean;
}

/**
 * This is a specialization of toolkit's CaseReducerActions to correctly type the action creators.
 *
 * @internal
 */
export declare type QueryActions<TQuery extends IDashboardQuery, TResult> = CaseReducerActions<AllQueryCacheReducers<TQuery, TResult>, string>;

/**
 * Dispatches a query and returns a promise to its result.
 *
 * @param dispatch - dashboard dispatch to use
 * @param query - query to trigger and wait for results of
 * @returns Promise of the query result
 * @alpha
 */
export declare function queryAndWaitFor<TQuery extends DashboardQueries, TQueryResult>(dispatch: DashboardDispatch, query: TQuery): Promise<TQueryResult>;

/**
 * @alpha
 */
export declare interface QueryAttributeByDisplayForm extends IDashboardQuery {
    type: "GDC.DASH/QUERY.DISPLAY.FORM.ATTRIBUTE";
    payload: {
        readonly displayForms: ObjRef[];
    };
}

/**
 * Creates action through which you can query attributes for given display forms
 *
 * @param displayForms - attribute display forms
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @returns attribute metadata for given display forms
 *
 * @alpha
 */
export declare function queryAttributeByDisplayForm(displayForms: ObjRef[], correlationId?: string): QueryAttributeByDisplayForm;

/**
 * @internal
 */
export declare interface QueryAttributeDataSet extends IDashboardQuery {
    type: "GDC.DASH/QUERY.DATA.SET.ATTRIBUTE";
    payload: {
        /**
         * Display form of the attribute filter.
         */
        readonly displayForm: ObjRef;
    };
}

/**
 * Creates action through which you can query attribute data set for given display form
 *
 * @param displayForm - attribute display form
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @returns attribute data set for given display form
 *
 * @internal
 */
export declare function queryAttributeDataSet(displayForm: ObjRef, correlationId?: string): QueryAttributeDataSet;

/**
 * @internal
 */
export declare interface QueryAttributeElements extends IDashboardQuery {
    type: "GDC.DASH/QUERY.ELEMENTS.ATTRIBUTE";
    payload: {
        /**
         * Display form of the attribute filter.
         */
        readonly displayForm: ObjRef;
        /**
         * Desired max number of elements to retrieve; must be a positive number
         */
        readonly limit?: number;
    };
}

/**
 * Creates action through which you can query attribute elements for given display form
 *
 * @param displayForm - attribute display form
 * @param limit - desired max number of elements to retrieve
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @returns attribute elements for given display form
 *
 * @internal
 */
export declare function queryAttributeElements(displayForm: ObjRef, limit?: number, correlationId?: string): QueryAttributeElements;

/**
 * Contains all essentials of query cache that can be integrated into redux store and redux sagas.
 *
 * @internal
 */
export declare type QueryCache<TQuery extends IDashboardQuery, TResult> = {
    /**
     * A name to use as key in _queryCache part of the redux state.
     */
    cacheName: string;
    /**
     * Cache's slice reducer. This needs to be integrated into the dashboard store.
     */
    reducer: Reducer<EntityState<QueryCacheEntry<TQuery, TResult>>>;
    /**
     * Cache's action creators.
     */
    actions: QueryActions<TQuery, TResult>;
    /**
     * Factory for selectors to get cache entry by its identifier.
     *
     * Important: the use-case for this selector is purely internal. It is intended to be used by the internal
     * sagas that add caching layer on top of the actual query processing saga.
     *
     * @param id - cache key
     */
    selectById: (id: EntityId) => Selector<DashboardState, QueryCacheEntryResult<TResult> | undefined>;
    /**
     * Factory for selectors that obtain query result stored in state. This is intended for consumption by presentational components.
     *
     * The selected result may be undefined - which means that query to obtain the result has not (yet) started:
     * it has never even been dispatched or it is on its way to be processed. Once the query is running the status in the
     * result will change to `loading` and then eventually to either `success` or `error`.
     *
     * @param query - query to get result of
     * @internal
     */
    selectQueryResult: (query: TQuery) => Selector<DashboardState, QueryCacheEntryResult<TResult> | undefined>;
};

/**
 * Entry in the per-query cache. The entry must also contain the query itself; this is because code uses
 * the entity adapter. The adapter needs to calculate cache key (string) from the entity it stores. Query is the
 * only reasonable candidate here.
 *
 * @internal
 */
export declare type QueryCacheEntry<TQuery extends IDashboardQuery, TResult> = QueryCacheEntryResult<TResult> & {
    query: TQuery;
};

/**
 * Describes the result part of the cache entry.
 *
 * @internal
 */
export declare type QueryCacheEntryResult<TResult> = {
    /**
     *
     */
    status: "loading" | "success" | "error";
    result?: TResult;
    error?: string;
};

/**
 * Each slice reducer is typed as toolkit's CaseReducer. This type specializes the case reducer to the purpose of
 * doing reductions on state that holds results for particular query type.
 *
 * @internal
 */
export declare type QueryCacheReducer<TQuery extends IDashboardQuery, TResult, TPayload> = CaseReducer<EntityState<QueryCacheEntry<TQuery, TResult>>, PayloadAction<TPayload>>;

/**
 * @alpha
 */
export declare interface QueryConnectingAttributes extends IDashboardQuery {
    type: "GDC.DASH/QUERY.CONNECTING.ATTRIBUTES";
    payload: {
        readonly refs: [ObjRef, ObjRef][];
    };
}

/**
 * Creates action through which you can query connecting attributes for the information about
 * possibility of parent-child attribute filter relationship.
 *
 * @param refs - references of the attributes
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @returns connecting attributes for given array of references
 *
 * @alpha
 */
export declare function queryConnectingAttributes(refs: [ObjRef, ObjRef][], correlationId?: string): QueryConnectingAttributes;

/**
 * Creates action through which you can query dashboard component for information about the date data sets
 * that are applicable for the provided insight.
 *
 * @param insightOrRef - insight body or a reference to an insight. if the reference is provided, then it is expected
 *  to be a reference of an insight that is already placed on a dashboard
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export declare function queryDateDatasetsForInsight(insightOrRef: ObjRef | IInsight, correlationId?: string): QueryInsightDateDatasets;

/**
 * Creates action through which you can query dashboard component for information about the date data sets
 * that are applicable for filtering of the provided measure. measures are typically used to obtain value to render on KPIs.
 *
 * @param measureRef - reference to measure
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export declare function queryDateDatasetsForMeasure(measureRef: ObjRef, correlationId?: string): QueryMeasureDateDatasets;

/**
 * Given a reference to an insight, this query will obtain metadata about the display forms used in the
 * insight. For each display form, the result will also contain attribute to which the display form
 * belongs.
 *
 * @alpha
 */
export declare interface QueryInsightAttributesMeta extends IDashboardQuery {
    readonly type: "GDC.DASH/QUERY.INSIGHT.ATTRIBUTE.META";
    readonly payload: {
        readonly insightOrRef: ObjRef | IInsight;
    };
}

/**
 * Creates action thought which you can query dashboard component for information about display forms and
 * attributes used by an insight.
 *
 * @param insightOrRef - insight body or a reference to an insight on the dashboard
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export declare function queryInsightAttributesMeta(insightOrRef: ObjRef | IInsight, correlationId?: string): QueryInsightAttributesMeta;

/**
 * Given a reference to an insight, this query will obtain list of all date datasets that may be used
 * to filter it.
 *
 * @alpha
 */
export declare interface QueryInsightDateDatasets extends IDashboardQuery {
    readonly type: "GDC.DASH/QUERY.INSIGHT.DATE.DATASETS";
    readonly payload: {
        readonly insightOrRef: ObjRef | IInsight;
    };
}

/**
 * Given a reference to a measure, this query will obtain list of all date datasets that may be used
 * to filter it.
 *
 * @alpha
 */
export declare interface QueryMeasureDateDatasets extends IDashboardQuery {
    readonly type: "GDC.DASH/QUERY.MEASURE.DATE.DATASETS";
    readonly payload: {
        readonly measureRef: ObjRef;
    };
}

/**
 * @public
 */
export declare interface QueryProcessingErrorState {
    status: "error";
    error: GoodDataSdkError;
    result: undefined;
}

/**
 * @public
 */
export declare interface QueryProcessingPendingState {
    status: "pending";
    error: undefined;
    result: undefined;
}

/**
 * @public
 */
export declare interface QueryProcessingRejectedState {
    status: "rejected";
    error: undefined;
    result: undefined;
}

/**
 * @public
 */
export declare interface QueryProcessingRunningState {
    status: "running";
    error: undefined;
    result: undefined;
}

/**
 * @public
 */
export declare type QueryProcessingState<TResult> = QueryProcessingPendingState | QueryProcessingRunningState | QueryProcessingErrorState | QueryProcessingRejectedState | QueryProcessingSuccessState<TResult>;

/**
 * @internal
 */
export declare type QueryProcessingStatus = QueryProcessingState<any>["status"];

/**
 * @public
 */
export declare interface QueryProcessingSuccessState<TResult> {
    status: "success";
    error: undefined;
    result: TResult;
}

/**
 * Given a reference to a KPI widget, this query will obtain the total number of alerts all the users have set on it.
 *
 * @alpha
 */
export declare interface QueryWidgetAlertCount extends IDashboardQuery {
    readonly type: "GDC.DASH/QUERY.WIDGET.ALERT_COUNT";
    readonly payload: {
        readonly widgetRef: ObjRef;
    };
}

/**
 * Creates action through which you can query dashboard component for information about the total number of alerts
 * all the users have set on a given KPI widget.
 *
 * @param widgetRef - reference to the KPI widget
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export declare function queryWidgetAlertCount(widgetRef: ObjRef, correlationId?: string): QueryWidgetAlertCount;

/**
 * This query base on given kpi widgetRef calculate BrokenAlertFilterBasicInfo {@link IBrokenAlertFilterBasicInfo}
 * In case any broken alert filters query return empty array.
 * @alpha
 */
export declare interface QueryWidgetBrokenAlerts extends IDashboardQuery {
    readonly type: "GDC.DASH/QUERY.WIDGET.BROKEN_ALERTS";
    readonly payload: {
        readonly widgetRef: ObjRef;
    };
}

/**
 *  Creates action thought which you can query dashboard component for broken alert filters.
 *
 * @param widgetRef - reference to insight kpi widget
 * @param correlationId - specify correlation id to use for this command.
 * @returns
 *
 * @alpha
 */
export declare function queryWidgetBrokenAlerts(widgetRef: ObjRef, correlationId?: string): QueryWidgetBrokenAlerts;

/**
 * Given a reference to a widget, this query will obtain the filters that should be used when executing it.
 * These will respect the ignored filters on widget level as well as the filters specified in the insight itself.
 * Filters returned by this query should be used with {@link @gooddata/sdk-model#insightSetFilters} to obtain
 * insight that is ready for execution or used to execute a KPI.
 *
 * @alpha
 */
export declare interface QueryWidgetFilters extends IDashboardQuery {
    readonly type: "GDC.DASH/QUERY.WIDGET.FILTERS";
    readonly payload: {
        readonly widgetRef: ObjRef;
        readonly insight?: IInsightDefinition | null;
    };
}

/**
 * Creates action thought which you can query dashboard component for filters that should be used by a given widget.
 *
 * @param widgetRef - reference to insight widget
 * @param insight - specify insight to evaluate the filters for in context of the widget.
 *  If null, InsightWidgets will ignore the insight the are referencing.
 *  If not specified, InsightWidgets will default to the insights they reference, Custom- and KpiWidgets will ignore it.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export declare function queryWidgetFilters(widgetRef: ObjRef, insight?: IInsightDefinition | null, correlationId?: string): QueryWidgetFilters;

/**
 * @alpha
 */
export declare const ReactDashboardContext: any;

/**
 * @beta
 */
export declare interface RefreshInsightWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.REFRESH";
    readonly payload: RefreshInsightWidgetPayload;
}

/**
 * Creates the RefreshInsightWidget command. Dispatching this command will result in re-calculation of the widget's
 * insight and re-render.
 *
 * @param ref - reference to the Insight widget to refresh
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function refreshInsightWidget(ref: ObjRef, correlationId?: string): RefreshInsightWidget;

/**
 * Payload of the {@link RefreshInsightWidget} command.
 * @beta
 */
export declare interface RefreshInsightWidgetPayload {
    /**
     * Reference to Insight Widget to refresh.
     */
    readonly ref: ObjRef;
}

/**
 * @beta
 */
export declare interface RefreshKpiWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.REFRESH";
    readonly payload: RefreshKpiWidgetPayload;
}

/**
 * Creates the RefreshKpiWidget command. Dispatching this command will result in re-calculation of the KPI's value.
 *
 * @param ref - reference of the KPI widget to refresh
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function refreshKpiWidget(ref: ObjRef, correlationId?: string): RefreshKpiWidget;

/**
 * Payload of the {@link RefreshKpiWidget} command.
 * @beta
 */
export declare interface RefreshKpiWidgetPayload {
    /**
     * Reference to KPI Widget to refresh.
     */
    readonly ref: ObjRef;
}

/**
 * This is a mark-up type that is used for properties and arguments that can contain relative index: a zero-based index
 * with added convenience of referencing last spot using index of `-1`.
 *
 * @beta
 */
export declare type RelativeIndex = number;

/**
 * Removes Kpi alerts.
 *
 * @beta
 */
export declare interface RemoveAlerts extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.ALERTS.REMOVE";
    readonly payload: RemoveAlertsPayload;
}

/**
 * Creates the RemoveAlerts command. Dispatching this command will result in the removing Kpi alerts on the backend.
 *
 * @param refs - specify ObjRef of the alerts to remove
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing

 * @beta
 */
export declare function removeAlerts(refs: ObjRef[], correlationId?: string): RemoveAlerts;

/**
 * Payload of the {@link RemoveAlerts} command.
 * @beta
 */
export declare interface RemoveAlertsPayload {
    /**
     * References to Kpi alerts that should be removed.
     */
    readonly refs: ObjRef[];
}

/**
 * Creates the RemoveAttributeFilters command. Dispatching this command will result in the removal
 * of dashboard's attribute filter with the provided local identifier.
 *
 * @param filterLocalId - dashboard attribute filter's local identifier
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @beta
 */
export declare function removeAttributeFilter(filterLocalId: string, correlationId?: string): RemoveAttributeFilters;

/**
 * @beta
 */
export declare interface RemoveAttributeFilters extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVE";
    readonly payload: RemoveAttributeFiltersPayload;
}

/**
 * Creates the RemoveAttributeFilters command. Dispatching this command will result in the removal
 * of dashboard's attribute filters with the provided local identifiers.
 *
 * @param filterLocalIds - an array of dashboard attribute filter's local identifiers
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @beta
 */
export declare function removeAttributeFilters(filterLocalIds: string[], correlationId?: string): RemoveAttributeFilters;

/**
 * Payload of the {@link RemoveAttributeFilters} command.
 * @beta
 */
export declare interface RemoveAttributeFiltersPayload {
    /**
     * XXX: we do not necessarily need to remove multiple filters atm, but this should
     *  be very easy to do and adds some extra flexibility.
     */
    readonly filterLocalIds: string[];
}

/**
 * @beta
 */
export declare interface RemoveDrillForKpiWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.REMOVE_DRILL";
    readonly payload: RemoveDrillForKpiWidgetPayload;
}

/**
 * Creates the RemoveDrillForKpiWidget command. Dispatching this command will result in KPI having its drill removed.
 *
 * @param ref - reference of the KPI widget to modify
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function removeDrillForKpiWidget(ref: ObjRef, correlationId?: string): RemoveDrillForKpiWidget;

/**
 * Payload of the {@link RemoveDrillForKpiWidget} command.
 * @beta
 */
export declare interface RemoveDrillForKpiWidgetPayload {
    /**
     * Reference to KPI Widget to modify.
     */
    readonly ref: ObjRef;
}

/**
 * @beta
 */
export declare interface RemoveDrillsForInsightWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.INSIGHT_WIDGET.REMOVE_DRILLS";
    readonly payload: RemoveDrillsForInsightWidgetPayload;
}

/**
 * Creates the RemoveDrillsForInsightWidget command. Dispatching the created command will remove insight widget's
 * drill definition for the provided measure.
 *
 * @param ref - reference of insight widget whose drill should be removed
 * @param origins - measure or attribute localIdentifiers whose drill definitions should be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function removeDrillsForInsightWidget(ref: ObjRef, origins: RemoveDrillsSelector, correlationId?: string): RemoveDrillsForInsightWidget;

/**
 * Payload of the {@link RemoveDrillsForInsightWidget} command.
 * @beta
 */
export declare interface RemoveDrillsForInsightWidgetPayload {
    /**
     * Reference to Insight Widget whose drill items should be removed.
     */
    readonly ref: ObjRef;
    /**
     * Specify measure or attribute localIdentifiers whose drills to remove or '*' to remove all defined drills.
     */
    readonly origins: RemoveDrillsSelector;
}

/**
 * @beta
 */
export declare type RemoveDrillsSelector = ObjRefInScope[] | "*";

/**
 * @beta
 */
export declare interface RemoveLayoutSection extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_SECTION";
    readonly payload: RemoveLayoutSectionPayload;
}

/**
 * Creates the RemoveLayoutSection command.
 *
 * @remarks
 * Dispatching this command will result in removal of the entire dashboard
 * section. You can optionally specify that the items in the section should not be physically removed but instead be
 * stashed for later 'resurrection'.
 *
 * @param index - index of section to remove
 * @param stashIdentifier - specify identifier to stash items under; if you do not specify this, then the dashboard items in the removed section will also be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function removeLayoutSection(index: number, stashIdentifier?: StashedDashboardItemsId, correlationId?: string): RemoveLayoutSection;

/**
 * Payload of the {@link RemoveLayoutSection} command.
 * @beta
 */
export declare interface RemoveLayoutSectionPayload {
    /**
     * Index of section to remove.
     *
     * Zero based. For convenience -1 can be used to remove the last section.
     */
    readonly index: RelativeIndex;
    /**
     * Specify stash identifier.
     *
     * @remarks
     * If provided, the items from the removed section will not be
     * permanently removed but will be stored in the stash under this identifier. You can then
     * use the stash identifier to 'resurrect' the items in different section.
     *
     * Default behavior with no stashIdentifier is to also remove all items in the section.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
}

/**
 * @beta
 */
export declare interface RemoveSectionItem extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM";
    readonly payload: RemoveSectionItemPayload;
}

/**
 * Creates the RemoveSectionItem command.
 *
 * @remarks
 * Dispatching this command will result in removal
 * of the item from a section. If the removed item was last in the section, the section will be left on the layout
 * and will contain no items.
 *
 * You may optionally specify the stashIdentifier in order to stash the removed item for later resurrection.
 *
 * @param sectionIndex - index of section from which to remove the item
 * @param itemIndex - index of item to remove
 * @param stashIdentifier - stash identifier to store the removed item under; if not specified the item will be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function removeSectionItem(sectionIndex: number, itemIndex: number, stashIdentifier?: StashedDashboardItemsId, correlationId?: string): RemoveSectionItem;

/**
 * @beta
 */
export declare interface RemoveSectionItemByWidgetRef extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM_BY_WIDGET_REF";
    readonly payload: RemoveSectionItemByWidgetRefPayload;
}

/**
 * Creates the RemoveSectionItemByWidgetRef command.
 *
 * @remarks
 * Dispatching this command will result in removal
 * of the item from a section. If the removed item was last in the section, the section will be left on the layout
 * and will contain no items.
 *
 * @param widgetRef - widget reference of the item to remove;
 * @param stashIdentifier - stash identifier to store the removed item under; if not specified the item will be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function removeSectionItemByWidgetRef(widgetRef: ObjRef, stashIdentifier?: StashedDashboardItemsId, correlationId?: string): RemoveSectionItemByWidgetRef;

/**
 * Payload of the {@link RemoveSectionItemByWidgetRef} command.
 * @beta
 */
export declare interface RemoveSectionItemByWidgetRefPayload {
    /**
     * Widget reference of the item to remove.
     */
    readonly widgetRef: ObjRef;
    /**
     * Specify stash identifier.
     *
     * @remarks
     * If provided, the item will not be permanently removed but will be
     * stored in the stash under this identifier. You can then use the stash identifier to 'resurrect' the item
     * in different section.
     *
     * Default behavior with no stashIdentifier is to permanently remove the item as well.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
    /**
     * Specify whether to eagerly remove the entire section if the item being removed was the only
     * item in the section.
     *
     * @remarks
     * Default is false. Meaning an empty section will be left.
     */
    readonly eager?: boolean;
}

/**
 * Payload of the {@link RemoveSectionItem} command.
 * @beta
 */
export declare interface RemoveSectionItemPayload {
    /**
     * Index of the section where the item to move is located.
     *
     * @remarks
     * Index is zero-based.
     */
    readonly sectionIndex: number;
    /**
     * Index of section item that should be moved.
     *
     * @remarks
     * Index is zero-based. For convenience you may use index of -1 to remove last item from section.
     */
    readonly itemIndex: RelativeIndex;
    /**
     * Specify stash identifier.
     *
     * @remarks
     * If provided, the item will not be permanently removed but will be
     * stored in the stash under this identifier. You can then use the stash identifier to 'resurrect' the item
     * in different section.
     *
     * Default behavior with no stashIdentifier is to permanently remove the item as well.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
    /**
     * Specify whether to eagerly remove the entire section if the item being removed was the only
     * item in the section.
     *
     * @remarks
     * Default is false. Meaning an empty section will be left.
     */
    readonly eager?: boolean;
}

/**
 * @beta
 */
export declare interface RenameDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.RENAME";
    readonly payload: RenameDashboardPayload;
}

/**
 * Creates the RenameDashboard command. Dispatching this command will result in rename of the dashboard. The changes
 * will be done only in-memory and have to be flushed to backend using the SaveDashboard command.
 *
 * @param newTitle - new dashboard title
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @beta
 */
export declare function renameDashboard(newTitle: string, correlationId?: string): RenameDashboard;

/**
 * Payload of the {@link RenameDashboard} command.
 * @beta
 */
export declare interface RenameDashboardPayload {
    /**
     * New title to use for the dashboard.
     */
    readonly newTitle: string;
}

/**
 * @beta
 */
export declare type RenderMode = "view" | "edit";

/**
 * Actions to control renderMode state of the dashboard.
 *
 * @internal
 */
export declare const renderModeActions: CaseReducerActions<    {
setRenderMode: (state: WritableDraft<RenderModeState_2>, action: {
payload: RenderMode_2;
type: string;
}) => void | RenderModeState_2 | WritableDraft<RenderModeState_2>;
setEditRenderMode: (state: WritableDraft<RenderModeState_2>, action: AnyAction) => void | RenderModeState_2 | WritableDraft<RenderModeState_2>;
setViewRenderMode: (state: WritableDraft<RenderModeState_2>, action: AnyAction) => void | RenderModeState_2 | WritableDraft<RenderModeState_2>;
}, "renderModeSlice">;

/**
 * Returns a component that wraps components for different render modes and automatically chooses the correct one.
 * If component for current render mode is not defined, component for "view" mode is used.
 *
 * @param components - the components to choose from
 * @internal
 */
export declare function renderModeAware<T extends ComponentType<any>>(components: {
    view: T;
} & Partial<Record<RenderMode, T>>): ComponentType<ComponentPropsWithRef<T>>;

/**
 * @internal
 */
export declare const RenderModeAwareTitle: ComponentType<ITitleProps_2 | (ITitleProps_2 & RefAttributes<Component<ITitleProps_2, any, any>>)>;

/**
 * @beta
 */
export declare interface RenderModeChangeOptions {
    readonly resetDashboard: boolean;
}

/**
 * @beta
 */
export declare interface RenderModeState {
    renderMode: RenderMode;
}

/**
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpReplaceAll} operation.
 *
 * Dispatching this command will result in replacement of Insight widget's filter settings; this includes change of
 * data set used for date filter, disabling date filtering, ignoring attribute filters that are defined on the dashboard for the widget.
 *
 * @param ref - reference of the insight widget to modify
 * @param settings - new filter settings to apply
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function replaceInsightWidgetFilterSettings(ref: ObjRef, settings: Omit<FilterOpReplaceAll, "type">, correlationId?: string): ChangeInsightWidgetFilterSettings;

/**
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpReplaceAttributeIgnores} operation.
 *
 * Dispatching this command will result in replacement of Insight widget's attribute filter ignore-list. Those attribute filters
 * that use the provided displayForms for filtering will be ignored by the widget.
 *
 * @param ref - reference of the insight widget to modify
 * @param displayForms - refs of display forms used by attribute filters that should be ignored
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function replaceInsightWidgetIgnoredFilters(ref: ObjRef, displayForms?: ObjRef[], correlationId?: string): ChangeInsightWidgetFilterSettings;

/**
 * Creates the ChangeKpiWidgetFilterSettings command. Dispatching this command will result in change of KPI widget's
 * filter settings; this includes change of data set used for date filter, disabling date filtering, ignoring
 * attribute filters that are defined on the dashboard for the widget.
 *
 * @param ref - reference of the KPI widget to modify
 * @param settings - new filter settings to apply
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function replaceKpiWidgetFilterSettings(ref: ObjRef, settings: Omit<FilterOpReplaceAll, "type">, correlationId?: string): ChangeKpiWidgetFilterSettings;

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpReplaceAttributeIgnores} operation.
 *
 * Dispatching this command will result in replacement of KPI widget's attribute filter ignore-list. Those attribute filters
 * that use the provided displayForms for filtering will be ignored by the widget.
 *
 * @param ref - reference of the KPI widget to modify
 * @param displayForms - refs of display forms used by attribute filters that should be ignored
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function replaceKpiWidgetIgnoredFilters(ref: ObjRef, displayForms?: ObjRef[], correlationId?: string): ChangeKpiWidgetFilterSettings;

/**
 * @beta
 */
export declare interface ReplaceSectionItem extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.REPLACE_ITEM";
    readonly payload: ReplaceSectionItemPayload;
}

/**
 * Creates the ReplaceSectionItem command. Dispatching this command will result in replacement of particular dashboard
 * item with a new item. By default the old item will be discarded, however you may specify to stash it for later use.
 *
 * @param sectionIndex - index of section where the item to replace resides
 * @param itemIndex - index of item within the section
 * @param item - new item definition
 * @param stashIdentifier - specify identifier of stash where the old item should be stored
 * @param autoResolveDateFilterDataset - specify whether dashboard should auto-resolve date dataset
 *  to use for date filtering of KPI or insight widget that is replacing the existing item; default is disabled
 *  meaning date filtering will be enabled only for those KPI or Insight widgets that already specify dateDataset.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function replaceSectionItem(sectionIndex: number, itemIndex: number, item: DashboardItemDefinition, stashIdentifier?: StashedDashboardItemsId, autoResolveDateFilterDataset?: boolean, correlationId?: string): ReplaceSectionItem;

/**
 * Payload of the {@link ReplaceSectionItem} command.
 * @beta
 */
export declare interface ReplaceSectionItemPayload {
    /**
     * Index of section where the item to modify resides.
     */
    readonly sectionIndex: number;
    /**
     * Index of item within section that should be modified.
     */
    readonly itemIndex: number;
    /**
     * New item definition.
     */
    readonly item: DashboardItemDefinition;
    /**
     * Specify identifier for stash where the old item should be stored.
     *
     * @remarks
     * If no stashIdentifier provided, then the old item will be thrown away.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
    /**
     * Specify whether dashboard should auto-resolve date dataset to use for date filtering of the KPI
     * or insight widget that will be used to replace item on a dashboard.
     *
     * @remarks
     * This is by default disabled. Meaning date filtering will be enabled only if the KPI or Insight widget
     * already specifies dateDataset. If the dateDataset is `undefined` the widget will not be filtered
     * by dashboard's date filter.
     *
     * When you turn on this option, then the dashboard will automatically resolve date dataset for those
     * KPI and Insight widgets that have it `undefined`.
     */
    readonly autoResolveDateFilterDataset?: boolean;
}

/**
 * @public
 */
export declare interface RequestAsyncRender extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.RENDER.ASYNC.REQUEST";
    readonly payload: RequestAsyncRenderPayload;
}

/**
 * Notify the dashboard about asynchronous rendering (eg when the component needs to load some asynchronous data to be rendered) of the component.
 *
 * @remarks
 *  * Mechanism is following:
 * - You must request async rendering for at least 1 component within 2 seconds of the {@link DashboardInitialized} event.
 *   (If you do not register any asynchronous rendering, after 2 seconds the dashboard will announce that it is rendered by dispatching {@link DashboardRenderResolved} event.)
 * - You can request async rendering for any number of components. Requests are valid if the first rule is met
 *   and not all asynchronous renderings have been resolved and the maximum timeout (20min by default) has not elapsed.
 * - The component may again request asynchronous rendering within 2 seconds of resolution. Maximum 3x.
 *   (this is necessary to cover possible re-renders caused by data received from the components themselves, after they are rendered)
 * - Maximum rendering time of the dashboard is 20min - if some asynchronous renderings are not yet resolved at this time, {@link DashboardRenderResolved} event is dispatched anyway.
 *
 * - Each component on the dashboard that is rendered asynchronously should fire this command.
 * - Once the component is rendered, it should notify the dashboard by dispatching {@link resolveAsyncRender} command
 *   with the corresponding identifier.
 *
 * By registering and resolving asynchronous data retrieval of the each widget, the dashboard is able to recognize and notify that it is fully rendered.
 * This mechanism is necessary for dashboard exports to PDF to work properly.
 *
 * @public
 * @param id - async render identifier
 * @param correlationId - specify correlation id to use for this command.
 *                        this will be included in all events that will be emitted during the command processing
 * @returns
 */
export declare function requestAsyncRender(id: string, correlationId?: string): RequestAsyncRender;

/**
 * Payload of the {@link RequestAsyncRender} command.
 * @public
 */
export declare interface RequestAsyncRenderPayload {
    /**
     * Async render identifier (eg stringified widget {@link @gooddata/sdk-model#ObjRef}).
     */
    readonly id: string;
}

/**
 * A convenience function that will create ChangeAttributeFilterSelection command that will select all
 * elements of the dashboard attribute filter with the provided local id.
 *
 * @remarks
 * This is same as creating the ChangeAttributeFilterSelection command with empty elements and NOT_IN selection type.
 *
 * @param filterLocalId - dashboard attribute filter's local id
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @public
 */
export declare function resetAttributeFilterSelection(filterLocalId: string, correlationId?: string): ChangeAttributeFilterSelection;

/**
 * @beta
 */
export declare interface ResetDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.RESET";
}

/**
 * Creates the ResetDashboard command. Dispatching this command will result in dropping all in-memory modifications
 * of the dashboard and reverting to a state that is persisted on the backend. In other words reset will get
 * dashboard to a state after the last save.
 *
 * Note: if a dashboard is not saved on a backend, then reset will clear the dashboard to an empty state.
 *
 * Limitation: reset command will have no impact on alerts or scheduled emails. These entites are persisted outside
 * of the dashboard and have their own lifecycle.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function resetDashboard(correlationId?: string): ResetDashboard;

/**
 * @beta
 */
export declare interface ResizeHeight extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.RESIZE_HEIGHT";
    readonly payload: ResizeHeightPayload;
}

/**
 * Creates the ResizeHeight command.
 *
 * @param sectionIndex - index of the section
 * @param itemIndexes - indexes of the items
 * @param height - height in Grid Rows (by default 1 Grid Row is 20px)
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function resizeHeight(sectionIndex: number, itemIndexes: number[], height: number, correlationId?: string): ResizeHeight;

/**
 * Payload of the {@link ResizeHeight} command.
 * @beta
 */
export declare interface ResizeHeightPayload {
    /**
     * Index of the section to resize.
     *
     * Index is zero-based.
     */
    readonly sectionIndex: number;
    /**
     * Indexes of the items to resize.
     *
     * Index is zero-based.
     */
    readonly itemIndexes: number[];
    /**
     * Height to resize.
     */
    readonly height: number;
}

/**
 * @beta
 */
export declare interface ResizeWidth extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.RESIZE_WIDTH";
    readonly payload: ResizeWidthPayload;
}

/**
 * Creates the ResizeWidth command.
 *
 * @param sectionIndex - index of the section
 * @param itemIndex - index of the item
 * @param width - width in Grid Rows (by default 1 Grid Row is 20px)
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function resizeWidth(sectionIndex: number, itemIndex: number, width: number, correlationId?: string): ResizeWidth;

/**
 * Payload of the {@link ResizeWidth} command.
 * @beta
 */
export declare interface ResizeWidthPayload {
    /**
     * Index of the section to resize.
     *
     * Index is zero-based.
     */
    readonly sectionIndex: number;
    /**
     * Indexes of the item to resize.
     *
     * Index is zero-based.
     */
    readonly itemIndex: number;
    /**
     * width to resize.
     */
    readonly width: number;
}

/**
 * Supported dashboard filter types for values resolution.
 *
 * @alpha
 */
export declare type ResolvableFilter = IDashboardFilter;

/**
 * @public
 */
export declare interface ResolveAsyncRender extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.RENDER.ASYNC.RESOLVE";
    readonly payload: ResolveAsyncRenderPayload;
}

/**
 * Notify the dashboard about resolved asynchronous rendering of the component.
 *
 * @remarks
 * - Each component on the dashboard that is rendered asynchronously should fire this command.
 * - This command should only be dispatched if a {@link requestAsyncRender} command with the corresponding identifier
 *   has already been dispatched.
 *
 * @public
 * @param id - async render identifier
 * @param correlationId - specify correlation id to use for this command.
 *                        this will be included in all events that will be emitted during the command processing
 * @returns
 */
export declare function resolveAsyncRender(id: string, correlationId?: string): ResolveAsyncRender;

/**
 * Payload of the {@link ResolveAsyncRender} command.
 * @public
 */
export declare interface ResolveAsyncRenderPayload {
    /**
     * Async render identifier (eg stringified widget {@link @gooddata/sdk-model#ObjRef}).
     */
    readonly id: string;
}

/**
 * Dashboard configuration resolved using the config passed in via props and any essential data retrieved from
 * backend.
 *
 * @remarks
 * Note: the resolved config may still contain some undefined properties:
 *
 * -  `mapboxToken` - has to be provided by the context
 * -  `exportId` - optional, used for fetching filters during export mode
 * -  `isReadOnly` - is purely choice of context in which the dashboard is used
 *
 * @public
 */
export declare type ResolvedDashboardConfig = Omit<Required<DashboardConfig>, "mapboxToken" | "exportId"> & DashboardConfig;

/**
 * @alpha
 */
export declare type ResolvedDateFilterValues = IResolvedDateFilterValue[];

/**
 *
 * @beta
 */
export declare type ResolvedEntitlements = IEntitlementDescriptor[];

/**
 * Resolves filter values
 *
 * @param filters - Filters with resolvable values
 *  = all selected elements of attribute filter
 *  + from/to limits of relative date filter
 *  + from/to limits of absolute date filter
 *  @param backend - Analytical backend instance
 *  @param workspace - Workspace id
 * @returns Map of resolved filter values per filter's identifier (date dimension ref or attribute DF ref)
 * @alpha
 */
export declare function resolveFilterValues(filters: ResolvableFilter[], backend?: IAnalyticalBackend, workspace?: string): Promise<IResolvedFilterValues>;

/**
 * A convenience function to create UndoLayoutChanges command that will revert the very last command and toss it out
 * of history.
 *
 * @remarks
 * This is useful if you are implementing complex and cancellable interactions. For instance if you are building
 * drag-and-drop interaction which upon drag start removes item from a section using the RemoveSectionItem command and
 * upon drop places item in a new location using AddSectionItems command.
 *
 * When the user starts drag, you submit the RemoveSectionItem command (keeping the item in stash). Then user does
 * something to cancel the interaction: you need to restore the layout to the original state: that means to revert
 * the last layout change that was done by your interaction.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export declare function revertLastLayoutChange(correlationId?: string): UndoLayoutChanges;

/**
 * @internal
 */
export declare const SaveAsDialog: (props: ISaveAsDialogProps) => JSX.Element;

/**
 * @internal
 */
export declare const SaveAsNewButton: (props: ISaveAsNewButtonProps) => JSX.Element;

/**
 * @internal
 */
export declare const SaveButton: (props: ISaveButtonProps) => JSX.Element;

/**
 * @beta
 */
export declare interface SaveDashboard extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.SAVE";
    readonly payload: SaveDashboardPayload;
}

/**
 * Creates the SaveDashboard command. Dispatching this command will result in persisting all the accumulated
 * dashboard modification to backend.
 *
 * The command will not have any effect if dashboard is not initialized or is empty.
 *
 * @param title - new title for the dashboard; if not specified, the current title of the dashboard will be used
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function saveDashboard(title?: string, correlationId?: string): SaveDashboard;

/**
 * @public
 */
export declare interface SaveDashboardAs extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.SAVEAS";
    readonly payload: SaveDashboardAsPayload;
}

/**
 * Creates the SaveDashboardAs command.
 *
 * @remarks
 * Dispatching this command will result in creation of a copy of the
 * current dashboard. The copy will reflect the current state of the dashboard including any modifications done
 * on top of the original dashboard.
 *
 * Upon success, a copy of the dashboard will be persisted on the backend. The context of the dashboard component
 * that processed the command is unchanged - it still works with the original dashboard.
 *
 * @param title - new title for the dashboard; if not specified, the title of original dashboard will be used
 * @param switchToCopy - indicate whether the dashboard component should switch to the dashboard that will
 *  be created during save-as; the default is false
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *  @param useOriginalFilterContext - indicate whether new dashboard should use original filter context
 *  or the one with current filter selection.
 * @public
 */
export declare function saveDashboardAs(title?: string, switchToCopy?: boolean, useOriginalFilterContext?: boolean, correlationId?: string): SaveDashboardAs;

/**
 * Payload of the {@link SaveDashboardAs} command.
 * @public
 */
export declare interface SaveDashboardAsPayload {
    /**
     * Specify new title for the dashboard that will be created during the Save As operation.
     */
    readonly title?: string;
    /**
     * Indicate whether the dashboard component should switch to the copy of the dashboard or whether
     * it should stay on the current dashboard.
     */
    readonly switchToCopy?: boolean;
    /**
     * Indicates whether new dashboard should use the original filter context or whether to use the one
     * with current filter selection.
     */
    readonly useOriginalFilterContext?: boolean;
}

/**
 * Payload of the {@link SaveDashboard} command.
 * @beta
 */
export declare interface SaveDashboardPayload {
    /**
     * Specify new title for the dashboard that will be created during the Save operation. If not specified,
     * the current dashboard title will be used.
     */
    readonly title?: string;
}

/**
 * Saves scheduled email.
 *
 * @beta
 */
export declare interface SaveScheduledEmail extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.SCHEDULED_EMAIL.SAVE";
    readonly payload: SaveScheduledEmailPayload;
}

/**
 * Saves existing SaveScheduledEmail command. Dispatching this command will result in saving scheduled email on the backend.
 *
 * @param scheduledEmail - specify scheduled email to save.
 * @param filterContextRef - optionally specify existing filter context reference to be used for all attachments
 * @param correlationId - optionally specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing

 * @beta
 */
export declare function saveScheduledEmail(scheduledEmail: IScheduledMailDefinition, filterContextRef?: ObjRef, correlationId?: string): SaveScheduledEmail;

/**
 * Payload of the {@link SaveScheduledEmail} command.
 * @beta
 */
export declare interface SaveScheduledEmailPayload {
    /**
     * The scheduled email to save.
     */
    readonly scheduledEmail: IScheduledMailDefinition;
    /**
     * optionally specify existing filter context reference to be used for all attachments
     */
    readonly filterContextRef?: ObjRef;
}

/**
 * @public
 */
export declare interface SavingState {
    /** @beta */
    saving: boolean;
    /** @beta */
    result?: boolean;
    /** @beta */
    error?: Error;
}

/**
 * @internal
 */
export declare const ScheduledEmailDialog: (props: IScheduledEmailDialogProps) => JSX.Element;

/**
 * @internal
 */
export declare const ScheduledEmailManagementDialog: (props: IScheduledEmailManagementDialogProps) => JSX.Element;

/**
 * Select all accessible dashboard in project.
 *
 * @alpha
 */
export declare const selectAccessibleDashboards: (state: DashboardState) => IListedDashboard[];

/**
 * Select all accessible dashboard in project and returns them in a mapping of obj ref to the insight object.
 *
 * @alpha
 */
export declare const selectAccessibleDashboardsMap: DashboardSelector<ObjRefMap<IListedDashboard>>;

/**
 * @internal
 */
export declare const selectActiveSectionIndex: DashboardSelector<number | undefined>;

/**
 * Selects alert or undefined by alert ref
 *
 * @alpha
 */
export declare const selectAlertByRef: ((ref: ObjRef) => (state: DashboardState) => IWidgetAlert | undefined) & MemoizedFunction;

/**
 * Selects alert or undefined by widget ref
 *
 * @alpha
 */
export declare const selectAlertByWidgetRef: ((widgetRef: ObjRef) => (state: DashboardState) => IWidgetAlert | undefined) & MemoizedFunction;

/**
 * Selects all alerts used on the dashboard.
 *
 * @alpha
 */
export declare const selectAlerts: (state: DashboardState) => IWidgetAlert[];

/**
 * Selects dashboard alerts in mapping an obj ref to widget map.
 *
 * @internal
 */
export declare const selectAlertsMap: DashboardSelector<ObjRefMap<IWidgetAlert>>;

/**
 * Selects all non-custom widgets in the layout.
 *
 * @alpha
 */
export declare const selectAllAnalyticalWidgets: DashboardSelector<IWidget[]>;

/**
 * Selects all attributes in the catalog as a mapping of ref to catalog's attribute object. The mapping
 * will include both 'normal' attributes and attributes from date datasets.
 *
 * @remarks see `isCatalogAttribute` guard; this can be used to determine type of attribute
 * @alpha
 */
export declare const selectAllCatalogAttributesMap: DashboardSelector<ObjRefMap<ICatalogAttribute | ICatalogDateAttribute>>;

/**
 * Selects all date datasets in the catalog as a mapping of obj ref to date dataset.
 *
 * @alpha
 */
export declare const selectAllCatalogDateDatasetsMap: DashboardSelector<ObjRefMap<ICatalogDateDataset>>;

/**
 * Selects all display forms in the catalog as a mapping of obj ref to display form
 *
 * @alpha
 */
export declare const selectAllCatalogDisplayFormsMap: DashboardSelector<ObjRefMap<IAttributeDisplayFormMetadataObject>>;

/**
 * Selects all measures in the catalog as a mapping of ref to catalog's measure object.
 *
 * @alpha
 */
export declare const selectAllCatalogMeasuresMap: DashboardSelector<ObjRefMap<ICatalogMeasure>>;

/**
 * Selects all custom widgets in the layout.
 *
 * @alpha
 */
export declare const selectAllCustomWidgets: DashboardSelector<ExtendedDashboardWidget[]>;

/**
 * Selects all insight widgets in the layout.
 *
 * @alpha
 */
export declare const selectAllInsightWidgets: DashboardSelector<ExtendedDashboardWidget[]>;

/**
 * Selects all KPI widgets in the layout.
 *
 * @alpha
 */
export declare const selectAllKpiWidgets: DashboardSelector<IKpiWidget[]>;

/**
 * Returns whether creating new insight from dashboard is enabled.
 *
 * @internal
 */
export declare const selectAllowCreateInsightRequest: DashboardSelector<boolean>;

/**
 * Returns whether unfinished features are allowed.
 *
 * @internal
 */
export declare const selectAllowUnfinishedFeatures: DashboardSelector<boolean>;

/**
 * Selects analytical widget by its ref. This selector will return undefined if the provided
 * widget ref is for a custom widget.
 *
 * @remarks
 * To include custom widgets as well, use {@link selectWidgetByRef}.
 *
 * @alpha
 */
export declare const selectAnalyticalWidgetByRef: (ref: ObjRef | undefined) => DashboardSelector<IWidget | undefined>;

/**
 * Creates a selector for selecting all descendants of the attribute filter with given localId.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectAttributeFilterDescendants: (localId: string) => DashboardSelector<string[]>;

/**
 * Creates a selector to get a display form of the filter defined by its local identifier.
 *
 * @internal
 */
export declare const selectAttributeFilterDisplayFormByLocalId: (localId: string) => DashboardSelector<ObjRef>;

/**
 * Selects list of display form metadata objects referenced by attribute filters.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @returns an array of {@link @gooddata/sdk-backend-spi#IAttributeDisplayFormMetadataObject}
 *
 * @public
 */
export declare const selectAttributeFilterDisplayForms: DashboardSelector<IAttributeDisplayFormMetadataObject[]>;

/**
 * Selects map of display form metadata objects referenced by attribute filters.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @returns a {@link ObjRefMap} of {@link @gooddata/sdk-backend-spi#IAttributeDisplayFormMetadataObject}
 *
 * @internal
 */
export declare const selectAttributeFilterDisplayFormsMap: DashboardSelector<ObjRefMap<IAttributeDisplayFormMetadataObject>>;

/**
 * @alpha
 */
export declare const selectAttributesWithDrillDown: DashboardSelector<(ICatalogAttribute | ICatalogDateAttribute)[]>;

/**
 * This selector returns capabilities of the backend with which the dashboard works.
 *
 * @public
 */
export declare const selectBackendCapabilities: DashboardSelector<IBackendCapabilities>;

/**
 * This selector returns whether any more attribute filters can be added.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectCanAddMoreAttributeFilters: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to create a KPI dashboard object via API.
 *
 * @public
 */
export declare const selectCanCreateAnalyticalDashboard: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to create a scheduled email object and a KPI alert object.
 *
 * @public
 */
export declare const selectCanCreateScheduledMail: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to create a KPI object, KPI widget object, and an insight object via API.
 *
 * @public
 */
export declare const selectCanCreateVisualization: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to edit dashboard.
 *
 * @public
 */
export declare const selectCanEditDashboardPermission: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to edit locked dashboard.
 *
 * @public
 */
export declare const selectCanEditLockedDashboardPermission: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions necessary to export insights to CSV..
 *
 * @public
 */
export declare const selectCanExecuteRaw: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions necessary to export insights to PDF
 *
 * @public
 */
export declare const selectCanExportPdf: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions necessary to export insights.
 *
 * @public
 */
export declare const selectCanExportReport: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions necessary to export insights to CSV, XLSX
 *
 * @public
 */
export declare const selectCanExportTabular: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to run MAQL DDL and DML, access a workspace staging directory.
 *
 * @public
 */
export declare const selectCanInitData: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to invite a user to a workspace or delete an invitation.
 *
 * @public
 */
export declare const selectCanInviteUserToWorkspace: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to list users, roles, and permissions.
 *
 * @public
 */
export declare const selectCanListUsersInWorkspace: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to add, remove, and list ACLs (Access Control Lists) on an object.
 *
 * @public
 */
export declare const selectCanManageACL: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to modify and delete a KPI dashboard object.
 *
 * @public
 */
export declare const selectCanManageAnalyticalDashboard: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to modify and delete a domain, run MAQL DDL.
 *
 * @public
 */
export declare const selectCanManageDomain: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to modify and delete a metric, run MAQL DDL, run the MAQL validator, change metric visibility via the `unlisted` flag.
 *
 * @public
 */
export declare const selectCanManageMetric: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to manage scheduled email objects.
 *
 * @public
 */
export declare const selectCanManageScheduledMail: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to modify workspace metadata, see the workspace token, lock and unlock objects, delete locked objects, set and unset the restricted flag on objects, clear cache, delete a workspace.
 *
 * @public
 */
export declare const selectCanManageWorkspace: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to run uploads, load date dimensions, access a workspace staging directory.
 *
 * @public
 */
export declare const selectCanRefreshData: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to share dashboard.
 *
 * @public
 */
export declare const selectCanShareDashboardPermission: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to share a locked dashboard.
 *
 * @public
 */
export declare const selectCanShareLockedDashboardPermission: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to upload CSV files via CSV Uploader.
 *
 * @public
 */
export declare const selectCanUploadNonProductionCSV: DashboardSelector<boolean>;

/**
 * Returns whether the current user has permissions to view dashboard.
 *
 * @public
 */
export declare const selectCanViewDashboardPermission: DashboardSelector<boolean>;

/**
 * @public
 */
export declare const selectCatalogAttributeDisplayForms: DashboardSelector<IAttributeDisplayFormMetadataObject[]>;

/**
 * @public
 */
export declare const selectCatalogAttributes: DashboardSelector<ICatalogAttribute[]>;

/**
 * @public
 */
export declare const selectCatalogDateDatasets: DashboardSelector<ICatalogDateDataset[]>;

/**
 * @public
 */
export declare const selectCatalogFacts: DashboardSelector<ICatalogFact[]>;

/**
 * @public
 */
export declare const selectCatalogMeasures: DashboardSelector<ICatalogMeasure[]>;

/**
 * Returns the color palette for dashboard charts.
 *
 * @public
 */
export declare const selectColorPalette: DashboardSelector<IColorPalette>;

/**
 * Returns dashboard's config.
 *
 * @remarks
 * It is expected that the selector is called only after the config state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectConfig: DashboardSelector<ResolvedDashboardConfig>;

/**
 * @internal
 */
export declare const selectConfigurationPanelOpened: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectConfiguredAndImplicitDrillsByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;

/**
 * @internal
 */
export declare const selectConfiguredDrillsByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;

/**
 * This selector returns current logged in user.
 *
 * @remarks
 * It is expected that the selector is called only after the permission state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @example - on how to use `selectCurrentUser` selector within a Dashboard Plugin.
 * ```
 * // create the component using current user selector
 * const Greetings: React.FC = () => {
 *      // read the currently logged in user information
 *      const user = useDashboardSelector(selectCurrentUser);
 *
 *      return <div>Hello, {user.fullName}</div>;
 * }
 *
 * // in a plugin's register function just use the component as a custom widget type
 * customize.customWidgets().addCustomWidget("greetingsWidget", Greetings);
 *
 *  customize.layout().customizeFluidLayout((_layout, customizer) => {
 *          customizer.addSection(
 *              0,
 *              newDashboardSection(
 *                  "Greetings by Plugin",
 *                  newDashboardItem(newCustomWidget("greetings", "greetingsWidget"), {
 *                      xl: {
 *                          // all 12 columns of the grid will be 'allocated' for this new item
 *                          gridWidth: 12,
 *                          // minimum height since the custom widget now has just some one-liner text
 *                          gridHeight: 1,
 *                      },
 *                  }),
 *              ),
 *          );
 *      });
 *
 * ```
 *
 * @returns - an {@link @gooddata/sdk-model#IUser} object for logged in user.
 * @public
 */
export declare const selectCurrentUser: DashboardSelector<IUser>;

/**
 * This selector returns current logged in user ref.
 *
 * @remarks
 * It is expected that the selector is called only after the permission state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @returns - an {@link @gooddata/sdk-model#ObjRef} of the logged in user.
 * @public
 */
export declare const selectCurrentUserRef: DashboardSelector<ObjRef>;

/**
 * Selects current dashboard description.
 *
 * @public
 */
export declare const selectDashboardDescription: DashboardSelector<string>;

/**
 * Selects identifier of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export declare const selectDashboardId: DashboardSelector<string | undefined>;

/**
 * Selects idRef of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export declare const selectDashboardIdRef: DashboardSelector<IdentifierRef | undefined>;

/**
 * @internal
 */
export declare const selectDashboardLoading: DashboardSelector<LoadingState>;

/**
 * Selects dashboard lock status.
 *
 * @alpha
 */
export declare const selectDashboardLockStatus: DashboardSelector<boolean>;

/**
 * This selector returns user's dashboard permissions.
 *
 * @remarks
 * It is expected that the selector is called only after the dashboard permission state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * If the permission is not supported by GoodData Cloud and GoodData.CN backends, the selector always returns `false` value.
 *
 * In case you need multiple permissions available in your application, use this common selector.
 *
 * @public
 */
export declare const selectDashboardPermissions: DashboardSelector<IDashboardPermissions>;

/**
 * Selects ref of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export declare const selectDashboardRef: DashboardSelector<ObjRef | undefined>;

/**
 * @internal
 */
export declare const selectDashboardSaving: DashboardSelector<SavingState>;

/**
 * Selects complete dashboard share info.
 *
 * @alpha
 */
export declare const selectDashboardShareInfo: DashboardSelector<IAccessControlAware>;

/**
 * Selects dashboard share status.
 *
 * @alpha
 */
export declare const selectDashboardShareStatus: DashboardSelector<ShareStatus>;

/**
 * Selects dashboard tags.
 *
 * @public
 */
export declare const selectDashboardTags: DashboardSelector<string[]>;

/**
 * Selects current dashboard title.
 *
 * @public
 */
export declare const selectDashboardTitle: DashboardSelector<string>;

/**
 * Selects URI of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export declare const selectDashboardUri: DashboardSelector<string | undefined>;

/**
 * Selects uriRef of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export declare const selectDashboardUriRef: DashboardSelector<UriRef | undefined>;

/**
 * @internal
 */
export declare const selectDashboardWorkingDefinition: DashboardSelector<IDashboardDefinition<IDashboardWidget>>;

/**
 * Selector that will return date datasets for insight. The input to the selector is the dashboard query that is used
 * to obtain and cache the data.
 *
 * This selector will return undefined if the query to obtain the data for particular insight was not yet fired or
 * processed. Otherwise will return object containing `status` of the data retrieval; if the `status` is
 * `'success'` then the `result` prop will contain the data.
 *
 * @remarks see {@link QueryInsightDateDatasets}
 * @internal
 */
export declare const selectDateDatasetsForInsight: (query: QueryInsightDateDatasets) => (state: DashboardState_2, ...params: any[]) => QueryCacheEntryResult_2<InsightDateDatasets> | undefined;

/**
 * Selector that will return date datasets for a measure. The input to the selector is the dashboard query that is used
 * to obtain and cache the data.
 *
 * This selector will return undefined if the query to obtain the data for a particular measure was not yet fired or
 * processed. Otherwise will return object containing `status` of the data retrieval; if the `status` is
 * `'success'` then the `result` prop will contain the data.
 *
 * @remarks see {@link QueryMeasureDateDatasets}
 * @internal
 */
export declare const selectDateDatasetsForMeasure: (query: QueryMeasureDateDatasets) => (state: DashboardState_2, ...params: any[]) => QueryCacheEntryResult_2<MeasureDateDatasets> | undefined;

/**
 * Returns workspace-level configuration for the of the date filter options and presets.
 *
 * @remarks
 * Note: this configuration SHOULD be further augmented by the dashboard-level overrides to obtain
 * the effective date filter configuration.
 *
 * @public
 */
export declare const selectDateFilterConfig: DashboardSelector<IDateFilterConfig>;

/**
 * Returns date filter config that is specified on the loaded dashboard.
 *
 * The dashboard-level date filter configuration MAY contain overrides and additional configuration to apply
 * on top of the workspace-level date filter config. If the dashboard-level overrides are not specified, then
 * the workspace-level config should be taken as-is.
 *
 * @remarks See {@link selectEffectiveDateFilterConfig} - you can use this selector to obtain the effective
 *  date filter config that contains the final config obtained by merging the workspace-level config and the
 *  dashboard-level overrides.
 *
 * @alpha
 */
export declare const selectDateFilterConfigOverrides: DashboardSelector<IDashboardDateFilterConfig_2 | undefined>;

/**
 * Returns the date filter config validation result warnings indicating any problems encountered during the date filter config resolution.
 *
 * @alpha
 */
export declare const selectDateFilterConfigValidationWarnings: DashboardSelector<DateFilterValidationResult[]>;

/**
 * Returns date format.
 *
 * @public
 */
export declare const selectDateFormat: DashboardSelector<string | undefined>;

/**
 * Returns whether the default drills configured on the widgets or implicit drills (eg. drill down) are disabled.
 * This option does not affect drilling enabled by drillableItems.
 *
 * @public
 */
export declare const selectDisableDefaultDrills: DashboardSelector<boolean>;

/**
 * Returns whether we should disable the underline in KPIs when they are drillable.
 *
 * @internal
 */
export declare const selectDisableKpiDashboardHeadlineUnderline: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectDraggingWidgetSource: DashboardSelector<DraggableLayoutItem | undefined>;

/**
 * @internal
 */
export declare const selectDraggingWidgetTarget: DashboardSelector<ILayoutCoordinates | undefined>;

/**
 * Returns drillable items that are currently set.
 *
 * @alpha
 */
export declare const selectDrillableItems: DashboardSelector<ExplicitDrill[]>;

/**
 * @internal
 */
export declare const selectDrillableItemsByAvailableDrillTargets: (availableDrillTargets: IAvailableDrillTargets | undefined) => DashboardSelector<IHeaderPredicate[]>;

/**
 * @internal
 */
export declare const selectDrillableItemsByWidgetRef: (ref: ObjRef) => DashboardSelector<ExplicitDrill[]>;

/**
 * Return all widgets drill targets
 * @alpha
 */
export declare const selectDrillTargets: DashboardSelector<ObjRefMap<IDrillTargets>>;

/**
 * Selects drill targets by widget ref.
 *
 * @alpha
 */
export declare const selectDrillTargetsByWidgetRef: (ref: ObjRef) => DashboardSelector<IDrillTargets | undefined>;

/**
 * Returns effective date filter options from. This is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * These are the date filter options that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterAvailableGranularities: DashboardSelector<DateFilterGranularity[]>;

/**
 * Returns effective date filter config. The effective date filter config is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * This is the configuration that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterConfig: DashboardSelector<IDateFilterConfig>;

/**
 * Returns display mode for the effective date filter. This always comes from the dashboard-level date filter config overrides - regardless whether
 * the rest of the overrides are actually used.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterMode: DashboardSelector<DashboardDateFilterConfigMode>;

/**
 * Returns effective date filter options. This is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * These are the date filter options that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterOptions: DashboardSelector<IDateFilterOptionsByType>;

/**
 * Returns custom title to use for the date filter. Custom title comes from the dashboard-level date filter config overrides. If no overrides
 * were defined OR the effective date filter config is not using them (because applying them means the final date filter config is invalid),
 * then no custom filter should be used.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterTitle: DashboardSelector<string | undefined>;

/**
 * Returns whether analytical dashboard permissions are enabled
 *
 * @internal
 */
export declare const selectEnableAnalyticalDashboardPermissions: DashboardSelector<boolean>;

/**
 * Returns whether attribute hierarchies are enabled.
 *
 * @internal
 */
export declare const selectEnableAttributeHierarchies: DashboardSelector<boolean>;

/**
 * Returns whether implicit drill to attributes url enabled
 *
 * @public
 */
export declare const selectEnableClickableAttributeURL: DashboardSelector<boolean>;

/**
 * Returns whether company logo should be visible in embedded dashboard.
 *
 * @public
 */
export declare const selectEnableCompanyLogoInEmbeddedUI: DashboardSelector<boolean>;

/**
 * Returns whether filter values in drill events should be resolved.
 *
 * @public
 */
export declare const selectEnableFilterValuesResolutionInDrillEvents: DashboardSelector<boolean>;

/**
 * Returns whether insight export scheduling is enabled.
 *
 * @public
 */
export declare const selectEnableInsightExportScheduling: DashboardSelector<boolean>;

/**
 * Returns whether drill fromAttribute is enabled
 *
 * @public
 */
export declare const selectEnableKPIDashboardDrillFromAttribute: DashboardSelector<boolean>;

/**
 * Returns whether the drill to dashboard is enabled.
 *
 * @public
 */
export declare const selectEnableKPIDashboardDrillToDashboard: DashboardSelector<boolean>;

/**
 * Returns whether drill to insight is enabled
 *
 * @public
 */
export declare const selectEnableKPIDashboardDrillToInsight: DashboardSelector<boolean>;

/**
 * Returns whether drill to url is enabled
 *
 * @public
 */
export declare const selectEnableKPIDashboardDrillToURL: DashboardSelector<boolean>;

/**
 * Returns whether the export to pdf is enabled.
 *
 * @public
 */
export declare const selectEnableKPIDashboardExportPDF: DashboardSelector<string | number | boolean | object>;

/**
 * Returns whether implicit drill to attributes url enabled
 *
 * @public
 */
export declare const selectEnableKPIDashboardImplicitDrillDown: DashboardSelector<boolean>;

/**
 * Returns whether the save as new dashboard functionality is enabled.
 *
 * @public
 */
export declare const selectEnableKPIDashboardSaveAsNew: DashboardSelector<boolean>;

/**
 * Returns whether the current user can schedule emails.
 *
 * @public
 */
export declare const selectEnableKPIDashboardSchedule: DashboardSelector<boolean>;

/**
 * Returns whether the current user can share scheduled email to other recipients.
 *
 * @public
 */
export declare const selectEnableKPIDashboardScheduleRecipients: DashboardSelector<boolean>;

/**
 * Returns whether we should call measures metrics (true) or measures (false).
 *
 * @internal
 */
export declare const selectEnableRenamingMeasureToMetric: DashboardSelector<boolean>;

/**
 * Returns whether we should call workspaces workspaces (true) or projects (false).
 *
 * @internal
 */
export declare const selectEnableRenamingProjectToWorkspace: DashboardSelector<boolean>;

/**
 * Returns whether custom widget heights are enabled
 *
 * @internal
 */
export declare const selectEnableWidgetCustomHeight: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectEntitlementExportPdf: DashboardSelector<IEntitlementDescriptor | undefined>;

/**
 * @alpha
 */
export declare const selectExecutionResult: (state: DashboardState, id: EntityId) => IExecutionResultEnvelope | undefined;

/**
 * @alpha
 */
export declare const selectExecutionResultByRef: (ref: ObjRef) => DashboardSelector<IExecutionResultEnvelope | undefined>;

/**
 * @alpha
 */
export declare const selectFilterBarExpanded: DashboardSelector<boolean>;

/**
 * Creates a selector for selecting attribute filter by its displayForm {@link @gooddata/sdk-model#ObjRef}.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectFilterContextAttributeFilterByDisplayForm: (displayForm: ObjRef) => (state: DashboardState) => IDashboardAttributeFilter | undefined;

/**
 * This selector returns dashboard's filter context attribute filters.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectFilterContextAttributeFilters: DashboardSelector<IDashboardAttributeFilter[]>;

/**
 * This selector returns dashboard's filter context date filter.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectFilterContextDateFilter: DashboardSelector<IDashboardDateFilter | undefined>;

/**
 * This selector returns current dashboard's filter context definition.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @returns a {@link @gooddata/sdk-backend-spi#IFilterContextDefinition}
 *
 * @public
 */
export declare const selectFilterContextDefinition: DashboardSelector<IFilterContextDefinition>;

/**
 * This selector returns dashboard's filter context filters.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectFilterContextFilters: DashboardSelector<FilterContextItem[]>;

/**
 * Selects dashboard's filter context identity.
 *
 * @remarks
 * The identity may be undefined in two circumstances:
 *
 * -  a new, yet unsaved dashboard; the filter context is saved together with the dashboard and after the
 *    save the identity will be known and added
 *
 * -  export of an existing, saved dashboard; during the export the dashboard receives a temporary
 *    filter context that represents values of filters at the time the export was initiated - which may
 *    be different from what is saved in the filter context itself. that temporary context is not
 *    persistent and lives only for that particular export operation.
 *
 * Invocations before initialization lead to invariant errors.
 *
 * @returns a {@link @gooddata/sdk-backend-spi#IDashboardObjectIdentity} or undefined, if the filter context identity is not set.
 *
 * @internal
 */
export declare const selectFilterContextIdentity: DashboardSelector<IDashboardObjectIdentity | undefined>;

/**
 * @alpha
 */
export declare const selectHasCatalogAttributes: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectHasCatalogDateDatasets: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectHasCatalogFacts: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectHasCatalogMeasures: DashboardSelector<boolean>;

/**
 * Returns whether Kpi drills in embedded mode are disabled.
 *
 * @public
 */
export declare const selectHideKpiDrillInEmbedded: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectImplicitDrillsByAvailableDrillTargets: (availableDrillTargets: IAvailableDrillTargets | undefined) => DashboardSelector<IImplicitDrillWithPredicates[]>;

/**
 * @internal
 */
export declare const selectImplicitDrillsDownByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;

/**
 * @internal
 */
export declare const selectImplicitDrillsToUrlByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;

/**
 * Select all inaccessible dashboard in project.
 *
 * @alpha
 */
export declare const selectInaccessibleDashboards: (state: DashboardState) => IInaccessibleDashboard[];

/**
 * Select all inaccessible dashboard in project and returns them in a mapping of obj ref to the insight object.
 *
 * @alpha
 */
export declare const selectInaccessibleDashboardsMap: DashboardSelector<ObjRefMap<IInaccessibleDashboard>>;

/**
 * Selector that will return attribute metadata for an insight. The input to the selector is the dashboard query that is used
 * to obtain and cache the data.
 *
 * This selector will return undefined if the query to obtain the data for particular insight was not yet fired or
 * processed. Otherwise will return object containing `status` of the data retrieval; if the `status` is
 * `'success'` then the `result` prop will contain the data.
 *
 * @remarks see {@link QueryInsightAttributesMeta}
 * @internal
 */
export declare const selectInsightAttributesMeta: (query: QueryInsightAttributesMeta) => (state: DashboardState_2, ...params: any[]) => QueryCacheEntryResult_2<InsightAttributesMeta> | undefined;

/**
 * Selects insight used on a dashboard by its ref.
 *
 * @alpha
 */
export declare const selectInsightByRef: (ref: ObjRef | undefined) => DashboardSelector<IInsight | undefined>;

/**
 * @internal
 */
export declare const selectInsightListLastUpdateRequested: DashboardSelector<number>;

/**
 * Selects refs of all insights used on the dashboard.
 *
 * @alpha
 */
export declare const selectInsightRefs: DashboardSelector<ObjRef[]>;

/**
 * Selects all insights used on the dashboard.
 *
 * @remarks
 * Note: if you are aiming to lookup insights using an ObjRef, then you should instead use the map returned
 * by {@link selectInsightsMap}. If you are aiming to lookup a single insight by its ref, use {@link selectInsightByRef}.
 * Using these selectors is both faster and safer as they take ObjRef type into account and look up the insight
 * depending on the type of the ref.
 *
 * See {@link selectInsightsMap} or {@link selectInsightByRef} for a faster and safer ways to get
 * an insight by its ObjRef.
 * @public
 */
export declare const selectInsights: (state: DashboardState) => IInsight[];

/**
 * Selects all insights and returns them in a mapping of obj ref to the insight object.
 *
 * @alpha
 */
export declare const selectInsightsMap: DashboardSelector<ObjRefMap<IInsight>>;

/**
 * @internal
 */
export declare const selectInsightWidgetPlaceholder: DashboardSelector<ExtendedDashboardWidget | undefined>;

/**
 * @internal
 */
export declare const selectInsightWidgetPlaceholderCoordinates: DashboardSelector<ILayoutCoordinates | undefined>;

/**
 * @internal
 */
export declare const selectInvalidDrillWidgetRefs: DashboardSelector<ObjRef[]>;

/**
 * @internal
 */
export declare const selectInvalidUrlDrillParameterDrillLocalIdsByWidgetRef: (ref: ObjRef) => DashboardSelector<string[]>;

/**
 * @internal
 */
export declare const selectInvalidUrlDrillParameterWidgetRefs: DashboardSelector<ObjRef[]>;

/**
 * @internal
 */
export declare const selectInvalidUrlDrillParameterWidgetWarnings: DashboardSelector<ObjRef[]>;

/**
 * Returns whether choice of alternate display forms is enabled.
 *
 * @internal
 */
export declare const selectIsAlternativeDisplayFormSelectionEnabled: DashboardSelector<boolean>;

/**
 * Returns whether analytical designer is enabled.
 *
 * @internal
 */
export declare const selectIsAnalyticalDesignerEnabled: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsCancelEditModeDialogOpen: DashboardSelector<boolean>;

/**
 * Creates a selector which checks for a circular dependency between filters.
 *
 * @internal
 */
export declare const selectIsCircularDependency: (currentFilterLocalId: string, neighborFilterLocalId: string) => DashboardSelector<boolean>;

/**
 * Selects a boolean indication if he dashboard has any changes compared to the persisted version (if any)
 *
 * @internal
 */
export declare const selectIsDashboardDirty: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsDashboardLoading: DashboardSelector<boolean>;

/**
 * Returns whether dashboard is private.
 *
 * @alpha
 */
export declare const selectIsDashboardPrivate: DashboardSelector<boolean>;

/**
 * @public
 */
export declare const selectIsDashboardSaving: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsDeleteDialogOpen: DashboardSelector<boolean>;

/**
 * Returns whether delete button in dashboard attribute filters is visible.
 *
 * @internal
 */
export declare const selectIsDeleteFilterButtonEnabled: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsDraggingWidget: DashboardSelector<boolean>;

/**
 * Returns whether drill down is enabled.
 *
 * On Bear, drill down is driven by isKPIDashboardImplicitDrillDown.
 * On Tiger, it is driven by attribute hierarchies, thus isAttribueHierarchiesEnabled.
 *
 * @internal
 */
export declare const selectIsDrillDownEnabled: DashboardSelector<boolean>;

/**
 * Returns whether the Dashboard is executed in embedded context.
 *
 * @remarks
 * In embedded mode, some interactions may be disabled.
 *
 * @public
 */
export declare const selectIsEmbedded: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsExecutionResultExportableToCsvByRef: (ref: ObjRef) => DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsExecutionResultExportableToXlsxByRef: (ref: ObjRef) => DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsExecutionResultReadyForExportByRef: (ref: ObjRef) => DashboardSelector<boolean>;

/**
 * Returns whether the Dashboard is rendered in the export mode.
 * In export mode, some components can be hidden, or rendered differently.
 *
 * @public
 */
export declare const selectIsExport: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsFilterAttributeSelectionOpen: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsInEditMode: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsInViewMode: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsKpiAlertHighlightedByWidgetRef: (ref: ObjRef | undefined) => (state: DashboardState) => boolean;

/**
 * @alpha
 */
export declare const selectIsKpiAlertOpenedByWidgetRef: (ref: ObjRef | undefined) => (state: DashboardState) => boolean;

/**
 * Returns whether dependent filters are enabled.
 *
 * @internal
 */
export declare const selectIsKPIDashboardDependentFiltersEnabled: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsKpiDeleteDialogOpen: DashboardSelector<boolean>;

/**
 * Selects a boolean indicating if the dashboard is empty.
 *
 * @alpha
 */
export declare const selectIsLayoutEmpty: DashboardSelector<boolean>;

/**
 * Selects a boolean indication if dashboard is new
 *
 * @internal
 */
export declare const selectIsNewDashboard: DashboardSelector<boolean>;

/**
 * Returns whether the Dashboard is executed in read-only mode.
 *
 * @remarks
 * Read-only mode disables any interactions that can alter the backend data.
 *
 * @public
 */
export declare const selectIsReadOnly: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsSaveAsDialogOpen: DashboardSelector<boolean>;

/**
 * Returns whether the save as new button is hidden.
 *
 * @internal
 */
export declare const selectIsSaveAsNewButtonHidden: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsSaveAsNewButtonVisible: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsScheduleEmailDialogOpen: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsScheduleEmailManagementDialogOpen: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsSectionInsertedByPlugin: (refs: (ObjRef | undefined)[]) => DashboardSelector<boolean>;

/**
 * Returns whether share button is hidden.
 *
 * @internal
 */
export declare const selectIsShareButtonHidden: DashboardSelector<boolean>;

/**
 * @alpha
 */
export declare const selectIsShareDialogOpen: DashboardSelector<boolean>;

/**
 * Returns whether the Dashboard is white labeled.
 *
 * @internal
 */
export declare const selectIsWhiteLabeled: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectIsWidgetLoadingAdditionalDataByWidgetRef: (refs: ObjRef) => DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectKpiDeleteDialogWidgetCoordinates: DashboardSelector<ILayoutCoordinates | undefined>;

/**
 * @internal
 */
export declare const selectKpiWidgetPlaceholder: DashboardSelector<ExtendedDashboardWidget | undefined>;

/**
 * @internal
 */
export declare const selectKpiWidgetPlaceholderCoordinates: DashboardSelector<ILayoutCoordinates | undefined>;

/**
 * This selector returns dashboard's layout. It is expected that the selector is called only after the layout state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @alpha
 */
export declare const selectLayout: DashboardSelector<IDashboardLayout<ExtendedDashboardWidget>>;

/**
 * Selects a boolean indicating if the dashboard contains at least one non-custom widget.
 *
 * @alpha
 */
export declare const selectLayoutHasAnalyticalWidgets: DashboardSelector<boolean>;

/**
 * Selects all the legacy dashboards. Invocations before initialization lead to invariant errors.
 *
 * @alpha
 */
export declare const selectLegacyDashboards: DashboardSelector<ILegacyDashboard[]>;

/**
 * Select all listed dashboard in project.
 *
 * @alpha
 */
export declare const selectListedDashboards: (state: DashboardState) => IListedDashboard[];

/**
 * Select all listed dashboard in project and returns them in a mapping of obj ref to the insight object.
 *
 * @alpha
 */
export declare const selectListedDashboardsMap: DashboardSelector<ObjRefMap<IListedDashboard>>;

/**
 * Returns locale to use for internationalization of the dashboard.
 *
 * @public
 */
export declare const selectLocale: DashboardSelector<ILocale>;

/**
 * Returns Mapbox token.
 *
 * @internal
 */
export declare const selectMapboxToken: DashboardSelector<string | undefined>;

/**
 * @alpha
 */
export declare const selectMenuButtonItemsVisibility: DashboardSelector<IMenuButtonItemsVisibility>;

/**
 * Returns the object availability configuration for this dashboard.
 *
 * @remarks
 * Only objects that match the availability criteria can appear in selections where user has pick
 * an object to use for some purpose (for instance metric for KPI or date dataset to filter by).
 *
 * @public
 */
export declare const selectObjectAvailabilityConfig: DashboardSelector<ObjectAvailabilityConfig>;

/**
 * This selector returns original (stored) dashboard's filter context definition.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @returns {@link @gooddata/sdk-backend-spi#IFilterContextDefinition} or `undefined` if original filter context definition is not set.
 *
 * @public
 */
export declare const selectOriginalFilterContextDefinition: DashboardSelector<IFilterContextDefinition | undefined>;

/**
 * This selector returns original (stored) dashboard's filters.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @returns an array of {@link @gooddata/sdk-backend-spi#FilterContextItem} or an empty array.
 *
 * @public
 */
export declare const selectOriginalFilterContextFilters: DashboardSelector<FilterContextItem[]>;

/**
 * Creates a selector for selecting all filters with different reference than the given one.
 *
 * @internal
 */
export declare const selectOtherContextAttributeFilters: (ref?: ObjRef) => DashboardSelector<IDashboardAttributeFilter[]>;

/**
 * This selector returns user's permissions in the workspace where the dashboard is stored.
 *
 * @remarks
 * It is expected that the selector is called only after the permission state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * See {@link @gooddata/sdk-backend-spi#WorkspacePermission} for all available permissions.
 *
 * If the permission is not supported by GoodData Cloud and GoodData.CN backends, the selector always returns `false` value.
 *
 * In case you need multiple permissions available in your application, use common selector.
 *
 * @example - on how to select all permissions.
 * ```
 *      const permissions = useDashboardSelector(selectPermissions);
 *
 *      if (permissions.canCreateAnalyticalDashboard) {
 *          // allow user to do a action for which the `canCreateAnalyticalDashboard` permission is needed
 *      }
 * ```
 *
 * If there is only limited number of permissions, use specific selector instead (available selectors are all below).
 *
 * @example - on how to select specific permission.
 * ```
 *      const canCreateAnalyticalDashboard = useDashboardSelector(selectCanCreateAnalyticalDashboard);
 *
 *      if (canCreateAnalyticalDashboard) {
 *          // allow user to do a action for which the `canCreateAnalyticalDashboard` permission is needed
 *      }
 * ```
 *
 * @public
 */
export declare const selectPermissions: DashboardSelector<IWorkspacePermissions>;

/**
 * Selects persisted IDashboard object - that is the IDashboard object that was used to initialize the rest
 * of the dashboard state of the dashboard component during the initial load of the dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @internal
 */
export declare const selectPersistedDashboard: DashboardSelector<IDashboard | undefined>;

/**
 * Returns current platform edition.
 *
 * @public
 */
export declare const selectPlatformEdition: DashboardSelector<PlatformEdition>;

/**
 * @internal
 */
export declare const selectRenderMode: DashboardSelector<RenderMode>;

/**
 * @alpha
 */
export declare const selectScheduleEmailDialogDefaultAttachment: DashboardSelector<ObjRef | undefined>;

/**
 * @internal
 */
export declare const selectSectionModification: (refs: (ObjRef | undefined)[]) => DashboardSelector<("insertedByPlugin" | "modifiedByPlugin")[]>;

/**
 * @alpha
 */
export declare const selectSelectedFilterIndex: DashboardSelector<number | undefined>;

/**
 * @internal
 */
export declare const selectSelectedWidgetRef: DashboardSelector<ObjRef | undefined>;

/**
 * Returns number separators to use when rendering numeric values on charts or KPIs.
 *
 * @public
 */
export declare const selectSeparators: DashboardSelector<ISeparators>;

/**
 * Returns settings that are in effect for the current dashboard.
 *
 * @public
 */
export declare const selectSettings: DashboardSelector<ISettings>;

/**
 * Returns whether we should hide the pixel perfect experience references.
 *
 * @internal
 */
export declare const selectShouldHidePixelPerfectExperience: DashboardSelector<string | number | boolean | object>;

/**
 * This selector returns current layout's stash. This stash can contain items that were removed from the layout with the
 * intent of further using the item elsewhere on the layout. The stash is a mapping of stashIdentifier to an array
 * of stashed items. The stash identifiers and stash usage is fully under control of the user.
 *
 * @internal
 */
export declare const selectStash: DashboardSelector<LayoutStash>;

/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsAccessControl}
 *
 * @internal
 */
export declare const selectSupportsAccessControlCapability: DashboardSelector<boolean>;

/**
 * This selector returns capability if parent child filtering is enabled.
 *
 * @public
 */
export declare const selectSupportsElementsQueryParentFiltering: DashboardSelector<boolean>;

/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsElementUris}
 *
 * @internal
 */
export declare const selectSupportsElementUris: DashboardSelector<boolean>;

/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsHierarchicalWorkspaces}
 *
 * @internal
 */
export declare const selectSupportsHierarchicalWorkspacesCapability: DashboardSelector<boolean>;

/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsKpiWidget}
 *
 * @internal
 */
export declare const selectSupportsKpiWidgetCapability: DashboardSelector<boolean>;

/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsObjectUris}
 *
 * @internal
 */
export declare const selectSupportsObjectUris: DashboardSelector<boolean>;

/**
 * @internal
 */
export declare const selectValidConfiguredDrillsByWidgetRef: (ref: ObjRef) => DashboardSelector<IImplicitDrillWithPredicates[]>;

/**
 * Returns week start day
 *
 * @internal
 */
export declare const selectWeekStart: DashboardSelector<WeekStart>;

/**
 * Selects widget by its ref (including custom widgets).
 *
 * @remarks
 * To limit the scope only to analytical widgets, use {@link selectAnalyticalWidgetByRef}.
 *
 * @alpha
 */
export declare const selectWidgetByRef: (ref: ObjRef | undefined) => DashboardSelector<ExtendedDashboardWidget | undefined>;

/**
 * Selects layout coordinates for a given widget.
 *
 * @alpha
 */
export declare const selectWidgetCoordinatesByRef: (ref: ObjRef) => DashboardSelector<ILayoutCoordinates>;

/**
 * @internal
 */
export declare const selectWidgetDateDatasetAutoSelect: DashboardSelector<boolean>;

/**
 * Selects widget drills by the widget ref.
 *
 * @alpha
 */
export declare const selectWidgetDrills: (ref: ObjRef | undefined) => DashboardSelector<IDrillToLegacyDashboard[] | InsightDrillDefinition[]>;

/**
 * @internal
 */
export declare const selectWidgetPlaceholder: DashboardSelector<ExtendedDashboardWidget | undefined>;

/**
 * @internal
 */
export declare const selectWidgetPlaceholderCoordinates: DashboardSelector<ILayoutCoordinates | undefined>;

/**
 * Selects dashboard widgets in an obj ref an array. This map will include both analytical and custom
 * widgets that are placed on the dashboard.
 *
 * @internal
 */
export declare const selectWidgets: DashboardSelector<ExtendedDashboardWidget[]>;

/**
 * Selects dashboard widgets in an obj ref to widget map. This map will include both analytical and custom
 * widgets that are placed on the dashboard.
 *
 * @internal
 */
export declare const selectWidgetsMap: DashboardSelector<ObjRefMap<ExtendedDashboardWidget>>;

/**
 * @internal
 */
export declare const selectWidgetsModification: (refs: (ObjRef | undefined)[]) => DashboardSelector<("insertedByPlugin" | "modifiedByPlugin")[]>;

/**
 * @internal
 */
export declare const selectWidgetsOverlay: DashboardSelector<Record<string, IDashboardWidgetOverlay>>;

/**
 * @internal
 */
export declare const selectWidgetsOverlayState: (refs: (ObjRef | undefined)[]) => DashboardSelector<boolean>;

/**
 * @beta
 */
export declare interface SetAttributeFilterDisplayForm extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_DISPLAY_FORM";
    readonly payload: SetAttributeFilterDisplayFormPayload;
}

/**
 * Creates the {@link SetAttributeFilterDisplayForm} command.
 *
 * @remarks
 * Dispatching the commands will result into setting provided display form as a selected
 * display form for the attribute filter.
 *
 *
 * @beta
 * @param filterLocalId - local identifier of the filter the display form is changed for
 * @param displayForm - newly selected display form
 * @returns change filter display form command
 */
export declare function setAttributeFilterDisplayForm(filterLocalId: string, displayForm: ObjRef): SetAttributeFilterDisplayForm;

/**
 * @beta
 */
export declare interface SetAttributeFilterDisplayFormPayload {
    filterLocalId: string;
    displayForm: ObjRef;
}

/**
 * @beta
 */
export declare interface SetAttributeFilterParents extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_PARENTS";
    readonly payload: SetAttributeFilterParentsPayload;
}

/**
 * Creates the SetAttributeFilterParents command. Dispatching this command will result in setting a parent-child
 * relationship between two or more dashboard attribute filters.
 *
 * When an attribute filter has a parent set up, the attribute elements that will be available in the child
 * filter will be influenced by the selection in the parent. The child filter will show only those elements
 * for which a link exists to the selected elements in the parent.
 *
 * Take for example a model where there are continent and country attributes. You add continent and
 * country as filters onto a dashboard and establish parent-child relationship between them. When users select
 * some continents in the filter, the country filter will only show elements for countries on the selected
 * contents.
 *
 * @param filterLocalId - local id of filter that will be a child in the relationship
 * @param parentFilters - definition of the relationship to parent, this contains local id of the parent filter and
 *  one or more 'over' attributes. The 'over' attributes will be included when querying
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function setAttributeFilterParents(filterLocalId: string, parentFilters: IDashboardAttributeFilterParent[], correlationId?: string): SetAttributeFilterParents;

/**
 * Payload of the {@link SetAttributeFilterParents} command.
 * @beta
 */
export declare interface SetAttributeFilterParentsPayload {
    readonly filterLocalId: string;
    readonly parentFilters: ReadonlyArray<IDashboardAttributeFilterParent>;
}

/**
 * @beta
 */
export declare interface SetAttributeFilterSelectionMode extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_SELECTION_MODE";
    readonly payload: SetAttributeFilterSelectionModePayload;
}

/**
 * Creates the {@link SetAttributeFilterSelectionMode} command.
 *
 * @remarks
 * Dispatching the commands will result into setting provided selection mode as a selected
 * selection mode for the attribute filter.
 *
 *
 * @beta
 * @param filterLocalId - local identifier of the filter the selection mode is changed for
 * @param selectionMode - newly selected selection mode
 * @returns change filter selection mode command
 */
export declare function setAttributeFilterSelectionMode(filterLocalId: string, selectionMode: DashboardAttributeFilterSelectionMode): SetAttributeFilterSelectionMode;

/**
 * @beta
 */
export declare interface SetAttributeFilterSelectionModePayload {
    filterLocalId: string;
    selectionMode: DashboardAttributeFilterSelectionMode;
}

/**
 * Command for changing attribute filter title.
 * @beta
 */
export declare interface SetAttributeFilterTitle extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FILTER_CONTEXT.ATTRIBUTE_FILTER.SET_TITLE";
    readonly payload: SetAttributeFilterTitlePayload;
}

/**
 * Creates the {@link SetAttributeFilterTitle} command.
 *
 * @remarks
 * Dispatching the commands will result into setting provided title as a selected
 * title for the attribute filter.
 *
 *
 * @beta
 * @param filterLocalId - local identifier of the filter the display form is changed for
 * @param title - newly added title
 * @param correlationId - specify correlation id. It will be included in all events that will be emitted during the command processing.
 * @returns change filter title command
 */
export declare function setAttributeFilterTitle(filterLocalId: string, title?: string, correlationId?: string): SetAttributeFilterTitle;

/**
 * Payload of the {@link SetAttributeFilterTitle} command.
 * @beta
 */
export declare interface SetAttributeFilterTitlePayload {
    /**
     * Local identifier of the filter to rename.
     */
    filterLocalId: string;
    /**
     * Title of the filter.
     */
    title?: string;
}

/**
 * @beta
 */
export declare interface SetDrillForKpiWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.SET_DRILL";
    readonly payload: SetDrillForKpiWidgetPayload;
}

/**
 * Creates the SetDrillForKpiWidget command. Dispatching this command will result in KPI having its drill set to the given value.
 *
 * @param ref - reference of the KPI widget to modify
 * @param legacyDashboardRef - ref of the legacy dashboard to drill to
 * @param legacyDashboardTabIdentifier - identifier of the legacy dashboard tab to drill to
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function setDrillForKpiWidget(ref: ObjRef, legacyDashboardRef: ObjRef, legacyDashboardTabIdentifier: string, correlationId?: string): SetDrillForKpiWidget;

/**
 * Payload of the {@link SetDrillForKpiWidget} command.
 * @beta
 */
export declare interface SetDrillForKpiWidgetPayload {
    /**
     * Reference to KPI Widget to modify.
     */
    readonly ref: ObjRef;
    readonly legacyDashboardRef: ObjRef;
    readonly legacyDashboardTabIdentifier: string;
}

/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result set new result data and stop loading.
 *
 * @beta
 */
export declare function setExecutionResultData(id: ObjRef | string, executionResult: IExecutionResult, executionWarnings: IResultWarning[] | undefined, correlationId?: string): UpsertExecutionResult;

/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result indicate an error and stop loading.
 *
 * @beta
 */
export declare function setExecutionResultError(id: ObjRef | string, error: GoodDataSdkError, correlationId?: string): UpsertExecutionResult;

/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result indicate it is loading.
 *
 * @beta
 */
export declare function setExecutionResultLoading(id: ObjRef | string, correlationId?: string): UpsertExecutionResult;

/**
 * @internal
 */
export declare const ShareButton: (props: IShareButtonProps) => JSX.Element;

/**
 * @internal
 */
export declare const ShareDialog: (props: IShareDialogProps) => JSX.Element;

/**
 * @beta
 */
export declare type ShareDialogInteractionData = {
    type: ShareDialogInteractionType;
    flowId: string;
    currentUserPermission: AccessGranularPermission;
    isCurrentUserWorkspaceManager: boolean;
    isSharedObjectLocked: boolean;
    sharedObjectStatus: ShareStatus;
    isCurrentUserSelfUpdating?: boolean;
    isExistingGrantee?: boolean;
    granteeType?: "user" | "group";
    granteeEffectivePermission?: AccessGranularPermission;
    granteeUpdatedPermission?: AccessGranularPermission;
    numberOfAvailableGrantees?: number;
};

/**
 * @beta
 */
export declare type ShareDialogInteractionPayload = UserInteractionPayloadWithDataBase<"shareDialogInteraction", ShareDialogInteractionData>;

/**
 * @beta
 */
export declare type ShareDialogInteractionType = "SHARE_DIALOG_OPENED" | "SHARE_DIALOG_CLOSED" | "SHARE_DIALOG_SAVED" | "SHARE_DIALOG_PERMISSIONS_DROPDOWN_OPENED" | "SHARE_DIALOG_PERMISSIONS_CHANGED" | "SHARE_DIALOG_GRANTEE_REMOVED" | "SHARE_DIALOG_GRANTEE_ADDED" | "SHARE_DIALOG_AVAILABLE_GRANTEE_LIST_OPENED";

/**
 * @alpha
 */
export declare const ShareStatusIndicator: (props: IShareStatusProps) => JSX.Element | null;

/**
 * @internal
 */
export declare const SidebarConfigurationPanel: React_2.FC<Omit<ISidebarProps, "DefaultSidebar">>;

/**
 * This singleton class uses {@link DashboardStoreAccessorRepository} to create a store accessor for
 * a single dashboard.
 *
 * @remarks
 * The usage of this singleton is the same as for {@link DashboardStoreAccessorRepository} except functions
 * don't accept any parameters.
 *
 * @public
 */
export declare class SingleDashboardStoreAccessor {
    /**
     * Returns a selector for current dashboard.
     */
    static getDashboardSelect(): DashboardSelectorEvaluator;
    /**
     * Returns a dispatch object for current dashboard.
     */
    static getDashboardDispatch(): DashboardDispatch;
    /**
     * Creates a {@link Dashboard#onStateChange} callback for current dashboard.
     */
    static getOnChangeHandler(): (state: DashboardState, dispatch: DashboardDispatch) => void;
    /**
     * Removes dashboard accessors from {@link DashboardStoreAccessorRepository#accessors} for current dashboard.
     */
    static clearAccessor(): void;
    /**
     * Checks if accessors is initialized for current dashboard.
     */
    static isAccessorInitialized(): boolean;
}

/**
 * Creates a {@link DashboardEventHandler} instance that will be invoked for one specified event type.
 *
 * @param type - the type of event this handler should trigger for
 * @param handler - the actual event handling function
 * @public
 */
export declare function singleEventTypeHandler(type: (DashboardEvents | ICustomDashboardEvent)["type"], handler: DashboardEventHandler["handler"]): DashboardEventHandler;

/**
 * Identifier of a stashed dashboard items. When removing one or more item, the caller may decide to 'stash' these items
 * under some identifier. This stashed items can then be used in subsequent command that places items on the layout by
 * providing the stash identifier.
 *
 * @beta
 */
export declare type StashedDashboardItemsId = string;

/**
 * Creates the ChangeRenderMode command for switch to edit mode.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function switchToEditRenderMode(correlationId?: string): ChangeRenderMode;

/**
 * @internal
 */
export declare const Title: (props: ITitleProps) => JSX.Element;

/**
 * @internal
 */
export declare const Toolbar: (props: IToolbarProps) => JSX.Element;

/**
 * @internal
 */
export declare const TopBar: (props: ITopBarProps) => JSX.Element;

/**
 * @internal
 */
export declare const translations: {
    [locale: string]: ITranslations;
} & {
    [locale: string]: Record<string, string>;
};

/**
 * Triggers an event.
 *
 * @beta
 */
export declare interface TriggerEvent extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.EVENT.TRIGGER";
    readonly payload: TriggerEventPayload;
}

/**
 * Creates an {@link TriggerEvent} command.
 *
 * @beta
 */
export declare function triggerEvent(eventBody: DashboardEventBody<IDashboardEvent | ICustomDashboardEvent>, correlationId?: string): TriggerEvent;

/**
 * Payload of the {@link TriggerEvent} command.
 * @beta
 */
export declare interface TriggerEventPayload {
    /**
     * Event body without the {@link DashboardContext} property. That will be filled when the command is processed.
     */
    readonly eventBody: DashboardEventBody<IDashboardEvent | ICustomDashboardEvent>;
}

/**
 * Actions to control ui state of the dashboard.
 *
 * @internal
 */
export declare const uiActions: CaseReducerActions<    {
openScheduleEmailDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
closeScheduleEmailDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
setScheduleEmailDialogDefaultAttachment: (state: WritableDraft<UiState_2>, action: {
payload: ObjRef;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
resetScheduleEmailDialogDefaultAttachment: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
openScheduleEmailManagementDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
closeScheduleEmailManagementDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
openSaveAsDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
closeSaveAsDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
setFilterBarExpanded: (state: WritableDraft<UiState_2>, action: {
payload: boolean;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
closeKpiAlertDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
openKpiAlertDialog: (state: WritableDraft<UiState_2>, action: {
payload: ObjRef;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
highlightKpiAlert: (state: WritableDraft<UiState_2>, action: {
payload: ObjRef;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
openShareDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
closeShareDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
openDeleteDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
closeDeleteDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
openKpiDeleteDialog: (state: WritableDraft<UiState_2>, action: {
payload: ILayoutCoordinates_2;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
closeKpiDeleteDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
setMenuButtonItemsVisibility: (state: WritableDraft<UiState_2>, action: {
payload: IMenuButtonItemsVisibility_2;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
selectWidget: (state: WritableDraft<UiState_2>, action: {
payload: ObjRef;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
clearWidgetSelection: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
setConfigurationPanelOpened: (state: WritableDraft<UiState_2>, action: {
payload: boolean;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
setWidgetDateDatasetAutoSelect: (state: WritableDraft<UiState_2>, action: {
payload: boolean;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
requestInsightListUpdate: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
setWidgetLoadingAdditionalDataStarted: (state: WritableDraft<UiState_2>, action: {
payload: ObjRef;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
setWidgetLoadingAdditionalDataStopped: (state: WritableDraft<UiState_2>, action: {
payload: ObjRef;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
setFilterAttributeSelectionOpen: (state: WritableDraft<UiState_2>, action: {
payload: boolean;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
selectFilterIndex: (state: WritableDraft<UiState_2>, action: {
payload: number;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
clearFilterIndexSelection: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
setActiveSectionIndex: (state: WritableDraft<UiState_2>, action: {
payload: number;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
clearActiveSectionIndex: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
openCancelEditModeDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
closeCancelEditModeDialog: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
resetInvalidDrillWidgetRefs: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
resetAllInvalidCustomUrlDrillParameterWidgets: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
resetAllInvalidCustomUrlDrillParameterWidgetsWarnings: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
addInvalidDrillWidgetRefs: (state: WritableDraft<UiState_2>, action: {
payload: ObjRef[];
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
setInvalidCustomUrlDrillParameterWidgets: (state: WritableDraft<UiState_2>, action: {
payload: {
widget: IInsightWidget;
invalidDrills: IDrillToCustomUrl[];
}[];
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
removeInvalidDrillWidgetRefs: (state: WritableDraft<UiState_2>, action: {
payload: ObjRef[];
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
resetInvalidCustomUrlDrillParameterWidget: (state: WritableDraft<UiState_2>, action: {
payload: IInsightWidget[];
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
setDraggingWidgetSource: (state: WritableDraft<UiState_2>, action: {
payload: DraggableLayoutItem_2;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
clearDraggingWidgetSource: (state: WritableDraft<UiState_2>, action: {
payload: void;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
setDraggingWidgetTarget: (state: WritableDraft<UiState_2>, action: {
payload: ILayoutCoordinates_2;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
clearDraggingWidgetTarget: (state: WritableDraft<UiState_2>, action: {
payload: void;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
toggleWidgetsOverlay: (state: WritableDraft<UiState_2>, action: {
payload: {
refs: (ObjRef | undefined)[];
visible: boolean;
};
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
setWidgetsOverlay: (state: WritableDraft<UiState_2>, action: {
payload: Record<string, IDashboardWidgetOverlay_2>;
type: string;
}) => void | UiState_2 | WritableDraft<UiState_2>;
hideAllWidgetsOverlay: (state: WritableDraft<UiState_2>, action: AnyAction) => void | UiState_2 | WritableDraft<UiState_2>;
}, "uiSlice">;

/**
 * @beta
 */
export declare interface UiState {
    scheduleEmailManagementDialog: {
        open: boolean;
    };
    scheduleEmailDialog: {
        open: boolean;
        defaultAttachmentRef: ObjRef | undefined;
    };
    saveAsDialog: {
        open: boolean;
    };
    shareDialog: {
        open: boolean;
    };
    deleteDialog: {
        open: boolean;
    };
    kpiDeleteDialog: {
        /**
         * Undefined means the dialog should be closed
         */
        widgetCoordinates: ILayoutCoordinates | undefined;
    };
    cancelEditModeDialog: {
        open: boolean;
    };
    filterBar: {
        expanded: boolean;
    };
    kpiAlerts: {
        openedWidgetRef: ObjRef | undefined;
        highlightedWidgetRef: ObjRef | undefined;
    };
    menuButton: {
        itemsVisibility: IMenuButtonItemsVisibility;
    };
    selectedWidgetRef: ObjRef | undefined;
    configurationPanelOpened: boolean;
    widgetDateDatasetAutoSelect: boolean;
    insightListLastUpdateRequested: number;
    widgetsLoadingAdditionalData: ObjRef[];
    filterAttributeSelectionOpen: boolean;
    selectedFilterIndex: number | undefined;
    activeSectionIndex: number | undefined;
    /** @alpha */
    drillValidationMessages: {
        invalidDrillWidgetRefs: ObjRef[];
        invalidCustomUrlDrillParameterWidgets: InvalidCustomUrlDrillParameterInfo[];
    };
    /** @internal */
    draggingWidgetSource: DraggableLayoutItem | undefined;
    draggingWidgetTarget: ILayoutCoordinates | undefined;
    widgetsOverlay: Record<string, IDashboardWidgetOverlay>;
}

/**
 * Slice that can be undo-enabled needs to include the undo section which will contain the essential undo metadata.
 *
 * @alpha
 */
export declare interface UndoEnhancedState<T extends IDashboardCommand = IDashboardCommand> {
    _undo: {
        undoPointer: number;
        undoStack: UndoEntry<T>[];
    };
}

/**
 * An entry on undo stack contains patches required
 *
 * @alpha
 */
export declare interface UndoEntry<T extends IDashboardCommand = IDashboardCommand> {
    /**
     * Dashboard command that has initiated the state changes.
     */
    cmd: T;
    /**
     * Patches to apply in order to undo the changes.
     */
    undoPatches: Patch[];
    /**
     * Patches to apply in order to redo the undone changes.
     */
    redoPatches: Patch[];
}

/**
 * @beta
 */
export declare interface UndoLayoutChanges extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.FLUID_LAYOUT.UNDO";
    readonly payload: UndoLayoutChangesPayload;
}

/**
 * Creates the UndoLayoutChanges command.
 *
 * @remarks
 * Dispatching this command will result in reverting the state of the layout
 * to a point before a particular layout command processing.
 *
 * By default, the very last command will be undone, however you can provide a function of your own to determine
 * up to which command should the undo go.
 *
 * @param undoPointSelector - specify function to determine up to which command to undo; if not provided the very last command will be undone
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function undoLayoutChanges(undoPointSelector?: UndoPointSelector, correlationId?: string): UndoLayoutChanges;

/**
 * Payload of the {@link UndoLayoutChanges} command.
 * @beta
 */
export declare interface UndoLayoutChangesPayload {
    /**
     * Specify a function that will be used to select a command up to which the undo should be done.
     *
     * @remarks
     * If not provided then the default selector will be used and will undo the very last command.
     *
     * The undo point selector is essential if you are implementing complex user-facing features that are achieved
     * using multiple commands. For instance drag-and-drop. On drag start, an item is removed - that is one command, and
     * then user drops the item at the new location - that is another command. The commands are dispatched by your
     * code separately, yet if user is able to do undo drag-and-drop operation, you need to get layout to a point
     * before
     *
     * If you want to trigger a proper undo in this case, then you need to undo both commands. Building on the
     * example above, you can proceed as follows:
     *
     * -  Your drag-and-drop feature should use correlationId convention to tie commands to user-facing feature.
     * -  Upon interaction start, your feature computes a correlationId `prefix` = "dnd-<UUID>"
     * -  The first command to remove the dragged item from layout will have correlationId = `${prefix}-drag`
     * -  The second command to add the dropped item to a new place on layout will have correlationId = `${prefix}-drop`
     * -  When the user clicks 'Undo', you dispatch the UndoLayoutChanges with a greedy selector. This will check whether
     *    the last command is a 'drop' in the dnd interaction. If so, look at previous command, check if it matches
     *    the correlationId and if so undo up to and including that command.
     */
    readonly undoPointSelector?: UndoPointSelector;
}

/**
 * The undo point selector function will be called during layout undo processing to determine up to (and including)
 * which command should the undo be done. Commands are sorted in the list in reversed chronological order -
 * last command processed command is at index 0, command before that at index 1 etc.
 *
 * The function must return index of command up to (and including) which the undo should be done. It is not possible
 * to undo just some command randomly.
 *
 * @beta
 */
export declare type UndoPointSelector = (undoableCommands: ReadonlyArray<DashboardLayoutCommands>) => number;

/**
 * Creates the ChangeInsightWidgetFilterSettings command for {@link FilterOpUnignoreAttributeFilter} operation.
 *
 * Dispatching this command will result in removal of one or more filters from Insight widget's attribute filter ignore-list.
 * Ignored attribute filters are not passed down to the insight and will not be used to filter that insight.
 *
 * The operation is idempotent - trying to unignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the insight widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be removed from the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function unignoreFilterOnInsightWidget(ref: ObjRef, oneOrMoreDisplayForms: ObjRef | ObjRef[], correlationId?: string): ChangeInsightWidgetFilterSettings;

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpUnignoreAttributeFilter} operation.
 *
 * Dispatching this command will result in removal of one or more filters from KPI widget's attribute filter ignore-list.
 * Ignored attribute filters are not passed down to the KPI and will not be used to filter that KPI.
 *
 * The operation is idempotent - trying to unignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the KPI widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be removed from the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function unignoreFilterOnKpiWidget(ref: ObjRef, oneOrMoreDisplayForms: ObjRef | ObjRef[], correlationId?: string): ChangeKpiWidgetFilterSettings;

/**
 * Updates Kpi alert.
 *
 * @beta
 */
export declare interface UpdateAlert extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.ALERT.UPDATE";
    readonly payload: UpdateAlertPayload;
}

/**
 * Creates the UpdateAlert command. Dispatching this command will result in the updating Kpi alert on the backend.
 *
 * @param alert - specify alert to update.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing

 * @beta
 */
export declare function updateAlert(alert: IWidgetAlert, correlationId?: string): UpdateAlert;

/**
 * Payload of the {@link UpdateAlert} command.
 * @beta
 */
export declare interface UpdateAlertPayload {
    /**
     * The alert to be updated.
     */
    readonly alert: IWidgetAlert;
}

/**
 * Triggers an event.
 *
 * @beta
 */
export declare interface UpsertExecutionResult extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.EXECUTION_RESULT.UPSERT";
    readonly payload: IExecutionResultEnvelope;
}

/**
 * @internal
 */
export declare function useCancelButtonProps(): ICancelButtonProps;

/**
 * @internal
 */
export declare const useCancelEditDialog: () => {
    onCancel: () => {
        payload: undefined;
        type: "uiSlice/closeCancelEditModeDialog";
    };
    onSubmit: () => void;
};

/**
 * This hook provides an easy way to read a data view from a custom widget. It resolves the appropriate filters
 * for the widget based on the filters currently set on the whole dashboard.
 *
 * @public
 */
export declare function useCustomWidgetExecutionDataView({ widget, execution, onCancel, onError, onLoading, onPending, onSuccess, }: IUseCustomWidgetExecutionDataViewConfig & UseCustomWidgetExecutionDataViewCallbacks): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;

/**
 * Callbacks for {@link useCustomWidgetExecutionDataView} hook.
 *
 * @public
 */
export declare type UseCustomWidgetExecutionDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;

/**
 * This hook provides an easy way to read a data view for an insight from a custom widget.
 * It resolves the appropriate filters for the widget based on the filters currently set on the whole dashboard.
 *
 * @public
 */
export declare function useCustomWidgetInsightDataView({ widget, insight, onCancel, onError, onLoading, onPending, onSuccess, }: IUseCustomWidgetInsightDataViewConfig & UseCustomWidgetInsightDataViewCallbacks): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;

/**
 * Callbacks for {@link useCustomWidgetInsightDataView} hook.
 *
 * @public
 */
export declare type UseCustomWidgetInsightDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;

/**
 * Callbacks returned from {@link useDashboardAsyncRender} hook.
 *
 * @public
 */
export declare interface UseDashboardAsyncRender {
    /**
     * Callback that requests async rendering of the component.
     */
    onRequestAsyncRender: () => void;
    /**
     * Callback that resolves async rendering of the component.
     */
    onResolveAsyncRender: () => void;
}

/**
 * A React hook that allows you to request and inform the dashboard about the rendering of a component
 * that loads asynchronous data (eg Insight, Kpi, but it can be also any custom widget).
 * By registering and resolving asynchronous data retrieval of the each widget, the dashboard is able to recognize and notify that it is fully rendered.
 * This mechanism is necessary for dashboard exports to PDF to work properly.
 *
 * Mechanism is following:
 * - You must request async rendering for at least 1 component within 2 seconds of the {@link DashboardInitialized} event.
 *   (If you do not register any asynchronous rendering, after 2 seconds the dashboard will announce that it is rendered by dispatching {@link DashboardRenderResolved} event.)
 * - You can request async rendering for any number of components. Requests are valid if the first rule is met
 *   and not all asynchronous renderings have been resolved and the maximum timeout (20min by default) has not elapsed.
 * - The component may again request asynchronous rendering within 2 seconds of resolution. Maximum 3x.
 *   (this is necessary to cover possible re-renders caused by data received from the components themselves, after they are rendered)
 * - Maximum rendering time of the dashboard is 20min - if some asynchronous renderings are not yet resolved at this time, {@link DashboardRenderResolved} event is dispatched anyway.
 *
 * Request async rendering of the component by calling onRequestAsyncRender() callback.
 * Resolve async rendering of the component by calling onResolveAsyncRender() callback.
 *
 * @public
 * @param id - unique identifier of the component
 * @returns callbacks
 */
export declare const useDashboardAsyncRender: (id: string) => UseDashboardAsyncRender;

/**
 * @internal
 */
export declare const useDashboardCommandProcessing: <TCommand extends DashboardCommands, TCommandCreatorArgs extends any[], TSuccessEventType extends DashboardEventType, TErrorEventType extends DashboardEventType>({ commandCreator, successEvent, errorEvent, onSuccess, onError, onBeforeRun, }: {
    commandCreator: (...args: TCommandCreatorArgs) => TCommand;
    successEvent: TSuccessEventType;
    errorEvent: TErrorEventType;
    onSuccess?: ((event: Extract<DashboardCommandStarted_2<any>, {
        type: TSuccessEventType;
    }> | Extract<DashboardCommandFailed_2<any>, {
        type: TSuccessEventType;
    }> | Extract<DashboardCommandRejected_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardQueryRejected_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardQueryFailed_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardQueryStarted_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardQueryCompleted_2<any, any>, {
        type: TSuccessEventType;
    }> | Extract<DashboardInitialized_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDeinitialized_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardSaved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardCopySaved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardRenamed_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardWasReset_2, {
        type: TSuccessEventType;
    }> | Extract<DateFilterValidationFailed_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardExportToPdfRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardExportToPdfResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardSharingChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDateFilterSelectionChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAttributeFilterAdded_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAttributeFilterRemoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAttributeFilterMoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAttributeFilterSelectionChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAttributeFilterParentChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAttributeTitleChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAttributeSelectionModeChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardFilterContextChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutSectionAdded_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutSectionMoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutSectionRemoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutSectionHeaderChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutSectionItemsAdded_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutSectionItemReplaced_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutSectionItemMoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutSectionItemRemoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardLayoutChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetHeaderChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetDescriptionChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetConfigurationChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetMeasureChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetFilterSettingsChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetComparisonChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetDrillRemoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetDrillSet_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardKpiWidgetChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetHeaderChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetDescriptionChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetFilterSettingsChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetVisPropertiesChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetVisConfigurationChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetInsightSwitched_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetDrillsModified_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetDrillsRemoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetExportRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetExportResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardInsightWidgetRefreshed_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardWidgetExecutionStarted_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardWidgetExecutionFailed_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardWidgetExecutionSucceeded_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAlertCreated_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAlertsRemoved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAlertUpdated_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardScheduledEmailCreated_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardScheduledEmailSaved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardUserInteractionTriggered_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardRenderRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAsyncRenderRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardAsyncRenderResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardRenderResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillDownRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillDownResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToInsightRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToInsightResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToDashboardRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToDashboardResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToCustomUrlRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToCustomUrlResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToAttributeUrlRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToAttributeUrlResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToLegacyDashboardRequested_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillToLegacyDashboardResolved_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardDrillableItemsChanged_2, {
        type: TSuccessEventType;
    }> | Extract<DashboardRenderModeChanged_2, {
        type: TSuccessEventType;
    }> | Extract<CreateInsightRequested_2, {
        type: TSuccessEventType;
    }>) => void) | undefined;
    onError?: ((event: Extract<DashboardCommandStarted_2<any>, {
        type: TErrorEventType;
    }> | Extract<DashboardCommandFailed_2<any>, {
        type: TErrorEventType;
    }> | Extract<DashboardCommandRejected_2, {
        type: TErrorEventType;
    }> | Extract<DashboardQueryRejected_2, {
        type: TErrorEventType;
    }> | Extract<DashboardQueryFailed_2, {
        type: TErrorEventType;
    }> | Extract<DashboardQueryStarted_2, {
        type: TErrorEventType;
    }> | Extract<DashboardQueryCompleted_2<any, any>, {
        type: TErrorEventType;
    }> | Extract<DashboardInitialized_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDeinitialized_2, {
        type: TErrorEventType;
    }> | Extract<DashboardSaved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardCopySaved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardRenamed_2, {
        type: TErrorEventType;
    }> | Extract<DashboardWasReset_2, {
        type: TErrorEventType;
    }> | Extract<DateFilterValidationFailed_2, {
        type: TErrorEventType;
    }> | Extract<DashboardExportToPdfRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardExportToPdfResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardSharingChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDateFilterSelectionChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAttributeFilterAdded_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAttributeFilterRemoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAttributeFilterMoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAttributeFilterSelectionChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAttributeFilterParentChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAttributeTitleChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAttributeSelectionModeChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardFilterContextChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutSectionAdded_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutSectionMoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutSectionRemoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutSectionHeaderChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutSectionItemsAdded_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutSectionItemReplaced_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutSectionItemMoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutSectionItemRemoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardLayoutChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetHeaderChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetDescriptionChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetConfigurationChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetMeasureChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetFilterSettingsChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetComparisonChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetDrillRemoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetDrillSet_2, {
        type: TErrorEventType;
    }> | Extract<DashboardKpiWidgetChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetHeaderChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetDescriptionChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetFilterSettingsChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetVisPropertiesChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetVisConfigurationChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetInsightSwitched_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetDrillsModified_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetDrillsRemoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetExportRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetExportResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardInsightWidgetRefreshed_2, {
        type: TErrorEventType;
    }> | Extract<DashboardWidgetExecutionStarted_2, {
        type: TErrorEventType;
    }> | Extract<DashboardWidgetExecutionFailed_2, {
        type: TErrorEventType;
    }> | Extract<DashboardWidgetExecutionSucceeded_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAlertCreated_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAlertsRemoved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAlertUpdated_2, {
        type: TErrorEventType;
    }> | Extract<DashboardScheduledEmailCreated_2, {
        type: TErrorEventType;
    }> | Extract<DashboardScheduledEmailSaved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardUserInteractionTriggered_2, {
        type: TErrorEventType;
    }> | Extract<DashboardRenderRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAsyncRenderRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardAsyncRenderResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardRenderResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillDownRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillDownResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToInsightRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToInsightResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToDashboardRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToDashboardResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToCustomUrlRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToCustomUrlResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToAttributeUrlRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToAttributeUrlResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToLegacyDashboardRequested_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillToLegacyDashboardResolved_2, {
        type: TErrorEventType;
    }> | Extract<DashboardDrillableItemsChanged_2, {
        type: TErrorEventType;
    }> | Extract<DashboardRenderModeChanged_2, {
        type: TErrorEventType;
    }> | Extract<CreateInsightRequested_2, {
        type: TErrorEventType;
    }>) => void) | undefined;
    onBeforeRun?: ((command: TCommand) => void) | undefined;
}) => {
    run: (...args: TCommandCreatorArgs) => void;
    status?: CommandProcessingStatus | undefined;
};

/**
 * @alpha
 */
export declare const useDashboardDispatch: () => Dispatch<AnyAction>;

/**
 * Convenience hook for dispatching Dashboard events.
 *
 * @returns function that you can use to dispatch Dashboard events
 * @alpha
 */
export declare const useDashboardEventDispatch: () => (eventBody: DashboardEventBody<DashboardEvents | ICustomDashboardEvent>) => void;

/**
 * @alpha
 */
export declare const useDashboardEventsContext: () => IDashboardEventsContext;

/**
 * @internal
 */
export declare const useDashboardQueryProcessing: <TQuery extends DashboardQueries, TQueryResult, TQueryCreatorArgs extends any[]>({ queryCreator, onSuccess, onError, onRejected, onBeforeRun, }: {
    queryCreator: (...args: TQueryCreatorArgs) => TQuery;
    onSuccess?: ((result: TQueryResult) => void) | undefined;
    onError?: ((event: DashboardQueryFailed) => void) | undefined;
    onRejected?: ((event: DashboardQueryRejected) => void) | undefined;
    onBeforeRun?: ((query: TQuery) => void) | undefined;
}) => UseDashboardQueryProcessingResult<TQueryCreatorArgs, TQueryResult>;

/**
 * @internal
 */
export declare type UseDashboardQueryProcessingResult<TQueryCreatorArgs extends any[], TQueryResult> = QueryProcessingState<TQueryResult> & {
    run: (...args: TQueryCreatorArgs) => void;
};

/**
 * Hook that handles schedule emailing dialogs.
 *
 * @alpha
 */
export declare const useDashboardScheduledEmails: () => {
    isScheduledEmailingVisible: boolean;
    enableInsightExportScheduling: boolean;
    defaultOnScheduleEmailing: () => void;
    isScheduleEmailingDialogOpen: boolean;
    isScheduleEmailingManagementDialogOpen: boolean;
    onScheduleEmailingOpen: (attachmentRef?: ObjRef) => void;
    onScheduleEmailingManagementEdit: (schedule: IScheduledMail, users: IWorkspaceUser[]) => void;
    scheduledEmailToEdit: IScheduledMail | undefined;
    users: IWorkspaceUser[];
    onScheduleEmailingCancel: () => void;
    onScheduleEmailingCreateError: () => void;
    onScheduleEmailingCreateSuccess: () => void;
    onScheduleEmailingSaveError: () => void;
    onScheduleEmailingSaveSuccess: () => void;
    onScheduleEmailingManagementAdd: () => void;
    onScheduleEmailingManagementClose: () => void;
    onScheduleEmailingManagementLoadingError: () => void;
    onScheduleEmailingManagementDeleteSuccess: () => void;
    onScheduleEmailingManagementDeleteError: () => void;
};

/**
 * Hook for retrieving data from the dashboard state.
 *
 * @example
 * Example how to obtain all insights stored on the dashboard:
 *
 * ```tsx
 * import { useDashboardSelector, selectInsights } from "@gooddata/sdk-ui-dashboard";
 *
 * const CustomDashboardWidget = () => {
 *   const insights = useDashboardSelector(selectInsights);
 *
 *   return (
 *      <pre>{JSON.stringify(insights, null, 2)}</pre>
 *   );
 * }
 * ```
 *
 * @public
 */
export declare const useDashboardSelector: TypedUseSelectorHook<DashboardState>;

/**
 * Hook for dispatching relevant user interaction commands.
 * These commands enable to track user interactions that cannot be tracked by other existing events.
 *
 * @internal
 */
export declare const useDashboardUserInteraction: () => {
    poweredByGDLogoClicked: () => void;
    kpiAlertDialogClosed: () => void;
    kpiAlertDialogOpened: (alreadyHasAlert: boolean) => void;
    descriptionTooltipOpened: (eventData: DescriptionTooltipOpenedData) => void;
    shareDialogInteraction: (eventData: ShareDialogInteractionData) => void;
    attributeFilterTitleResetClicked: () => void;
};

/**
 * @internal
 */
export declare function useDefaultMenuItems(): IMenuButtonItem[];

/**
 * Hook that takes command creator and returns function that will result into dispatching this command.
 *
 * @remarks
 * The created function takes original command creators parameters as per example below.
 *
 * @example
 * ```
 * // create a dashboard command to reset AttributeFilter selection
 * const resetAttributeFilter = useDispatchDashboardCommand(resetAttributeFilterSelection);
 *
 * // somewhere else in the code call the command to reset the filters
 * **
 * resetAttributeFilter(<dashboard-local-id>);
 * **
 * ```
 *
 * @param commandCreator - command factory
 * @returns callback that dispatches the command
 * @public
 */
export declare const useDispatchDashboardCommand: <TCommand extends DashboardCommands, TArgs extends any[]>(commandCreator: (...args: TArgs) => TCommand) => (...args: TArgs) => void;

/**
 * @internal
 */
export declare const useDrill: ({ onSuccess, onError, onBeforeRun }?: UseDrillProps) => {
    run: (drillEvent: IDashboardDrillEvent_2, drillContext: DashboardDrillContext_2, correlationId?: string | undefined) => void;
    status?: CommandProcessingStatus_2 | undefined;
};

/**
 * @internal
 */
export declare const useDrillDown: ({ onSuccess, onError, onBeforeRun }?: UseDrillDownProps) => {
    run: (insight: IInsight, drillDefinition: IDrillDownDefinition_2, drillEvent: IDashboardDrillEvent_2, correlationId?: string | undefined) => void;
    status?: CommandProcessingStatus_2 | undefined;
};

/**
 * @internal
 */
export declare interface UseDrillDownProps {
    onSuccess?: (event: DashboardDrillDownResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillDown>) => void;
    onBeforeRun?: (cmd: DrillDown) => void;
}

/**
 * @internal
 */
export declare interface UseDrillProps {
    onSuccess?: (event: DashboardDrillResolved) => void;
    onError?: (event: DashboardCommandFailed<Drill>) => void;
    onBeforeRun?: (cmd: Drill) => void;
}

/**
 * @internal
 */
export declare const useDrillToAttributeUrl: ({ onSuccess, onError, onBeforeRun, }?: UseDrillToAttributeUrlProps) => {
    run: (drillDefinition: IDrillToAttributeUrl, drillEvent: IDashboardDrillEvent_2, correlationId?: string | undefined) => void;
    status?: CommandProcessingStatus_2 | undefined;
};

/**
 * @internal
 */
export declare interface UseDrillToAttributeUrlProps {
    onSuccess?: (event: DashboardDrillToAttributeUrlResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToAttributeUrl>) => void;
    onBeforeRun?: (cmd: DrillToAttributeUrl) => void;
}

/**
 * @internal
 */
export declare const useDrillToCustomUrl: ({ onSuccess, onError, onBeforeRun }?: UseDrillToCustomUrlProps) => {
    run: (drillDefinition: IDrillToCustomUrl, drillEvent: IDashboardDrillEvent_2, correlationId?: string | undefined) => void;
    status?: CommandProcessingStatus_2 | undefined;
};

/**
 * @internal
 */
export declare interface UseDrillToCustomUrlProps {
    onSuccess?: (event: DashboardDrillToCustomUrlResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToCustomUrl>) => void;
    onBeforeRun?: (cmd: DrillToCustomUrl) => void;
}

/**
 * @internal
 */
export declare const useDrillToDashboard: ({ onSuccess, onError, onBeforeRun }?: UseDrillToDashboardProps) => {
    run: (drillDefinition: IDrillToDashboard, drillEvent: IDashboardDrillEvent_2, correlationId?: string | undefined) => void;
    status?: CommandProcessingStatus_2 | undefined;
};

/**
 * @internal
 */
export declare interface UseDrillToDashboardProps {
    onSuccess?: (event: DashboardDrillToDashboardResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToDashboard>) => void;
    onBeforeRun?: (cmd: DrillToDashboard) => void;
}

/**
 * @internal
 */
export declare const useDrillToInsight: ({ onSuccess, onError, onBeforeRun }?: UseDrillToInsightProps) => {
    run: (drillDefinition: IDrillToInsight, drillEvent: IDashboardDrillEvent_2, correlationId?: string | undefined) => void;
    status?: CommandProcessingStatus_2 | undefined;
};

/**
 * @internal
 */
export declare interface UseDrillToInsightProps {
    onSuccess?: (event: DashboardDrillToInsightResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToInsight>) => void;
    onBeforeRun?: (cmd: DrillToInsight) => void;
}

/**
 * @internal
 */
export declare const useDrillToLegacyDashboard: ({ onSuccess, onError, onBeforeRun, }?: UseDrillToLegacyDashboardProps) => {
    run: (drillDefinition: IDrillToLegacyDashboard, drillEvent: IDashboardDrillEvent_2, correlationId?: string | undefined) => void;
    status?: CommandProcessingStatus_2 | undefined;
};

/**
 * @internal
 */
export declare interface UseDrillToLegacyDashboardProps {
    onSuccess?: (event: DashboardDrillToLegacyDashboardResolved) => void;
    onError?: (event: DashboardCommandFailed<DrillToLegacyDashboard>) => void;
    onBeforeRun?: (cmd: DrillToLegacyDashboard) => void;
}

/**
 * @internal
 */
export declare function useEditButtonProps(): IEditButtonProps;

/**
 * @alpha
 */
export declare const useFilterBarProps: () => IFilterBarProps;

/**
 * This hook provides an easy way to read a data view from insight widget.
 *
 * @param config - configuration of the hook
 *
 * @public
 */
export declare function useInsightWidgetDataView(config: IUseInsightWidgetDataView & UseInsightWidgetInsightDataViewCallbacks): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;

/**
 * Callbacks for {@link useInsightWidgetDataView} hook.
 *
 * @public
 */
export declare type UseInsightWidgetInsightDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;

/**
 * Returns parent filtering input props for {@link @gooddata/sdk-ui-filters#AttributeFilter} for particular dashboard attribute filter.
 *
 * @param filter - dashboard filter to get the parent filter-related data
 *
 * @public
 */
export declare const useParentFilters: (filter: IDashboardAttributeFilter) => UseParentFiltersResult;

/**
 * Result of the {@link useParentFilters} hook, that can be used as parent filtering input props for {@link @gooddata/sdk-ui-filters#AttributeFilter}.
 *
 * @public
 */
export declare type UseParentFiltersResult = Pick<IAttributeFilterBaseProps, "parentFilters" | "parentFilterOverAttribute">;

/**
 * @beta
 */
export declare type UserInteractionPayload = UserInteractionPayloadWithData | BareUserInteractionPayload;

/**
 * @beta
 */
export declare type UserInteractionPayloadWithData = KpiAlertDialogOpenedPayload | DescriptionTooltipOpenedPayload | ShareDialogInteractionPayload;

/**
 * @beta
 */
export declare interface UserInteractionPayloadWithDataBase<TType extends string, TData extends object> {
    interaction: TType;
    data: TData;
}

/**
 * Creates the {@link DashboardUserInteractionTriggered} event body.
 *
 * @param interactionPayloadOrType - interaction payload or a type of a user interaction without extra data (for convenience)
 * @param correlationId - specify correlation id to use for this event. this can be used to correlate this event to a command that caused it.
 * @beta
 */
export declare function userInteractionTriggered(interactionPayloadOrType: UserInteractionPayload | BareUserInteractionType, correlationId?: string): DashboardEventBody<DashboardUserInteractionTriggered>;

/**
 * @beta
 */
export declare type UserInteractionType = UserInteractionPayload["interaction"];

/**
 * @public
 */
export declare interface UserState {
    /** @beta */
    user?: IUser;
}

/**
 * @internal
 */
export declare function useSaveAsDialogProps(): ISaveAsDialogProps;

/**
 * @internal
 */
export declare function useSaveAsNewButtonProps(): ISaveAsNewButtonProps;

/**
 * @internal
 */
export declare function useSaveButtonProps(): ISaveButtonProps;

/**
 * @internal
 */
export declare function useShareButtonProps(): IShareButtonProps;

/**
 * @alpha
 */
export declare const useTopBarProps: () => ITopBarProps;

/**
 * @internal
 */
export declare function useWidgetDragEndHandler(): () => void;

/**
 * Provides callbacks to integrate with the executionResults slice.
 * @internal
 */
export declare function useWidgetExecutionsHandler(widgetRef: ObjRef): {
    onLoadingChanged: OnLoadingChanged;
    onError: OnError;
    onSuccess: (executionResult: IExecutionResult, warnings: IResultWarning[] | undefined) => void;
    onPushData: (data: IPushData) => void;
};

/**
 * Hook for obtaining the effective filters for a widget.
 *
 * @remarks
 * The filters returned should be used with {@link @gooddata/sdk-model#insightSetFilters} to obtain
 * insight that is ready for execution.
 *
 * @param widget - widget to get effective filters for
 * @param insight - insight to evaluate the filters for in context of the widget
 * @returns set of filters that should be used to execute the given widget
 *
 * @public
 */
export declare function useWidgetFilters(widget: ExtendedDashboardWidget | undefined, insight?: IInsightDefinition): QueryProcessingState<IFilter[]>;

/**
 * @internal
 */
export declare function useWidgetSelection(widgetRef?: ObjRef): IUseWidgetSelectionResult;

/**
 * @public
 */
export declare type WidgetComponentProvider = (widget: ExtendedDashboardWidget) => CustomDashboardWidgetComponent;

/**
 * @internal
 */
export declare interface WidgetConfigPanelProps<TWidget> {
    widget: TWidget;
}

/**
 * @beta
 */
export declare interface WidgetDescription {
    /**
     * Description to set. If not defined then widget will have no description.
     */
    description?: string;
}

/**
 * Widget's filter settings can be manipulated using multiple different granular operations. This is the union
 * type containing all the available operations.
 *
 * @beta
 */
export declare type WidgetFilterOperation = FilterOpEnableDateFilter | FilterOpDisableDateFilter | FilterOpReplaceAttributeIgnores | FilterOpIgnoreAttributeFilter | FilterOpUnignoreAttributeFilter | FilterOpReplaceAll;

/**
 * @beta
 */
export declare interface WidgetHeader {
    /**
     * Title to set. If not defined then widget will have no title.
     */
    title?: string;
}

/**
 * @alpha
 */
export declare type WidgetsOverlayFn = (dashboard: IDashboard<ExtendedDashboardWidget>) => Record<string, IDashboardWidgetOverlay>;

/**
 * @internal
 */
export declare interface WidthResizerDragItem {
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
export declare function WithDrillSelect({ widgetRef, children, insight, onDrillDownSuccess, onDrillToInsightSuccess, onDrillToDashboardSuccess, onDrillToAttributeUrlSuccess, onDrillToCustomUrlSuccess, onError, }: WithDrillSelectProps): JSX.Element;

/**
 * @internal
 */
export declare interface WithDrillSelectProps {
    widgetRef: ObjRef;
    insight: IInsight;
    onDrillDownSuccess?: OnDrillDownSuccess;
    onDrillToInsightSuccess?: OnDrillToInsightSuccess;
    onDrillToDashboardSuccess?: OnDrillToDashboardSuccess;
    onDrillToAttributeUrlSuccess?: OnDrillToAttributeUrlSuccess;
    onDrillToCustomUrlSuccess?: OnDrillToCustomUrlSuccess;
    onError?: (error: any) => void;
    children: (props: {
        onDrill: OnWidgetDrill;
    }) => JSX.Element;
}

export { }
