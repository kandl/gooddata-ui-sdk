import { DashboardSelector, DashboardState } from "../types.js";
import { ObjRef, FilterContextItem, IDashboardAttributeFilter, IDashboardDateFilter, IAttributeDisplayFormMetadataObject, IFilterContextDefinition, IDashboardObjectIdentity } from "@gooddata/sdk-model";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
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
 * Creates a selector for selecting attribute filter by its displayForm {@link @gooddata/sdk-model#ObjRef}.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectFilterContextAttributeFilterByDisplayForm: (displayForm: ObjRef) => (state: DashboardState) => IDashboardAttributeFilter | undefined;
/**
 * Creates a selector for selecting attribute filter by its localId.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectFilterContextAttributeFilterByLocalId: (localId: string) => DashboardSelector<IDashboardAttributeFilter | undefined>;
/**
 * Creates a selector for selecting attribute filter index by its localId.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectFilterContextAttributeFilterIndexByLocalId: (localId: string) => DashboardSelector<number>;
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
 * Creates a selector for selecting all filters with different reference than the given one.
 *
 * @internal
 */
export declare const selectOtherContextAttributeFilters: (ref?: ObjRef) => DashboardSelector<IDashboardAttributeFilter[]>;
/**
 * Creates a selector to get a display form of the filter defined by its local identifier.
 *
 * @internal
 */
export declare const selectAttributeFilterDisplayFormByLocalId: (localId: string) => DashboardSelector<ObjRef>;
/**
 * Creates a selector which checks for a circular dependency between filters.
 *
 * @internal
 */
export declare const selectIsCircularDependency: (currentFilterLocalId: string, neighborFilterLocalId: string) => DashboardSelector<boolean>;
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
