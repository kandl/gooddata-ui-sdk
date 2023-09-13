// (C) 2021-2023 GoodData Corporation
/**
 * Creates the SaveAlert command. Dispatching this command will result in the creating Kpi alert on the backend.
 *
 * @param alert - specify alert to create.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @beta
 */
export function createAlert(alert, correlationId) {
    return {
        type: "GDC.DASH/CMD.ALERT.CREATE",
        correlationId,
        payload: {
            alert,
        },
    };
}
/**
 * Creates the UpdateAlert command. Dispatching this command will result in the updating Kpi alert on the backend.
 *
 * @param alert - specify alert to update.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing

 * @beta
 */
export function updateAlert(alert, correlationId) {
    return {
        type: "GDC.DASH/CMD.ALERT.UPDATE",
        correlationId,
        payload: {
            alert,
        },
    };
}
/**
 * Creates the RemoveAlerts command. Dispatching this command will result in the removing Kpi alerts on the backend.
 *
 * @param refs - specify ObjRef of the alerts to remove
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing

 * @beta
 */
export function removeAlerts(refs, correlationId) {
    return {
        type: "GDC.DASH/CMD.ALERTS.REMOVE",
        correlationId,
        payload: {
            refs,
        },
    };
}
//# sourceMappingURL=alerts.js.map