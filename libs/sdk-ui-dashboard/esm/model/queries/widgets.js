// (C) 2021-2022 GoodData Corporation
/**
 * Creates action thought which you can query dashboard component for filters that should be used by a given widget.
 *
 * @param widgetRef - reference to insight widget
 * @param insight - specify insight to evaluate the filters for in context of the widget.
 *  If null, InsightWidgets will ignore the insight the are referencing.
 *  If not specified, InsightWidgets will default to the insights they reference, Custom- and KpiWidgets will ignore it.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export function queryWidgetFilters(widgetRef, insight, correlationId) {
    return {
        type: "GDC.DASH/QUERY.WIDGET.FILTERS",
        correlationId,
        payload: {
            widgetRef,
            insight,
        },
    };
}
/**
 *  Creates action thought which you can query dashboard component for broken alert filters.
 *
 * @param widgetRef - reference to insight kpi widget
 * @param correlationId - specify correlation id to use for this command.
 * @returns
 *
 * @alpha
 */
export function queryWidgetBrokenAlerts(widgetRef, correlationId) {
    return {
        type: "GDC.DASH/QUERY.WIDGET.BROKEN_ALERTS",
        correlationId,
        payload: {
            widgetRef,
        },
    };
}
/**
 * Creates action through which you can query dashboard component for information about the total number of alerts
 * all the users have set on a given KPI widget.
 *
 * @param widgetRef - reference to the KPI widget
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 * @alpha
 */
export function queryWidgetAlertCount(widgetRef, correlationId) {
    return {
        type: "GDC.DASH/QUERY.WIDGET.ALERT_COUNT",
        correlationId,
        payload: {
            widgetRef,
        },
    };
}
//# sourceMappingURL=widgets.js.map