// (C) 2022 GoodData Corporation
import { areObjRefsEqual, isObjRef, widgetRef } from "@gooddata/sdk-model";
import { selectAttributeFilterDisplayFormsMap, selectExecutionResultByRef, useDashboardSelector, } from "../../../../model/index.js";
const WARNING_FILTER_NOT_APPLIED = "gdc.aqe.not_applied_filter.report";
export function useIsFilterNotApplied(widget, displayFormRef) {
    const execResult = useDashboardSelector(selectExecutionResultByRef(widgetRef(widget)));
    const allWarnings = execResult === null || execResult === void 0 ? void 0 : execResult.warnings;
    const dfMap = useDashboardSelector(selectAttributeFilterDisplayFormsMap);
    const df = dfMap.get(displayFormRef);
    if (!df) {
        return true;
    }
    if (!(allWarnings === null || allWarnings === void 0 ? void 0 : allWarnings.length)) {
        return false;
    }
    return allWarnings
        .filter((warning) => warning.warningCode === WARNING_FILTER_NOT_APPLIED)
        .some((warning) => { var _a; return (_a = warning.parameters) === null || _a === void 0 ? void 0 : _a.some((param) => isObjRef(param) && areObjRefsEqual(param, df.attribute)); });
}
//# sourceMappingURL=useIsFilterNotApplied.js.map