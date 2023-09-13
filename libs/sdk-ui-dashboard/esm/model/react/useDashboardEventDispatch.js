// (C) 2020-2021 GoodData Corporation
import { useCallback } from "react";
import { invariant } from "ts-invariant";
import { isDashboardEventOrCustomDashboardEvent, } from "../events/index.js";
import { useDashboardDispatch } from "./DashboardStoreProvider.js";
import { triggerEvent } from "../commands/index.js";
/**
 * Convenience hook for dispatching Dashboard events.
 *
 * @returns function that you can use to dispatch Dashboard events
 * @alpha
 */
export const useDashboardEventDispatch = () => {
    const dispatch = useDashboardDispatch();
    return useCallback((eventBody) => {
        invariant(isDashboardEventOrCustomDashboardEvent(eventBody), "Unsupported event passed to useDashboardEventDispatch result.");
        const command = triggerEvent(eventBody);
        dispatch(command);
    }, [dispatch]);
};
//# sourceMappingURL=useDashboardEventDispatch.js.map