// (C) 2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isKpiDashboardAttachment(obj) {
    return !isEmpty(obj) && !!obj.kpiDashboardAttachment;
}
/**
 * @public
 */
export function isVisualizationWidgetAttachment(obj) {
    return !isEmpty(obj) && !!obj.visualizationWidgetAttachment;
}
//# sourceMappingURL=GdcScheduledMail.js.map