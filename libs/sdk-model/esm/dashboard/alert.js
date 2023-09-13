// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { isObjRef } from "../objRef/index.js";
import { isFilterContextDefinition } from "./filterContext.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetAlertDefinition}.
 * @alpha
 */
export function isWidgetAlertDefinition(obj) {
    return (hasWidgetAlertBaseProps(obj) &&
        (!isObjRef(obj.ref) ||
            isFilterContextDefinition(obj.filterContext)));
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetAlert}.
 * @alpha
 */
export function isWidgetAlert(obj) {
    return hasWidgetAlertBaseProps(obj) && !isWidgetAlertDefinition(obj);
}
/**
 * @internal
 */
function hasWidgetAlertBaseProps(obj) {
    return (!isEmpty(obj) &&
        (obj.whenTriggered === "underThreshold" ||
            obj.whenTriggered === "aboveThreshold"));
}
//# sourceMappingURL=alert.js.map