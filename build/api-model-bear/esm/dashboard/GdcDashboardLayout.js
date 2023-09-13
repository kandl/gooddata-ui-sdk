// (C) 2007-2021 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isFluidLayout(obj) {
    return !isEmpty(obj) && !!obj.fluidLayout;
}
/**
 * @public
 */
export function isLayoutWidget(obj) {
    return !isEmpty(obj) && !!obj.widget;
}
//# sourceMappingURL=GdcDashboardLayout.js.map