import { IInsight, IDashboardObjectIdentity, IDashboardLayout, IDashboardWidget, ISettings } from "@gooddata/sdk-model";
import { ObjRefMap } from "../metadata/objRefMap.js";
/**
 * This function sanitizes dashboard layout. It will:
 *
 * 1.  Ensure insight widgets have correct sizes - matching what the visualization used by the insight needs
 *     (this is essential as the insight visualization may change since the last time dashboard was created)
 * 2.  Ensure insight widgets reference existing insights.
 *
 * @param layout - layout
 * @param insights - existing insights that are referenced by the layout's widgets
 * @param settings - current settings; these may influence sizing of the widgets
 */
export declare function dashboardLayoutSanitize<T = IDashboardWidget>(layout: IDashboardLayout<T>, insights: IInsight[], settings: ISettings): IDashboardLayout<T>;
/**
 * Mapping between dashboard object identities. This is typically used to map between temporary identity assigned
 * to a dashboard object as it is added onto a dashboard and the persistent identity of the object once it
 * it saved by the backend.
 */
export type IdentityMapping = {
    original: IDashboardObjectIdentity;
    updated: IDashboardObjectIdentity;
};
/**
 * Given two layouts, this function construct mapping between widget identities between the original and the
 * updated layout.
 *
 * Note that this function does not really verify that the layouts are effectively the same and differ just
 * in the widget identities. It checks that for each item in the original layout, there is item at the same
 * position in the updated layout. It can happen that two different layouts will be processed by this
 * function without errors.
 *
 * @param original - original layout, the original widget identities will be picked from here
 * @param updated - updated layout, the updated widget identities will be picked from here
 * @returns map between original widget identity and updated widget identity
 */
export declare function dashboardLayoutWidgetIdentityMap<T extends IDashboardWidget>(original: IDashboardLayout<T>, updated: IDashboardLayout<T>): ObjRefMap<IdentityMapping>;
export type DashboardObjectIdentityPredicate = (identity: IDashboardObjectIdentity) => boolean;
/**
 * Given a layout, this function will go through all of it's item's widgets and remove widget's identity if
 * the provided predicate function evaluates true for the identity.
 *
 * A new layout with updated widgets will be returned.
 *
 * @param layout - layout to process
 * @param identityPredicate - function to evaluate for each widget identity; if this function returns true, the
 *  widget's identity will be removed
 */
export declare function dashboardLayoutRemoveIdentity<T extends IDashboardWidget>(layout: IDashboardLayout<T>, identityPredicate: DashboardObjectIdentityPredicate): IDashboardLayout;
