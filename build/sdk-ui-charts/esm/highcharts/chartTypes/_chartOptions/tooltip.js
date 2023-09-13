// (C) 2007-2022 GoodData Corporation
import { ClientFormatterFacade } from "@gooddata/number-formatter";
import isEmpty from "lodash/isEmpty.js";
import { customEscape, percentFormatter } from "../_util/common.js";
import isNil from "lodash/isNil.js";
export function formatValueForTooltip(value, format, separators) {
    const parsedNumber = ClientFormatterFacade.convertValue(value);
    // Based on the tests, when a format is not provided, we should refrain from formatting the value using the formatter, as the default format "#,##0.00" will be used.
    // Additionally, the test necessitates that the value should remain unformatted.
    if (!isEmpty(format)) {
        const result = ClientFormatterFacade.formatValue(parsedNumber, format, separators);
        return customEscape(result.formattedValue);
    }
    if (parsedNumber === null || parsedNumber === undefined) {
        return "";
    }
    else {
        return parsedNumber.toString();
    }
}
export function getFormattedValueForTooltip(isDualChartWithRightAxis, stackMeasuresToPercent, point, separators, percentageValue) {
    const { target, y, format } = point;
    const isNotStackToPercent = stackMeasuresToPercent === false || isNil(percentageValue) || isDualChartWithRightAxis;
    return isNotStackToPercent
        ? formatValueForTooltip(target !== null && target !== void 0 ? target : y, format, separators)
        : percentFormatter(percentageValue, format);
}
//# sourceMappingURL=tooltip.js.map