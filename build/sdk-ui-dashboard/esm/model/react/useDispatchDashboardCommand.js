// (C) 2020-2022 GoodData Corporation
import { useCallback } from "react";
import { useDashboardDispatch } from "./DashboardStoreProvider.js";
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
export const useDispatchDashboardCommand = (commandCreator) => {
    const dispatch = useDashboardDispatch();
    return useCallback((...args) => {
        const command = commandCreator(...args);
        dispatch(command);
    }, [commandCreator]);
};
//# sourceMappingURL=useDispatchDashboardCommand.js.map