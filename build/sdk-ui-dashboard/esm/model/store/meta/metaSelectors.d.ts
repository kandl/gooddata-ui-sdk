import { IFilterContextDefinition, IAccessControlAware, IDashboardDefinition, IDashboard, UriRef, IFilterContext, ITempFilterContext, ObjRef, IdentifierRef, ShareStatus, IDashboardWidget } from "@gooddata/sdk-model";
import { DashboardSelector } from "../types.js";
import { DashboardDescriptor } from "./metaState.js";
/**
 * Selects dashboard's descriptor.
 *
 * @internal
 */
export declare const selectDashboardDescriptor: DashboardSelector<DashboardDescriptor>;
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
 * Selects persisted IFilterContext/ITempFilterContext - that is the IFilterContext or ITempFilterContext that
 * was used to initialize the original filters of the dashboard component during the initial load of the
 * dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
export declare const selectPersistedDashboardFilterContext: DashboardSelector<IFilterContext | ITempFilterContext | undefined>;
/**
 * Selects persisted IFilterContextDefinition - that is the IFilterContext or ITempFilterContext that
 * was used to initialize the original filters of the dashboard component during the initial load of the
 * dashboard but removes ref, uri and identifier, effectively creating a clone of the stored value
 * that can be used independently.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
export declare const selectPersistedDashboardFilterContextAsFilterContextDefinition: DashboardSelector<IFilterContextDefinition | undefined>;
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
 * Selects a boolean indication if dashboard is new
 *
 * @internal
 */
export declare const selectIsNewDashboard: DashboardSelector<boolean>;
/**
 * Selects current dashboard title.
 *
 * @public
 */
export declare const selectDashboardTitle: DashboardSelector<string>;
/**
 * Selects current dashboard description.
 *
 * @public
 */
export declare const selectDashboardDescription: DashboardSelector<string>;
/**
 * Selects dashboard tags.
 *
 * @public
 */
export declare const selectDashboardTags: DashboardSelector<string[]>;
/**
 * Selects dashboard share status.
 *
 * @alpha
 */
export declare const selectDashboardShareStatus: DashboardSelector<ShareStatus>;
/**
 * Returns whether dashboard is private.
 *
 * @alpha
 */
export declare const selectIsDashboardPrivate: DashboardSelector<boolean>;
/**
 * Selects dashboard lock status.
 *
 * @alpha
 */
export declare const selectDashboardLockStatus: DashboardSelector<boolean>;
/**
 * Selects complete dashboard share info.
 *
 * @alpha
 */
export declare const selectDashboardShareInfo: DashboardSelector<IAccessControlAware>;
/**
 * Selects a boolean indication if he dashboard has any changes to the dashboard filter compared to the persisted version (if any)
 *
 * @internal
 */
export declare const selectIsDateFilterChanged: DashboardSelector<boolean>;
/**
 * Selects a boolean indication if he dashboard has any changes to the attribute filters compared to the persisted version (if any)
 *
 * @internal
 */
export declare const selectIsAttributeFiltersChanged: DashboardSelector<boolean>;
/**
 * Selects a boolean indication if he dashboard has any changes to the any of the filters compared to the persisted version (if any)
 *
 * @internal
 */
export declare const selectIsFiltersChanged: DashboardSelector<boolean>;
/**
 * Selects a boolean indication if he dashboard has any changes to the title compared to the persisted version (if any)
 *
 * @internal
 */
export declare const selectIsTitleChanged: DashboardSelector<boolean>;
/**
 * Selects a boolean indication if he dashboard has any changes to the layout compared to the persisted version (if any)
 *
 * @internal
 */
export declare const selectIsLayoutChanged: DashboardSelector<boolean>;
/**
 * Selects a boolean indication if he dashboard has any changes compared to the persisted version (if any)
 *
 * @internal
 */
export declare const selectIsDashboardDirty: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectDashboardWorkingDefinition: DashboardSelector<IDashboardDefinition<IDashboardWidget>>;
