import { ObjRef, IWidget, IDashboardLayout, IKpiWidget, IDrillToLegacyDashboard, InsightDrillDefinition } from "@gooddata/sdk-model";
import { DashboardSelector } from "../types.js";
import { ExtendedDashboardWidget } from "../../types/layoutTypes.js";
import { UndoableCommand } from "../_infra/undoEnhancer.js";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
import { IDashboardFilter, ILayoutCoordinates } from "../../../types.js";
import { LayoutStash } from "./layoutState.js";
import { DashboardLayoutCommands } from "../../commands/index.js";
/**
 * This selector returns current layout's stash. This stash can contain items that were removed from the layout with the
 * intent of further using the item elsewhere on the layout. The stash is a mapping of stashIdentifier to an array
 * of stashed items. The stash identifiers and stash usage is fully under control of the user.
 *
 * @internal
 */
export declare const selectStash: DashboardSelector<LayoutStash>;
/**
 * This selector returns commands that impacted the layout and can now be undone.
 *
 * @internal
 */
export declare const selectUndoableLayoutCommands: DashboardSelector<UndoableCommand<DashboardLayoutCommands>[]>;
/**
 * This selector returns dashboard's layout. It is expected that the selector is called only after the layout state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @alpha
 */
export declare const selectLayout: DashboardSelector<IDashboardLayout<ExtendedDashboardWidget>>;
/**
 * This selector returns the basic dashboard layout that does not contain any client-side extensions.
 *
 * This selector exists because analytical backend impls are not yet ready to handle persistence of custom
 * widgets (that may have arbitrary payloads). The selector is used only in save and saveAs command handlers,
 * where it obtains the layout without any custom widgets and persists that. Note that the save/saveAs
 * handlers will not wipe the custom widgets from the state during the save - so at this point the custom
 * widgets are treated as client-side extensions.
 *
 * Note: this selector also intentionally removes empty sections; dashboard cannot cope with them and
 * they may readily appear if user adds section full of custom widgets and then does saveAs; such sections
 * would end up empty.
 *
 * @internal
 */
export declare const selectBasicLayout: DashboardSelector<IDashboardLayout<IWidget>>;
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
 * Selects widget by its ref (including custom widgets).
 *
 * @remarks
 * To limit the scope only to analytical widgets, use {@link selectAnalyticalWidgetByRef}.
 *
 * @alpha
 */
export declare const selectWidgetByRef: (ref: ObjRef | undefined) => DashboardSelector<ExtendedDashboardWidget | undefined>;
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
 * Selects widget drills by the widget ref.
 *
 * @alpha
 */
export declare const selectWidgetDrills: (ref: ObjRef | undefined) => DashboardSelector<IDrillToLegacyDashboard[] | InsightDrillDefinition[]>;
/**
 * Selects all filters from filter context converted to filters specific for a widget specified by a ref.
 *
 * @remarks
 * This does NOT resolve things like ignored filters for a widget, etc.
 *
 * @internal
 */
export declare const selectAllFiltersForWidgetByRef: (ref: ObjRef) => DashboardSelector<IDashboardFilter[]>;
/**
 * Selects a boolean indicating if the dashboard is empty.
 *
 * @alpha
 */
export declare const selectIsLayoutEmpty: DashboardSelector<boolean>;
/**
 * Selects all KPI widgets in the layout.
 *
 * @alpha
 */
export declare const selectAllKpiWidgets: DashboardSelector<IKpiWidget[]>;
/**
 * Selects all insight widgets in the layout.
 *
 * @alpha
 */
export declare const selectAllInsightWidgets: DashboardSelector<ExtendedDashboardWidget[]>;
/**
 * Selects all custom widgets in the layout.
 *
 * @alpha
 */
export declare const selectAllCustomWidgets: DashboardSelector<ExtendedDashboardWidget[]>;
/**
 * Selects all non-custom widgets in the layout.
 *
 * @alpha
 */
export declare const selectAllAnalyticalWidgets: DashboardSelector<IWidget[]>;
/**
 * Selects a boolean indicating if the dashboard contains at least one non-custom widget.
 *
 * @alpha
 */
export declare const selectLayoutHasAnalyticalWidgets: DashboardSelector<boolean>;
/**
 * Selects layout coordinates for a given widget.
 *
 * @alpha
 */
export declare const selectWidgetCoordinatesByRef: (ref: ObjRef) => DashboardSelector<ILayoutCoordinates>;
/**
 * @internal
 */
export declare const selectWidgetPlaceholder: DashboardSelector<ExtendedDashboardWidget | undefined>;
/**
 * @internal
 */
export declare const selectWidgetPlaceholderCoordinates: DashboardSelector<ILayoutCoordinates | undefined>;
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
export declare const selectKpiWidgetPlaceholder: DashboardSelector<ExtendedDashboardWidget | undefined>;
/**
 * @internal
 */
export declare const selectKpiWidgetPlaceholderCoordinates: DashboardSelector<ILayoutCoordinates | undefined>;
