// (C) 2020-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardAttachment}.
 *
 * @alpha
 */
export function isDashboardAttachment(obj) {
    return !isEmpty(obj) && obj.dashboard !== undefined;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetAttachment}.
 *
 * @alpha
 */
export function isWidgetAttachment(obj) {
    return !isEmpty(obj) && obj.widget !== undefined;
}
//# sourceMappingURL=scheduledMail.js.map