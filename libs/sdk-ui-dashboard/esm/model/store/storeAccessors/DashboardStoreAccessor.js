// (C) 2022 GoodData Corporation
import { invariant } from "ts-invariant";
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
export class DashboardStoreAccessor {
    constructor(selector, dispatch) {
        /**
         * Returns current selector for the dashboard's component state.
         */
        this.getDashboardSelect = () => {
            invariant(this.selectorEvaluator, "DashboardStoreAccessor selectorEvaluator is not initialized");
            return this.selectorEvaluator;
        };
        /**
         * Setter for the dashboard's component state selector.
         * @param selectorEvaluator - dashboardSelectorEvaluator
         */
        this.setSelector = (selectorEvaluator) => {
            this.selectorEvaluator = selectorEvaluator;
        };
        /**
         * Returns current dispatch object for the dashboard component state.
         */
        this.getDashboardDispatch = () => {
            invariant(this.dispatch, "DashboardStoreAccessor dispatch is not initialized");
            return this.dispatch;
        };
        /**
         * Setter for the dashboard's component state dispatch.
         * @param dispatch - dashboardDispatch
         */
        this.setDispatch = (dispatch) => {
            this.dispatch = dispatch;
        };
        /**
         * Checks if {@link DashboardStoreAccessor} is fully initialized.
         */
        this.isDashboardStoreAccessorInitialized = () => {
            return !!this.selectorEvaluator && !!this.dispatch;
        };
        /**
         * Callback to be passed as {@link Dashboard} component {@link Dashboard#onStateChange} property to set
         * {@link DashboardStoreAccessor#selectorEvaluator} and {@link DashboardStoreAccessor#dispatch} to handle Dashboard component state from outside of the
         * component.
         *
         * @param state - {@link DashboardState} object.
         * @param dispatch - {@link DashboardDispatch} object.
         */
        this.setSelectAndDispatch = (state, dispatch) => {
            const dashboardSelect = (select) => select(state);
            this.setSelector(dashboardSelect);
            this.setDispatch(dispatch);
        };
        this.selectorEvaluator = selector;
        this.dispatch = dispatch;
    }
}
//# sourceMappingURL=DashboardStoreAccessor.js.map