// (C) 2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { DashboardStoreAccessor } from "./DashboardStoreAccessor.js";
import { idRef, serializeObjRef } from "@gooddata/sdk-model";
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
class DashboardStoreAccessorRepository {
    static getSerializedDashboardRef(dashboard) {
        const dashboardRef = typeof dashboard === "string" ? idRef(dashboard) : dashboard;
        return serializeObjRef(dashboardRef);
    }
    /**
     * Gets the correct {@link DashboardStoreAccessor} for given dashboard from the accessors map.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static getAccessorsForDashboard(dashboard) {
        const serializedDashboardRef = DashboardStoreAccessorRepository.getSerializedDashboardRef(dashboard);
        const accessor = this.accessors.get(serializedDashboardRef);
        invariant(accessor, `No accessor available for dashboard ${dashboard}`);
        return accessor;
    }
    /**
     * Gets the correct {@link DashboardSelectorEvaluator} for given dashboard from the accessors map.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static getDashboardSelectForDashboard(dashboard) {
        var _a;
        const serializedDashboardRef = DashboardStoreAccessorRepository.getSerializedDashboardRef(dashboard);
        const selectorEvaluator = (_a = this.accessors.get(serializedDashboardRef)) === null || _a === void 0 ? void 0 : _a.getDashboardSelect();
        invariant(selectorEvaluator, `No selector available for dashboard ${dashboard}`);
        return selectorEvaluator;
    }
    /**
     * Gets the correct {@link DashboardDispatch} for given dashboard from the accessors map.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static getDashboardDispatchForDashboard(dashboard) {
        var _a;
        const serializedDashboardRef = DashboardStoreAccessorRepository.getSerializedDashboardRef(dashboard);
        const dashboardDispatch = (_a = this.accessors.get(serializedDashboardRef)) === null || _a === void 0 ? void 0 : _a.getDashboardDispatch();
        invariant(dashboardDispatch, `No selector available for dashboard ${dashboard}`);
        return dashboardDispatch;
    }
    /**
     * Creates a {@link Dashboard#onStateChange} callback for given dashboard.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static getOnChangeHandlerForDashboard(dashboard) {
        const serializedDashboardRef = DashboardStoreAccessorRepository.getSerializedDashboardRef(dashboard);
        return (state, dispatch) => {
            const dashboardSelect = (select) => select(state);
            DashboardStoreAccessorRepository.setAccessorForDashboard(serializedDashboardRef, dashboardSelect, dispatch);
        };
    }
    static setAccessorForDashboard(serializedDashboardRef, selector, dispatch) {
        DashboardStoreAccessorRepository.accessors.set(serializedDashboardRef, new DashboardStoreAccessor(selector, dispatch));
    }
    /**
     * Removes dashboard accessors from {@link DashboardStoreAccessorRepository#accessors} for the given dashboard {@link @gooddata/sdk-model#ObjRef}.
     *
     * @param dashboard - an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static clearAccessorForDashboard(dashboard) {
        const serializedDashboardRef = DashboardStoreAccessorRepository.getSerializedDashboardRef(dashboard);
        DashboardStoreAccessorRepository.accessors.delete(serializedDashboardRef);
    }
    /**
     * Clears all accessors saved in accessors map.
     */
    static clearAllAccessors() {
        DashboardStoreAccessorRepository.accessors.clear();
    }
    /**
     * Checks if accessors is initialized for given dashboard {@link @gooddata/sdk-model#ObjRef}.
     *
     * @param dashboard -an {@link @gooddata/sdk-model#ObjRef} of the dashboard, or its id as a string
     */
    static isAccessorInitializedForDashboard(dashboard) {
        const serializedDashboardRef = this.getSerializedDashboardRef(dashboard);
        const accessor = DashboardStoreAccessorRepository.accessors.get(serializedDashboardRef);
        return !!(accessor === null || accessor === void 0 ? void 0 : accessor.isDashboardStoreAccessorInitialized());
    }
}
DashboardStoreAccessorRepository.accessors = new Map();
export { DashboardStoreAccessorRepository };
//# sourceMappingURL=DashboardStoreAccessorRepository.js.map