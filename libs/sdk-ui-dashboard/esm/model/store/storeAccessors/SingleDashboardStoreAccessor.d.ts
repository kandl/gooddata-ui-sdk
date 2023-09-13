import { DashboardDispatch, DashboardSelectorEvaluator, DashboardState } from "../types.js";
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
