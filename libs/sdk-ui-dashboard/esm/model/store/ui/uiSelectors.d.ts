import { ObjRef } from "@gooddata/sdk-model";
import { DashboardSelector, DashboardState } from "../types.js";
import { IDashboardWidgetOverlay } from "../../types/commonTypes.js";
import { ILayoutCoordinates, IMenuButtonItemsVisibility } from "../../../types.js";
import { DraggableLayoutItem } from "../../../presentation/dragAndDrop/types.js";
/**
 * @alpha
 */
export declare const selectIsScheduleEmailDialogOpen: DashboardSelector<boolean>;
/**
 * @alpha
 */
export declare const selectScheduleEmailDialogDefaultAttachment: DashboardSelector<ObjRef | undefined>;
/**
 * @alpha
 */
export declare const selectIsScheduleEmailManagementDialogOpen: DashboardSelector<boolean>;
/**
 * @alpha
 */
export declare const selectIsSaveAsDialogOpen: DashboardSelector<boolean>;
/**
 * @alpha
 */
export declare const selectIsShareDialogOpen: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectIsDeleteDialogOpen: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectIsKpiDeleteDialogOpen: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectIsCancelEditModeDialogOpen: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectKpiDeleteDialogWidgetCoordinates: DashboardSelector<ILayoutCoordinates | undefined>;
/**
 * @alpha
 */
export declare const selectFilterBarExpanded: DashboardSelector<boolean>;
/**
 * @alpha
 */
export declare const selectIsKpiAlertOpenedByWidgetRef: (ref: ObjRef | undefined) => (state: DashboardState) => boolean;
/**
 * @alpha
 */
export declare const selectIsKpiAlertHighlightedByWidgetRef: (ref: ObjRef | undefined) => (state: DashboardState) => boolean;
/**
 * @alpha
 */
export declare const selectMenuButtonItemsVisibility: DashboardSelector<IMenuButtonItemsVisibility>;
/**
 * @internal
 */
export declare const selectSelectedWidgetRef: DashboardSelector<ObjRef | undefined>;
/**
 * @internal
 */
export declare const selectConfigurationPanelOpened: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectWidgetDateDatasetAutoSelect: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectInsightListLastUpdateRequested: DashboardSelector<number>;
/**
 * @internal
 */
export declare const selectIsWidgetLoadingAdditionalDataByWidgetRef: (refs: ObjRef) => DashboardSelector<boolean>;
/**
 * @alpha
 */
export declare const selectIsFilterAttributeSelectionOpen: DashboardSelector<boolean>;
/**
 * @alpha
 */
export declare const selectSelectedFilterIndex: DashboardSelector<number | undefined>;
/**
 * @internal
 */
export declare const selectIsDraggingWidget: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectActiveSectionIndex: DashboardSelector<number | undefined>;
/**
 * @internal
 */
export declare const selectInvalidDrillWidgetRefs: DashboardSelector<ObjRef[]>;
/**
 * @internal
 */
export declare const selectInvalidUrlDrillParameterWidgetRefs: DashboardSelector<ObjRef[]>;
/**
 * @internal
 */
export declare const selectInvalidUrlDrillParameterWidgetWarnings: DashboardSelector<ObjRef[]>;
/**
 * @internal
 */
export declare const selectInvalidUrlDrillParameterDrillLocalIdsByWidgetRef: (ref: ObjRef) => DashboardSelector<string[]>;
/**
 * @internal
 */
export declare const selectDraggingWidgetSource: DashboardSelector<DraggableLayoutItem | undefined>;
/**
 * @internal
 */
export declare const selectDraggingWidgetTarget: DashboardSelector<ILayoutCoordinates | undefined>;
/**
 * @internal
 */
export declare const selectWidgetsOverlay: DashboardSelector<Record<string, IDashboardWidgetOverlay>>;
/**
 * @internal
 */
export declare const selectWidgetsOverlayState: (refs: (ObjRef | undefined)[]) => DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectWidgetsModification: (refs: (ObjRef | undefined)[]) => DashboardSelector<("insertedByPlugin" | "modifiedByPlugin")[]>;
/**
 * @internal
 */
export declare const selectSectionModification: (refs: (ObjRef | undefined)[]) => DashboardSelector<("insertedByPlugin" | "modifiedByPlugin")[]>;
/**
 * @internal
 */
export declare const selectIsSectionInsertedByPlugin: (refs: (ObjRef | undefined)[]) => DashboardSelector<boolean>;
