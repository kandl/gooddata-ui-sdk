import { DashboardDispatch, DashboardSelectorEvaluator, DashboardState } from "../types.js";
import { DashboardStoreAccessor } from "./DashboardStoreAccessor.js";
import { ObjRef } from "@gooddata/sdk-model";
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
