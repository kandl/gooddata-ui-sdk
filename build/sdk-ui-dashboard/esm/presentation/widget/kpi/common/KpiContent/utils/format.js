import { ClientFormatterFacade } from "@gooddata/number-formatter";
import isNull from "lodash/isNull.js";
export const HYPHEN = "–"; // EN DASH (not usual 'minus')
export function formatMetric(number, format, separators) {
    const convertedValue = ClientFormatterFacade.convertValue(number);
    const { formattedValue } = ClientFormatterFacade.formatValue(convertedValue, format, separators);
    return formattedValue;
}
export function isValueUnhandledNull(value, format) {
    const convertedValue = ClientFormatterFacade.convertValue(value);
    const { nullConditionFormatter } = ClientFormatterFacade.formatValue(convertedValue, format);
    return isNull(value) && !nullConditionFormatter;
}
//# sourceMappingURL=format.js.map