// (C) 2020-2022 GoodData Corporation
import { useCallback, useState } from "react";
import { createAlert, updateAlert, removeAlerts, dispatchAndWaitFor, useDashboardDispatch, } from "../../../../model/index.js";
function useKpiAlertOperation(commandCreator, onSuccess) {
    const [status, setStatus] = useState("idle");
    const dispatch = useDashboardDispatch();
    const run = useCallback((...args) => {
        setStatus("inProgress");
        dispatchAndWaitFor(dispatch, commandCreator(...args))
            .then(() => {
            setStatus("idle");
            onSuccess();
        })
            .catch(() => setStatus("error"));
    }, [onSuccess]);
    return [status, run];
}
export const useKpiAlertOperations = (closeAlertDialog) => {
    const [creatingStatus, onCreateAlert] = useKpiAlertOperation(createAlert, closeAlertDialog);
    const [updatingStatus, onUpdateAlert] = useKpiAlertOperation(updateAlert, closeAlertDialog);
    const [removingStatus, onRemoveAlerts] = useKpiAlertOperation(removeAlerts, closeAlertDialog);
    const onRemoveAlert = useCallback((alert) => {
        onRemoveAlerts([alert.ref]);
    }, [onRemoveAlerts]);
    return {
        onCreateAlert,
        creatingStatus,
        onUpdateAlert,
        updatingStatus,
        onRemoveAlert,
        removingStatus,
    };
};
//# sourceMappingURL=useKpiAlertOperations.js.map