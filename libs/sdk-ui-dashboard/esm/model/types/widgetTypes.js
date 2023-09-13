// (C) 2021-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @internal
 */
export function isWidgetHeader(obj) {
    return !isEmpty(obj) && obj.title !== undefined;
}
//# sourceMappingURL=widgetTypes.js.map